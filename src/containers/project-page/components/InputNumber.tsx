import { Minus, Plus } from 'phosphor-react';
import React from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { InputElement } from 'src/components/TextInput';

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
	return (
		<Box>
			{' '}
			<Text as="b2">Number of nft</Text>
			<Box display="flex" alignItems="center" mt="mxs">
				<Box
					ml="1rem"
					mt="0.2rem"
					position="absolute"
					color={value < min ? 'disable-black' : 'blue-40'}
					onClick={value < min ? () => setValue(0) : () => setValue(value - 1)}
					cursor={value < min ? 'not-allowed' : 'pointer'}
				>
					<Minus size={24} onClick={() => setValue(value - 1)} />
				</Box>
				<InputElement
					as="input"
					readOnly={!setValue}
					placeholder="20"
					value={value}
					onChange={value > max || value < min ? (e) => setValue(0) : (e) => setValue(e.target.value)}
					onWheel={(e) => {
						// @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type 'WheelEvent'.  TS2339
						e.target.blur();
					}}
					// color="blue-40"
					width="40%"
					min="0"
					required
					max="5"
					padding="12px"
					inputType="number"
					cursor={value > max || value < min ? 'not-allowed' : 'pointer'}
					color={value > max || value < min ? 'disable-black' : 'blue-40'}
				></InputElement>
				<Box
					ml="-3.8rem"
					mt="0.2rem"
					onClick={value > max ? () => setValue(max) : () => setValue(value + 1)}
					cursor={value > max ? 'not-allowed' : 'pointer'}
					color={value > max ? 'disable-black' : 'blue-40'}
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
