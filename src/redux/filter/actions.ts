import { createAction } from '@reduxjs/toolkit';
import { IFilterAlphabetical, IFilterNetwork, IFilterPrice, ISearch } from './types';

export const filterAlphabetical = createAction<IFilterAlphabetical>('filter/FILTER_ALPHABETICAL');
export const filterNetwork = createAction<IFilterNetwork>('filter/FILTER_NETWORK');
export const filterPrice = createAction<IFilterPrice>('filter/FILTER_PRICE');

export const removeFilter = createAction('filter/REMOVE_FILTER');

export const addSearch = createAction<ISearch>('filter/ADD_SEARCH');
