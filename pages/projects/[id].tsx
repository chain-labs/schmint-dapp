import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import { ICollection } from 'src/containers/Explore/projectsStore';
import Projectpage from 'src/containers/project-page';
import { PROJECTS_DIR } from 'src/utils/constants';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const ProjectPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [collections, setCollections] = useState([]);
	const [collection, setCollection] = useState<ICollection>();
	const { chain } = useNetwork();
	const { switchNetwork } = useSwitchNetwork();

	const getAllCollections = async () => {
		const data = await fetch(PROJECTS_DIR);
		const res = await data.json();
		setCollections(res);
	};

	const getCollection = async () => {
		collections.map(async (collection) => {
			if (collection.id === id) {
				await setCollection(collection);
			}
		});
	};

	useEffect(() => {
		getCollection();
	}, [id, collections]);

	useEffect(() => {
		getAllCollections();
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (collection) {
				if (collection?.network?.chainId !== chain?.id) {
					switchNetwork?.(collection?.network?.chainId);
				}
			}
		}
	}, [collection, chain]);

	if (collection) {
		return <Box>{collection ? <Projectpage collection={collection} /> : ''};</Box>;
	}

	return null;
};

export default ProjectPage;
