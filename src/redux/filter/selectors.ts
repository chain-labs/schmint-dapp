import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectFilter = (state: AppState) => state.filter;

export const filterSelector = createSelector(selectFilter, (state) => state);

export const selectSearchCount = (state: AppState) => state.filter.search.count;

export const searchCountSelector = createSelector(selectSearchCount, (state) => state);
