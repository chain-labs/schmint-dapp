import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const selectScheduler = (state: AppState) => state.scheduler;

export const schedulerSelector = createSelector(selectScheduler, (state) => state);
