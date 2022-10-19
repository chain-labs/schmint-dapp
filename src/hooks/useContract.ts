import React from 'react';
import { useNetwork } from 'wagmi';

const useContract = () => {
	const [contract, setContract] = React.useState(null);
	const { chain } = useNetwork();
};

export default useContract;
