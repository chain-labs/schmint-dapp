import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Projectpage from 'src/containers/project-page';

const ProjectPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [collections, setCollections] = useState([]);
	const [collection, setCollection] = useState({});

	const getAllCollections = async () => {
		const data = await fetch('https://chain-labs.github.io/schmint-projects/projects.json');
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
		getAllCollections();
		getCollection();
		// console.log(projects);
	}, [id, collections]);

	return <Box>{collection ? <Projectpage collection={collection} /> : ''};</Box>;
};

export default ProjectPage;
