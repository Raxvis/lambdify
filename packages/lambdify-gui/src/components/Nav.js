import { Link } from 'react-router-dom';
import React from 'react';
import { actions } from './../redux';
import { connect } from 'react-redux';
import { getProjectName } from 'utils/project';
import { withRouter } from 'react-router';

const { dialog } = require('electron').remote;

class Nav extends React.Component {

	addProject (filePaths) {
		if (filePaths.length === 0) {
			return;
		}

		const [folder] = filePaths;
		const project = {
			folder,
			name: getProjectName(folder)
		};

		this.props.addProject(project);
	}

	selectFolder () {
		dialog.showOpenDialog({
			buttonLabel: 'Add Project',
			createDirectory: true,
			properties: ['openDirectory'],
			title: 'Add Project Folder'
		}, (filePaths) => {
			this.addProject(filePaths);
		});
	}

	render () {
		return (
			<nav className="sidebar-nav">
				<div className="sidebar-header">
					<button
						className="nav-toggler nav-toggler-sm sidebar-toggler"
						data-target="#nav-toggleable-sm"
						data-toggle="collapse"
						type="button"
					>
						<span className="sr-only">Toggle nav</span>
					</button>
					<a className="sidebar-brand img-responsive">
						<img className="img-responsive" src="assets/img/icon/128x128.png" />
					</a>
				</div>

				<div className="collapse nav-toggleable-sm" id="nav-toggleable-sm">
					<ul className="nav nav-pills nav-stacked">
						<li className={this.props.location.pathname === "/" && 'active'}>
							<Link to="/">Dashboard</Link>
						</li>
						<li className="nav-header">Projects</li>
						{this.props.projects && this.props.projects.map((project, index) => (
							<li className={this.props.location.pathname === `/project/${project.name}` && 'active'} key={index}>
								<Link to={`/project/${project.name}`}>{project.name}</Link>
							</li>
						))}
						<li className={this.props.location.pathname === "/add" && 'active'}>
							<a onClick={() => this.selectFolder()}>+ Add Project</a>
						</li>

						<li className="nav-header">More</li>
						<li className={this.props.location.pathname === "/credentials" && 'active'}>
							<Link to="/credentials">AWS Credentials</Link>
						</li>
					</ul>
					<hr className="visible-xs m-t" />
				</div>
			</nav>
		);
	}
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = { addProject: actions.projects.addProject };
const connected = connect(mapStateToProps, mapDispatchToProps)(Nav);
const navLocation = withRouter(connected);


export default navLocation;