import Image from 'next/image';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { hideModal } from 'src/redux/modal';
import Box from '../Box';
import ButtonComp from '../Button';
import Modal from '../Modal';
import Text from '../Text';
import Confetti from 'react-confetti';

const SchmintCreatedModal = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			if (typeof window !== 'undefined') {
				window.scrollTo(0, 0);
			}
		};
	}, []);
	return (
		<Modal visible>
			<Confetti initialVelocityY={-10} />
			<Box
				bg="sky-blue-10"
				p="mm"
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				borderRadius="16px"
				border="1px solid"
				borderColor="blue-30"
				column
			>
				<Box position="relative" width="35rem" height="13.2rem" mb="mxxxl">
					<Image
						src="https://ik.imagekit.io/chainlabs/Schmint/succes_schmint_8ooAkVgV_.svg"
						layout="fill"
						objectFit="cover"
					/>
				</Box>
				<Box width="35rem" column center>
					<Text as="h5">Congratulations!</Text>
					<Text as="b3" mt="mxs" textAlign="center" color="gray-50">
						Congratulations! Your Schmint has been successfully created!
					</Text>
					<Text as="b3" mt="mxs" textAlign="center" color="gray-50">
						Note: Your Schmint will be executed as soon as the project sale goes live.
					</Text>
				</Box>
				<ButtonComp
					bg="primary"
					height={40}
					borderRadius="64px"
					mt="mxl"
					px="wm"
					width="20rem"
					mx="auto"
					onClick={() => dispatch(hideModal())}
				>
					Awesome!
				</ButtonComp>
			</Box>
		</Modal>
	);
};

export default SchmintCreatedModal;
