export interface SchedulerState {
	owner?: string;
	balance?: string;
	paused?: boolean;
	schmints?: SchmintState[];
	schedulerAddress?: string;
	avatar?: string;
}

export interface SchmintState {
	schmintId?: string;
	target?: string;
	isSchminted?: boolean;
	isCancelled?: boolean;
	gasPriceLimit?: number;
	data?: string;
	value?: string;
	status?: string;
	executionTimestamp?: string;
}
