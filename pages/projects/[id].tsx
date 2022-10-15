import { useRouter } from 'next/router';
import { X } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { ICollection } from 'src/containers/Explore/projectsStore';
import Projectpage from 'src/containers/project-page';
import WrongNetworkAlert from 'src/containers/WrongNetworkAlert';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import theme from 'src/styleguide/theme';
import { PROJECTS_DIR } from 'src/utils/constants';
import { useNetwork } from 'wagmi';

const ProjectPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [collections, setCollections] = useState([]);
	const [collection, setCollection] = useState<ICollection>();
	const { chain } = useNetwork();
	const user = useAppSelector(userSelector);
	const [wrongNetwork, setWrongNetwork] = useState(false);

	const getAllCollections = async () => {
		const data = await fetch(PROJECTS_DIR);
		const res = await data.json();
		setCollections(res);
	};

	const getCollection = async () => {
		collections.map(async (collection) => {
			if (collection.id === id) {
				await setCollection(collection);
			}
		});
	};

	useEffect(() => {
		getCollection();
	}, [id, collections]);

	useEffect(() => {
		getAllCollections();
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (collection && user.exists) {
				if (collection?.network?.chainId !== chain?.id) {
					setWrongNetwork(true);
					return;
				}
			}
			setWrongNetwork(false);
		}
	}, [collection, chain, user.exists]);

	if (collection) {
		return (
			<Box pb="wl">
				{collection ? <Projectpage collection={collection} /> : ''}
				<If
					condition={wrongNetwork && !collection.comingSoon}
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
