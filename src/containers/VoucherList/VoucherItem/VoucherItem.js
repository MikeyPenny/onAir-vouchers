import React from 'react';
import classes from './VoucherItem.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { useHistory } from 'react-router-dom';

const VoucherItem = props => {
	const history = useHistory();

	const selectVoucherHandler = voucherId => {
		props.onSelectVoucher(voucherId);
		history.push('/add-asset');
	};

	return (
		<li className={classes.Voucher}>
			<div className={classes.Detail}>{props.voucherName}</div>
			<div className={classes.Detail}>{props.discount}</div>
			<div className={classes.Detail}>{props.code}</div>
			<div className={classes.Button}>
				<button onClick={() => selectVoucherHandler(props.voucherId)}>
					Add Asset
				</button>
			</div>
		</li>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		onSelectVoucher: id => dispatch(actions.selectVoucher(id)),
	};
};

export default connect(null, mapDispatchToProps)(VoucherItem);
