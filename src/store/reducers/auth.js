import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
	token: null,
	isLoading: false,
	clientId: null,
	error: null,
	authRedirect: '/',
};

const authStart = state => {
	return updateObject(state, { error: null, isLoading: true });
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.idToken,
		clientId: action.clientId,
		error: null,
		isLoading: false,
	});
};

const authFail = (state, action) => {
	return updateObject(state, { error: action.error, isLoading: false });
};

const authLogout = state => {
	return updateObject(state, { token: null, clientId: null });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state);
		default:
			return state;
	}
};

export default reducer;
