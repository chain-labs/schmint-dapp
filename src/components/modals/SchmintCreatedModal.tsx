import Image from 'next/image';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { hideModal } from 'src/redux/modal';
import Box from '../Box';
import ButtonComp from '../Button';
import Modal from '../Modal';
import Text from '../Text';
import Confetti from 'react-confetti';
import _ from 'lodash';

const SchmintCreatedModal = () => {
	const dispatch = useAppDispatch();
	const [image, setImage] = React.useState('');
	const [placeholder, setPlaceholder] = React.useState('');

	useEffect(() => {
		return () => {
			if (typeof window !== 'undefined') {
				window.scrollTo(0, 0);
			}
		};
	}, []);

	useEffect(() => {
		const randomize = () => {
			let randomNumber = _.random(0, 499);
			randomNumber = randomNumber % 4;
			randomNumber += 1;
			const img = `https://ik.imagekit.io/chainlabs/Schmint/gifs/${randomNumber}.gif`;
			const placeholder = `https://ik.imagekit.io/chainlabs/Schmint/placeholders/${randomNumber}.jpeg`;
			setImage(img);
			setPlaceholder(placeholder);
		};

		randomize();

		return () => {
			randomize();
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
					<Image src={image} alt="gif" layout="fill" objectFit="contain" blurDataURL={placeholder} />
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
