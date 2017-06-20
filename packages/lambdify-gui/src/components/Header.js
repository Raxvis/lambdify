import React from 'react';

const app = (props) => (
	<div className="dashhead">
		<div className="dashhead-titles">
			<h6 className="dashhead-subtitle">AWS Lambda Deployment Tool</h6>
			<h2 className="dashhead-title">{props.title}</h2>
		</div>
		<div className="btn-toolbar dashhead-toolbar" />
	</div>
);

export default app;