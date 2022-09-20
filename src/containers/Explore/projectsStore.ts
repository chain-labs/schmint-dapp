import axios from 'axios';

export interface ICollection {
	title: string;
	network: {
		chainId: 1 | 137;
		name: string;
	};
	startTimestamp: number;
	price: number;
	banner: string;
	website_url: string;
}

export const collectionList: ICollection[] = [
	{
		title: 'Silicon Valley Avatars',
		network: {
			chainId: 1,
			name: 'Ethereum',
		},
		startTimestamp: 1665833304,
		price: 0,
		banner: 'https://img.freepik.com/free-vector/cartoon-working-day-scene-illustration_52683-62607.jpg?w=2000&t=st=1663241588~exp=1663242188~hmac=5c15ed5b4182137e616dfd0cae55dbfadf375be1f5c1d8d48c8574a9d7a404d5',
		website_url: 'https://simplrcollection.com',
	},
	{
		title: 'Abstract 3D',
		network: {
			chainId: 137,
			name: 'Polygon',
		},
		startTimestamp: 1664467200,
		price: 0.01,
		banner: 'https://images.unsplash.com/photo-1646995931586-076b80286a8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80',
		website_url: 'https://simplrcollection.com',
	},
	{
		title: 'Space Puppers',
		network: {
			chainId: 1,
			name: 'Ethereum',
		},
		startTimestamp: 1663633800,
		price: 0.014,
		banner: 'https://pixabay.com/get/gc49a6e74163367509822d3b3a51b3d65578f7d6342fd419fb877871262825994910b26c4d2cc78a83a786ec6c92eea98_1280.jpg',
		website_url: 'https://simplrcollection.com',
	},
	{
		title: 'Summer of Evil',
		network: {
			chainId: 1,
			name: 'Ethereum',
		},
		startTimestamp: 1666808800,
		price: 0.08,
		banner: 'https://pixabay.com/get/g3fc4dc723fc43e97201d5c361f919ea766bac5d1d466ba2703939dc118559c6a576829a5ee5a471c759751fb3eb0cb0e_1280.jpg',
		website_url: 'https://simplrcollection.com',
	},
	{
		title: 'Playful Friction',
		network: {
			chainId: 137,
			name: 'Polygon',
		},
		startTimestamp: 1663408800,
		price: 0.08,
		banner: 'https://pixabay.com/get/g999e674e50868d1e0d504eac67b2f5ff598ed95ab38a5c76ea668fb1a7fa8339dfa89f50598243e2c8b84ea5b53c44d8_1280.jpg',
		website_url: 'https://simplrcollection.com',
	},
];

export const getCollections = async (): Promise<ICollection[]> => {
	const PROJECTS_JSON_URL = `${window.location.href.replace('/explore', '/api/projects')}`;
	const res = await axios.get(PROJECTS_JSON_URL);
	return res.data
		.filter((collection: ICollection) => collection.startTimestamp > Date.now() / 1000)
		.sort((a: ICollection, b: ICollection) => a.startTimestamp - b.startTimestamp);
};
