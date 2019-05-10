import React from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Fade from '@material-ui/core/Fade'
import Icon from '@material-ui/core/Icon'

import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'

import publicSwitch from 'switch/public'
import kasirSwitch from 'switch/kasir'
import pelayanSwitch from 'switch/pelayan'

import {
	getStatusConnection,
	getMetadataConnection
} from 'redux/action/actionLayout'

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
		isSnackbarOpen: false
	}

	handleDrawerOpen = () => {
		this.setState({ isDrawerOpen: true })
	}

	handleDrawerClose = () => {
		this.setState({ isDrawerOpen: false })
	}

	handleSnackbarShow(status) {
		this.props.getStatusConnection(status)
		this.setState({ isSnackbarOpen: true })
		setTimeout(
			function() {
				this.handleSnackbarClose()
			}.bind(this),
			6000
		)
	}

	handleSnackbarClose = () => {
		this.setState({ isSnackbarOpen: false })
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
			this.handleSnackbarShow(true)
		})
		window.addEventListener('offline', () => {
			this.handleSnackbarShow(false)
		})
		if (navigator.onLine) {
			this.handleSnackbarShow(true)
		} else {
			this.handleSnackbarShow(false)
		}
	}

	render() {
		const { classes, connection, authentication, ...rest } = this.props
		const message = connection.online ? 'Online' : 'Offline'
		// const color = connection.online ? 'success' : 'danger'
		const icon = connection.online ? 'signal_wifi_3_bar' : 'signal_wifi_off'
		let content

		if (authentication.isAuthenticated) {
			if (authentication.role === 'kasir') {
				content = <div className={classes.map}>{kasirSwitch}</div>
			} else {
				content = <div className={classes.map}>{pelayanSwitch}</div>
			}
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
				<Snackbar
					className={classes.snackbar}
					open={this.state.isSnackbarOpen}
					onClose={()=>this.handleSnackbarClose}
					TransitionComponent={Fade}
					ContentProps={{
						'aria-describedby': 'message-id',
						className: classes.snackbarContent,
					}}
					action={
						<Button color='inherit' size='small' onClick={this.handleSnackbarClose}>
							{message}
						</Button>
					}
					message={
						<div>
							{icon !== undefined ? <Icon>{icon}</Icon> : null}
							<span id='message-id'>{message}</span>
						</div>
					}
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
	authentication: state.login
})

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(
		mapStateToProps, {
			getStatusConnection,
			getMetadataConnection
		}
	)
)(AppShell)
