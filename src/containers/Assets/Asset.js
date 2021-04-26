import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './Asset.module.css';
import AssetList from './AssetList/AssetList';
import Spinner from '../../components/UI/Spinner/Spinner';

const Asset = props => {
	const {
		token,
		voucherId,
		onAddAsset,
		voucher,
		isLoading,
		onFetchAssets,
		assets,
	} = props;
	const assetId = useInputForm('82003');

	useEffect(() => {
		if (isLoading) {
			const timer = setTimeout(() => {
				onFetchAssets(token, voucherId);
			}, 1500);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [isLoading, onFetchAssets, token, voucherId]);

	const submitAssetHandler = e => {
		e.preventDefault();
		onAddAsset(token, voucherId, assetId.value);
	};

	const assetList = useMemo(() => {
		return <AssetList assets={assets} />;
	}, [assets]);

	return (
		<div className={classes.Container}>
			<section className={classes.Details}>
				<div className={classes.VouchInfo}>
					<h3>Voucher Data</h3>
					<p>Voucher name: {voucher.name}</p>
					<p>Code: {voucher.code}</p>
					<p>Discount: {voucher.discount}</p>
				</div>
				<div className={classes.AssetsList}>
					<h3>Assets</h3>
					{isLoading ? <Spinner /> : assetList}
				</div>
			</section>
			<form
				className={classes.Asset}
				onSubmit={e => submitAssetHandler(e)}
			>
				<input type='text' placeholder='Asset Id Number' {...assetId} />
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
		voucherId: state.voucher.voucher.id,
		voucher: state.voucher.voucher,
		isLoading: state.voucher.isLoading,
		assets: state.voucher.assets,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddAsset: (token, voucherId, assetId) =>
			dispatch(actions.addVoucherAsset(token, voucherId, assetId)),
		onFetchAssets: (token, voucherId) =>
			dispatch(actions.fetchAssets(token, voucherId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Asset);
