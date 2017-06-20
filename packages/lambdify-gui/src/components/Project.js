import Header from './Header';
import React from 'react';

const app = (props) => (
	<div>
		<Header title={`Project ${props.location.pathname}`} />
		<hr className="m-t" />
	</div>
);

export default app;