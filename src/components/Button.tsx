import Box, { BoxProps } from 'components/Box';
import React from 'react';
import theme from 'src/styleguide/theme';

export const color = {
	primary: 'simply-blue',
	secondary: 'blue-00',
	tertiary: 'simply-white',
};

export const hoverColor = {
	primary: 'blue-60',
	secondary: 'blue-10',
	tertiary: 'simply-black',
};

export const hoverTextColor = {
	primary: 'gray-10',
	secondary: 'gray-10',
	tertiary: 'gray-10',
};

const fontColor = (bg) => {
	return bg === 'primary' ? 'simply-white' : 'blue-50';
};

const borderColor = (bg) => {
	return bg === 'tertiary' ? `1px solid ${theme.colors['gray-40']}` : 'none';
};

export interface ButtonProps extends BoxProps {
	bg?: 'primary' | 'secondary' | 'tertiary';
	disable?: boolean;
	children?: string | React.ReactNode;
	dangerouslySetInnerHTML?: { __html: string };
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	className?: string;
	type?: string;
	innerRef?: any;
}

const ButtonComp = ({ bg, disable, height, children, innerRef, ...restProps }: ButtonProps): JSX.Element => {
	const buttonColour = color[bg];
	const hColor = !disable ? hoverColor[bg] : 'simply-white';
	const bColor = borderColor(bg);
	return (
		<Box
			as="button"
			backgroundColor={!disable ? buttonColour : 'gray-30'}
			//@ts-expect-error-button
			color={fontColor(bg)}
			border={!disable ? bColor : '1px solid rgba(140, 140, 161, 0.2)'}
			borderRadius="64px"
			height={height}
			cursor={!disable ? 'pointer' : 'not-allowed'}
			disabled={!disable ? false : true}
			css={
				!disable &&
				`
				&:hover {
					background-color: ${theme.colors[`${hColor}`]};
					color: ${theme.colors[`${hoverTextColor[bg]}`]};
				}
			`
			}
			{...restProps}
			ref={innerRef}
		>
			{children}
		</Box>
	);
};

export default ButtonComp;
