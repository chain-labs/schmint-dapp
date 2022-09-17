import { createAction } from '@reduxjs/toolkit';
import { SchmintState } from './types';

export const setScheduler = createAction('user/SET_SCHEDULER');
export const addSchmint = createAction<SchmintState>('user/ADD_SCHMINT');
export const removeSchmint = createAction('user/REMOVE_SCHMINT');
