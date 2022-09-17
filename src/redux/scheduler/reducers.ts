import { createReducer } from '@reduxjs/toolkit';

import { addSchmint, removeSchmint, setScheduler } from './actions';

export type SchedulerState = {
	owner: string;
    balance: string;
    paused: boolean;
    schmints: [{}]
    schedulerAddress: string
};

const initialState: SchedulerState = {
	owner: '',
    balance: '',
    paused: false,
    schmints: [{}],
    schedulerAddress: ''
};

export const schedulerReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setScheduler, (state, action) => {
			const updateState: SchedulerState = action.payload
            const newState = {...state, ...updateState}
            return newState
		})
        .addCase(addSchmint, (state, action) => {
			state.schmints.push(action.payload)
            return state;
		})
        .addCase(removeSchmint, (state, action) => {
			const index = state.schmints.indexOf(action.payload)
			if (index !== -1) {
				state.schmints.splice(index, 1);
			}
			return state;
		})
		
});
