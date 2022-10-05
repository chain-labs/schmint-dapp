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
	inputType?: string;
	max?: string;
	min?: string;
	errorText?: string;
	disabled?: boolean;
	ref?: any;
}

const InputBox = ({
	label,
	placeholder,
	value,
	setValue,
	required,
	detailText,
	unit,
	inputType,
	max,
	min,
	errorText,
	disabled,
	ref,
}: props) => {
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
					ref={ref}
					value={value}
					placeholder={placeholder}
					type="number"
					required={required}
					width="100%"
					unit={unit}
					setValue={setValue}
					inputType={inputType}
					max={max}
					min={min}
					disabled={disabled || value > max || value < min}
					valueDisable={disabled}
				/>
				<Text as="btn2" mt="mxs" color="gray-40">
					{detailText}
				</Text>
			</Box>
			<If
				condition={value > max || value < min}
				then={
					<Text as="b3" mt="mxs" color="red-40">
						{errorText}
					</Text>
				}
			/>
		</Box>
	);
};

export default InputBox;
