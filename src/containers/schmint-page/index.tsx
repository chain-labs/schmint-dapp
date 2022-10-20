import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ContractDetails from '../project-page/ContractDetails';
import Banner from '../project-page/Banner';
import theme from 'src/styleguide/theme';
import If from 'src/components/If';
import SchmintEditableForm from './SchmintEditableForm';
import { useAppSelector } from 'src/redux/hooks';
import { schedulerSelector } from 'src/redux/scheduler';
import { ethers } from 'ethers';
import InputDataDecoder from 'ethereum-input-data-decoder';
import AlertBox from './AlertBox';
import { useLazyQuery } from '@apollo/client';
import { CHECK_FAILED_SCHMINT } from 'src/graphql/query/CheckFailedSchmint';
import { userSelector } from 'src/redux/user';
import { getABIType } from '../project-page/utils';
import Text from 'src/components/Text';
import SchmintReceipt from './SchmintReceipt';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/router';

const SchmintPage = ({ collection, schmint }) => {
	const scheduler = useAppSelector(schedulerSelector);
	const [actionRequired, setActionRequired] = useState<boolean>();
	const [abi, setABI] = useState();
	const [currPrice, setCurrPrice] = useState(collection.price);
	const [quantity, setQuantity] = useState<number>(0);
	const [status, setStatus] = useState('');
	const [prevPrice, setPrevPrice] = useState(collection.price);
	const [getSuccesfulSchmints] = useLazyQuery(CHECK_FAILED_SCHMINT);
	const user = useAppSelector(userSelector);
	const router = useRouter();

	useEffect(() => {
		if (collection?.abi) {
			setABI(collection.abi);
		}
	}, [scheduler?.schedulerAddress, collection]);

	const getSchmitsAssigned = async () => {
		const targets = [schmint.target];

		if (schmint.isSchminted) {
			setStatus('1');
			return;
		}
		if (actionRequired) {
			setStatus('-1');
			return;
		}
		const data = await getSuccesfulSchmints({ variables: { target: targets, owner: user.address } });

		const { schmints } = data?.data;
		if (schmints.length > 0) {
			setStatus('0');
		} else {
			setStatus('');
		}
	};

	useEffect(() => {
		if (scheduler?.schedulerAddress && abi && collection) {
			const value = parseFloat(ethers.utils.formatUnits(schmint?.value, 'ether'));
			const data = schmint?.data;
			const decoder = new InputDataDecoder(abi);
			const res = decoder.decodeData(data);
			let quantity;
			switch (getABIType(abi)) {
				case 1: {
					quantity = parseInt(res.inputs[1]);
					break;
				}
				case 2: {
					quantity = parseInt(res.inputs[0]);
					break;
				}
				case 3: {
					quantity = parseInt(res.inputs[0]);
					break;
				}
			}
			setQuantity(quantity);
			setActionRequired(!(collection.price === value / quantity));
			setPrevPrice(value / quantity);
		}
	}, [abi, collection]);

	useEffect(() => {
		if (user.address.toLowerCase() !== schmint?.scheduler?.owner.toLowerCase()) {
			setStatus('2');
			return;
		}
		if (schmint.isCancelled) {
			setStatus('0');
		} else {
			getSchmitsAssigned();
		}
	}, [schmint, actionRequired]);

	if (collection?.title) {
		return (
			<Box center column mb="20rem" position="relative">
				<Box
					position="fixed"
					top="184px"
					left="308px"
					bg="gray-10"
					border={`1px solid ${theme.colors['gray-40']}`}
					boxShadow="shadow-200"
					borderRadius="64px"
					py="ms"
					px="mxxxl"
					row
					alignItems="center"
					zIndex={5}
					cursor="pointer"
					onClick={() => router.replace('/my-schmints')}
				>
					<ArrowLeft size={16} />
					<Text as="btn2">Back to My Schmints</Text>
				</Box>
				<Banner collection={collection} schmint />
				<If
					condition={!!status}
					then={<AlertBox status={status} schmint={schmint} currPrice={currPrice} prevPrice={prevPrice} />}
				/>
				<ContractDetails collection={collection} />
				<If
					condition={!(parseInt(status) >= 0)}
					then={<Box borderTop={`1px solid ${theme.colors['gray-20']}`} width="100%" my="wxs" />}
				/>
				<If
					condition={!status || status === '-1' || status === '2'}
					then={
						<Box>
							<If
								condition={quantity !== 0}
								then={
									<SchmintEditableForm
										collection={collection}
										actionRequired={actionRequired}
										quantity={quantity}
										schmint={schmint}
										disabled={status === '2'}
									/>
								}
							/>
						</Box>
					}
				/>
				<If
					condition={parseInt(status) >= 0 && status !== '2'}
					then={
						<SchmintReceipt
							quantity={quantity}
							schmint={schmint}
							status={status}
							network={collection.network}
						/>
					}
				/>
				<If
					condition={parseInt(status) >= 0}
					then={<Box borderTop={`1px solid ${theme.colors['gray-20']}`} width="100%" mt="wxs" />}
				/>
			</Box>
		);
	}
	return null;
};

export default SchmintPage;
