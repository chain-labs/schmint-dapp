import { BLOGS_URL } from './utils/constants';

export const TWITTER_URL = 'https://twitter.com/simplrhq';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/0xchainlabs';
export const GITHUB_URL = 'https://github.com/chain-labs';
export const CHAINLABS_URL = 'https://chainlabs.in ';
export const SIMPLR_URL = 'https://simplrhq.com';

export const EMAIL_CONTACT = 'hello@chainlabs.in';

export const CALENDLY_LINK = process.env.NEXT_PUBLIC_CALENDLY_URL;
export const WAITLIST_ID = process.env.NEXT_PUBLIC_WAITLIST_ID;
export const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE;
export const DISCLAIMER_URL = 'https://chain-labs.github.io/schmint-projects/disclaimer.html';
export const BLOGS_API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@simplrhq';
export const LOGGER_URL = process.env.NEXT_PUBLIC_LOGGER_URL;

export const FOOTER_LINKS = [
	{
		title: 'Blogs',
		url: BLOGS_URL,
	},
	{
		title: 'FAQ',
	},
	{
		title: 'Twitter',
		url: TWITTER_URL,
	},
	{
		title: 'Discord',
		url: DISCORD_INVITE,
	},
	{
		title: 'Disclaimer',
		url: DISCLAIMER_URL,
	},
];
