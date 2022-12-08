import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import React from 'react';

export const ALCHEMY_API = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

const Wagmi = ({ children }) => {
	const user = useAppSelector(userSelector);
	const { chains, provider } = configureChains(
		[chain.mainnet, chain.polygonMumbai, chain.polygon, chain.goerli],
		[alchemyProvider({ apiKey: ALCHEMY_API, priority: 0 })]
	);

	const { connectors } = getDefaultWallets({
		appName: 'Simplr Collection App',
		chains,
	});

	const wagmiClient = createClient({
		autoConnect: user.exists ? true : false,
		connectors,
		provider,
	});

	return (
		<ErrorBoundary>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains} modalSize="compact">
					{children}
				</RainbowKitProvider>
			</WagmiConfig>
		</ErrorBoundary>
	);
};

export default Wagmi;

interface MyProps {
	children: React.ReactNode;
}

interface MyState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<MyProps, MyState> {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log({ error, errorInfo }); // eslint-disable-line no-console
	}

	render() {
		if (this?.state?.hasError) {
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}
