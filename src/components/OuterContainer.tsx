import Box from 'components/Box';
import Image from 'next/image';
import { ArrowRight } from 'phosphor-react';
import React, { useState } from 'react';
import { validateEmail } from 'src/containers/Contact/components/validEmail';
import theme from 'src/styleguide/theme';
import InputBox from './InputBox';
import Navbar from './Navbar';
import Text from './Text';
import toast, { Toaster } from 'react-hot-toast';
import LinkComp from './LinkComp';

const OuterContainer = ({ children, bg }) => {
	const [email, setEmail] = useState('');
	const [color, setColor] = useState('green-400');

	const addEmail = async () => {
		const valid = await validateEmail(email);
		if (valid) {
			const data = {
				name: '',
				email: '',
				query: '',
				message: '',
				singleemail: email,
			};
			try {
				const res = await fetch('https://sheet.best/api/sheets/edf1463f-31ed-47de-9466-a73c7103296f', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				if (!res.ok) {
					console.log('Error Occured');
					toast.error('Error Occured');
				} else {
					toast.success('Our team will soon contact you');
					setEmail('');
				}
			} catch (err) {
				console.log(err);
				toast.error('Error Occured');
			}
		} else {
			toast.error('Invalid Email');
		}
	};
	return (
		<Box bg={bg} minHeight="100vh">
			<Box>
				<Toaster
					position="top-center"
					toastOptions={{
						duration: 5000,
					}}
				/>
				<Navbar />
				<Box>{children}</Box>
				<Box
					bg="#0D0619"
					color="white"
					py="wl"
					column
					px={{ mobS: 'ml', tabL: '0', deskM: 'wl' }}
					position="relative"
				>
					<Box
						display="flex"
						justifyContent={{ mobS: 'space-around' }}
						flexDirection={{ mobS: 'column', tabS: 'row' }}
					>
						<Box column mr={{ mobS: '0', deskM: '16rem' }}>
							<Box
								position="relative"
								width={{ mobS: '19.8rem', tabS: '14.8rem', deskM: '16rem' }}
								height={{ mobS: '5.7rem', tabS: '4.3rem', deskM: '4.6rem' }}
							>
								<Image
									src="https://ik.imagekit.io/chainlabs/Website_Media/Chain_Labs_Logos/logo-footer-tablet_42hhHVYTlB.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1655915174616"
									layout="fill"
									objectFit="cover"
								/>
							</Box>
							<Box width="36rem" display={{ mobS: 'block', deskM: 'none' }} mt="mxl" row>
								<Text as="b3" color="grey-100" mr="wm">
									Join our mailing list to stay in the loop with our newest releases and updates about
									our products.
								</Text>
								<Box row>
									<Box zIndex={0} position="absolute">
										<InputBox
											width={{ mobS: '32rem', tabL: '36rem' }}
											value={email}
											setValue={setEmail}
											setColor={setColor}
										/>
									</Box>
									<Box mt="2.3rem" center zIndex={1} ml={{ mobS: '80%', tabL: '90%' }}>
										<ArrowRight size={24} color={theme.colors[color]} />{' '}
									</Box>
								</Box>
								<Text as="c1" mt="mxxxl" display={{ mobS: 'none', tabS: 'block' }} color="grey-200">
									© ALL RIGHTS RESERVED. CHAIN LABS 2022.
								</Text>
							</Box>
						</Box>
						<Box row flexWrap="wrap" mt={{ mobS: 'mxxxl', tabL: '0' }} mr={{ mobS: '0', deskM: '16rem' }}>
							<Box column mr={{ mobS: 'wm', tabS: 'wxs' }}>
								<Text as="h6" mb="mm" color="green-100">
									Company
								</Text>
								<LinkComp text="Home" link="/" />
								<LinkComp text="About" link="/about" />
								<LinkComp text="Services" link="/services" />
								<LinkComp text="Contact" link="/contact" />
							</Box>
							<Box column mr={{ mobS: 'wm', tabS: 'wxs' }}>
								<Text as="h6" mb="mm" color="green-100">
									Social
								</Text>
								<LinkComp target="_blank" text="Twitter" link="https://twitter.com/SimplrDAO" />
								<LinkComp
									target="_blank"
									text="Linkedin"
									link="https://www.linkedin.com/company/0xchainlabs/"
								/>
								<LinkComp target="_blank" text="Medium" link="https://blog.chainlabs.in/" />
								<LinkComp target="_blank" text="Github" link="https://github.com/chain-labs" />
							</Box>
							<Box column mt={{ mobS: 'mxl', mobL: '0' }}>
								<Text as="h6" mb="mm" color="green-100">
									Work
								</Text>
								<LinkComp
									target="_blank"
									text="Simplr Collection"
									link="https://www.simplrcollection.com/"
								/>
								<LinkComp target="_blank" text="Primobots" link="https://primobots.io/" />
								<LinkComp
									target="_blank"
									text="Daughters of Blockchain"
									link="https://daughtersofblockchain.com/"
								/>
							</Box>
						</Box>
						<Box width="36rem" display={{ mobS: 'none', deskM: 'block' }}>
							<Text as="b3" color="grey-100">
								Join our mailing list to stay in the loop with our newest releases and updates about our
								products.
							</Text>
							<Box row>
								<InputBox
									width={{ tabL: '36rem' }}
									value={email}
									setValue={setEmail}
									setColor={setColor}
								/>
								<Box mt="1.7rem" center zIndex={1} ml="-10%" onClick={addEmail} cursor="pointer">
									<ArrowRight size={24} color={theme.colors[color]} />{' '}
								</Box>
							</Box>
							<Text as="c1" mt="mxxxl" color="grey-200">
								© ALL RIGHTS RESERVED. CHAIN LABS 2022.
							</Text>
						</Box>
					</Box>
					<Text as="c1" mt="mxxxl" display={{ mobS: 'block', tabS: 'none' }} color="grey-200">
						© ALL RIGHTS RESERVED. CHAIN LABS 2022.
					</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default OuterContainer;
