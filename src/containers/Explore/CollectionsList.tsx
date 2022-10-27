import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import { addSearch, filterSelector } from 'src/redux/filter';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import CollectionTile from './CollectionTile';
import EmptyResultComponent from './EmptyResultComponent';
import { getCollections, ICollection } from './projectsStore';

const CollectionsList = () => {
	const [collections, setCollections] = React.useState<ICollection[]>([]);
	const [filteredCollections, setFilteredCollections] = React.useState<ICollection[]>([]);
	const filter = useAppSelector(filterSelector);
	const [collectionPresent, setCollectionPresent]=useState(false)
	const dispatch = useAppDispatch();

	useEffect(() => {
		getCollections().then((res) => {
			setCollections(res);
		});
	}, []);

	useEffect(() => {
		if (collections) {
			setCollectionPresent(true)
			const { alphabetical, network, price, search } = filter;

			let filteredCollection = [...collections].sort((a, b) => a.startTimestamp - b.startTimestamp);

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

			if (network.isEthereum && !network.isPolygon) {
				filteredCollection = filteredCollection.filter(
					(collection: ICollection) => collection.network.name === 'Ethereum'
				);
			}

			if (network.isPolygon && !network.isEthereum) {
				filteredCollection = filteredCollection.filter(
					(collection: ICollection) => collection.network.name === 'Polygon'
				);
			}

			if (price.isFree) {
				filteredCollection = filteredCollection.filter((collection: ICollection) => collection.price === 0);
			}

			if (alphabetical.isAZ) {
				filteredCollection = filteredCollection.sort((a, b) => {
					const x = a.title.toLowerCase();
					const y = b.title.toLowerCase();

					if (x < y) return -1;
					if (x > y) return 1;
					return 0;
				});
			}

			if (alphabetical.isZA) {
				filteredCollection = filteredCollection.sort((a, b) => {
					const x = a.title.toLowerCase();
					const y = b.title.toLowerCase();

					if (x < y) return 1;
					if (x > y) return -1;
					return 0;
				});
			}

			if (price.isLowToHigh) {
				filteredCollection = filteredCollection.sort((a, b) => a.price - b.price);
			}

			if (price.isHighToLow) {
				filteredCollection = filteredCollection.sort((a, b) => b.price - a.price);
			}
			setFilteredCollections([...filteredCollection]);
		}
		else{
			setCollectionPresent(false)
		}
	}, [filter.alphabetical, filter.network, filter.price, filter.search.query, collections]);

	useEffect(() => {
		dispatch(addSearch({ query: filter.search.query, count: filteredCollections.length }));
	}, [filteredCollections]);

	return (
		<Box mt="mxl">
			<If
				key="collection-list"
				condition={filter.clearAll && filter.search.query === ''}
				then={collections.map((collection, idx) => (
					<CollectionTile {...{ collection, idx }} />
				))}
				else={
					<If
						key="filtered-collection-list"
						condition={filteredCollections.length === 0}
						then={<EmptyResultComponent />}
						else={filteredCollections.map((collection, idx) => (
							<CollectionTile {...{ collection, idx }} />
						))}
					/>
				}
			/>
			<If condition={collectionPresent===true && filter.clearAll} then={
				<Box mt="ws" width="39rem" mx="auto">
				<Box position="relative" width="100%" height="16.6rem">
					<Image
						src="https://ik.imagekit.io/chainlabs/Schmint/pablo-page-not-found-2_1_10AQAQXCo.svg"
						layout="fill"
						objectFit="contain"
						quality={1}
					/>
				</Box>
				<Text mt="mxl" as="b3" color="gray-40" textAlign="center">
					No active project present
				</Text>
				<Box as="a" mt="mxl" center href="https://form.jotform.com/222922224502041" target="_blank">
					<ButtonComp bg="primary" py="ms" px="mxl" borderRadius="64px"  mx="auto">
						<Text as="b3" color="white">Submit a Project</Text>
					</ButtonComp>
				</Box>
			</Box>
			}/>

		</Box>
	);
};

export default CollectionsList;
