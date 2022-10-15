import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Confetti, SmileySad, WarningCircle } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';
import { useAppSelector } from 'src/redux/hooks';
import { schedulerReducer, schedulerSelector } from 'src/redux/scheduler';
import { getAbi } from 'src/utils/contracts';
import { useContractRead, useNetwork } from 'wagmi';
import { getGnosisSafeUrl } from '../MyAssets/utils';

const AlertBox = ({ status, schmint, currPrice, prevPrice }) => {
	const { chain } = useNetwork();
	const scheduler = useAppSelector(schedulerSelector);
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');

	const { data, isLoading } = useContractRead({
		addressOrName: scheduler.schedulerAddress,
		contractInterface: getAbi(chain?.id, 'SCHEDULER'),
		functionName: 'avatar',
	});
	useEffect(() => {
		if (schmint.isSchminted) {
			const date = new Date(schmint.executionTimestamp * 1000);
			setDate(date.toDateString());
			setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
		}
	}, [schmint]);

	return (
		<Box
			width="79.6rem"
			px="ms"
			backgroundColor={status === '0' ? 'red-20' : status === '1' ? 'green-20' : 'yellow-20'}
			py="ms"
			mt="mm"
			borderRadius="8px"
		>
			{status === '-1' ? (
				<Box row>
					<Box mr="ml">
						<WarningCircle size={32} />
					</Box>
					<Box>
						<Text as="b2">Collection Price Changed</Text>
						<Text as="b3" mt="mxxs">
							The price of this NFT collection was changed from {prevPrice} {chain?.nativeCurrency.symbol}{' '}
							to {currPrice} {chain?.nativeCurrency.symbol} per NFT. We have updated the schmint details
							accordingly but require your consent before applying them.{' '}
						</Text>
						<Text as="b3" mt="mxxs">
							Not applying the changes might cause the schmint to fail.{' '}
						</Text>
						<Text as="b3" mt="mxxs">
							Note: You can also edit the Schmint details{' '}
						</Text>
						<ButtonComp
							backgroundColor="white"
							color="black"
							width="19.3rem"
							height="4rem"
							borderRadius="27px"
							mt="ml"
							row
							center
							onClick={() => {
								if (typeof window !== 'undefined') {
									window.scrollBy(0, 1000);
								}
							}}
						>
							<Text as="btn2" mr="mxs">
								Confirm Changes
							</Text>
							<ArrowDown size={16} weight="bold" />
						</ButtonComp>
					</Box>
				</Box>
			) : (
				''
			)}
			{status === '1' ? (
				<Box row>
					<Box mr="ml">
						<Confetti size={32} />
					</Box>
					<Box>
						<Text as="b2">Schmint Successful!</Text>
						<Text as="b3" mt="mxxs">
							Congratulations! This schmint was successfuly executed on {date}, {time}. Click the button
							to view your NFTs.
						</Text>
						<Box as="a" target="_blank" href={getGnosisSafeUrl(chain?.id, `${data}`)}>
							<ButtonComp
								backgroundColor="white"
								color="black"
								width="19.3rem"
								height="4rem"
								borderRadius="27px"
								mt="ml"
								row
								center
							>
								<Text as="btn2" fontWeight="bold">
									View my NFTs
								</Text>
								<ArrowUpRight size={24} />{' '}
							</ButtonComp>
						</Box>
					</Box>
				</Box>
			) : (
				''
			)}
			{status === '0' ? (
				<Box row>
					<Box mr="ml">
						<SmileySad size={32} color="red" />{' '}
					</Box>
					<Box>
						<Text as="b2" color="red-40">
							Schmint Unsuccessful :(
						</Text>
						<Text as="b3" mt="mxxs">
							This Schmint was not executed because of insufficient funds in the Gnosis Safe.
						</Text>
					</Box>
				</Box>
			) : (
				''
			)}
		</Box>
	);
};

export default AlertBox;
