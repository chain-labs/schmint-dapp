import axios from 'axios';
import { INVITELIST_URL } from './constants';

export const checkIfUserInvited = async (address: string): Promise<boolean> => {
	const { data } = await axios.get<string[]>(INVITELIST_URL);
	const indexOfAddress = data?.findIndex((a) => a.toLowerCase() === address.toLowerCase());
	if (indexOfAddress !== -1) {
		return true;
	}
	return false;
};
