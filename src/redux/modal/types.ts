import ConfirmModal from 'src/components/modals/ConfirmModal';
import DepositModal from 'src/components/modals/DepositModal';
import DeleteModal from 'src/components/modals/DeleteModal';
import SchmintCreatedModal from 'src/components/modals/SchmintCreatedModal';
import StatusModal from 'src/components/modals/StatusModal';
import InviteOnlyModal from 'src/components/modals/InviteOnlyModal';

export interface ModalState {
	isOpen: boolean;
	modalType: string;
	props: any;
}

export const MODALS_LIST = {
	CONFIRM_TRANSACTION: 'CONFIRM_TRANSACTION',
	STATUS_MODAL: 'STATUS_MODAL',
	SCHMINT_SUCCESFUL: 'SCHMINT_SUCCESFUL',
	DEPOSIT_MODAL: 'DEPOSIT_MODAL',
	DELETE_MODAL: 'DELETE_MODAL',
	INVITE_ONLY_MODAL: 'INVITE_ONLY_MODAL',
};

export const MODALS = {
	[MODALS_LIST.CONFIRM_TRANSACTION]: ConfirmModal,
	[MODALS_LIST.STATUS_MODAL]: StatusModal,
	[MODALS_LIST.SCHMINT_SUCCESFUL]: SchmintCreatedModal,
	[MODALS_LIST.DEPOSIT_MODAL]: DepositModal,
	[MODALS_LIST.DELETE_MODAL]: DeleteModal,
	[MODALS_LIST.INVITE_ONLY_MODAL]: InviteOnlyModal,
};
