import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { useHistory } from 'react-router-dom';

import classes from './CreateVoucher.module.css';

const CreateVoucher = props => {
	const history = useHistory();

	const name = useInputForm('');
	const length = useInputForm('');
	const prefix = useInputForm('AB17');
	const sufix = useInputForm('BA17');
	const discount = useInputForm('');
	const start_date = useInputForm('');
	const end_date = useInputForm('');
	const usage_limit = useInputForm('');

	const submitHandler = e => {
		e.preventDefault();
		const data = {
			name: name.value,
			length: parseInt(length.value),
			prefix: prefix.value,
			sufix: sufix.value,
			discount: parseInt(discount.value),
			start_date: start_date.value,
			end_date: end_date.value,
			usage_limit: parseInt(usage_limit.value),
		};

		props.onCreateVoucher(props.token, data);
		history.push('/voucher');
	};

	return (
		<div>
			<form
				onSubmit={e => submitHandler(e)}
				className={classes.CreateVoucher}
			>
				<input
					className={classes.Input}
					type='text'
					placeholder='Voucher Name'
					{...name}
				/>
				<input
					className={classes.Input}
					type='text'
					placeholder='Length'
					{...length}
				/>
				<input
					className={classes.Input}
					type='text'
					placeholder='Prefix'
					{...prefix}
				/>
				<input
					className={classes.Input}
					type='text'
					placeholder='Sufix'
					{...sufix}
				/>
				<input
					className={classes.Input}
					type='text'
					placeholder='Discount'
					{...discount}
				/>
				<input className={classes.Input} type='date' {...start_date} />
				<input className={classes.Input} type='date' {...end_date} />
				<input
					className={classes.Input}
					type='text'
					placeholder='Usage Limit'
					{...usage_limit}
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

const mapStateToProps = state => {
	return {
		token: state.auth.token,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateVoucher: (token, data) =>
			dispatch(actions.createVoucher(token, data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateVoucher);
