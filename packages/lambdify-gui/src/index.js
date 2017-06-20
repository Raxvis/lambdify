import { Col, Grid, Row } from 'react-bootstrap';
import { Route, HashRouter as Router } from 'react-router-dom';
import Project from './components/Project';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import { store } from './store';

render(
	<Provider store={store}>
		<Router>
			<Grid fluid>
				<Row>
					<Col className="sidebar" sm={3}>
						<Nav />
					</Col>
					<Col className="content" sm={9}>
						<Route component={Dashboard} exact path="/" />
						<Route component={Project} exact path="/project/*" />
					</Col>
				</Row>
			</Grid>
		</Router>
	</Provider>,
	document.getElementById('app')
);
