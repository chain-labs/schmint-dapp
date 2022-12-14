import { useLazyQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Loader from 'src/components/Loader';
import { CHECK_FAILED_SCHMINT } from 'src/graphql/query/CheckFailedSchmint';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { sendLog } from 'src/utils/logging';
import { getAllCollections } from '../Explore/projectsStore';
import { getABIType, nftContract, seaDrop } from '../project-page/utils';
import NoSchmintComponent from './NoSchmintComponent';
import SchmintTile from './SchmintTile';
import { getSchmintQuantity } from './utils';

const SchmintsList = ({ page, schmints }) => {
	const [collections, setCollections] = useState([]);
	const [activeSchmints, setActiveSchmints] = useState([]);
	const [completedSchmints, setCompletedSchmints] = useState([]);
	const [getSuccesfulSchmints] = useLazyQuery(CHECK_FAILED_SCHMINT, {
		onError: (error) => {
			console.log('Error checking failed schmints', error); // eslint-disable-line no-console

			// CODE: 129
			sendLog(129, error);
		},
	});
	const user = useAppSelector(userSelector);

	useEffect(() => {
		getAllCollections()
			.then((collection) => setCollections(collection))
			.catch((err) => {
				console.log('Error getting All collections', err); // eslint-disable-line no-console
				// CODE: 130
				sendLog(130, err);
			});
		const interval = setInterval(() => {
			getAllCollections()
				.then((collection) => setCollections(collection))
				.catch((err) => {
					console.log('Error getting All collections', err); // eslint-disable-line no-console
					// CODE: 130
					sendLog(130, err);
				});
		}, 10000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	// useEffect(() => {
	// 	console.log('All Schmints', schmints);
	// 	console.log('completed schmints', completedSchmints);
	// 	console.log('active schmints', activeSchmints);
	// }, [schmints, completedSchmints, activeSchmints]);

	const getSchmitsAssigned = async () => {
		const FilteredActiveSchmints: any[] = schmints.filter(
			(schmint) => !schmint.isSchminted && !schmint.isCancelled
		);
		const FilteredCompletedSchmints: any[] = schmints.filter((schmint) => {
			return schmint.isSchminted || schmint.isCancelled;
		});

		// console.log('completed schmint in getSchmitsAssigned', FilteredCompletedSchmints);
		const targets = FilteredActiveSchmints.map((schmint) => schmint.target);
		const data = await getSuccesfulSchmints({ variables: { target: targets, owner: user.address } });

		for (let i = 0; i < data.data.schmints.length; i++) {
			const s = data.data.schmints[i];
			const idx = FilteredActiveSchmints.findIndex((a) => a.target === s.target);
			//we should check if Activeschmints.starttimestamp < date.now()/1000 then push in completed schmint
			//In previous logic it was pushing undefined schmint with index -1 so we need to break when we get index -1 and push
			// only when index is not -1
			if (idx === -1) {
				continue;
			}
			//After getting the index correctly we need to check the collection's starttimestamp if its less than current time
			// then don't push in completed schmint because there is possiblity that we might have changed the time and made it live again
			//for that we need to get the collection's starttimestamp
			const index = collections.findIndex(
				(collection) =>
					FilteredActiveSchmints[idx].target.toLowerCase() === collection.contractAddress.toLowerCase()
			);
			// console.log('timestamp collection', collections[0]);
			// console.log("filtered schmint's start timestamp", FilteredActiveSchmints[idx]);

			if (collections[index].startTimestamp < Math.floor(Date.now() / 1000)) {
				FilteredCompletedSchmints.push(FilteredActiveSchmints[idx]);
				FilteredActiveSchmints.splice(
					FilteredActiveSchmints.findIndex((a) => a.target === s.target),
					1
				);
			}
		}
		// data.data.schmints.forEach((s) => {
		// 	const idx = FilteredActiveSchmints.findIndex((a) => a.target === s.target);
		// 	//we should check if Activeschmints.starttimestamp < date.now()/1000 then push in completed schmint
		// 	if (idx === -1) {
		// 		break;
		// 	}
		// 	FilteredCompletedSchmints.push(FilteredActiveSchmints[idx]);

		// 	FilteredActiveSchmints.splice(
		// 		FilteredActiveSchmints.findIndex((a) => a.target === s.target),
		// 		1
		// 	);
		// });

		setCompletedSchmints(FilteredCompletedSchmints);
		setActiveSchmints(FilteredActiveSchmints);
	};

	useEffect(() => {
		if (schmints.length && collections.length) {
			getSchmitsAssigned().catch((err) => {
				console.log('Error getting schmints assigned', err); // eslint-disable-line no-console
				// CODE: 131
				sendLog(131, err);
			});
		}
	}, [schmints, collections]);

	if (schmints.length && collections.length) {
		return (
			<If
				condition={(!page && activeSchmints.length < 1) || (page && completedSchmints.length < 1)}
				then={<NoSchmintComponent page={page + 1 ?? 0} />}
				else={
					<Box
						mt="mxxxl"
						width="98.4rem"
						css={`
							display: grid;
							grid-template-columns: 1fr 1fr 1fr;
							grid-gap: ${theme.space.mxl};
						`}
					>
						<If
							condition={!page}
							then={activeSchmints.map((schmint) => {
								const collection = collections.find((collection) => {
									if (collection?.contractAddress.toLowerCase() === nftContract.toLowerCase())
										return schmint?.target?.toLowerCase() === seaDrop.toLowerCase();
									else
										return (
											collection?.contractAddress.toLowerCase() === schmint?.target?.toLowerCase()
										);
								});
								const quantity = getSchmintQuantity(collection?.abi, schmint?.data);
								return (
									<SchmintTile
										collection={collection}
										quantity={quantity}
										value={`${ethers.utils.formatUnits(schmint?.value, 'ether')}`}
										createdTimestamp={schmint?.creationTimestamp}
										schmintID={schmint?.id}
									/>
								);
							})}
							else={completedSchmints.map((schmint) => {
								const collection = collections.find((collection) => {
									if (collection?.contractAddress.toLowerCase() === nftContract.toLowerCase())
										return schmint?.target?.toLowerCase() === seaDrop.toLowerCase();
									else
										return (
											collection?.contractAddress.toLowerCase() === schmint?.target?.toLowerCase()
										);
								});
								let quantity;
								//here we added try catch because we cannot add optional chaining here it need to have collection
								// and schmint at this point if it doesn't have then it will throw error
								try {
									quantity = getSchmintQuantity(collection.abi, schmint.data);
								} catch (e) {
									console.log('err', e); // eslint-disable-line no-console
									throw e;
								}
								return (
									<SchmintTile
										collection={collection}
										quantity={quantity}
										value={`${ethers.utils.formatUnits(schmint?.value, 'ether')}`}
										createdTimestamp={parseInt(schmint.creationTimestamp)}
										executedTimestamp={parseInt(schmint.executionTimestamp)}
										executionTrxHash={schmint.executionTrxHash}
										schmintID={schmint.id}
										isSchminted={schmint.isSchminted}
										gasPrice={schmint.executionGasPrice}
										completed
										isCancelled={schmint.isCancelled}
									/>
								);
							})}
						/>
					</Box>
				}
			/>
		);
	} else {
		return <Loader msg="Loading..." minHeight="50rem" />;
	}
};

export default SchmintsList;
