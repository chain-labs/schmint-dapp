import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import theme from 'src/styleguide/theme';

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
	innerRef?: any;
	step?: string;
	width?: string;
	actionRequired?: boolean;
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
	innerRef,
	step,
	width,
	actionRequired,
}: props) => {
	return (
		<Box mt={label ? '2rem' : '0'}>
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
					innerRef={innerRef}
					value={value}
					placeholder={placeholder}
					type="number"
					required={required}
					width={width ?? '100%'}
					unit={unit}
					setValue={setValue}
					inputType={inputType}
					max={max}
					min={min}
					step={step}
					disabled={disabled}
					valueDisable={disabled}
					actionRequired={actionRequired}
				/>
				<Text as="btn2" mt="mxs" color={`${theme.colors['gray-30']}`}>
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
