import React, { Component } from 'react'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Snackbar from 'components/Snackbar/Snackbar'
import { get_item_menu, update_menu } from 'redux/action/actionMenu'
import { create_log } from 'redux/action/actionLog'

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center !important',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	menu: {
		width: 200,
	},
	grow: {
		flexGrow: 1,
	}
})

const jenis = [{
		value: 'makanan',
		label: 'Makanan',
	},
	{
		value: 'minuman',
		label: 'Minuman',
	},
]

const status = [{
		value: 'ready',
		label: 'Ready',
	},
	{
		value: 'stockout',
		label: 'Stock Out',
	},
]

class EditMenu extends Component {
	state = {
		item_menu: {
			nama_menu: '',
			harga_menu: '',
			jenis_menu: 'makanan',
			keterangan: '',
			status: 'ready'
		},
		errors: {
			nama_menu: false,
			harga_menu: false,
			jenis_menu: false,
			keterangan: false,
		},
		message:'',
		isSnackbarOpen: false
	}

	componentDidMount() {
		const { match, authentication } = this.props;

		this.props.get_item_menu(authentication.token, match.params.id)
			.then(result => {
				this.setState({ item_menu: result })
			})
			.catch(error => {
				console.log(error)
			})
	}

	handleInputChange = (event) => {
		this.setState({
			item_menu: {
				...this.state.item_menu,
				[event.target.id]: event.target.value
			}
		})
		this.setState({
			errors: {
				...this.state.errors,
				[event.target.id]: false
			}
		})
	}

	handleSnackbarShow = (message) =>{
		this.setState({ isSnackbarOpen: true, message: message })
		setTimeout(
			function() {
				this.setState({ isSnackbarOpen: false, message: ''  })
			}.bind(this),
			6000
		)
	}

	handleValidate = (data) => {	
		const errors = {}
		if (!data.nama_menu) errors.nama_menu = true
		if (!data.harga_menu) errors.harga_menu = true
		if (!data.jenis_menu) errors.jenis_menu = true
		if (!data.keterangan) errors.keterangan = true
		if (!data.status) errors.status = true
		return errors
	}

	handleEditMenu = () => {
		const { authentication } = this.props
		const { item_menu } = this.state

		const err = this.handleValidate(item_menu)
		this.setState({ errors: err })

		if (Object.keys(err).length === 0) {
			const newDate = new Date()
			const data = {
				nama_menu: item_menu.nama_menu,
				harga_menu: item_menu.harga_menu,
				jenis_menu: item_menu.jenis_menu,
				keterangan: item_menu.keterangan,
				status: item_menu.status,
				date_created: this.props.item_menu.date_created,
			}
			this.props.update_menu(authentication.token, this.props.item_menu.id, data)
				.then(result=> {
					const keterangan = `Edit Menu ${result.id}-${result.nama_menu}`
					this.props.create_log(authentication.token, authentication, keterangan)
				})
				.then(()=> {
					this.handleSnackbarShow('Edit Menu Success')
				})
				.catch(error => {
					let message = `Edit Menu Failed with error message: ${error.message}`
					this.handleSnackbarShow(message)
				})
		}
	}

	render() {
		const { classes, match, location, history } = this.props;
		const { item_menu, errors } = this.state

	    return (
			<Grid container justify='center'>
				<Grid item xs={12}>
					<Typography variant='h5' component='h3'>
						Page Edit Menu
					</Typography>
		        </Grid>
		        <Grid item xs={12}>
		        	<div className={classes.container}>
			        	<Link to={'/menu'}>
							<Button 
								variant='contained' 
								color='secondary' 
								className={classes.button}
							>
								Back
							</Button>
						</Link>
						<div className={classes.grow} />
						<Button
							variant='contained' 
							color='primary' 
							onClick={this.handleEditMenu}
						>
							Edit Menu
						</Button>
					</div>
		        </Grid>
				<Grid item xs={12}>
					<form className={classes.container} noValidate autoComplete='off'>
						<TextField
							error={errors.nama_menu}
							id='nama_menu'
							label='Nama Menu'
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								value: item_menu.nama_menu,
								onChange: this.handleInputChange,
							}}
						/>

						<TextField
							error={errors.harga_menu}
							id='harga_menu'
							label='Harga Menu'
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								type: 'number',
								value: item_menu.harga_menu,
								onChange: this.handleInputChange,
							}}
						/>

						<TextField
							select
							error={errors.jenis_menu}
							id='jenis_menu'
							label='Jenis Menu'
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							value= {item_menu.jenis_menu}
							onChange= {this.handleInputChange}
							SelectProps={{
								native: true,
								MenuProps: {
									className: classes.menu,
								},
							}}
						>
							{jenis.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</TextField>
						<TextField
							select
							error={errors.status}
							id='status'
							label='Status Menu'
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							value= {item_menu.status}
							onChange= {this.handleInputChange}
							SelectProps={{
								native: true,
								MenuProps: {
									className: classes.menu,
								},
							}}
						>
							{status.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</TextField>
						<TextField
							error={errors.keterangan}
							id='keterangan'
							label='Keterangan'
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								value: item_menu.keterangan,
								onChange: this.handleInputChange,
							}}
						/>
					</form>
				</Grid>
				<Snackbar
					place='tr'
					icon={'add_alert'}
					message={this.state.message || 'add menu success'}
					isSnackbarOpen={this.state.isSnackbarOpen}
					closeNotification={() => this.setState({ isSnackbarOpen: false })}
				/>
			</Grid>
	    )
	}
}

const mapStateToProps = state => ({
	authentication: state.login,
	item_menu:state.menu.item_menu
})

export default compose(
	withRouter,
	withStyles(styles, {withTheme: true}),
	connect( mapStateToProps, { 
		get_item_menu,
		update_menu,
		create_log 
	})
)(EditMenu)
