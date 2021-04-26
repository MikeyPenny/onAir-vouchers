import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const intialState = {
	id: null,
	isLoading: true,
	vouchers: [],
	voucherId: null,
	voucher: null,
	assets: [],
};

const createVoucherStart = state => {
	return updateObject(state, { isLoading: true });
};

const createFailed = (state, action) => {
	return updateObject(state, { isLoading: false, error: action.error });
};

const fetchVouchersSuccess = (state, action) => {
	return updateObject(state, {
		vouchers: action.vouchers,
		isLoading: false,
	});
};

const selectVoucher = (state, action) => {
	const index = state.vouchers.findIndex(vouch => vouch.id === action.id);
	const voucherSelected = state.vouchers[index];

	return updateObject(state, {
		voucher: voucherSelected,
		isLoading: true,
	});
};

const fetchAssetsSuccess = (state, action) => {
	return updateObject(state, { assets: action.assets, isLoading: false });
};

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.REQUEST_START:
			return createVoucherStart(state);
		case actionTypes.CREATE_VOUCHER_FAIL:
			return createFailed(state, action);
		case actionTypes.FETCH_VOUCHERS_SUCCESS:
			return fetchVouchersSuccess(state, action);
		case actionTypes.SELECT_VOUCHER:
			return selectVoucher(state, action);
		case actionTypes.FETCH_ASSET_SUCCESS:
			return fetchAssetsSuccess(state, action);
		default:
			return state;
	}
};

export default reducer;
