import Image from 'next/image';
import Link from 'next/link';
import { ArrowSquareOut } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import { ICollection } from '../Explore/projectsStore';

const Banner = ({ collection, schmint }: { collection: ICollection; schmint?: boolean }) => {
	return (
		<Box width="100%">
			<Box>
				<Box width="100%" height="26.4rem" as="img" src={collection?.banner} objectFit="cover" bg="red" />
			</Box>
			<Box center>
				<Box
					position="relative"
					width="11rem"
					height="11rem"
					mt="-5.5rem"
					border="2px solid white"
					borderRadius="999px"
					as="img"
					src={collection?.logo}
					objectFit="cover"
					bg="simply-white"
				/>
			</Box>
			<Box center column>
				<Box row alignItems="center">
					<Text as="h4" mr={schmint ? 'mxs' : '0'}>
						{collection?.title}
					</Text>
					<If
						condition={schmint}
						then={
							<Link href={`/projects/${collection?.id}`} passHref>
								<Box cursor="pointer">
									<ArrowSquareOut size={32} color={theme.colors['blue-40']} />
								</Box>
							</Link>
						}
					/>
				</Box>
				<Text as="h5" textAlign="center" color="gray-50">
					({collection?.symbol})
				</Text>
			</Box>
		</Box>
	);
};

export default Banner;
