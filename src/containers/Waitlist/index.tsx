import Box from 'src/components/Box';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import React, { useEffect, useState } from 'react';
import ButtonComp from 'src/components/Button';
import toast from 'react-hot-toast';

const WaitlistComp = () => {
	const [address, setAddress] = useState('');
	const [inviteList, setInviteList] = useState([]);
	const getInvitelist = async () => {
		const data = await fetch('https://chain-labs.github.io/schmint-projects/inviteList.json');
		const res = await data.json();
		setInviteList(res);
	};
	useEffect(() => {
		getInvitelist();
	}, []);

	const checkInvitelist = () => {
		const found = inviteList.find((element) => element === address);
		if (found) {
			alert('You are on the waitlist');
		} else {
			alert('You are not on the waitlist');
		}
	};
	return (
		<Box mt="mxxl" column width={{ mobS: '400px', tabS: '600px' }} justifyContent="center">
			<Text textAlign="start" mb="mm">
				Add the address below
			</Text>
			<TextInput value={address} setValue={setAddress} width="80%"></TextInput>
			<Box>
				<ButtonComp
					bg="primary"
					color="white"
					width="80%"
					height="3.6rem"
					borderRadius="64px"
					mb="ms"
					mt="mxl"
					onClick={checkInvitelist}
				>
					<Text as="btn2">Check</Text>
				</ButtonComp>
			</Box>
		</Box>
	);
};

export default WaitlistComp;
