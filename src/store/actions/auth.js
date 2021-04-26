import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = authData => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: authData.access_token,
		clientId: authData.account.id,
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const auth = (email, password) => {
	return async dispatch => {
		dispatch(authStart());

		const params = new URLSearchParams();
		params.append('client_id', '8d3626fa9469ad4eee52e7ceb5dbf6a8');
		params.append('grant_type', 'client_credentials');
		params.append('client_secret', password);

		try {
			const response = await axios({
				url: 'https://staging-v2.inplayer.com/accounts/authenticate',
				data: params,
				method: 'POST',
			});
			dispatch(authSuccess(response.data));
		} catch (err) {
			console.log(err);
			// dispatch(authFail(err.response.data.error));
		}
	};
};
