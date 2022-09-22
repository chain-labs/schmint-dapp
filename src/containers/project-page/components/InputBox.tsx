import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';

interface props {
	placeholder?: string;
	value: any;
	setValue?: (any) => void;
	label?: string;
	required?: boolean;
	detailText?: string;
	unit?: string;
}

const InputBox = ({ label, placeholder, value, setValue, required, detailText, unit }: props) => {
	return (
		<Box mt="2rem">
			<Text as="b2">
				{label}
				<If
					condition={required === true}
					then={
						<Box as="span" color="red">
							*
						</Box>
					}
				/>
			</Text>
			<Box mt="mxs">
				<TextInput
					value={value}
					placeholder={placeholder}
					type="number"
					required={required}
					width="100%"
					unit={unit}
					setValue={setValue}
				/>
				<Text as="b3" mt="mxs">
					{detailText}
				</Text>
			</Box>
		</Box>
	);
};

export default InputBox;
