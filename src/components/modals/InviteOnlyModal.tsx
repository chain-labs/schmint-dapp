import Image from 'next/image';
import { X } from 'phosphor-react';
import React from 'react';
import { WAITLIST_ID } from 'src/constants';
import { useAppDispatch } from 'src/redux/hooks';
import { hideModal } from 'src/redux/modal';
import Box from '../Box';
import ButtonComp from '../Button';
import Modal from '../Modal';
import Text from '../Text';
import waitlist from '@zootools/waitlist-js';
import { useDisconnect } from 'wagmi';

const InviteOnlyModal = () => {
	const dispatch = useAppDispatch();
	const clickPopup = (e) => {
		e.preventDefault();
		waitlist.openPopup(WAITLIST_ID);
	};
	const { disconnect } = useDisconnect();

	return (
		<Modal visible bg="gray-10">
			<Box
				bg="sky-blue-10"
				boxShadow="shadow-400"
				borderRadius="8px"
				py="mxxxl"
				pl="mxxxl"
				row
				position="absolute"
				left="50%"
				top="50%"
				transform="translate(-50%, -50%)"
			>
				<Box
					position="absolute"
					top="16px"
					right="24px"
					onClick={() => {
						disconnect();
						dispatch(hideModal());
					}}
					cursor="pointer"
				>
					<X size={24} />
				</Box>
				<Box width="40rem">
					<Text as="h4">Oops... looks like you haven’t applied for the access list</Text>
					<Text as="b2" mt="mm" color="gray-40">
						Schmint is in the private alpha stage.
					</Text>
					<Text as="b2" mt="mxxs" color="gray-40">
						Apply here to get access.
					</Text>
					<ButtonComp mt="mxxl" bg="primary" px="mxxxl" py="ms" onClick={clickPopup}>
						<Text as="btn2">Join Waitlist</Text>
					</ButtonComp>
				</Box>
				<Box position="relative" height="25rem" width="25rem">
					<Image
						src="https://ik.imagekit.io/chainlabs/Schmint/2x_Lock_zFZUHzCww.png"
						layout="fill"
						objectFit="cover"
					/>
				</Box>
			</Box>
		</Modal>
	);
};

export default InviteOnlyModal;
