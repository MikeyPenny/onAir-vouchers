import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Toolbar.module.css';

const Toolbar = props => {
	return (
		<header className={classes.Toolbar}>
			<nav className={classes.DesktopOnly}>
				<NavigationItems isAuth={props.auth} />
			</nav>
		</header>
	);
};

export default Toolbar;
