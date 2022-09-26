export interface SchedulerState {
	owner?: string;
	balance?: string;
	paused?: boolean;
	schmints?: SchmintState[];
	schedulerAddress?: string;
}

export interface SchmintState {
	id: number;
	targetAddress: string;
	input: {
		projectName: string;
		mintPrice: string;
		status: 'SCHEDULED' | 'MINTED' | 'CANCELLED' | 'FAILED';
		storeInScheduler: boolean;
	};
}
