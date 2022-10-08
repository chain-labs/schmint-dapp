import ConfirmModal from 'src/components/modals/ConfirmModal';
import SchmintCreatedModal from 'src/components/modals/SchmintCreatedModal';
import StatusModal from 'src/components/modals/StatusModal';

export interface ModalState {
	isOpen: boolean;
	modalType: string;
	props: any;
}

export const MODALS_LIST = {
	CONFIRM_TRANSACTION: 'CONFIRM_TRANSACTION',
	STATUS_MODAL: 'STATUS_MODAL',
	SCHMINT_SUCCESFUL: 'SCHMINT_SUCCESFUL',
};

export const MODALS = {
	[MODALS_LIST.CONFIRM_TRANSACTION]: ConfirmModal,
	[MODALS_LIST.STATUS_MODAL]: StatusModal,
	[MODALS_LIST.SCHMINT_SUCCESFUL]: SchmintCreatedModal,
};
