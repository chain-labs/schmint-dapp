import { createAction } from '@reduxjs/toolkit';

export const filterAlphabetical = createAction('filter/FILTER_ALPHABETICAL');
export const filterNetwork = createAction('filter/FILTER_NETWORK');
export const filterPrice = createAction('filter/FILTER_PRICE');


export const removeFilter = createAction('filter/REMOVE_FILTER');

export const addSearch = createAction('filter/ADD_SEARCH');
