import Image from 'next/image';
import { Router, useRouter } from 'next/router';
import { FOOTER_LINKS, SIMPLR_URL } from 'src/constants';
import theme from 'src/styleguide/theme';
import scrollIntoView from 'src/utils/scrollIntoView';
import Box from './Box';
import If from './If';
import Text from './Text';

const LOGO = 'https://ik.imagekit.io/chainlabs/Schmint/brand_ast6C-3H3.svg';
const TAG = 'https://ik.imagekit.io/chainlabs/Schmint/simplr-brand_AziSwlVYT.svg';

const Footer = () => {
	return (
		<Box bg="sky-blue-10" center py="6rem">
			<Box>
				<Box row flexDirection={{ mobS: 'column', tabS: 'row' }} center>
					{FOOTER_LINKS.map((link, idx) => (
						<Box row key={`${link}-${idx}`} mt={{ mobS: 'wxs', tabS: '0' }}>
							<If condition={idx > 0} then={<Box mr={{ tabS: 'wxs' }} />} />
							<FooterLink title={link.title} url={link.url ? link.url : null} />
						</Box>
					))}
				</Box>
				<Box mt="mxxxl" pt="ms" borderTop={`1px solid ${theme.colors['gray-20']}`} center column>
					<Box position="relative" height="3rem" width="12rem">
						<Image src={LOGO} layout="fill" quality={5} />
					</Box>
					<Box
						as="a"
						href={SIMPLR_URL}
						target="_blank"
						cursor="pointer"
						position="relative"
						height="1.2rem"
						width="4.4rem"
					>
						<Image src={TAG} layout="fill" quality={5} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Footer;

interface FooterLinkProps {
	title: string;
	url: string;
}
const FooterLink = ({ title, url }: FooterLinkProps) => {
	return (
		<Box as="a" href={title === 'FAQ' ? '/#faqs' : url} target={title !== 'FAQ' ? '_blank' : '_self'}>
			<Text
				as="nav"
				color="gray-50"
				css={`
					&:hover {
						color: ${theme.colors['simply-black']};
					}
				`}
			>
				{title}
			</Text>
		</Box>
	);
};
