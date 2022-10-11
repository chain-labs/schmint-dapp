import Image from 'next/image';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { hideModal, replaceModal } from 'src/redux/modal';
import Box from '../Box';
import ButtonComp from '../Button';
import Modal from '../Modal';
import Text from '../Text';
import Confetti from 'react-confetti';
import de from 'date-fns/esm/locale/de/index.js';
import useScheduler from 'src/containers/project-page/useScheduler';
import { MODALS_LIST } from 'src/redux/modal/types';
import { useSigner } from 'wagmi';

const DeleteModal = ({ schmint, collectionName }) => {
	const dispatch = useAppDispatch();
	const SchedulerInstance = useScheduler();
	const { data: signer } = useSigner();

	const handleDelete = async () => {
		dispatch(replaceModal({ type: MODALS_LIST.CONFIRM_TRANSACTION, props: {} }));

		try {
			const tx = await SchedulerInstance?.connect(signer)?.cancelSchmint(schmint.schmintId);
			const receipt = await tx?.wait();

			const event = receipt?.events && receipt.events.filter((event) => event.event === 'SchmintCreated');
			if (!event) {
				console.log('no event found');
				return;
			} else {
				console.log({ event });
				dispatch(
					replaceModal({
						type: MODALS_LIST.STATUS_MODAL,
						props: {
							success: true,
							btnText: 'Go Back to My Schmints',
							gas: tx?.gasLimit?.toString(),
							msg: `Your Schmint for ${collectionName} was successfully deleted.`,
							successMsg: 'Schmint Successfully Deleted',
						},
					})
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		return () => {
			if (typeof window !== 'undefined') {
				window.scrollTo(0, 0);
			}
		};
	}, []);
	return (
		<Modal visible>
			{schmint ? (
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
					<Box position="relative" width="35rem" height="13.2rem" mb="mxxxl">
						<Image
							src="https://ik.imagekit.io/chainlabs/Schmint/delete-modal.svg"
							layout="fill"
							objectFit="cover"
						/>
					</Box>
					<Box width="35rem" column center>
						<Text as="h5" textAlign="center" px="wxxs">
							{' '}
							Are you sure you want to delete this Schmint?
						</Text>

						<Text as="b3" mt="mxs" textAlign="center" color="gray-50" px="wm">
							Once deleted, you won’t be able to recover the schmint.{' '}
						</Text>
					</Box>
					<Box row between>
						<ButtonComp
							bg="primary"
							height={40}
							borderRadius="64px"
							mt="mxl"
							px="wm"
							width="16.7rem"
							mx="auto"
							onClick={() => dispatch(hideModal())}
						>
							Cancel
						</ButtonComp>
						<ButtonComp
							backgroundColor="white"
							height={40}
							borderRadius="64px"
							mt="mxl"
							px="wm"
							width="16.7rem"
							mx="auto"
							color="red-40"
							border="1px solid #7A7A80"
							onClick={handleDelete}
						>
							Delete
						</ButtonComp>
					</Box>
				</Box>
			) : (
				''
			)}
		</Modal>
	);
};

export default DeleteModal;
