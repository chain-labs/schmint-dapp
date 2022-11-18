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
			target="_blank"
			href={url}
			mt={{ mobS: 'wxs', tabL: '0' }}
			width={{ mobS: '35rem', deskM: '40.4rem' }}
			px="mxs"
			cursor="pointer"
			css={`
				&:hover {
					text-decoration: underline;
				}
			`}
		>
			{/* <Image src={`${image}`} layout="fill" objectFit="cover" onError={(e) => console.log({ e })} /> */}
			<Box width={{ mobS: '35rem', tabS: '30rem', deskM: '40.4rem' }}>
				<Box as="img" height="25rem" width="100%" objectFit="fill" borderRadius="24px" src={image}></Box>
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
