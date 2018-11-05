import * as React from 'react';
import {
	AppBar,
	Button,
	Toolbar,
	Typography
	} from '@material-ui/core';
import { CSSProperties } from 'react';

const styles: CSSProperties = {
	flexGrow: 1,
};

const siteNav: React.SFC = () => (
	<AppBar position="static" color="primary">
		<Toolbar>
			<Typography variant="h6" color="inherit" style={styles}>
				Test
			</Typography>
			<Button color="inherit">Login</Button>
			<Button color="inherit">Sign Up</Button>
		</Toolbar>
	</AppBar>
);

export default siteNav;
