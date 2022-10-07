import { Minus, Plus } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { InputElement } from 'src/components/TextInput';
import theme from 'src/styleguide/theme';

interface props {
	placeholder?: string;
	value: any;
	setValue?: (any) => void;
	label?: string;
	required?: boolean;
	detailText?: string;
	max?: number;
	min?: number;
	errorText?: string;
	disabled?: boolean;
}

const InputNumber = ({ value, setValue, detailText, errorText, max, min, label, placeholder, required }: props) => {
	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.value === '') {
			setValue('');
			return;
		}

		const n = parseInt(e.target.value);

		if (n <= min) {
			setValue(`${min}`);
			return;
		}
		if (n >= max) {
			setValue(`${max}`);
			return;
		}

		setValue(n);
	};

	const handleBlur = (e) => {
		if (value === '') {
			setValue(min);
		}
	};

	return (
		<Box>
			<Text as="b2" fontFamily="OpenSauceOneMedium">
				{label}
				<sup style={{ color: theme.colors['red-40'] }}>*</sup>
			</Text>
			<Box display="flex" alignItems="center" mt="mxs">
				<Box
					ml="mxl"
					mt="0.2rem"
					position="absolute"
					color={parseInt(value) <= min ? 'disable-black' : 'blue-40'}
					onClick={parseInt(value) <= min ? () => setValue(min) : () => setValue(value - 1)}
					cursor={parseInt(value) <= min ? 'not-allowed' : 'pointer'}
				>
					<Minus size={24} onClick={() => setValue(value - 1)} />
				</Box>
				<InputElement
					as="input"
					readOnly={!setValue}
					placeholder="20"
					value={value}
					onChange={handleChange}
					onWheel={(e) => {
						// @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'WheelEvent'.  TS2339
						e.target.blur();
					}}
					// color="blue-40"
					onBlur={handleBlur}
					width="40%"
					min={min}
					required
					max={max}
					padding="12px"
					inputType="number"
					cursor={parseInt(value) > max || parseInt(value) < min ? 'not-allowed' : 'pointer'}
					color={parseInt(value) > max || parseInt(value) < min ? 'disable-black' : 'blue-40'}
				></InputElement>
				<Box
					ml="-4.8rem"
					mt="0.2rem"
					onClick={parseInt(value) >= max ? () => setValue(max) : () => setValue(value + 1)}
					cursor={parseInt(value) >= max ? 'not-allowed' : 'pointer'}
					color={parseInt(value) >= max ? 'disable-black' : 'blue-40'}
				>
					<Plus size={24} />
				</Box>
			</Box>
			<Text as="btn2" mt="mxs" color="gray-50">
				{detailText}
			</Text>
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

export default InputNumber;
