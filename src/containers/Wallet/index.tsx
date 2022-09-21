import { ethers } from 'ethers';
import { useEffect } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import { getAbi, getContractAddress } from 'src/utils/contracts';
import { createScheduler } from 'src/utils/schedulerFactory';
import { useContract, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';

const WalletCompenent = () => {
	const user = useAppSelector(userSelector);
	const { chain } = useNetwork();
	const { config } = usePrepareContractWrite({
		addressOrName: getContractAddress(chain?.id, 'SCHEDULER_FACTORY'),
		contractInterface: getAbi(chain?.id, 'SCHEDULER_FACTORY'),
		functionName: 'deployScheduler',
		args: [[user.address, ethers.constants.AddressZero]],
	});
	const { data, isLoading, isSuccess, write } = useContractWrite(config);

	const handleClick = async (e) => {
		e.preventDefault();
		console.log({ config });
		await write?.();
	};

	useEffect(() => {
		if (isSuccess) {
			console.log(data);
		}
		if (isLoading) {
			console.log('loading');
		}
	}, [data, isLoading, isSuccess, config]);

	return (
		<Box center>
			<If condition={user.exists} then={<ButtonComp onClick={handleClick}>Create Scheduler</ButtonComp>} />
		</Box>
	);
};

export default WalletCompenent;
