import axios from 'axios';
import { PROJECTS_DIR } from 'src/utils/constants';

export interface ICollection {
	id?: string;
	title: string;
	contractAddress: string;
	abi: any;
	network: {
		chainId: number;
		name: string;
	};
	description: string;
	startTimestamp: number;
	supply: number;
	price: number;
	banner: string;
	logo: string;
	website_url: string;
	symbol: string;
	maxPurchase: number;
	maxWallet: number;
	tokenStandard: string;
	comingSoon?: boolean;
}

export const getCollections = async (): Promise<ICollection[]> => {
	const PROJECTS_JSON_URL = PROJECTS_DIR;
	const res = await axios.get(PROJECTS_JSON_URL);
	const projects = res.data;

	const collectionsList = projects
		.filter((collection: ICollection) => collection.startTimestamp > Date.now() / 1000)
		.sort((a: ICollection, b: ICollection) => a.startTimestamp - b.startTimestamp);

	const noStartTimeCollections = projects.filter((collection: ICollection) => !collection.startTimestamp);

	return [...collectionsList, ...noStartTimeCollections];
};

export const getAllCollections = async (): Promise<ICollection[]> => {
	const PROJECTS_JSON_URL = PROJECTS_DIR;
	const res = await axios.get(PROJECTS_JSON_URL);
	const projects = res.data;
	return projects;
};
