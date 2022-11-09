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
	socials: {
		twitter_url: string;
		x2y2_url: string;
		looksrare_url: string;
		opensea_url: string;
		rarity_url: string;
		icytools_url: string;
		discord_url: string;
	};
	mintTimestampNotDecided?: boolean;
}

export const getCollections = async (): Promise<ICollection[]> => {
	const PROJECTS_JSON_URL = PROJECTS_DIR;
	const res = await fetch(PROJECTS_JSON_URL);
	let projects = await res.json();
	if (typeof projects === 'string') {
		projects = JSON.parse(projects);
	}
	const collectionsList = projects.sort((a: ICollection, b: ICollection) => a.startTimestamp - b.startTimestamp);

	const noStartTimeCollections = projects.filter((collection: ICollection) => !collection.startTimestamp);

	return [...collectionsList];
};

export const getAllCollections = async (): Promise<ICollection[]> => {
	const PROJECTS_JSON_URL = PROJECTS_DIR;
	const res = await fetch(PROJECTS_JSON_URL);
	const projects = await res.json();
	return projects;
};
