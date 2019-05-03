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

import Snackbar from 'components/Snackbar/Snackbar'
import { login } from 'redux/action/actionLogin'
import { create_log } from 'redux/action/actionLog'

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
		message:'',
		isSnackbarOpen: false
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

	handleSnackbarShow = (message) =>{
		this.setState({ isSnackbarOpen: true, message: message })
		setTimeout(
			function() {
				this.setState({ isSnackbarOpen: false, message: '' })
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

	handleLogin = () => {
		const errors = this.handleValidate(this.state.username, this.state.password)
		this.setState({ errors })

		if (Object.keys(errors).length === 0) {
			this.props.login(this.state.username, this.state.password)
				.then(result => {
					{/*
						created: '2019-04-25T14:25:58.100Z'
						id: 'RKDFbDt76cxmSzxVTVCbO5df66BvtQ3WymEW6bfimG81SO5NBeCjekdPKu8GCBkh'
						ttl: 1209600
						user:
							email: 'admin@gmail.com'
							id: '5c8525546e3b3b328cb42e07'
							realm: 'admin'
							username: 'admin'
						__proto__: Object
						userId: '5c859asdh3249adasd24k'
					*/}
					const keterangan = `Login ke Dalam Sistem`
					const data = {
						username: result.user.username,
						id_account: result.userId 
					}
					this.props.create_log(result.id, data, keterangan)
				})
				.catch(error => {
					this.setState({
						errors: {
							username: true,
							password: true
						}
					})
					this.handleSnackbarShow(`Login Failed with error message: ${error.message}`)
				})
		}
	}

	render() {
		const { classes } = this.props
		const { errors, isSnackbarOpen } = this.state
		return (
			<Grid container justify='center'>
				<Grid item xs={12} sm={4} md={4}>
					<Paper className={classes.root} elevation={1}>
						<Typography variant='h5' component='h3' className={classes.headerLogin}>
							Login
						</Typography>
						<form className={classes.container} noValidate autoComplete='off'>
							<TextField
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
							<TextField
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
							<Button variant='contained' color='primary' onClick={this.handleLogin}>
								Masuk
							</Button>
						</form>
												
						<Snackbar
							place='tr'
							icon={'add_alert'}
							message={this.state.message}
							isSnackbarOpen={isSnackbarOpen}
							closeNotification={() => this.setState({ isSnackbarOpen: false })}
						/>
					</Paper>
				</Grid>
			</Grid>
		)
	}
}

PageLogin.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default compose(
	withStyles(styles, { withTheme: true }),
	connect( null, { login, create_log })
)(PageLogin)