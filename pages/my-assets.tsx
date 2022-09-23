import { useConnectModal } from '@rainbow-me/rainbowkit';
import MyAssetsComponent from 'src/containers/MyAssets';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';

const MyAssets = () => {
	const user = useAppSelector(userSelector);
	const { openConnectModal } = useConnectModal();
	if (!user.exists) {
		openConnectModal();
		return null;
	}

	return <MyAssetsComponent />;
};

export default MyAssets;
