import { TwitterFill } from 'akar-icons';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'phosphor-react';
import { DISCORD_INVITE, TWITTER_URL } from 'src/constants';
import theme from 'src/styleguide/theme';
import Box from './Box';
import Text from './Text';

const HomeNavbar = () => {
	return (
		<Box py="mxl" position="fixed" top="0" width="100vw" zIndex={16}>
			<Box width={{ mobS: '95vw', deskM: '128rem' }} mx="auto" between>
				<Link href="/" passHref>
					<Box
						position="relative"
						height={{ mobS: '2.43rem', tabS: '3rem' }}
						width={{ mobS: '9.7rem', tabS: '12rem' }}
					>
						<Image
							src="https://ik.imagekit.io/chainlabs/Schmint/brand_ast6C-3H3.svg"
							alt="schmint"
							style={{ cursor: 'pointer' }}
							layout="fill"
						/>
					</Box>
				</Link>
				<Box row alignItems="center">
					<Box
						as="a"
						href={TWITTER_URL}
						target="_blank"
						row
						alignItems="center"
						color="simply-black"
						cursor="pointer"
						css={`
							&:hover {
								color: ${theme.colors['blue-40']};
							}
						`}
					>
						<Box display={{ mobS: 'block', tabS: 'none' }} mr="mxs">
							<TwitterFill size={25} color={theme.colors['blue-40']} />
						</Box>
						<Text as="nav" mr="2px" display={{ mobS: 'none', tabS: 'block' }} row alignItems="center">
							Twitter
						</Text>
						<Box height="16px" display={{ mobS: 'none', tabS: 'block' }}>
							<ArrowUpRight size={16} weight="bold" />
						</Box>
					</Box>
					<Box
						as="a"
						href={DISCORD_INVITE}
						target="_blank"
						ml={{ mobS: '0', tabS: 'wxs' }}
						row
						alignItems="center"
						color="simply-black"
						cursor="pointer"
						bg="gray-10"
						border="1px solid"
						borderColor="gray-40"
						borderRadius="64px"
						height="4rem"
						px="mxl"
						css={`
							&:hover {
								background: ${theme.colors['simply-black']};
								color: ${theme.colors['gray-10']};
							}
							&:active {
								color: ${theme.colors['gray-40']};
							}
						`}
					>
						<Text as="btn2" mr="2px">
							Join Discord
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default HomeNavbar;
