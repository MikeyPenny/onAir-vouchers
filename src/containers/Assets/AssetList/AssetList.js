import React from 'react';
import AssetItem from './AssetItem/AssetItem';
import classes from './AssetList.module.css';

const AssetList = props => {
	return (
		<ul className={classes.AssetList}>
			{props.assets.length > 0
				? props.assets.map(asset => (
						<AssetItem key={asset.id} assetValue={asset.value} />
				  ))
				: 'No assets for this voucher'}
		</ul>
	);
};

export default AssetList;
