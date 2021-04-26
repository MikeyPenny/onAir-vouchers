import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.module.css';

const Layout = props => {
	return (
		<div className={classes.Layout}>
			<Toolbar />
			<main className={classes.Content}>{props.children}</main>
		</div>
	);
};

export default Layout;
