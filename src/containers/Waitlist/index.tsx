import Box from 'src/components/Box';
import Text from 'src/components/Text';
import TextInput from 'src/components/TextInput';
import React, { useEffect, useState } from 'react';
import ButtonComp from 'src/components/Button';

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
		<Box mt="mxxl" column width="600px">
			<Text textAlign="start" mb="mm">
				Add the address below
			</Text>
			<TextInput value={address} setValue={setAddress} width="600px"></TextInput>
			<Box center>
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
