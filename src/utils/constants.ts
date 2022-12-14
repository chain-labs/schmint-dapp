export const SEAT_TOGGLE = process.env.NEXT_PUBLIC_SEAT_TOGGLE;
export const SEAT_DISABLE = process.env.NEXT_PUBLIC_SEAT_DISABLE;

export const toBoolean = (value: string): boolean => {
	if (value?.toLowerCase() === 'true') {
		return true;
	} else {
		return false;
	}
};

export const TEST_NETWORK = toBoolean(process.env.NEXT_PUBLIC_TEST_NETWORK);

export const testNetworks = [3, 4, 5, 42, 80001];

export const FAQ_URL = 'https://stonly.com/guide/en/simplr-collection-faqs-56DsboQUsp/Steps/1700349';

export const DOCS_URL = 'https://docs.simplrcollection.com';

export const BLOGS_URL = 'https://medium.com/@simplrhq';

export const INVITELIST_URL = process.env.NEXT_PUBLIC_INVITELIST_URL;

export const GOERLI_SUBGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_GOERLI_SUBGRAPH_ENDPOINT;

export const MUMBAI_SUBGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_MUMBAI_SUBGRAPH_ENDPOINT;

export const POLYGON_SUBGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_POLYGON_SUBGRAPH_ENDPOINT;

export const MAINNET_SUBGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_MAINNET_SUBGRAPH_ENDPOINT;

export const PROJECTS_DIR = process.env.NEXT_PUBLIC_PROJECT_DIRECTORY;

export const TEST_ENV = toBoolean(process.env.NEXT_PUBLIC_TEST_ENV);
