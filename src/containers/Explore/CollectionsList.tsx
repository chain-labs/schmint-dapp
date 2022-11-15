import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import If from 'src/components/If';
import { addSearch, filterSelector } from 'src/redux/filter';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { PROJECTS_DIR } from 'src/utils/constants';
import CollectionTile from './CollectionTile';
import EmptyResultComponent from './EmptyResultComponent';
import { getCollections, ICollection } from './projectsStore';

const CollectionsList = () => {
	const [collections, setCollections] = React.useState([]);
	const [filteredCollections, setFilteredCollections] = React.useState<ICollection[]>([]);
	const filter = useAppSelector(filterSelector);
	const [collectionPresent, setCollectionPresent] = useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
	const dispatch = useAppDispatch();

	useEffect(() => {
		getCollections()
			.then((res) => {
				setCollections(res);
			})
			.catch((err) => {
				console.log('Error fetching collections', err);

				// CODE: 113
			});
	}, []);

	useEffect(() => {
		if (collections) {
			setCollectionPresent(true);
			const { alphabetical, network, price, search } = filter;
			let filteredCollection = [...collections].sort((a, b) => a.startTimestamp - b.startTimestamp);

			try {
				if (search.query !== '') {
					filteredCollection = filteredCollection
						.filter((collection) => {
							return collection.title.toLowerCase().includes(search?.query?.toLowerCase());
						})
						.sort((a: ICollection, b: ICollection) => {
							if (
								a.title.toLowerCase().indexOf(search.query.toLowerCase(), 0) <
								b.title.toLowerCase().indexOf(search.query.toLowerCase(), 0)
							) {
								return -1;
							} else if (
								a.title.toLowerCase().indexOf(search.query.toLowerCase(), 0) >
								b.title.toLowerCase().indexOf(search.query.toLowerCase(), 0)
							) {
								return 1;
							} else return 0;
						});
				}
			} catch (err) {
				console.log('Erorr in handling search filter', err);

				// CODE: 114
			}

			try {
				if (network.isEthereum && !network.isPolygon) {
					filteredCollection = filteredCollection.filter(
						(collection: ICollection) => collection.network.name === 'Ethereum'
					);
				}
			} catch (err) {
				console.log('Error in handling Ethereum filter', err);

				// CODE: 115
			}

			try {
				if (network.isPolygon && !network.isEthereum) {
					filteredCollection = filteredCollection.filter(
						(collection: ICollection) => collection.network.name === 'Polygon'
					);
				}
			} catch (err) {
				console.log('Error in handling Polygon filter', err);

				// CODE: 116
			}

			try {
				if (price.isFree) {
					filteredCollection = filteredCollection?.filter(
						(collection: ICollection) => collection.price === 0
					);
				}
			} catch (err) {
				console.log('Error in handling free filter', err);

				// CODE: 117
			}

			try {
				if (alphabetical.isAZ) {
					filteredCollection = filteredCollection?.sort((a, b) => {
						const x = a.title.toLowerCase();
						const y = b.title.toLowerCase();

						if (x < y) return -1;
						if (x > y) return 1;
						return 0;
					});
				}
			} catch (err) {
				console.log('Error in handling A-Z filter', err);

				// CODE: 118
			}

			try {
				if (alphabetical.isZA) {
					filteredCollection = filteredCollection.sort((a, b) => {
						const x = a.title.toLowerCase();
						const y = b.title.toLowerCase();

						if (x < y) return 1;
						if (x > y) return -1;
						return 0;
					});
				}
			} catch (err) {
				console.log('Error in handling Z-A filter', err);

				// CODE: 119
			}

			try {
				if (price.isLowToHigh) {
					filteredCollection = filteredCollection.sort((a, b) => a.price - b.price);
				}
			} catch (err) {
				console.log('Error in handling low to high filter', err);

				// CODE: 120
			}

			try {
				if (price.isHighToLow) {
					filteredCollection = filteredCollection.sort((a, b) => b.price - a.price);
				}
			} catch (err) {
				console.log('Error in handling high to low filter', err);

				// CODE: 121
			}
			setFilteredCollections([...filteredCollection]);
		} else {
			setCollectionPresent(false);
		}
	}, [filter.alphabetical, filter.network, filter.price, filter.search.query, collections]);

	useEffect(() => {
		try {
			dispatch(addSearch({ query: filter.search.query, count: filteredCollections.length }));
		} catch (err) {
			console.log('Error in dispatching search query', err);
			// CODE: 122
		}
	}, [filteredCollections]);

	return (
		<Box mt="mxl">
			<If
				key="collection-list"
				condition={filter.clearAll && filter.search.query === ''}
				then={collections.map((collection, idx) => (
					<CollectionTile {...{ collection, idx }} key={`${collection.title}-${idx}`} />
				))}
				else={
					<If
						key="filtered-collection-list"
						condition={filteredCollections.length === 0}
						then={
							<EmptyResultComponent subText="Hmm... looks like the project you're looking for doesn't exist on Schmint yet. If you'd like to have it on Schmint, please " />
						}
						else={filteredCollections.map((collection, idx) => (
							<CollectionTile {...{ collection, idx }} key={`${collection?.title}-${idx}`} />
						))}
					/>
				}
			/>
			<If
				condition={collections.length < 1 && filter.clearAll}
				then={
					<EmptyResultComponent subText="Schmint is in Alpha and we are only listing projects we love or we vibe with. If you'd like to see a project on Schmint, please " />
				}
			/>
		</Box>
	);
};

export default CollectionsList;
