import { useLazyQuery } from '@apollo/client';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Loader from 'src/components/Loader';
import { CHECK_FAILED_SCHMINT } from 'src/graphql/query/CheckFailedSchmint';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { getAllCollections } from '../Explore/projectsStore';
import NoSchmintComponent from './NoSchmintComponent';
import SchmintTile from './SchmintTile';
import { getSchmintQuantity } from './utils';

const SchmintsList = ({ page, schmints }) => {
	const [collections, setCollections] = useState([]);
	const [activeSchmints, setActiveSchmints] = useState([]);
	const [completedSchmints, setCompletedSchmints] = useState([]);
	const [getSuccesfulSchmints] = useLazyQuery(CHECK_FAILED_SCHMINT);
	const user = useAppSelector(userSelector);

	useEffect(() => {
		getAllCollections().then((collection) => setCollections(collection));
		const interval = setInterval(() => {
			getAllCollections().then((collection) => setCollections(collection));
		}, 10000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const getSchmitsAssigned = async () => {
		const activeSchmints: any[] = schmints.filter((schmint) => !schmint.isSchminted && !schmint.isCancelled);
		const completedSchmints: any[] = schmints.filter((schmint) => schmint.isSchminted || schmint.isCancelled);
		const targets = activeSchmints.map((schmint) => schmint.target);
		const data = await getSuccesfulSchmints({ variables: { target: targets, owner: user.address } });

		data.data.schmints.forEach((s) => {
			const idx = activeSchmints.findIndex((a) => a.target === s.target);
			completedSchmints.push(activeSchmints[idx]);
			activeSchmints.splice(
				activeSchmints.findIndex((a) => a.target === s.target),
				1
			);
		});
		setCompletedSchmints(completedSchmints);
		setActiveSchmints(activeSchmints);
	};

	useEffect(() => {
		if (schmints.length && collections.length) {
			getSchmitsAssigned();
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
								const collection = collections.find(
									(collection) =>
										collection.contractAddress.toLowerCase() === schmint.target.toLowerCase()
								);
								const quantity = getSchmintQuantity(collection?.abi, schmint?.data);
								return (
									<SchmintTile
										collection={collection}
										quantity={quantity}
										value={`${ethers.utils.formatUnits(schmint.value, 'ether')}`}
										createdTimestamp={schmint.creationTimestamp}
										schmintID={schmint.id}
									/>
								);
							})}
							else={completedSchmints.map((schmint) => {
								const collection = collections.find(
									(collection) =>
										collection?.contractAddress.toLowerCase() === schmint?.target?.toLowerCase()
								);
								const quantity = getSchmintQuantity(collection?.abi, schmint?.data);
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
