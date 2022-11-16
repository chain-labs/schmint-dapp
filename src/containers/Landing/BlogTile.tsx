import Image from 'next/image';
import Box from 'src/components/Box';
import Text from 'src/components/Text';
import { useEffect, useState } from 'react';

export interface IBlog {
	title: string;
	url: string;
	image: string;
}

const BlogTile = ({ title, url, image }: IBlog) => {
	return (
		<Box
			as="a"
			target="_blank"
			href={url}
			mt={{ mobS: 'wxs', tabL: '0' }}
			width={{ mobS: '30rem', deskM: '40.4rem' }}
			px="mxs"
			cursor="pointer"
			css={`
				&:hover {
					text-decoration: underline;
				}
			`}
		>
			{/* <Image src={`${image}`} layout="fill" objectFit="cover" onError={(e) => console.log({ e })} /> */}
			<Box width={{ mobS: '33rem', deskM: '40.4rem' }}>
				<Box
					as="img"
					height="25rem"
					width="95%"
					objectFit="fill"
					borderRadius="24px"
					border="0.5px solid blue"
					src={image}
				></Box>
			</Box>
			<Box mt="mm">
				<Text as="b1" color="gray-50">
					{title}
				</Text>
			</Box>
		</Box>
	);
};

export default BlogTile;
