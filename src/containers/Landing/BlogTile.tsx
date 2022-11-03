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
		<Box as="a" href={url} target="_blank">
			<Box
				height="25rem"
				width="40.4rem"
				borderRadius="24px"
				position="relative"
				backgroundImage="linear-gradient(135deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)"
			>
				{/* <Image src={`${image}`} layout="fill" objectFit="cover" onError={(e) => console.log({ e })} /> */}
				{/* <Box as="img" objectFit="contain" src={image}></Box> */}
			</Box>
			<Text as="b1" color="gray-50" mt="mm">
				{title}
			</Text>
		</Box>
	);
};

export default BlogTile;
