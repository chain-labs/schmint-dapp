import Image from 'next/image';
import Box from 'src/components/Box';
import Text from 'src/components/Text';

export interface IBlog {
	title: string;
	url: string;
	image: string;
}

const BlogTile = ({ title, url, image }: IBlog) => {
	return (
		<Box
			as="a"
			href={url}
			target="_blank"
			mt={{ mobS: 'wxs', tabL: '0' }}
			width={{ mobS: '30rem', deskM: '40.4rem' }}
			px="mxs"
		>
			{/* <Image src={`${image}`} layout="fill" objectFit="cover" onError={(e) => console.log({ e })} /> */}
			<Box width={{ mobS: '33rem', deskM: '40.4rem' }}>
				<Box as="img" height="25rem" width="95%" objectFit="fill" borderRadius="24px" src={image}></Box>
			</Box>
			<Text as="b1" color="gray-50" mt="mm">
				{title}
			</Text>
		</Box>
	);
};

export default BlogTile;
