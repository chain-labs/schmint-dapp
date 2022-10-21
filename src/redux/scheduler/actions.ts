import { createAction } from '@reduxjs/toolkit';
import { SchedulerState, SchmintState } from './types';

export const setScheduler = createAction<SchedulerState>('user/SET_SCHEDULER');
export const addSchmint = createAction<SchmintState[]>('user/ADD_SCHMINT');
export const removeSchmint = createAction('user/REMOVE_SCHMINT');
