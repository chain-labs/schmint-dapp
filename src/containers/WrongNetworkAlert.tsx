import { X } from 'phosphor-react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const WrongNetworkAlert = ({ chainTo, setWrongNetwork }) => {
	const { switchNetwork } = useSwitchNetwork();
	const { chains } = useNetwork();

	return (
		<Box
			borderRadius="4px"
			position="fixed"
			bottom="10vh"
			left="50%"
			transform="translateX(-30%)"
			bg="yellow-40"
			px="mm"
			py="mxs"
			row
			alignItems="center"
			zIndex={100}
		>
			<Text as="c1">{`Switch your network to ${
				chains.find((c) => c.id === chainTo).name
			} to create a Schmint for this project.`}</Text>
			<ButtonComp
				bg="tertiary"
				mx="ms"
				px="mm"
				py="mxs"
				onClick={() => switchNetwork?.(chainTo)}
				borderRadius="4px"
				color="simply-black"
				css={`
					&:hover {
						color: ${theme.colors['simply-white']};
					}
				`}
				border="1px solid"
				borderColor="gray-40"
			>
				<Text as="btn2">Switch Network</Text>
			</ButtonComp>
			<X size={20} onClick={() => setWrongNetwork(false)} style={{ cursor: 'pointer' }} />
		</Box>
	);
};

export default WrongNetworkAlert;
