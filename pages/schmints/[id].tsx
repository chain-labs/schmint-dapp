import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import { getCollections, ICollection } from 'src/containers/Explore/projectsStore';
import SchmintPage from 'src/containers/schmint-page';
import WrongNetworkAlert from 'src/containers/WrongNetworkAlert';
import { useAppSelector } from 'src/redux/hooks';
import { schedulerSelector } from 'src/redux/scheduler';
import { SchmintState } from 'src/redux/scheduler/types';
import { userSelector } from 'src/redux/user';
import { useNetwork } from 'wagmi';

const Schmint = () => {
	const router = useRouter();
	const { id } = router.query;
	const [collections, setCollections] = useState([]);
	const [collection, setCollection] = useState<ICollection>();
	const { chain } = useNetwork();
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);
	const [schmint, setSchmint] = useState<SchmintState>();
	const [wrongNetwork, setWrongNetwork] = useState(false);

	const getAllCollections = async () => {
		const data = await fetch('https://chain-labs.github.io/schmint-projects/projects.json');
		const res = await data.json();
		setCollections(res);
	};

	const getCollection = async () => {
		scheduler.schmints.map(async (schmint) => {
			if (schmint.schmintId === id) {
				await setSchmint(schmint);
				collections.map(async (collection) => {
					if (collection.contractAddress.toLowerCase() === schmint.target) {
						await setCollection(collection);
					}
				});
			}
		});
	};

	useEffect(() => {
		getAllCollections();
	}, []);

	useEffect(() => {
		if (scheduler?.schedulerAddress && collections) {
			getCollection();
		}
	}, [id, scheduler?.schedulerAddress, collections]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (collection && user.exists) {
				if (collection?.network?.chainId !== chain?.id) {
					setWrongNetwork(true);
					return;
				}
			}
			setWrongNetwork(false);
		}
	}, [collection, chain, user.exists]);

	if (collection && schmint.schmintId === id) {
		return (
			<Box>
				{collection ? <SchmintPage schmint={schmint} collection={collection} /> : ''}
				<If
					condition={wrongNetwork}
					then={
						<WrongNetworkAlert chainTo={collection?.network?.chainId} setWrongNetwork={setWrongNetwork} />
					}
				/>
			</Box>
		);
	}

	return null;
};

export default Schmint;
