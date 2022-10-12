import { useLazyQuery } from '@apollo/client';
import { StarFour } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import Text from 'src/components/Text';
import GET_MY_SCHMINTS from 'src/graphql/query/GetMySchmints';
import { useAppSelector } from 'src/redux/hooks';
import { schedulerSelector } from 'src/redux/scheduler';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import NoSchmintComponent from './NoSchmintComponent';
import SchmintsList from './SchmintsList';

const MySchmintComponent = () => {
	const [page, setPage] = React.useState<number>(0);
	const [schmints, setSchmints] = useState([]);
	const [getSchmints] = useLazyQuery(GET_MY_SCHMINTS, {
		onCompleted: ({ schmints }) => {
			setSchmints(schmints);
		},
	});
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);

	useEffect(() => {
		if (user.address) {
			getSchmints({
				variables: {
					userId: user.address,
				},
			});
		} else {
			if (typeof window !== 'undefined') {
				window.sessionStorage.removeItem('page');
			}
		}
	}, [user.address]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const pg = parseInt(window.sessionStorage.getItem('page')) ?? 0;
			setPage(pg);
		}
	}, []);

	const handleClick = (page) => {
		setPage(page);
		if (typeof window !== 'undefined') {
			window.sessionStorage.setItem('page', page ? '1' : '0');
		}
	};

	return (
		<Box px="mxl" py="wxs">
			<Box row alignItems="center" mb="wxs">
				<StarFour size={40} color={theme.colors['blue-40']} weight="fill" />
				<Text as="h4" ml="mxs">
					My Schmints
				</Text>
			</Box>
			<If
				condition={!scheduler.avatar || !user.exists}
				then={<NoSchmintComponent />}
				else={
					<React.Fragment>
						<Box mt="wxs" row alignItems="center">
							<Text
								as="h5"
								color={!page ? 'simply-blue' : 'gray-30'}
								onClick={() => handleClick(0)}
								cursor="pointer"
							>
								Active
							</Text>
							<Box mx="mm" height="2rem" bg="gray-30" width="0.1rem" />
							<Text
								as="h5"
								color={page ? 'simply-blue' : 'gray-30'}
								onClick={() => handleClick(1)}
								cursor="pointer"
							>
								Completed
							</Text>
						</Box>
						<SchmintsList page={page} schmints={schmints} />
					</React.Fragment>
				}
			/>
		</Box>
	);
};

export default MySchmintComponent;
