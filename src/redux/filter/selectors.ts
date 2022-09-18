import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectFilter = (state: AppState) => state.filter;

export const filterSelector = createSelector(selectFilter, (state) => state);

export const selectSearch = (state: AppState) => state.filter.search;

export const searchSelector = createSelector(selectSearch, (state) => state);
