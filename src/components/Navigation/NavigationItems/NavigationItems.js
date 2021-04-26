import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

import { connect } from 'react-redux';

const NavigationItems = props => {
	const { isAuthenticated } = props;

	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link='/' exact>
				Home
			</NavigationItem>
			{isAuthenticated ? (
				<NavigationItem link='/voucher'>Vouchers</NavigationItem>
			) : null}
			{isAuthenticated ? (
				<NavigationItem link='/logout'>Logout</NavigationItem>
			) : (
				<NavigationItem link='/login'>Login</NavigationItem>
			)}
		</ul>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(NavigationItems);
