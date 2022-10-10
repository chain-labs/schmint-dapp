import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import { getCollections, ICollection } from 'src/containers/Explore/projectsStore';
import SchmintPage from 'src/containers/schmint-page';
import { useAppSelector } from 'src/redux/hooks';
import { schedulerSelector } from 'src/redux/scheduler';
import { SchmintState } from 'src/redux/scheduler/types';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const Schmint = () => {
	const router = useRouter();
	const { id } = router.query;
	const [collections, setCollections] = useState([]);
	const [collection, setCollection] = useState<ICollection>();
	const { chain } = useNetwork();
	const { switchNetwork } = useSwitchNetwork();
	const scheduler = useAppSelector(schedulerSelector);
	const [schmint, setSchmint] = useState<SchmintState>();

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
			if (collection) {
				if (collection?.network?.chainId !== chain?.id) {
					switchNetwork?.(collection?.network?.chainId);
				}
			}
		}
	}, [collection, chain]);

	if (collection && schmint.schmintId === id) {
		return <Box>{collection ? <SchmintPage schmint={schmint} collection={collection} /> : ''};</Box>;
	}

	return null;
};

export default Schmint;