import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'

import { login } from 'redux/action/actionLogin'
import {
	showSnackbar,
	closeSnackbar,
} from 'redux/action/actionSnackbar'

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 140,
		width: 100,
	},
	headerLogin: {
		width: 'auto',
		textAlign: 'center',
		padding: '20px 0',
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center !important',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	dense: {
		marginTop: 16,
	},
	menu: {
		width: 200,
	},
	grow: {
		flexGrow: 1,
	},
})


class PageLogin extends Component {
	state = {
		username: '',
		password: '',
		errors: {
			username: false,
			password: false
		},
	}

	handleInputChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		})
		this.setState({
			errors: {
				[event.target.id]: false
			}
		})
	}

	handleCloseSnackbar() {
		setTimeout(
			function() {
				this.props.closeSnackbar()
			}.bind(this),
			6000
		)
	}

	handleValidate = (username, password) => {
		const errors = {}
		if (!username) errors.username = true
		if (!password) errors.password = true
		return errors
	}

	handleSetLog = (result) => {
		const data = {
			username: result.username,
			id_account: result._id,
			keterangan: 'Login ke dalam sistem'
		}
		return data
	}

	handleSetError = (message) => {
		this.setState({
			errors: {
				username: true,
				password: true,
			}
		})
		return this.props.showSnackbar('', message)
	}

	handleLogin = () => {
		const { username, password } = this.state
		const errors = this.handleValidate(username, password)
		this.setState({ errors })

		if (Object.keys(errors).length === 0) {
			this.props.login(username, password)
				.then(result => {
					let log = this.handleSetLog(result)
					return log
				})
				.catch(error => {
					let message = `Login Failed with error message: ${error.message}`
					this.handleSetError(message)
				})
		}
	}

	render() {
		const { classes } = this.props
		const { errors } = this.state

		const textFieldUsername = <TextField
			error={errors.username}
			id='username'
			label='username'
			className={classes.textField}
			margin='normal'
			fullWidth
			variant='outlined'
			InputProps={{
				value: this.state.username,
				onChange: this.handleInputChange,
				startAdornment: (
					<InputAdornment position='start'>
						<AccountCircle />
					</InputAdornment>
				),
			}}
		/>
		const textFieldPassword = <TextField
			error={errors.password}
			id='password'
			label='Password'
			className={classes.textField}
			autoComplete='current-password'
			margin='normal'
			fullWidth
			variant='outlined'
			InputProps={{
				value: this.state.password,
				onChange: this.handleInputChange,
				type: 'password',
				startAdornment: (
					<InputAdornment position='start'>
						<Lock />
					</InputAdornment>
				),
			}}
		/>
		return (
			<Grid container justify='center'>
				<Grid item xs={12} sm={4} md={4}>
					<Paper className={classes.root} elevation={1}>
						<Typography variant='h5' component='h3' className={classes.headerLogin}>
							Login
						</Typography>
						<form className={classes.container} noValidate autoComplete='off'>
							{textFieldUsername}
							{textFieldPassword}
							<Button variant='contained' color='primary' onClick={this.handleLogin}>
								Masuk
							</Button>
						</form>
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

PageLogin.propTypes = {
	classes: PropTypes.object.isRequired,
	snackbar: state.snackbar,
}

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(null, {
		login,
		showSnackbar,
		closeSnackbar,
	})
)(PageLogin)
