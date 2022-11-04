import axios from 'axios';
import { INVITELIST_URL } from './constants';

export const checkIfUserInvited = async (address: string): Promise<boolean> => {
	if (INVITELIST_URL) {
		try {
			const { data } = await axios.get<string[]>(INVITELIST_URL);

			if (data.length > 0) {
				const indexOfAddress = data?.findIndex((a) => a.toLowerCase() === address.toLowerCase());
				if (indexOfAddress !== -1) {
					return true;
				} else return false;
			} else return true;
		} catch (err) {
			console.log('Error in checking if user invited', err);

			// CODE: 109
		}
	} else {
		return true;
	}
};
