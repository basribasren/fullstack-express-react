import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Icon from '@material-ui/core/Icon'

import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
import Snackbar from 'components/Snackbar/Snackbar'

import publicSwitch from 'switch/public'
import adminSwitch from 'switch/admin'
import {
	getStatusConnection,
	getMetadataConnection,
} from 'redux/action/actionLayout'
import {
	showSnackbar,
	closeSnackbar,
} from 'redux/action/actionSnackbar'

const styles = theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
	snackbar: {
		position: 'absolute',
	},
	snackbarContent: {
		width: 360,
	},
})

class AppShell extends React.Component {
	state = {
		isDrawerOpen: false,
	}

	handleDrawerOpen = () => {
		this.setState({ isDrawerOpen: true })
	}

	handleDrawerClose = () => {
		this.setState({ isDrawerOpen: false })
	}

	handleCloseSnackbar() {
		setTimeout(
			function() {
				this.props.closeSnackbar()
			}.bind(this),
			6000
		)
	}

	getConnection() {
		return (
			navigator.connection ||
			navigator.mozConnection ||
			navigator.webkitConnection ||
			navigator.msConnection
		)
	}

	componentDidMount() {
		var connectionMetadata = this.getConnection()
		if (connectionMetadata) {
			this.props.getMetadataConnection(connectionMetadata)
		}

		window.addEventListener('online', () => {
			this.props.getStatusConnection(true)
		})
		window.addEventListener('offline', () => {
			this.props.getStatusConnection(true)
		})
		if (navigator.onLine) {
			this.props.showSnackbar('signal_wifi_3_bar', 'Online')
			this.handleCloseSnackbar()
		} else {
			this.props.showSnackbar('signal_wifi_off', 'Offline')
			this.handleCloseSnackbar()
		}
	}

	render() {
		const { classes, connection, authentication, snackbar, ...rest } = this.props
		let content

		if (authentication.isAuthenticated) {
			content = <div className={classes.map}>{adminSwitch}</div>
		} else {
			content = <div className={classes.map}>{publicSwitch}</div>
		}
		return (
			<div className={classes.root}>
				<CssBaseline />
				{/* Header/Appbar goes here */}
				<Header 
					isDrawerOpen={this.state.isDrawerOpen}
					data={authentication}
					brand="GC-STRORE"
					handleDrawerOpen={this.handleDrawerOpen}
				/>
				{/* Sidebar/Drawer goes here */}
				<Sidebar 
					isDrawerOpen={this.state.isDrawerOpen}
					data={authentication}
					handleDrawerClose={this.handleDrawerClose}
					{...rest}
				/>
				{/* Content/Main goes here */}
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{content}
				</main>
				{/* Notification goes here*/}
				<Snackbar
					place='tr'
					className={classes.snackbar}
					isSnackbarOpen={snackbar.isSnackbarOpen}
					closeNotification={this.props.closeSnackbar}
					icon={snackbar.icon}
					message={snackbar.message}
				/>
			</div>
		)
	}
}

AppShell.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	connection: state.layout,
	authentication: state.login,
	snackbar: state.snackbar,
})

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(
		mapStateToProps, {
			getStatusConnection,
			getMetadataConnection,
			showSnackbar,
			closeSnackbar,
		}
	)
)(AppShell)
