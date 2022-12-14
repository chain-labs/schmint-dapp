import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import { ICollection } from 'src/containers/Explore/projectsStore';
import Projectpage from 'src/containers/project-page';
import WrongNetworkAlert from 'src/containers/WrongNetworkAlert';
import { useAppSelector } from 'src/redux/hooks';
import { networkSelector } from 'src/redux/network';
import { userSelector } from 'src/redux/user';
import { PROJECTS_DIR } from 'src/utils/constants';
import { sendLog } from 'src/utils/logging';

const ProjectPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [collections, setCollections] = useState([]);
	const [collection, setCollection] = useState<ICollection>();
	const user = useAppSelector(userSelector);
	const [wrongNetwork, setWrongNetwork] = useState(false);
	const network = useAppSelector(networkSelector);

	const getAllCollections = async () => {
		const data = await fetch(PROJECTS_DIR);
		const res = await data.json();
		setCollections(res);
	};

	const getCollection = async () => {
		collections.map((collection) => {
			if (collection.id === id) {
				setCollection(collection);
			}
		});
	};

	useEffect(() => {
		getCollection().catch((err) => {
			console.log('Error getting All collections', err); // eslint-disable-line no-console
			// CODE: 130
			sendLog(130, err, { projectId: id });
		});
	}, [id, collections]);

	useEffect(() => {
		getAllCollections().catch((err) => {
			console.log('Error getting All collections', err); // eslint-disable-line no-console
			// CODE: 130
			sendLog(130, err, { projectId: id });
		});
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (collection && user.exists) {
				if (!network.isValid || collection?.network?.chainId !== network.chainId) {
					setWrongNetwork(true);
					return;
				}
			}
			setWrongNetwork(false);
		}
	}, [collection, network.chainId, user.exists]);

	if (collection) {
		return (
			<Box pb="wl">
				{collection ? <Projectpage collection={collection} /> : ''}
				<If
					condition={wrongNetwork && !collection?.mintTimestampNotDecided}
					then={
						<WrongNetworkAlert chainTo={collection?.network?.chainId} setWrongNetwork={setWrongNetwork} />
					}
				/>
			</Box>
		);
	}

	return null;
};

export default ProjectPage;
