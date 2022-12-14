import Box from 'components/Box';
import theme from 'src/styleguide/theme';
import styled from 'styled-components';
import { Check, WarningCircle, MagnifyingGlass, Plus, Minus } from 'phosphor-react';
import If from './If';
import { useEffect, useState } from 'react';
import Text from './Text';

interface Props {
	disabled?: boolean;
	placeholder?: string;
	type?: string;
	required?: boolean;
	regexp?: string;
	errorText?: string;
	value: any;
	step?: string;
	setValue?: (any) => void;
	dropdown?: boolean;
	unit?: string;
	width?: string;
	min?: string;
	max?: string;
	disableValidation?: boolean;
	fontSize?: string;
	inputType?: string;
	valueDisable?: boolean;
	innerRef?: any;
	actionRequired?: boolean;
}

const TextInput = ({
	disabled,
	placeholder,
	type,
	required,
	step,
	regexp,
	value,
	setValue,
	unit,
	width,
	min,
	max,
	disableValidation,
	fontSize,
	inputType,
	innerRef,
	actionRequired,
}: Props) => {
	const [validity, setValidity] = useState<'clear' | 'valid' | 'invalid'>('clear');
	const [searchIcon, setSearchIcon] = useState<boolean>(true);

	const handleChange = (e) => {
		e.preventDefault();
		if (type === 'number' || inputType === 'number') {
			if (e.target.value > max || e.target.value < min) {
				setValidity('invalid');
			} else {
				setValue(parseFloat(e.target.value));
			}
		} else {
			setValue(e.target.value);
		}
		if (e.target.value === '') setSearchIcon(true);
		else setSearchIcon(false);
	};

	const handleValidity = (e) => {
		if (disableValidation) return;
		if (!value) {
			setValidity('clear');
		} else {
			const valid = e.target.validity.valid;
			if (valid) {
				setValidity('valid');
			} else {
				setValidity('invalid');
			}
		}
	};

	useEffect(() => {
		if (!value) setValidity('clear');
	}, [value]);

	return (
		<Box
			display="flex"
			alignItems="center"
			overflow="visible"
			color="disable-black"
			cursor={disabled ? 'not-allowed' : 'auto'}
			width={inputType ? '40%' : '100%'}
			position="relative"
		>
			<If
				condition={inputType === 'number'}
				then={
					<Box
						ml="2rem"
						mt="0.2rem"
						position="absolute"
						color={value < min ? 'disable-black' : 'blue-40'}
						onClick={value < min ? () => setValue(value) : () => setValue(value - 1)}
						cursor={value < min ? 'not-allowed' : 'pointer'}
					>
						<Minus size={24} onClick={() => setValue(value - 1)} />
					</Box>
				}
			/>
			<InputElement
				as="input"
				{...{ disabled, required, type, step, disableValidation, fontSize, actionRequired }}
				readOnly={!setValue}
				placeholder={placeholder}
				pattern={regexp}
				value={value}
				onChange={handleChange}
				onWheel={(e) => {
					// @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'WheelEvent'.  TS2339
					if (type === 'number') e.target.blur();
				}}
				validation={validity}
				onBlur={handleValidity}
				color="gray-50"
				width={width ?? '32rem'}
				min={min}
				max={max}
				step={step}
				inputType={inputType}
				ref={innerRef}
				// backgroundColor={valueDisable ? 'disable-gray' : 'white'}
			></InputElement>

			<If
				condition={inputType === 'number'}
				then={
					<Box
						ml="-3.8rem"
						mt="0.2rem"
						// color="blue-40"
						onClick={value > max ? () => setValue(value) : () => setValue(value + 1)}
						cursor={value > max ? 'not-allowed' : 'pointer'}
						color={value > max ? 'disable-black' : 'blue-40'}
					>
						<Plus size={24} />
					</Box>
				}
			/>
			{/* <If
				condition={disabled && !disableValidation && inputType !== 'number'}
				then={
					<Box ml="-3.2rem" mt="0.2rem">
						<Prohibit size={24} color="#8c8ca1" />
					</Box>
				}
			/> */}
			{type === 'text' ||
			type === 'email' ||
			type === 'url' ||
			(type === 'number' && !unit && inputType !== 'number') ? (
				<Box overflow="visible">
					<If
						condition={validity === 'valid'}
						then={
							<Box ml="-3.2rem" mt="0.2rem">
								<Check size={24} color={theme.colors['green-40']} />
							</Box>
						}
					/>
					<If
						condition={validity === 'invalid'}
						then={
							<Box ml="-3.2rem" mt="0.2rem">
								<WarningCircle size={24} color={theme.colors['red-50']} />
							</Box>
						}
					/>
				</Box>
			) : (
				''
			)}
			<If
				condition={type === 'number' && !!unit}
				then={
					<Text
						position="absolute"
						right="2rem"
						as="b2"
						color={validity === 'invalid' ? 'red-50' : 'gray-30'}
					>
						{unit}
					</Text>
				}
			/>
			<If
				condition={searchIcon && type === 'search'}
				then={
					<Box ml="-4.2rem" mt="0.3rem">
						<MagnifyingGlass size={24} />
					</Box>
				}
			/>
		</Box>
	);
};

