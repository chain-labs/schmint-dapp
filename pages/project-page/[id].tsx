import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import Projectpage from 'src/containers/project-page';
import projects from '../../Projects.json';

const ProjectPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [data, setData] = useState({});

	const getProject = async () => {
		projects.map(async (project) => {
			if (project.id === id) {
				await setData(project);
			}
		});
	};

	useEffect(() => {
		getProject();
		console.log(data);
		// console.log(projects);
	}, [id, projects]);

	return <Box>{data ? <Projectpage project={data} /> : ''};</Box>;
};

export default ProjectPage;
