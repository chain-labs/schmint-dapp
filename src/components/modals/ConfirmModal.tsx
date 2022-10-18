import theme from 'src/styleguide/theme';
import Box from '../Box';
import If from '../If';
import Loader from '../Loader';
import Modal from '../Modal';
import Text from '../Text';

interface props {
	title: string;
	subtext: string;
	loader?: boolean;
	gasCost?: string;
}
const ConfirmModal = ({ title, subtext, loader, gasCost }: props) => {
	return (
		<Modal visible>
			<Box
				width="33.2rem"
				px="mm"
				py={loader ? 'mxxxl' : 'mxl'}
				position="absolute"
				backgroundColor="white"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				borderRadius="8px"
				column
				border={`1px solid ${theme.colors['blue-20']}`}
			>
				<If condition={loader} then={<Loader minHeight="100%" />} />
				<Text textAlign="center" as="h5" mt="mm">
					{title}
				</Text>
				<Text textAlign="center" as="b2" mt="mxs" color="gray-50">
					{subtext}
				</Text>
				<If
					condition={!!gasCost}
					then={
						<Box mt="mm" row alignItems="center" justifyContent="center">
							<Text as="c1" color="red-40" mr="mxxs">
								EST. GAS COST:
							</Text>
							<Text as="c1" color="gray-50">
								{gasCost}
							</Text>
						</Box>
					}
				/>
			</Box>
		</Modal>
	);
};

export default ConfirmModal;
