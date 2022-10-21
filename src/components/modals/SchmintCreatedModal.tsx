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

const TEXTS = [
	'You can go sleep now',
	'You can get out of your basement now',
	'You can go take a walk now',
	'Go meet some people',
];

const SchmintCreatedModal = () => {
	const dispatch = useAppDispatch();
	const [image, setImage] = React.useState('');
	const [placeholder, setPlaceholder] = React.useState('');
	const [text, setText] = React.useState('You can go sleep now');

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
			randomNumber = randomNumber % 7;
			randomNumber += 1;
			const img = `https://ik.imagekit.io/chainlabs/Schmint/gifs/${randomNumber}.gif`;
			const placeholder = `https://ik.imagekit.io/chainlabs/Schmint/placeholders/${randomNumber}.jpeg`;
			setImage(img);
			setText(TEXTS[randomNumber % 4]);
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
				width="38.2rem"
			>
				<Box position="relative" width="35rem" height="26.4rem" mb="mxxxl" borderRadius="8px" overflow="hidden">
					<Image src={image} layout="fill" objectFit="cover" placeholder="blur" blurDataURL={placeholder} />
				</Box>
				<Box width="35rem" column center>
					<Text as="h5">Congratulations!</Text>
					<Text as="b3" mt="mxs" textAlign="center" color="gray-50">
						{`Your Schmint has been successfully created. ${text}.`}
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
