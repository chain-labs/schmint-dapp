import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import UpdateModal from 'src/components/modals/UpdateModal';
import ConfirmModal from 'src/components/modals/ConfirmModal';
import StatusModal from 'src/components/modals/StatusModal';
import ContractDetails from '../project-page/ContractDetails';
import Banner from '../project-page/Banner';
import SchmintForm from '../project-page/SchmintForm';
import theme from 'src/styleguide/theme';
import If from 'src/components/If';
import SchmintEditableForm from './SchmintEditableForm';

const SchmintPage = () => {
	const [project, setProject] = useState([]);
	const [step, setStep] = useState(-1);
	const getData = async () => {
		const data = await fetch('https://chain-labs.github.io/schmint-projects/projects.json');
		const res = await data.json();
		setProject(res[0]);
	};

	useEffect(() => {
		getData();
	}, []);
	if (step === 0) {
		return <Box>{project ? <UpdateModal collection={project[0]} setStep={setStep} /> : ''}</Box>;
	}
	if (step === 1) {
		return (
			<Box>
				<ConfirmModal setStep={setStep} />
			</Box>
		);
	}
	if (step === 2) {
		return (
			<Box>
				<StatusModal setStep={setStep} />
			</Box>
		);
	}
	return (
		<Box>
			{project ? (
				<Box center column>
					<Banner collection={project} />
					<ContractDetails collection={project} />
					<Box borderTop={`1px solid ${theme.colors['gray-20']}`} width="100%" my="wxs" />
					<SchmintEditableForm collection={project} />
				</Box>
			) : (
				<Box>Hi</Box>
			)}
		</Box>
	);
};

export default SchmintPage;
