import axios from 'axios';
import * as actionTypes from './actionTypes';
// import form_urlencode from '../utility';

export const selectVoucher = voucherId => {
	return {
		type: actionTypes.SELECT_VOUCHER,
		id: voucherId,
	};
};

export const requestStart = () => {
	return {
		type: actionTypes.REQUEST_START,
	};
};

export const fetchVouchersSuccess = voucherList => {
	return {
		type: actionTypes.FETCH_VOUCHERS_SUCCESS,
		vouchers: voucherList,
	};
};

export const voucherCreateFail = error => {
	return {
		type: actionTypes.CREATE_VOUCHER_FAIL,
		error: error,
	};
};

export const fetchAssetsSuccess = assetList => {
	return {
		type: actionTypes.FETCH_ASSET_SUCCESS,
		assets: assetList,
	};
};

export const createVoucher = (token, voucherData) => {
	return async dispatch => {
		dispatch(requestStart());

		const params = new URLSearchParams();

		for (let key in voucherData) {
			if (voucherData.hasOwnProperty(key)) {
				params.append(key, voucherData[key]);
			}
		}

		try {
			await axios({
				url: 'https://staging-v2.inplayer.com/vouchers',
				headers: {
					Authorization: 'Bearer ' + token,
				},
				data: params,
				method: 'POST',
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const fetchVouchers = token => {
	return async dispatch => {
		dispatch(requestStart());

		try {
			const response = await axios({
				url: 'https://staging-v2.inplayer.com/vouchers',
				headers: {
					Authorization: 'Bearer ' + token,
				},
				method: 'GET',
			});
			let voucherList = [];
			voucherList = [...response.data.collection];
			console.log(...voucherList);

			dispatch(fetchVouchersSuccess(voucherList));
		} catch (err) {
			console.log(err);
		}
	};
};

export const addVoucherAsset = (token, voucherId, assetId) => {
	return async dispatch => {
		dispatch(requestStart());

		const params = new URLSearchParams();
		params.append('value', assetId);

		try {
			const response = await axios({
				url: `https://staging-v2.inplayer.com/vouchers/${voucherId}/rules/assets`,
				headers: {
					Authorization: 'Bearer ' + token,
				},
				data: params,
				method: 'POST',
			});
			console.log(response.data);
		} catch (err) {
			console.log(err);
		}
	};
};

export const fetchAssets = (token, voucherId) => {
	return async dispatch => {
		dispatch(requestStart);

		try {
			const response = await axios({
				url: `https://staging-v2.inplayer.com/vouchers/${voucherId}/rules/assets`,
				headers: {
					Authorization: 'Bearer ' + token,
				},
				method: 'GET',
			});

			let assetsList = [...response.data.collection];
			dispatch(fetchAssetsSuccess(assetsList));
		} catch (err) {
			console.log(err);
		}
	};
};
