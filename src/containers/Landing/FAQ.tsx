import React, { useState } from 'react';
import Box from 'components/Box';
import Text from 'components/Text';
import If from 'src/components/If';
import { CaretDown, CaretUp } from 'phosphor-react';
import theme from 'src/styleguide/theme';

const FAQ = ({ q, a, last }) => {
	const [expanded, setExpanded] = useState(false);
	const getFAQLink = (q) => {
		const leftPart = a.slice(0, a.indexOf('['));
		const link = a.slice(a.indexOf('[') + 1, a.indexOf(']'));
		const rightPart = a.slice(a.indexOf(']') + 1, a.length);

		return (
			<Box>
				<Text as="b1" width={{ mobS: '33rem', tabS: '50.6rem', deskM: '66.4rem' }} color="gray-40">
					{leftPart}
				</Text>
				<Box as="a" target="_blank" href={link} cursor="pointer">
					<Text as="b1" width={{ mobS: '33rem', tabS: '50.6rem', deskM: '66.4rem' }} color="blue-40">
						{link}
					</Text>
				</Box>
				<Text as="b1" width={{ mobS: '33rem', tabS: '50.6rem', deskM: '66.4rem' }} color="gray-40">
					{rightPart}
				</Text>
			</Box>
		);
	};
	return (
		<Box
			borderBottom={!last ? `1px solid ${theme.colors['gray-20']}` : 'none'}
			pb="mxl"
			mb={!last ? { mobS: 'mxxxl', deskM: 'wxs' } : '0'}
		>
			<Box
				row
				alignItems="center"
				justifyContent="space-between"
				mb="mxl"
				cursor="pointer"
				onClick={() => setExpanded(!expanded)}
			>
				<Text as="h5">{q}</Text>
				<Box cursor="pointer">
					<If
						condition={expanded}
						then={<CaretUp size={32} onClick={() => setExpanded(false)} />}
						else={<CaretDown size={32} onClick={() => setExpanded(true)} />}
					/>
				</Box>
			</Box>
			<If
				condition={expanded}
				then={
					<Box
						css={`
							animation: rotateMenu 400ms ease-in-out forwards;
							transform-origin: top center;
						`}
					>
						<Text as="b1" width={{ mobS: '33rem', tabS: '50.6rem', deskM: '66.4rem' }} color="gray-40">
							{a.includes('[') ? getFAQLink(a) : a}
						</Text>
					</Box>
				}
			/>
		</Box>
	);
};

export default FAQ;
