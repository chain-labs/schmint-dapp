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
	actionRequired?: boolean;
}

const InputNumber = ({
	value,
	setValue,
	detailText,
	errorText,
	max,
	min,
	label,
	placeholder,
	required,
	disabled,
	actionRequired,
}: props) => {
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
			<Box
				display="flex"
				alignItems="center"
				mt="mxs"
				border={`1px solid ${theme.colors['blue-20']}`}
				borderRadius="8px"
				width="19.2rem"
			>
				<Box
					ml="ml"
					mt="0.2rem"
					color={parseInt(value) <= min || disabled ? 'disable-black' : 'blue-40'}
					onClick={
						parseInt(value) <= min
							? () => setValue(min)
							: disabled
							? () => setValue(parseInt(value))
							: () => setValue(parseInt(value) - 1)
					}
					cursor={parseInt(value) <= min || disabled ? 'not-allowed' : 'pointer'}
				>
					<Minus size={24} />
				</Box>
				<InputElement
					as="input"
					center
					{...{ disabled }}
					readOnly={!setValue}
					placeholder="20"
					value={value}
					onChange={handleChange}
					onWheel={(e) => {
						// @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'WheelEvent'.  TS2339
						e.target.blur();
					}}
					onBlur={handleBlur}
					width="48px"
					min={min}
					required
					max={max}
					ml="mxxl"
					padding="12px"
					inputType="number"
					cursor={parseInt(value) > max || parseInt(value) < min ? 'not-allowed' : 'pointer'}
					color={parseInt(value) > max || parseInt(value) < min ? 'disable-black' : 'gray-60'}
					actionRequired={actionRequired}
				></InputElement>
				<Box
					ml="mxxl"
					mt="0.2rem"
					onClick={
						parseInt(value) >= max
							? () => setValue(max)
							: disabled
							? () => setValue(parseInt(value))
							: () => setValue(parseInt(value) + 1)
					}
					cursor={parseInt(value) >= max || disabled ? 'not-allowed' : 'pointer'}
					color={parseInt(value) >= max || disabled ? 'disable-black' : 'blue-40'}
				>
					<Plus size={24} />
				</Box>
			</Box>
			<Text as="btn2" mt="mxs" color="gray-30">
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
