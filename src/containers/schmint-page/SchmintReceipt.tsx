import { format } from 'date-fns';
import { ethers } from 'ethers';
import Image from 'next/image';
import { ArrowUpRight } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { useProvider } from 'wagmi';
import { blockExplorer, explorer } from 'src/utils/links';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector } from 'src/redux/network';
import { userSelector } from 'src/redux/user';
import { condenseAddress } from 'src/components/DappNavbar/ConnectWallet';
import toast from 'react-hot-toast';

const SchmintReceipt = ({ quantity, schmint, status, network }) => {
	const [gasCost, setGasCost] = useState<string>();
	const provider = useProvider();
	const user = useAppSelector(userSelector);
	const [transferToAccount, setTransferToAccount] = useState(condenseAddress(schmint.target));

	useEffect(() => {
		console.log(network);
		console.log(explorer(network?.chainId));
		if (status === '1') {
			provider.getTransactionReceipt(schmint.executionTrxHash).then((receipt) => {
				const gasUsed = receipt?.gasUsed;
				const gasPrice = schmint?.executionGasPrice;
				if (gasUsed && gasPrice) {
					const totalGasCost = parseFloat(ethers.utils.formatEther(gasUsed?.mul(gasPrice))).toFixed(4);
					setGasCost(totalGasCost);
				}
			});
		}
	}, [status, schmint, network]);

	return (
		<Box bg="gray-10" color="simply-black" borderRadius="8px" p="mm" width="49rem" mt="mm">
			<Text as="h6">Schmint Details</Text>
			<Box my="mm">
				<DataRow label="Number of NFTs" value={quantity} mb="mxxs" />
				<DataRow
					label="Total Price of NFTs"
					value={ethers.utils.formatEther(schmint.value)}
					price={network.name}
					mb="mxxs"
				/>
				<DataRow label="Gas Cost" value={parseInt(status) ? gasCost : 'N/A'} price={network.name} mb="mxxs" />
				<DataRow
					label="Total Transaction Cost"
					value={
						parseInt(status)
							? `${(parseFloat(gasCost) + parseFloat(ethers.utils.formatEther(schmint.value))).toFixed(
									4
							  )}`
							: 'N/A'
					}
					price={network.name}
				/>
			</Box>
			<Box>
				<DataRow
					label="Created on"
					value={status === '1' ? format(schmint.creationTimestamp * 1000, 'dd-MM-yyyy, p') : 'N/A'}
					mb="mxxs"
				/>
				<DataRow
					label="Executed on"
					value={status === '1' ? format(schmint.executionTimestamp * 1000, 'dd-MM-yyyy, p') : 'N/A'}
					mb="mxxs"
				/>
				<Box row between mb="mm">
					<Text as="b2">Transferred to</Text>
					<Text
						as="b2"
						px="16px"
						py="4px"
						backgroundColor="blue-20"
						borderRadius="33px"
						color="blue-40"
						cursor="pointer"
						onClick={() => {
							navigator.clipboard?.writeText(schmint.target);
							setTransferToAccount('Copied!');
							setTimeout(() => {
								setTransferToAccount(condenseAddress(schmint.target));
							}, 1000);
						}}
					>
						{transferToAccount}
					</Text>
				</Box>
			</Box>
			<Box
				as="a"
				target="_blank"
				row
				alignItems="center"
				color="blue-40"
				cursor="pointer"
				href={`${blockExplorer(network?.chainId)}/tx/${schmint?.executionTrxHash}`}
			>
				{network ? (
					<Text as="b3" color="blue-40">
						View on {explorer(network?.chainId)}
					</Text>
				) : (
					''
				)}
				<ArrowUpRight size={16} color="#4743C5" />{' '}
			</Box>
		</Box>
	);
};

export default SchmintReceipt;

interface DataRowProps {
	label: string;
	value: string;
	price?: string;
	mb?: string;
}

const DataRow = ({ label, value, price, mb }: DataRowProps) => {
	return (
		<Box row between mb={mb}>
			<Text as="b2">{label}</Text>
			<Box row alignItems="center">
				<If
					condition={!!price}
					then={
						<Box position="relative" height="1.6rem" width="1.6rem" mr="mxxs">
							<Image
								src={`/static/images/svgs/${
									price === 'Ethereum' || price === 'Goerli' ? 'eth' : 'polygon-color'
								}.svg`}
								layout="fill"
							/>
						</Box>
					}
				/>
				<Text as="b2">{value}</Text>
			</Box>
		</Box>
	);
};
