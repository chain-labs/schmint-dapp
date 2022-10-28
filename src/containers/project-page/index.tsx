import Box from 'src/components/Box';
import Banner from './Banner';
import ContractDetails from './ContractDetails';
import theme from 'src/styleguide/theme';
import SchmintForm from './SchmintForm';
import Text from 'src/components/Text';
import If from 'src/components/If';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/router';
import React from 'react';

const Projectpage = ({ collection }) => {
	const [schmintCreated, setSchmintCreated] = React.useState(false);
	const router = useRouter();

	if (collection.title) {
		return (
			<Box center column position="relative">
				<Box
					position="fixed"
					top="184px"
					left="308px"
					bg="gray-10"
					border={`1px solid ${theme.colors['gray-40']}`}
					boxShadow="shadow-200"
					borderRadius="64px"
					py="ms"
					px="mxxxl"
					row
					alignItems="center"
					zIndex={14}
					cursor="pointer"
					onClick={() => router.replace('/explore')}
				>
					<ArrowLeft size={16} />
					<Text as="btn2">Back to Explore</Text>
				</Box>
				<Banner collection={collection} />
				<If
					condition={!!collection?.info || collection?.comingSoon}
					then={
						<Info
							title={collection?.comingSoon ? 'Coming Soon!!!' : 'Before you proceed....'}
							body={collection?.info}
						/>
					}
				/>
				<ContractDetails collection={collection} showDetails schmintCreated={schmintCreated} />
				<Box borderTop={`1px solid ${theme.colors['gray-20']}`} width="100%" my="wxs" />
				<If
					condition={!collection?.comingSoon}
					then={<SchmintForm collection={collection} setSchmintCreated={setSchmintCreated} />}
				/>
			</Box>
		);
	}
	return null;
};

export default Projectpage;

const Info = ({ title, body }) => {
	return (
		<Box bg="yellow-20" py="ms" px="mxs" borderRadius="8px" maxWidth="50rem" mt="mm">
			<Text as="h6" textAlign="center">
				{title}
			</Text>
			<Text as="b3" mt="mxs" textAlign="center">
				{body}
			</Text>
		</Box>
	);
};
