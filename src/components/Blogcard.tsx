import Image from 'next/image';
import Box from './Box';
import Text from './Text';

export interface BlogCardProps {
	imageUrl: string;
	url: string;
	title: string;
}

const Blogcard = ({ imageUrl, url, title }: BlogCardProps) => {
	return (
		<Box target="_blank" cursor="pointer" as="a" href={url}>
			<Box
				width={{ mobS: '34.3rem', tabS: '27.6rem', deskM: '38rem' }}
				height={{ mobS: '20rem', tabS: '16.2rem', deskM: '22rem' }}
				position="relative"
				mb="mm"
			>
				<Image src={imageUrl} layout="fill" objectFit="cover" />
			</Box>
			<Box>
				<Text as="h6" color="grey-100" width={{ mobS: '34.3rem', tabL: '27.6rem', deskM: '35.4rem' }}>
					{title}
				</Text>
			</Box>
		</Box>
	);
};

export default Blogcard;
