import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { BLOGS_API_URL } from 'src/constants';
import theme from 'src/styleguide/theme';
import { BLOGS_URL } from 'src/utils/constants';
import BlogTile, { IBlog } from './BlogTile';
import { FAQs } from './constants';
import FAQ from './FAQ';
import BottomToUp from './animations/BottomToUp';
import FadeInReveal from './animations/FadeInReveal';

const getBlogs = async () => {
	const res = await fetch(BLOGS_API_URL);
	return await res.json();
};

const LandingPage = () => {
	const blogs = useQuery('blogs', getBlogs, { cacheTime: 0 });

	useEffect(() => {
		console.log({ blogs: blogs.isLoading, blogs_data: blogs.data });
		console.log(blogs?.data?.items?.[0]?.thumbnail);
	}, [blogs]);

	return (
		<Box
			bg="gray-10"
			minHeight="100vh"
			width="100vw"
			color="simply-black"
			column
			pt={{ mobS: '21.6rem', tabS: '22.6rem', deskM: '14rem' }}
		>
			<Box width={{ mobS: '90vw', tabS: '94.4rem', deskM: '128rem' }} mx="auto" mb="6rem">
				<Box
					row
					justifyContent={{ mobS: 'center', deskM: 'space-between' }}
					alignItems="center"
					flexDirection={{ mobS: 'column', deskM: 'row' }}
				>
					<BottomToUp delay={0.4}>
						<Box
							width={{ mobS: '30rem', tabS: '58.5rem' }}
							column
							alignItems={{ mobS: 'center', deskM: 'start' }}
						>
							<Text
								as="h2"
								mb={{ mobS: 'mm', deskM: 'mxl' }}
								textAlign={{ mobS: 'center', deskM: 'start' }}
							>
								Schedule your mints in advance and relax.
							</Text>
							<Text
								as="b1"
								width={{ mobS: '30.72rem', tabS: '51rem', deskM: '51.67rem' }}
								textAlign={{ mobS: 'center', deskM: 'start' }}
							>
								{"Schmint helps collectors get a good night's sleep."}
							</Text>
							<Box mt="wxs" row alignItems="center">
								<Link href="/explore" passHref>
									<Box
										center
										bg="blue-40"
										height={{ mobS: '4.8rem', deskM: '5.6rem' }}
										px={{ mobS: 'mxxxl', deskM: 'wxs' }}
										border="none"
										outline="none"
										borderRadius="64px"
										mr={{ deskM: 'mxl' }}
										cursor="pointer"
										css={`
											&:hover {
												background: ${theme.colors['blue-50']};
											}
										`}
									>
										<Text as="b1" color="simply-white">
											Start Schminting
										</Text>
									</Box>
								</Link>
							</Box>
						</Box>
					</BottomToUp>
					<Box
						css={`
							display: grid;
							grid-gap: 20px 28px;
							grid-template-rows: repeat(2, 1fr);
						`}
						gridTemplateColumns={{
							mobS: 'repeat(1,1fr)',
							tabS: 'repeat(2, 1fr)',
							tabL: 'repeat(4,1fr)',
							deskM: 'repeat(2,1fr)',
						}}
						mt={{ mobS: 'wm', deskM: '0' }}
					>
						<FadeInReveal delay={0.1}>
							<Tile
								src="https://ik.imagekit.io/chainlabs/Schmint/Schmint_LP_Illustrations/Bolt_Desktop_wVGk9Z2bf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667553186205"
								text="Increase your chances of minting by 10 folds."
								showText="false"
							/>
						</FadeInReveal>
						<FadeInReveal delay={0.4}>
							<Tile
								src="https://ik.imagekit.io/chainlabs/Schmint/Schmint_LP_Illustrations/Gear_Desktop_eudSmAQ2D.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667553186220"
								text="More control over how much gas you spend."
								showText="false"
							/>
						</FadeInReveal>
						<FadeInReveal delay={0.8}>
							<Tile
								src="https://ik.imagekit.io/chainlabs/Schmint/Schmint_LP_Illustrations/Check_Desktop_uuG72q5Us9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667553186213"
								text="All projects are curated but still, DYOR"
								showText="false"
							/>
						</FadeInReveal>
						<FadeInReveal delay={1.2}>
							<Tile
								src="https://ik.imagekit.io/chainlabs/Schmint/Schmint_LP_Illustrations/Picture_Desktop_YrxcP2mqa3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667553186234"
								text="Schmint for seconadary marketplaces."
								showText="true"
							/>
						</FadeInReveal>
					</Box>
				</Box>
			</Box>
			<Box py="wl" width={{ mobS: '90vw', tabS: '94.4rem', deskM: '128rem' }} mx="auto">
				<Box row justifyContent="space-between" alignItems="center" mb="ws">
					<Text as="h3" textAlign={{ mobS: 'center', tabS: 'right' }}>
						Learn more about <span style={{ color: theme.colors['blue-40'] }}>schmint</span>
					</Text>
					<Box
						row
						alignItems="center"
						as="a"
						target="_blank"
						href={BLOGS_URL}
						display={{ mobS: 'none', tabL: 'flex' }}
					>
						<Text as="h5" color="blue-40" mr="mxs">
							Read all
						</Text>
						<ArrowUpRight size={32} color={theme.colors['blue-40']} />
					</Box>
				</Box>
				<Box
					css={`
						display: grid;
						grid-column-gap: 36px;
					`}
					gridTemplateColumns={{ mobS: 'repeat(1,1fr)', tabS: 'repeat(3, 1fr)' }}
				>
					{/* Could not use map here because of some weird error with the network call */}
					<If
						condition={blogs?.data?.items?.[0]}
						then={
							<BlogTile
								title={blogs?.data?.items?.[0]?.title}
								url={blogs?.data?.items?.[0]?.link}
								image={blogs?.data?.items?.[0]?.thumbnail}
								key={blogs?.data?.items?.[0]?.guid}
							/>
						}
					/>
					<If
						condition={blogs?.data?.items?.[1]}
						then={
							<BlogTile
								title={blogs?.data?.items?.[1]?.title}
								url={blogs?.data?.items?.[1]?.link}
								image={blogs?.data?.items?.[1]?.thumbnail}
								key={blogs?.data?.items?.[1]?.guid}
							/>
						}
					/>
					<If
						condition={blogs?.data?.items?.[2]}
						then={
							<BlogTile
								title={blogs?.data?.items?.[2]?.title}
								url={blogs?.data?.items?.[2]?.link}
								image={blogs?.data?.items?.[2]?.thumbnail}
								key={blogs?.data?.items?.[2]?.guid}
							/>
						}
					/>
				</Box>
				<Box
					row
					alignItems="center"
					as="a"
					target="_blank"
					href={BLOGS_URL}
					display={{ mobS: 'flex', tabL: 'none' }}
					mt="wxs"
					justifyContent="center"
				>
					<Text as="h5" color="blue-40" mr="mxs">
						Read all
					</Text>
					<ArrowUpRight size={32} color={theme.colors['blue-40']} />
				</Box>
			</Box>
			<Box bg="sky-blue-20" py="wxxs">
				<Box
					width={{ mobS: '90vw', tabL: '94.4rem', deskM: '128rem' }}
					mx="auto"
					row
					alignItems="center"
					justifyContent="space-between"
					flexDirection={{ mobS: 'column-reverse', tabS: 'row' }}
				>
					<Box column alignItems={{ mobS: 'center', tabS: 'start' }}>
						<Text
							as="h3"
							color="blue-40"
							mb="mxxxl"
							maxWidth="63rem"
							textAlign={{ mobS: 'center', tabS: 'start' }}
						>
							Join a community full of degens who are just as excited about NFTs as you are
						</Text>
						<Box as="a" target="_blank" href="https://discord.gg/tSj3QkRFuW">
							<ButtonComp
								bg="tertiary"
								px="wxxs"
								py="mm"
								border={`1px solid ${theme.colors['gray-40']}`}
								color="simply-black"
							>
								<Text as="btn1">Join Simplr Discord</Text>
							</ButtonComp>
						</Box>
					</Box>
					<Box position="relative" height="34rem" width="34rem">
						<Image
							src="https://ik.imagekit.io/chainlabs/Schmint/community_-m3hb8R1V.svg"
							layout="fill"
							objectFit="cover"
						/>
					</Box>
				</Box>
			</Box>
			<Box py="wl" borderBottom={`1px solid ${theme.colors['gray-30']}`}>
				<Box
					width={{ mobS: '90vw', tabS: '94.4rem', deskM: '128rem' }}
					mb="wxs"
					row
					justifyContent={{ mobS: 'center', tabS: 'space-between' }}
					mx="auto"
					flexDirection={{ mobS: 'column-reverse', tabL: 'row' }}
					alignItems={{ mobS: 'center', tabL: 'start' }}
				>
					<Box width={{ mobS: '32.4rem', tabS: '62rem', deskM: '76rem' }} column>
						<Text as="h3" mb="wm" id="faqs">
							Frequently Asked Questions
						</Text>
						<Box>
							{FAQs.map(({ q, a }, idx) => {
								return <FAQ {...{ q, a, last: idx === FAQs.length - 1 }} key={idx} />;
							})}
						</Box>
					</Box>
					<Box
						height={{ mobS: '30rem', deskM: '34rem' }}
						width={{ mobS: '30rem', deskM: '34rem' }}
						position="relative"
						mt="12.8rem"
						center
						ml="wxxxl"
					>
						<Image
							src="https://ik.imagekit.io/chainlabs/Schmint/bulb_fYloMgv8Z.svg"
							layout="fill"
							objectFit="cover"
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default LandingPage;

const Tile = ({ src, text, showText }) => {
	return (
		<Box
			borderRadius="24px"
			height="25rem"
			width="25rem"
			css={`
				background: radial-gradient(
					120.92% 254.54% at 8.06% 0%,
					${theme.colors['sky-blue-30']}ff 0%,
					${theme.colors['sky-blue-30']}00 100%
				);
				backdrop-filter: blur(21px);
			`}
			center
		>
			<Box
				borderRadius="24px"
				height="24.8rem"
				width="24.8rem"
				css={`
					background: radial-gradient(
						120.92% 254.54% at 8.06% 0%,
						${theme.colors['gray-10']}ff 0%,
						${theme.colors['gray-10']}ff 100%
					);
					backdrop-filter: blur(21px);
				`}
				column
			>
				<If
					condition={showText === 'true'}
					then={
						<Box
							display="flex"
							justifyContent="flex-end"
							borderRadius="0px 0px 0px 16px"
							position="absolute"
							width="100%"
						>
							<Box
								borderRadius="0px 16px 0px 16px"
								px="mm"
								py="mxs"
								width="13.6rem"
								backgroundColor="sky-blue-20"
								alignSelf="flex-end"
								justifySelf="flex-end"
							>
								<Text as="b2" color="blue-40" textAlign="center">
									Coming Soon
								</Text>
							</Box>
						</Box>
					}
				/>
				<Box center column pt="mxl">
					<Box position="relative" width="12.4rem" height="12.4rem" px="6.3rem">
						<Image src={src} layout="fill" objectFit="cover" />
					</Box>
					<Text pt="mxl" px="mxl" as="h6" color="blue-40">
						{text}
					</Text>
				</Box>
			</Box>
		</Box>
	);
};
