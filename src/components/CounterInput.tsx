import { parse } from 'path';
import { Minus, Plus } from 'phosphor-react';
import React, { useEffect } from 'react';
import theme from 'src/styleguide/theme';
import Box from './Box';
import If from './If';
import Text from './Text';

interface Props {
	label?: string;
	required?: boolean;
	bg?: string;
	helper?: string;
	max?: number;
	min?: number;
	errorText?: string;
	value: string;
	setValue: (string) => void;
	disabled?: boolean;
}

const CounterInput = ({ label, required, bg, helper, max, min, errorText, value, setValue, disabled }: Props) => {
	const [errorState, setErrorState] = React.useState(false);
	useEffect(() => {
		console.log({ disabled });
	}, [disabled]);

	useEffect(() => {
		if (parseInt(value) > max || parseInt(value) < min) {
			setErrorState(true);
		} else {
			setErrorState(false);
		}
	}, [value]);

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
		if (n > max) {
			setValue(n);
			setErrorState(true);
			return;
		}
		setErrorState(false);
		setValue(n);
	};

	const handleBlur = (e) => {
		if (value === '') {
			setValue(min);
		}
	};

	return (
		<Box>
			<Text as="h6">
				{label}
				<sup style={{ color: theme.colors['red-40'] }}>*</sup>
			</Text>
			<Box
				mt="mxs"
				bg={bg ?? 'gray-20'}
				border={`0.5px solid ${theme.colors['blue-20']}`}
				boxShadow="inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)"
				width="19.2rem"
				height="4.8rem"
				borderRadius="4px"
				row
			>
				<Box
					bg="gray-10"
					center
					px="2.6rem"
					cursor={parseInt(value) === min || disabled ? 'not-allowed' : 'pointer'}
					onClick={
						parseInt(value) <= min
							? () => setValue(min)
							: disabled
							? () => setValue(parseInt(value))
							: () => setValue(parseInt(value) - 1)
					}
				>
					<Minus
						color={theme.colors[parseInt(value) === min || disabled ? 'disabled-black' : 'blue-40']}
						size={20}
					/>
				</Box>
				<Box
					center
					as="input"
					type="number"
					max={max}
					min={min}
					value={value}
					bg="transparent"
					width="4.8rem"
					border="none"
					fontFamily="OpenSauceOneRegular"
					fontSize="16px"
					textAlign="center"
					outline="none"
					onChange={handleChange}
					onWheel={(e) => {
						// @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'WheelEvent'.  TS2339
						e.target.blur();
					}}
					onBlur={handleBlur}
					disabled={disabled}
				></Box>
				<Box
					bg="gray-10"
					center
					px="2.6rem"
					cursor={parseInt(value) === max || disabled ? 'not-allowed' : 'pointer'}
					onClick={
						parseInt(value) >= max
							? () => setValue(max)
							: disabled
							? () => setValue(parseInt(value))
							: () => setValue(parseInt(value) + 1)
					}
				>
					<Plus
						color={theme.colors[parseInt(value) === max || disabled ? 'disabled-black' : 'blue-40']}
						size={20}
					/>
				</Box>
			</Box>
			<Text as="b3" color="gray-50" mt="mxs">
				{helper}
			</Text>
			<If
				condition={errorState}
				then={
					<Text as="b3" color="red-40" mt="mxxs">
						{errorText}
					</Text>
				}
			/>
		</Box>
	);
};

export default CounterInput;
