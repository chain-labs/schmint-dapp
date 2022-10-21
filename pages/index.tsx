import Link from 'next/link';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';

const Home = () => {
	return (
		<Box bg="sky-blue-10" height="100vh" width="100vw" color="simply-black" column justifyContent="center">
			<Box
				mx="auto"
				width={{ mobS: '30.72rem', tabS: '50rem', deskM: '58rem' }}
				alignSelf={{ mobS: 'flex-start', deskM: 'center' }}
				column
				center
			>
				<Text as="h1" mb={{ mobS: 'mm', deskM: 'mxl' }} textAlign="center">
					Schedule mints in advance and relax.
				</Text>
				<Text as="b1" textAlign="center" width={{ mobS: '30.72rem', tabS: '51rem', deskM: '51.67rem' }}>
					Schmint helps collectors get a good night’s sleep.
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
		</Box>
	);
};

export default Home;