export default TextInput;

interface InputProps {
	theme: any;
	disabled?: boolean;
	value?: any;
	validation?: 'clear' | 'valid' | 'invalid';
	type?: string;
	disableValidation?: boolean;
	fontSize?: string;
	inputType?: string;
	actionRequired?: boolean;
}

export const InputElement = styled(Box)(
	(props: InputProps) => `
	
	padding: ${`${props.theme.space.ms} ${props.theme.space.mm}`};
	font-size: ${props.fontSize ?? '1.6rem'};
	font-family: 'Switzer', sans-serif;
	border-radius: ${props.inputType === 'number' ? '0px' : '8px'};
	background: ${
		props.disabled
			? props.actionRequired
				? props.theme.colors['yellow-20']
				: props.theme.colors['gray-20']
			: props.theme.colors['gray-10']
	};
	border:${props.inputType === 'number' ? 'none' : `1px solid ${props.theme.colors['blue-20']}`} ;
	box-shadow: inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1);
	outline: none;

	&::placeholder {
		${props.disabled || props.type === 'search' ? `color: #8c8ca1` : `color: ${theme.colors['gray-30']}`};
	}

	cursor: ${props.disabled ? 'not-allowed' : ''}
	

	
`
);

// padding: ${
// 	props.inputType ===
// 		? `${props.theme.space.mxxl} ${props.theme.space.mxl}`
// 		: `${props.theme.space.ms} ${props.theme.space.mm}`
// }

// padding: ${
// 	props.inputType ===
// 		? `${props.theme.space.mxxl} ${props.theme.space.mxl}`
// 		: `${props.theme.space.ms} ${props.theme.space.mm}`
// }

// border: ${
// 	props.disabled && props.inputType === 'number'
// 		? 'none'
// 		: props.value && !props.disableValidation
// 		? props.validation !== 'invalid'
// 			? `1px solid ${theme.colors['green-40']}`
// 			: `1px solid ${props.theme.colors['red-40']};`
// 		: '0.5px solid #E6E6FF'
// }

// export const InputElement = styled(Box)(
// 	(props: InputProps) => `

// 	padding: ${`${props.theme.space.ms} ${props.theme.space.ms}`};
// 	font-size: ${props.fontSize ?? '1.6rem'};
// 	font-family: 'Switzer', sans-serif;
// 	padding-left: ${props.inputType === 'number' ? '1.5rem' : '2rem'};
// 	background: ${
// 		props?.disabled
// 			? props.theme.colors['yellow-20']
// 			: props.value
// 			? props.theme.colors['simply-white']
// 			: props.theme.colors['white-00']
// 	};
// 	border-radius: ${props.disabled && props.inputType === 'number' ? '0px' : '8px'};
// 	background: ${
// 		props?.disabled
// 			? props.theme.colors['yellow-20']
// 			: props.value
// 			? props.theme.colors['simply-white']
// 			: props.theme.colors['white-00']
// 	};
// 	border: ${
// 		props.disabled
// 			? props.inputType === 'number'
// 				? 'none'
// 				: `2px solid rgba(140, 140, 161, 0.2)`
// 			: props.value && !props.disableValidation
// 			? props.validation !== 'invalid'
// 				? `1px solid ${theme.colors['green-40']}`
// 				: `1px solid ${props.theme.colors['red-40']};`
// 			: '0.5px solid #E6E6FF'
// 	};
// 	outline: none;

// 	${
// 		!props.disabled && !props.value
// 			? `box-shadow: inset 0px 2px 2px -1px rgba(74, 74, 104, 0.2);`
// 			: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)'
// 	};
//     ${
// 		props.value && !props.disableValidation
// 			? props.validation !== 'invalid'
// 				? `box-shadow: 0 0 0 4px ${theme.colors['green-50']}33`
// 				: `box-shadow: 0px 0px 0px 4px ${props.theme.colors['red-50']}33;`
// 			: ''
// 	};

// 	&::placeholder {
// 		${props.disabled || props.type === 'search' ? `color: #8c8ca1` : `color: ${theme.colors['gray-00']}`};
// 	}

// 	&:focus {
// 		border: 1px solid ${props.theme.colors['simply-blue']};
// 		box-shadow: 0 0 0 4px ${props.theme.colors['simply-blue']}33;
// 		background: ${props.theme.colors['simply-white']};
// 	}

// 	&:blur {
// 		${
// 			props.value
// 				? `
// 				box-shadow: 0 0 0 4px ${theme.colors['green-50']}33
// 				border: 1px solid ${theme.colors['green-40']};`
// 				: `
// 				box-shadow: 0 0 0 4px ${props.theme.colors['simply-blue']}33;
// 				border: 1px solid ${props.theme.colors['simply-blue']}
// 			`
// 		};
// 	}
// 	cursor: ${props.disabled ? 'not-allowed' : ''}

// `
// );
