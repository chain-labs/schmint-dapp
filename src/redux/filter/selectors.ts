import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const selectFilter = (state: AppState) => state.filter;

export const filterSelector = createSelector(selectFilter, (state) => state);
