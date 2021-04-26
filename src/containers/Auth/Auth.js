import React, { useState } from 'react';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import classes from './Auth.module.css';

const Auth = props => {
	const email = useInputForm('');
	const password = useInputForm(
		'790e2854087e750966cae9d718f789297114c0523c24ea8bd1ecaacac08f4d43'
	);

	const submitHandler = e => {
		e.preventDefault();
		props.onAuth(email.value, password.value);
	};

	return (
		<div>
			<form onSubmit={submitHandler} className={classes.Auth}>
				<input
					className={classes.Input}
					type='email'
					placeholder='Email Adress'
					{...email}
				/>
				<input
					className={classes.Input}
					type='password'
					placeholder='Password'
					{...password}
				/>
				<Button btnType='Success'>SUBMIT</Button>
			</form>
		</div>
	);
};

const useInputForm = initValue => {
	const [value, SetValue] = useState(initValue);

	function handleChange(e) {
		SetValue(e.target.value);
	}

	return {
		value,
		onChange: handleChange,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password) => dispatch(actions.auth(email, password)),
	};
};

export default connect(null, mapDispatchToProps)(Auth);
