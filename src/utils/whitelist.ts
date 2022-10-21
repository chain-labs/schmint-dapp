import axios from 'axios';
import { INVITELIST_URL } from './constants';

export const checkIfUserInvited = async (address: string): Promise<boolean> => {
	if (INVITELIST_URL) {
		const { data } = await axios.get<string[]>(INVITELIST_URL);

		if (data.length > 0) {
			const indexOfAddress = data?.findIndex((a) => a.toLowerCase() === address.toLowerCase());
			if (indexOfAddress !== -1) {
				return true;
			} else return false;
		} else return true;
	} else {
		return true;
	}
};
