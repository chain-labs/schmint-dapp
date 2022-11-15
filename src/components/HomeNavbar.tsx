import { TwitterFill } from 'akar-icons';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { DISCORD_INVITE, TWITTER_URL } from 'src/constants';
import theme from 'src/styleguide/theme';
import { BLOGS_URL, DOCS_URL } from 'src/utils/constants';
import scrollIntoView from 'src/utils/scrollIntoView';
import Box from './Box';
import Text from './Text';

const NavLink = ({ href, text, closeDrawer }) => {
	return (
		<Box as="a" mt="wxs" pl="ml" target="_blank" href={href}>
			<Box display="flex">
				<Text as="h6" color="simply-white" mr="mxxs">
					{text}
				</Text>
				<ArrowUpRight size={18} color={theme.colors['simply-white']} />
			</Box>
		</Box>
	);
};

const HomeNavbar = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const closeDrawer = () => {
		setDrawerOpen(false);
	};

	useEffect(() => {
		if (drawerOpen) {
			gsap.fromTo(
				'#drawer',
				{ x: '+40%', y: 0, autoAlpha: 0 },
				{ autoAlpha: 1, x: '0%', y: 0, display: 'block', duration: 0.5 }
			);
			gsap.to('#drawer', { duration: 0.5, delay: 0.5, background: `${theme.colors['simply-black']}` });
		} else {
			gsap.to('#drawer', { background: 'transparent', duration: 0.1 });
			gsap.to('#drawer', { x: '+40%', display: 'none', duration: 0.5 });
		}
	}, [drawerOpen]);
	return (
		<Box py="mxl" position="fixed" top="0" maxWidth="100vw" minWidth="100vw" zIndex={16} bg="gray-10">
			<Box id="drawer" position="fixed" left="0" top="0" width="100vw" height="100vh" display="none">
				<Box
					position="fixed"
					left="0"
					top="0"
					bg="simply-black"
					height="100vh"
					width="90vw"
					zIndex={100}
					column
				>
					<Box>
						<Box width="100%" py="ml" px="mxl" row between>
							<Box onClick={() => closeDrawer()}>
								<X size="20" color={theme.colors['simply-white']} />
							</Box>
						</Box>
						<Box column>
							<Text
								as="h6"
								color="simply-white"
								mt="wxs"
								pl="ml"
								mr="mxxs"
								onClick={() => scrollIntoView('faqs')}
							>
								FAQs
							</Text>{' '}
							<NavLink href={DOCS_URL} text="Docs" closeDrawer={closeDrawer} />
							<NavLink href={BLOGS_URL} text="Blogs" closeDrawer={closeDrawer} />
							<NavLink href={TWITTER_URL} text="Twitter" closeDrawer={closeDrawer} />
						</Box>
					</Box>
					<Box
						as="a"
						href={DISCORD_INVITE}
						target="_blank"
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
						mx="4rem"
						mt="16rem"
						width="15.7rem"
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
						row
						alignItems="center"
						color="simply-black"
						cursor="pointer"
						mr={{ mobS: '0', tabS: 'wxs' }}
						onClick={() => scrollIntoView('faqs')}
						css={`
							&:hover {
								color: ${theme.colors['blue-40']};
							}
						`}
					>
						<Text as="nav" mr="2px" display={{ mobS: 'none', tabS: 'block' }} row alignItems="center">
							FAQs
						</Text>
					</Box>
					<Box
						as="a"
						href={DOCS_URL}
						target="_blank"
						row
						alignItems="center"
						color="simply-black"
						cursor="pointer"
						mr={{ mobS: '0', tabS: 'wxs' }}
						css={`
							&:hover {
								color: ${theme.colors['blue-40']};
							}
						`}
					>
						<Text as="nav" mr="2px" display={{ mobS: 'none', tabS: 'block' }} row alignItems="center">
							Docs
						</Text>
						<Box height="16px" display={{ mobS: 'none', tabS: 'block' }}>
							<ArrowUpRight size={16} weight="bold" />
						</Box>
					</Box>
					<Box
						as="a"
						href={BLOGS_URL}
						target="_blank"
						row
						alignItems="center"
						color="simply-black"
						cursor="pointer"
						mr={{ mobS: '0', tabS: 'wxs' }}
						css={`
							&:hover {
								color: ${theme.colors['blue-40']};
							}
						`}
					>
						<Text as="nav" mr="2px" display={{ mobS: 'none', tabS: 'block' }} row alignItems="center">
							Blogs
						</Text>
						<Box height="16px" display={{ mobS: 'none', tabS: 'block' }}>
							<ArrowUpRight size={16} weight="bold" />
						</Box>
					</Box>
					<Box
						as="a"
						href={TWITTER_URL}
						target="_blank"
						row
						alignItems="center"
						color="simply-black"
						cursor="pointer"
						mr={{ mobS: '0', tabS: 'wxs' }}
						css={`
							&:hover {
								color: ${theme.colors['blue-40']};
							}
						`}
					>
						<Text as="nav" mr="2px" display={{ mobS: 'none', tabS: 'block' }} row alignItems="center">
							Twitter
						</Text>
						<Box height="16px" display={{ mobS: 'none', tabS: 'block' }}>
							<ArrowUpRight size={16} weight="bold" />
						</Box>
					</Box>
					<Box
						as="a"
						display={{ mobS: 'none', tabS: 'flex' }}
						href={DISCORD_INVITE}
						target="_blank"
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
					<Box row justifyContent="flex-end" alignItems="center" display={{ mobS: 'flex', tabS: 'none' }}>
						<Box width="2.2rem" onClick={() => setDrawerOpen(true)} justifyContent="flex-end" column>
							<Box bg="simply-blue" width="100%" height="0.3rem" />
							<Box bg="simply-blue" width="100%" height="0.3rem" my="mxxs" />
							<Box bg="simply-blue" width="100%" height="0.3rem" />
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default HomeNavbar;
