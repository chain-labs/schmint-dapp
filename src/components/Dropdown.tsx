import React, { useState } from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';
import If from './If';
import LabelledSelectInput from './LabelledSelectInput';
import Text from './Text';
import useOuterClick from './useOuterclicks';

interface Props {
	setValue: (any) => void;
	value: any;
	label?: string;
	placeholder?: string;
	width?: any;
	disabled?: boolean;
}

const data = [
	'Smart Contract Development',
	'Web 3.0 Integration',
	'Smart Contract Audit',
	'Technical Advisory',
	'Other',
];

const Dropdown = ({ value, setValue, label, placeholder, width, disabled, ...restProps }: Props) => {
	const [visible, setVisible] = useState(false);
	const ref = useOuterClick(() => {
		setVisible(false);
	});
	return (
		<Box className="dropdown" overflow="visible" ref={ref} mt="mxxl">
			<LabelledSelectInput
				label={label}
				set={setVisible}
				placeholder={placeholder}
				visible={visible}
				value={value}
				width={width}
				{...{ disabled }}
			/>
			<Box
				maxHeight="40rem"
				position="absolute"
				onClick={() => setVisible(!visible)}
				onBlur={() => setVisible(false)}
				bg="#221042"
				px="mxs"
				border={visible ? '1px solid white' : 'none'}
				width={{ mobS: '38.2rem', tabL: '37.7rem', deskM: '48rem' }}
				cursor="pointer"
			>
				<If
					condition={visible}
					then={data.map((item, index) => (
						<Box
							key={item}
							backgroundColor="white-00"
							width={{ mobS: '34.2rem', tabL: '37.7rem', deskM: '48rem' }}
							css={`
								&:hover {
									background-color: ${theme.colors['blue-00']};
								}
							`}
							pt={index === 0 ? 'mxs' : 'ms'}
							pb="mxxs"
							onClick={() => setValue(item)}
						>
							<Text as="c1" fontFamily="Inter">
								{item}
							</Text>
							<Box
								width={{ mobS: '32.4rem', tabL: '36.1rem', deskM: '46.4rem' }}
								display={index! === data.length - 1 ? 'none' : 'block'}
								border="none"
								borderBottom="1px solid white"
								outline="none"
							></Box>
						</Box>
					))}
				/>
			</Box>
		</Box>
	);
};

export default Dropdown;
