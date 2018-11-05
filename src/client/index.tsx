import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SiteNav from './components/shared/SiteNav';
import SubNav from './components/shared/SubNav';
import theme from './components/shared/theme';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';

const app: JSX.Element = (
	<MuiThemeProvider theme={theme}>
		<BrowserRouter>
			<>
				<SiteNav />
				<SubNav />
				{/*<Route exact path="/" component={Home} />*/}
			</>
		</BrowserRouter>
	</MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById("react-app"));
