import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getEndpoint } from 'src/components/ApolloClient';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Loader from 'src/components/Loader';
import Text from 'src/components/Text';
import { ICollection } from 'src/containers/Explore/projectsStore';
import NoSchmintComponent from 'src/containers/my-schmints/NoSchmintComponent';
import { nftContract, seaDrop } from 'src/containers/project-page/utils';
import SchmintPage from 'src/containers/schmint-page';
import WrongNetworkAlert from 'src/containers/WrongNetworkAlert';
import GET_SCHMINT from 'src/graphql/query/GetSchmint';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector } from 'src/redux/network';
import { schedulerSelector } from 'src/redux/scheduler';
import { SchmintState } from 'src/redux/scheduler/types';
import { userSelector } from 'src/redux/user';
import { PROJECTS_DIR } from 'src/utils/constants';
import { sendLog } from 'src/utils/logging';

const illustration = 'https://ik.imagekit.io/chainlabs/Schmint/pablo-list-is-empty_1__1__Ux_bWTmMO.svg';

const Schmint = () => {
	const router = useRouter();
	const { id, cid: chain } = router.query;
	const [collections, setCollections] = useState([]);
	const [collection, setCollection] = useState<ICollection>();
	const user = useAppSelector(userSelector);
	const scheduler = useAppSelector(schedulerSelector);
	const [schmint, setSchmint] = useState<SchmintState>();
	const [wrongNetwork, setWrongNetwork] = useState(false);
	const network = useAppSelector(networkSelector);
	const [loading, setLoading] = useState(true);

	const getAllCollections = async () => {
		const data = await fetch(PROJECTS_DIR);
		const res = await data.json();
		setCollections(res);
	};

	const getCollection = () => {
		collections.map((collection) => {
			if (collection?.contractAddress.toLowerCase() === nftContract.toLowerCase()) {
				if (schmint?.target?.toLowerCase() === seaDrop.toLowerCase()) {
					setCollection(collection);
				}
			} else if (collection?.contractAddress.toLowerCase() === schmint?.target?.toLowerCase()) {
				setCollection(collection);
			}
		});
	};

	useEffect(() => {
		getAllCollections().catch((err) => {
			console.log('Error getting All collections', err); // eslint-disable-line no-console
			// CODE: 130
			sendLog(130, err, { schmintId: id });
		});
	}, []);

	useEffect(() => {
		if (scheduler?.schedulerAddress && collections.length && schmint) {
			getCollection();
		}
	}, [id, scheduler?.schedulerAddress, collections, schmint]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (collection && user.exists) {
				if (collection?.network?.chainId !== network.chainId) {
					setWrongNetwork(true);
					return;
				}
			}
			setWrongNetwork(false);
		}
	}, [collection, network.chainId, user.exists]);

	useEffect(() => {
		if (chain && id) {
			getSchmint(id, chain).then((data) => {
				setSchmint(data.schmint);
				setLoading(false);
			});
		}
	}, [id, chain]);

	if (collection && schmint.id === id) {
		return (
			<Box>
				{collection ? <SchmintPage schmint={schmint} collection={collection} /> : ''}
				<If
					condition={wrongNetwork}
					then={
						<WrongNetworkAlert chainTo={collection?.network?.chainId} setWrongNetwork={setWrongNetwork} />
					}
				/>
			</Box>
		);
	}

	if (!user.exists) {
		return <NoSchmintComponent page={0} />;
	}
	if (loading) {
		return <Loader />;
	}

	return (
		<Box mt="wm">
			<Box position="relative" width="40rem" height="23rem" mx="auto">
				<Image src={illustration} alt="No Schmint" layout="fill" />
			</Box>
			<Text as="b3" color="gray-40" mt="mxs" textAlign="center" maxWidth="40rem" mx="auto">
				Schmint not found
			</Text>
			<Box mt="mxl" center>
				<ButtonComp
					bg="primary"
					py="ms"
					px="mxl"
					borderRadius="64px"
					onClick={() => router.push('/my-schmints')}
					mx="auto"
				>
					<Text as="btn2">Go to My Schmints</Text>
				</ButtonComp>
			</Box>
		</Box>
	);
};

export default Schmint;

const getSchmint = async (id, chain) => {
	const subgraph_url = getEndpoint(parseInt(chain));

	const client = new ApolloClient({
		uri: subgraph_url,
		cache: new InMemoryCache(),
	});

	const schmint = await client.query({ query: GET_SCHMINT, variables: { id } });

	return {
		loading: schmint.loading,
		schmint: schmint.data.schmint,
	};
};
