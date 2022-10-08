import { ethers } from 'ethers';
import React, { useEffect } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { schedulerSelector } from 'src/redux/scheduler';
import { userSelector } from 'src/redux/user';
import { getAbi } from 'src/utils/contracts';
import { useNetwork } from 'wagmi';

const useScheduler = () => {
	const { chain } = useNetwork();
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);

	const [contract, setContract] = React.useState<ethers.Contract | null>(null);

	useEffect(() => {
		if (user.exists && scheduler.schedulerAddress) {
			const SchedulerInstance = new ethers.Contract(scheduler.schedulerAddress, getAbi(chain?.id, 'SCHEDULER'));
			setContract(SchedulerInstance);
		} else {
			setContract(null);
		}
	}, [user, scheduler]);

	return contract;
};

export default useScheduler;
