import React from 'react';
import VoucherItem from './VoucherItem/VoucherItem';

import classes from './VoucherList.module.css';

const VoucherList = props => {
	return (
		<section>
			<ul className={classes.VoucherList}>
				{props.vouchers.length > 0
					? props.vouchers.map(voucher => (
							<VoucherItem
								key={voucher.id}
								code={voucher.code}
								voucherName={voucher.name}
								voucherId={voucher.id}
								discount={voucher.discount}
							/>
					  ))
					: 'There are no vouchers'}
			</ul>
		</section>
	);
};

export default VoucherList;
