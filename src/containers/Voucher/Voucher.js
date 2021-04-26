import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import classes from './Voucher.module.css';
import * as actions from '../../store/actions/index';
import VoucherList from '../VoucherList/VoucherList';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

const Voucher = props => {
	const { isLoading, onFetchVouchers, token, vouchers } = props;
	const history = useHistory();

	useEffect(() => {
		if (isLoading) {
			const timer = setTimeout(() => {
				onFetchVouchers(token);
			}, 1500);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [isLoading, onFetchVouchers, token]);

	const voucherList = useMemo(() => {
		return <VoucherList vouchers={vouchers} />;
	}, [vouchers]);

	const onCreateVoucherHandler = () => {
		history.push('/create');
	};

	return (
		<section className={classes.Voucher}>
			<header className={classes.Header}>
				<h3>Vouchers List</h3>
			</header>
			<section className={classes.Content}>
				<div className={classes.ListHeader}>
					<h3 className={classes.Headers}>Voucher Name</h3>
					<h3 className={classes.Headers}>Discount</h3>
					<h3 className={classes.Headers}>Code</h3>
					<h3 className={classes.Headers}>Assets</h3>
				</div>
				{isLoading ? <Spinner /> : voucherList}
			</section>
			<footer className={classes.Footer}>
				<div className={classes.Row}>
					<button onClick={onCreateVoucherHandler}>
						Create CSV File
					</button>
					<button onClick={onCreateVoucherHandler}>
						Create Voucher
					</button>
				</div>
			</footer>
		</section>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.voucher.isLoading,
		vouchers: state.voucher.vouchers,
		token: state.auth.token,
		voucher: state.voucher.voucher,
	};
};

const mapDispatchToprops = dispatch => {
	return {
		onFetchVouchers: token => dispatch(actions.fetchVouchers(token)),
	};
};

export default connect(mapStateToProps, mapDispatchToprops)(Voucher);
