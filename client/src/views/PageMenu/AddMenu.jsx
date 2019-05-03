import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Snackbar from 'components/Snackbar/Snackbar'
import { create_menu } from 'redux/action/actionMenu'
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

class AddMenu extends Component {
	state = {
		item_menu: {
			nama_menu: '',
			harga_menu: 0,
			jenis_menu: 'makanan',
			keterangan: '',
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
		return errors
	}

	handleCreateMenu = () => {
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
				status: 'ready',
				date_created: newDate,
			}
			this.props.create_menu(authentication.token, data)
				.then(result=> {
					const keterangan = `Add Menu ${result.id}-${result.nama_menu}`
					this.props.create_log(authentication.token, authentication, keterangan)
				})
				.then(()=> {
					this.handleSnackbarShow('Add Menu Success')
				})
				.catch(error => {
					let message = `Add Menu Failed with error message: ${error.message}`
					this.handleSnackbarShow(message)
				})
		}
	}

	render() {
		const { classes, create_menu } = this.props
		const { item_menu, errors, isSnackbarOpen } = this.state
		return (
			<Grid container justify='center'>
				<Grid item xs={12}>
					<Typography variant='h5' component='h3'>
						Page Add Menu
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
							onClick={this.handleCreateMenu}
						>
							Tambah Menu
						</Button>
					</div>
		        </Grid>
				<Grid item xs={12}>
					{/*berisi list daftar menu*/}
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
					message={this.state.message}
					isSnackbarOpen={isSnackbarOpen}
					closeNotification={() => this.setState({ isSnackbarOpen: false })}
				/>
			</Grid>
		)
	}
}

const mapStateToProps = state => ({
	authentication: state.login
})

export default compose(
	withStyles(styles, {withTheme: true}),
	connect( mapStateToProps, { create_menu, create_log })
)(AddMenu)