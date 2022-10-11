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
import useScheduler from '../project-page/useScheduler';
import { useAppSelector } from 'src/redux/hooks';
import { schedulerSelector } from 'src/redux/scheduler';
import { ethers } from 'ethers';
import InputDataDecoder from 'ethereum-input-data-decoder';
import AlertBox from './AlertBox';

const SchmintPage = ({ collection, schmint }) => {
	const scheduler = useAppSelector(schedulerSelector);
	const [actionRequired, setActionRequired] = useState<boolean>();
	const [abi, setABI] = useState();
	const [currPrice, setCurrPrice] = useState(collection.price);
	const [quantity, setQuantity] = useState<number>(0);
	const [status, setStatus] = useState('');
	const [prevPrice, setPrevPrice] = useState(collection.price);

	useEffect(() => {
		if (collection?.abi) {
			setABI(collection.abi);
		}
	}, [scheduler?.schedulerAddress, collection]);

	useEffect(() => {
		if (scheduler?.schedulerAddress && abi && collection) {
			const value = parseFloat(ethers.utils.formatUnits(schmint?.value, 'ether'));
			const data = schmint?.data;
			const decoder = new InputDataDecoder(abi);
			const res = decoder.decodeData(data);
			const quantity = parseInt(res.inputs[1]);
			setQuantity(quantity);
			setActionRequired(!(collection.price === value / quantity));
			setPrevPrice(value / quantity);
		}
	}, [abi, collection]);

	useEffect(() => {
		if (schmint.isCancelled) {
			setStatus('0');
		}
		if (schmint.isSchminted) {
			setStatus('1');
		}
		if (actionRequired) {
			setStatus('-1');
		}
	}, [schmint, actionRequired]);

	if (collection?.title) {
		return (
			<Box center column>
				<Banner collection={collection} />
				{status ? (
					<AlertBox status={status} schmint={schmint} currPrice={currPrice} prevPrice={prevPrice} />
				) : (
					''
				)}
				<ContractDetails collection={collection} />
				{!status || status === '-1' ? (
					<Box>
						<Box borderTop={`1px solid ${theme.colors['gray-20']}`} width="100%" my="wxs" />
						<If
							condition={quantity !== 0}
							then={
								<SchmintEditableForm
									collection={collection}
									actionRequired={actionRequired}
									quantity={quantity}
									schmint={schmint}
								/>
							}
						/>
					</Box>
				) : (
					''
				)}
			</Box>
		);
	}
	return null;
};

export default SchmintPage;
