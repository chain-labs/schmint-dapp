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

const getBlogs = async () => {
	const res = await axios.get(BLOGS_API_URL);
	return res.data;
};

const LandingPage = () => {
	const blogs = useQuery('blogs', getBlogs, { cacheTime: 0 });

	useEffect(() => {
		console.log({ blogs: blogs.isLoading });
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
				<Box row justifyContent="space-between" alignItems="center">
					<Box width="58.5rem">
						<Text as="h2" mb={{ mobS: 'mm', deskM: 'mxl' }}>
							Schedule your mints in advance and relax.
						</Text>
						<Text as="b1" width={{ mobS: '30.72rem', tabS: '51rem', deskM: '51.67rem' }}>
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
									mr="mxl"
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
					<Box
						css={`
							display: grid;
							grid-gap: 20px 28px;
							grid-template-columns: repeat(2, 1fr);
							grid-template-rows: repeat(2, 1fr);
						`}
					>
						<Tile />
						<Tile />
						<Tile />
						<Tile />
					</Box>
				</Box>
			</Box>
			<Box py="wl" width={{ mobS: '90vw', tabS: '94.4rem', deskM: '128rem' }} mx="auto">
				<Box row justifyContent="space-between" alignItems="center" mb="ws">
					<Text as="h3">
						Learn more about <span style={{ color: theme.colors['blue-40'] }}>schmint</span>
					</Text>
					<Box row alignItems="center" as="a" href={BLOGS_URL}>
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
						grid-template-columns: repeat(3, 1fr);
					`}
				>
					{/* Could not use map here because of some weird error with the network call */}
					<If
						condition={blogs?.data?.items?.[0]}
						then={
							<BlogTile
								title={blogs?.data?.items?.[0]?.title}
								url={blogs?.data?.items?.[0]?.url}
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
								url={blogs?.data?.items?.[1]?.url}
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
								url={blogs?.data?.items?.[2]?.url}
								image={blogs?.data?.items?.[2]?.thumbnail}
								key={blogs?.data?.items?.[2]?.guid}
							/>
						}
					/>
				</Box>
			</Box>
			<Box bg="sky-blue-20" py="wxxs">
				<Box
					width={{ mobS: '90vw', tabS: '94.4rem', deskM: '128rem' }}
					mx="auto"
					row
					alignItems="center"
					justifyContent="space-between"
				>
					<Box>
						<Text as="h3" color="blue-40" mb="mxxxl" maxWidth="63rem">
							Join a community full of degens who are just as excited about NFTs as you are
						</Text>
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
					justifyContent="space-between"
					mx="auto"
				>
					<Box width="76rem">
						<Text as="h3" mb="wm" id="faqs">
							Frequently Asked Questions
						</Text>
						<Box>
							{FAQs.map(({ q, a }, idx) => {
								return <FAQ {...{ q, a, last: idx === FAQs.length - 1 }} key={idx} />;
							})}
						</Box>
					</Box>
					<Box height="34rem" width="32rem" position="relative" mt="12.8rem">
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

const Tile = () => {
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
			></Box>
		</Box>
	);
};
