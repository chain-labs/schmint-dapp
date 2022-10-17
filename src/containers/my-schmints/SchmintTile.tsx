import { format } from 'date-fns';
import { ethers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import { CaretDown } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import { useProvider, useTransaction } from 'wagmi';
import { ICollection } from '../Explore/projectsStore';
import TileBadge from './TileBadge';

interface SchmintTileProps {
	collection: ICollection;
	quantity: number;
	value: string;
	createdTimestamp: number;
	schmintID: string;
	completed?: boolean;
	isSchminted?: boolean;
	executedTimestamp?: number;
	executionTrxHash?: `0x${string}`;
	gasPrice?: string;
}

const SAMPLE_GAS_COST = 0.001;

const SchmintTile = ({
	collection,
	quantity,
	value,
	createdTimestamp,
	schmintID,
	completed,
	isSchminted,
	executedTimestamp,
	executionTrxHash,
	gasPrice,
}: SchmintTileProps) => {
	const [actionRequired, setActionRequired] = useState(false);
	const [totalTransactionCost, setTotalTransactionCost] = useState('');
	const provider = useProvider();

	const getTotalGasCost = async (trxHash, gasPrice) => {
		const receipt = await provider.getTransactionReceipt(trxHash);
		const gasUsed = receipt.gasUsed;
		const totalGasCost = (parseFloat(ethers.utils.formatEther(gasUsed.mul(gasPrice))) + parseFloat(value)).toFixed(
			4
		);
		return totalGasCost;
	};

	useEffect(() => {
		if (isSchminted) {
			getTotalGasCost(executionTrxHash, gasPrice).then((totalGasCost) => {
				setTotalTransactionCost(totalGasCost);
			});
		}
	}, [executionTrxHash, gasPrice]);

	useEffect(() => {
		if (!completed) {
			const currentPrice = collection.price;
			const txPrice = parseFloat(value) / quantity;
			if (currentPrice !== txPrice) {
				setActionRequired(true);
			} else setActionRequired(false);
		}
	}, [collection, quantity, value, completed]);

	return (
		<Link href={`/schmints/${schmintID}`} passHref>
			<Box
				p="ms"
				borderRadius="8px"
				border={`1px solid ${theme.colors['blue-20']}`}
				bg="sky-blue-10"
				width="31.2rem"
				css={`
					transition: all 0.2s ease-in-out;
					&:hover {
						box-shadow: ${theme.shadows['shadow-400']};
					}
				`}
				cursor="pointer"
				position="relative"
			>
				<If
					condition={completed}
					then={<TileBadge type={isSchminted ? 'succesful' : 'failed'} />}
					else={<If condition={actionRequired} then={<TileBadge type="action_required" />} />}
				/>
				<Box width="100%" height="16.2rem" overflow="hidden" borderRadius="4px" mb="mm">
					<Box as="img" src={collection.banner} alt="banner-image" objectFit="cover" width="100%"></Box>
				</Box>
				<Box>
					<Text as="h6" mb="mxs">
						{collection.title}
					</Text>
					<Box row between>
						<Text as="b3">Number of NFTs</Text>
						<Text as="b3">{quantity}</Text>
					</Box>
					<PriceRows text="Price per NFT" value={collection.price} networkName={collection?.network.name} />
					<If
						condition={completed}
						then={
							<PriceRows
								text="Total Transaction Cost"
								value={isSchminted ? totalTransactionCost : 'N/A'}
								networkName={collection?.network.name}
							/>
						}
						else={
							<PriceRows
								text="Total Price of NFTs"
								value={value}
								networkName={collection?.network.name}
							/>
						}
					/>
					<Text as="b3" mt="ms" color="gray-40">
						<If
							condition={isSchminted && !!executedTimestamp}
							then={
								executedTimestamp &&
								`Completed on ${format((executedTimestamp ?? 0) * 1000, 'dd/MM/yyyy')}`
							}
							else={<If condition={completed} then={'Did not complete'} else={``} />}
						/>
					</Text>
				</Box>
			</Box>
		</Link>
	);
};

export default SchmintTile;

const PriceRows = ({ text, networkName, value }) => {
	return (
		<Box row between mt="mxxs">
			<Text as="b3">{text}</Text>
			<Box row alignItems="center">
				<If
					condition={!!networkName}
					then={
						<Box position="relative" height="1.6rem" width="1.6rem" ml="mxxs">
							<Image
								src={`/static/images/svgs/${
									networkName === 'Ethereum' || networkName === 'Goerli' ? 'eth' : 'polygon-color'
								}.svg`}
								layout="fill"
							/>
						</Box>
					}
				/>
				<Text as="b3" ml="mxxs">
					{value}
				</Text>
			</Box>
		</Box>
	);
};
