import axios from 'axios';
import { LOGGER_URL } from 'src/constants';

const getCustomDescription = (msg, customInfo) => {
	let finalMsg = msg;
	if (customInfo) {
		Object.keys(customInfo).forEach((key) => {
			const newMsg = ` The ${key} is ${customInfo[key]}.`;
			finalMsg += newMsg;
		});
	}
	return finalMsg;
};

export const sendLog = (errorCode: number, err: any, customInfo?: any) => {
	const error = ERRORS[errorCode];
	const description = getCustomDescription(error?.description, customInfo);
	const myHeaders = {
		'Content-Type': 'application/json',
	};
	const raw = JSON.stringify({
		logs: {
			error_name: error.name,
			error_description: description,
			status_code: errorCode,
			slug: error.slug,
			error_object: err,
			timestamp: Math.floor(Date.now() / 1000),
		},
	});

	const requestOptions = {
		method: 'post',
		url: LOGGER_URL,
		headers: myHeaders,
		data: raw,
		redirect: 'follow',
	};

	axios(requestOptions)
		.then((response) => console.log({ response })) // eslint-disable-line no-console
		.then((result) => console.log(result)) // eslint-disable-line no-console
		.catch((error) => console.log('error', error)); // eslint-disable-line no-console
};

const ERRORS = {
	101: {
		name: 'Error adding resize listener',
		description: 'Unable to add window resize listener on the useEffect hook. No action required.',
		slug: 'pages/_app.js',
	},
	102: {
		name: 'Error removing resize listener',
		description: 'Unable to remove window resize listener on the useEffect hook. No action required.',
		slug: 'pages/_app.js',
	},
	103: {
		name: "Error loading user's scheduler",
		description: "Unable to load the user's Scheduler. Check the subgraph for errors.",
		slug: 'components/Layout/index.tsx',
	},
	104: {
		name: 'Error handling chain change (metamask)',
		description: 'Unable to handle the chain change event. Possibly not handled non-metamask browser properly.',
		slug: 'components/Layout/index.tsx',
	},
	105: {
		name: 'Error in indexing user address',
		description: 'There was a problem while assigning an index for profile type for the user address.',
		slug: 'components/Layout/utils.ts',
	},
	106: {
		name: 'Error setting Apollo Client to Redux',
		description:
			"An error likely occured while setting the Apollo Client to Redux. The problem might be occuring on Apollo Client's implementation as well.",
		slug: 'components/ApolloClient/index.tsx',
	},
	107: {
		name: 'Error in Metamask Event function',
		description: 'Likely error in the Metamask onChainChange or onAccountChange event handlers.',
		slug: 'components/DappNavbar/index.tsx',
	},
	108: {
		name: "Couldn't get address from Signer",
		description: "Wasn't able to get the address from the Signer. Check the Signer's implementation.",
		slug: 'components/DappNavbar/Drawer.tsx',
	},
	109: {
		name: 'Error in checking if user invited',
		description:
			'There was a problem in checking if the user was invited for the whitelist. Check the whitelist URL or if the json file has errors',
		slug: 'src/utils/whitelist.ts',
	},
	110: {
		name: 'Error fetching feeData',
		description: "The Wagmi hook (useFeeData) wasn't able to fetch the feeData.",
		slug: 'components/DappNavbar/Banners.tsx',
	},
	111: {
		name: 'Error fetching coin price',
		description:
			'Coingecko API was not able to fetch the price of the coin. Check the API implementation or if server is down.',
		slug: 'components/DappNavbar/Banners.tsx',
	},
	112: {
		name: 'Error changing search input',
		description: 'Error in handleChange function of the search input. Check the implementation.',
		slug: 'containers/Explore/SearchInput.tsx',
	},
	113: {
		name: 'Erro fetching collection list.',
		description:
			'There must be a problem with the API call for the projects or the implementation must have changed.',
		slug: 'containers/Explore/CollectionList.tsx',
	},
	114: {
		name: "Error in handling search filters' change",
		description:
			'Probable error in filtering collections based on search input. Check the conditionals for the filters.',
		slug: 'containers/Explore/CollectionList.tsx',
	},
	115: {
		name: "Error in handling Ethereum filters' change",
		description:
			'Probable error in filtering collections based on Ethereum filter. Check the conditionals for the filters.',
		slug: 'containers/Explore/CollectionList.tsx',
	},
	116: {
		name: "Error in handling Polygon filters' change",
		description:
			'Probable error in filtering collections based on Polygon filter. Check the conditionals for the filters.',
		slug: 'containers/Explore/CollectionList.tsx',
	},
	117: {
		name: "Error in handling free filters' change",
		description:
			'Probable error in filtering collections based on free filter. Check the conditionals for the filters.',
		slug: 'containers/Explore/CollectionList.tsx',
	},
	118: {
		name: "Error in handling A-Z filters' change",
		description:
			'Probable error in filtering collections based on A-Z filter. Check the conditionals for the filters.',
		slug: 'containers/Explore/CollectionList.tsx',
	},
	119: {
		name: "Error in handling Z-A filters' change",
		description:
			'Probable error in filtering collections based on Z-A filter. Check the conditionals for the filters.',
		slug: 'containers/Explore/CollectionList.tsx',
	},
	120: {
		name: "Error in handling low to high filters' change",
		description:
			'Probable error in filtering collections based on low to high filter. Check the conditionals for the filters.',
		slug: 'containers/Explore/CollectionList.tsx',
	},
	121: {
		name: "Error in handling high to low filters' change",
		description:
			'Probable error in filtering collections based on high to low filter. Check the conditionals for the filters.',
		slug: 'containers/Explore/CollectionList.tsx',
	},
	122: {
		name: 'Error in dispatching search query',
		description: 'Error when dispatching the search query to the store. Check the implementation.',
		slug: 'containers/Explore/CollectionList.tsx',
	},
	123: {
		name: 'Error fetching Project Schmints',
		description:
			'Error when fetching the Project Schmints. Check the subgraph for errors or implementation changes.',
		slug: 'containers/Explore/CollectionTile.tsx',
	},
	124: {
		name: 'Error setting Blockchain Unit',
		description: 'There was an error in finding the unit of the required blockchain.',
		slug: 'containers/Expore/CollectionTile.tsx',
	},
	125: {
		name: 'Error loading user balance',
		description: "There was an error getting user wallet balance using the Wagmi's hook (useBalance).",
		slug: 'components/Layout/Avatar.tsx',
	},
	126: {
		name: 'Error while depositing funds to Gnosis Safe',
		description: 'The error occured while depositing funds to Gnosis Safe. Check the Error Object to know more.',
		slug: 'components/modals/DepositModal.tsx',
	},
	127: {
		name: "Error loading user's Schmints",
		description:
			"Error while fetching user's list of Schmints from the Subgraph. Check the subgraph for any issues or abnormalitites.",
		slug: 'containers/my-schmints/index.tsx',
	},
	128: {
		name: 'Error setting page type in my-schmint',
		description:
			'Error while changing page in my-schmints page likely because of sessionStorage. Check the file for some issues.',
		slug: 'containers/my-schmints/index.tsx',
	},
	129: {
		name: 'Error checking failed schmints',
		description:
			'Likely error in fetching successful schmints from subgraph to verify if schmint is failed or not. Check the subgraph.',
		slug: 'containers/my-schmints/SchmintsList.tsx',
	},
	130: {
		name: 'Error getting All collections',
		description:
			'Error caused while fetching all the collections present in the database using the API call. Check if the API is down or something needs to be changed (implementation).',
		slug: 'containers/my-schmints/SchmintsList.tsx',
	},
	131: {
		name: 'Error assigning Schmints',
		description:
			'Error while assigning the status of the Schmint within the getSchmintsAssigned function. Check the function implementation.',
		slug: 'containers/my-schmints/SchmintsList.tsx',
	},
	132: {
		name: 'Error getting total gas cost.',
		description: 'Error while fetching total gas cost from the trxHash provided using the provider.',
		slug: 'containers/my-schmints/SchmintTile.tsx',
	},
	133: {
		name: 'Error checking action required.',
		description:
			'Check to see if Schmint requires action fails. Verify the implementation that check the criteria.',
		slug: 'containers/my-schmints/SchmintTile.tsx',
	},
	134: {
		name: 'Error in getting Schmint Quantitiy',
		description:
			'Erro caused while fetching the number of tokens that will be Schminted. Check if abi is passed correctly to any edge case. Also check if ABI types are up to date.',
		slug: 'containers/my-schmints/utils.ts',
	},
	135: {
		name: "Couldn't open Connect Modal",
		description:
			'Error that prevents opening the Rainbow Kit Connect Modal. Check the implementation or if there is some error in the package.',
		slug: 'containers/my-schmints/NoSchmintComponent.tsx',
	},
	136: {
		name: 'Error in Expnadable animation',
		description: 'Animation errors in the Expanding animation for side menu.',
		slug: 'components/DappNavbar/Drawer.tsx',
	},
	137: {
		name: 'Error in drawer animation',
		description: 'Animation errors in the drawer opening animation on click.',
		slug: 'components/DappNavbar/Drawer.tsx',
	},
	138: {
		name: "Error getting contract's ABI",
		description:
			'Check the Contract Artifacts if the correct artifacts are present for the called contract or not.',
		slug: 'utils/contracts.ts',
	},
	139: {
		name: "Error getting contract's Address",
		description:
			'Check the Contract Artifacts if the correct artifacts are present for the called contract or not.',
		slug: 'utils/contracts.ts',
	},
	140: {
		name: 'Error generating Scheduler Contract Instance',
		description:
			'There was an error in instantiating the Scheduler Contract Instance. Check if the scheduler is present or not and also the implementation.',
		slug: 'containers/project-page/useScheduler.ts',
	},
	141: {
		name: 'Error in creating Schmint',
		description: 'Error while creating Schmint. Check the error object to know more about the error.',
		slug: 'containers/project-page/SchmintForm.tsx',
	},
	142: {
		name: 'Error whilel setting Schmint Details',
		description: "Check the function's implementation to see if it's working correctly.",
		slug: 'containers/schmint-page/index.tsx',
	},
	143: {
		name: "Error while modifying Schmint's details",
		description: 'Check the error object to know more about the failure.',
		slug: 'containers/schmint-page/SchmintEditableForm.tsx',
	},
	144: {
		name: 'Error while deleting Schmint',
		description: 'Check the error object for more details.',
		slug: 'components/modals/DeletModal.tsx',
	},
};
