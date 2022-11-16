import { ethers } from 'ethers';
import React from 'react';
import { useEffect } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector } from 'src/redux/network';
import { schedulerSelector } from 'src/redux/scheduler';
import { userSelector } from 'src/redux/user';
import { getAbi } from 'src/utils/contracts';
import { sendLog } from 'src/utils/logging';

const useScheduler = () => {
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);
	const network = useAppSelector(networkSelector);

	const [contract, setContract] = React.useState<ethers.Contract | null>(null);

	useEffect(() => {
		if (user.exists && scheduler.schedulerAddress) {
			try {
				const SchedulerInstance = new ethers.Contract(
					scheduler.schedulerAddress,
					getAbi(network.isValid ? network?.chainId : 4, 'SCHEDULER')
				);
				setContract(SchedulerInstance);
			} catch (err) {
				console.log('Error generating Scheduler Instance'); // eslint-disable-line no-console

				// CODE: 140
				sendLog(140, err, { network: network.chainId });
			}
		} else {
			setContract(null);
		}
	}, [user, scheduler]);

	return contract;
};

export default useScheduler;
