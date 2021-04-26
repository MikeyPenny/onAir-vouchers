import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

const Logout = props => {
	const { onLogout, onReset } = props;

	useEffect(() => {
		onReset();
		onLogout();
	});

	return (
		<div>
			<Redirect to='/' />
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		onReset: () => dispatch(actions.requestStart()),
		onLogout: () => dispatch(actions.logout()),
	};
};

export default connect(null, mapDispatchToProps)(Logout);
