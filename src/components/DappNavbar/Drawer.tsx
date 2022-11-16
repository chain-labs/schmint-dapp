import { motion, useAnimationControls } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'phosphor-react';
import { useEffect, useState } from 'react';
import theme from 'src/styleguide/theme';
import { FAQ_URL, DOCS_URL } from 'src/utils/constants';
import Box from 'components/Box';
import Text from 'components/Text';
import { sendLog } from 'src/utils/logging';

const Drawer = ({ drawerOpen, setDrawerOpen }) => {
	const [expandable] = useState(false);

	const controls = useAnimationControls();
	const drawerControls = useAnimationControls();

	useEffect(() => {
		try {
			if (drawerOpen) {
				drawerControls.start('open');
			} else {
				drawerControls.start('closed');
			}

			return () => {
				drawerControls.stop();
			};
		} catch (err) {
			console.log('Error in drawer animation', err); // eslint-disable-line no-console

			// CODE: 137
			sendLog(137, err);
		}
	}, [drawerOpen]);

	useEffect(() => {
		try {
			if (expandable) {
				controls.start('open');
			} else {
				controls.start('closed');
			}
			return () => {
				controls.stop();
			};
		} catch (err) {
			console.log('Error in Expandable animation', err); // eslint-disable-line no-console

			// CODE: 136
			sendLog(136, err);
		}
	}, [expandable]);

	return (
		<Box
			bg="transparent"
			height="100vh"
			width="100vw"
			position="absolute"
			top="0"
			left="0"
			zIndex={4}
			display={drawerOpen ? 'block' : 'none'}
			onClick={() => {
				setDrawerOpen(false);
			}}
		>
			<motion.div
				initial="closed"
				variants={{
					closed: { x: '-100%', transition: { duration: 0.5, ease: 'easeInOut' } },
					open: { x: '0', transition: { duration: 0.5, ease: 'easeInOut' } },
				}}
				animate={drawerControls}
				style={{ height: '100%' }}
			>
				<Box
					bg="simply-blue"
					color="simply-white"
					pl="mxxxl"
					pt="mxxl"
					height="100%"
					width="75%"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<Box row mb="wl" onClick={() => setDrawerOpen(false)} alignItems="center">
						<ArrowLeft color={theme.colors['gray-80']} size={16} />
						<Text as="b1" color="gray-80" ml="0.2rem">
							Back
						</Text>
					</Box>
					<Box row mb="wxs" as="a" href={FAQ_URL} target="_blank">
						<Text as="nav" color="gray-80" mr="0.2rem">
							FAQs
						</Text>
						<ArrowUpRight color={theme.colors['gray-80']} size={24} />
					</Box>
					<Box row mb="wxs" as="a" href={DOCS_URL} target="_blank">
						<Text as="nav" color="gray-80" mr="0.2rem">
							Docs
						</Text>
						<ArrowUpRight color={theme.colors['gray-80']} size={24} />
					</Box>
				</Box>
			</motion.div>
		</Box>
	);
};

export default Drawer;
