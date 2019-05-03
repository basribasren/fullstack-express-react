import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Select from 'react-select'

import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import InputAdornment from '@material-ui/core/InputAdornment'
import Chip from '@material-ui/core/Chip'
import LocalDrink from '@material-ui/icons/LocalDrink'
import Menu from '@material-ui/icons/Fastfood'
import Trash from '@material-ui/icons/Delete'

import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Snackbar from 'components/Snackbar/Snackbar'
import ListMenu from 'views/PageMenu/ListMenu'
import { create_pesanan, get_nomor_pesanan } from 'redux/action/actionPesanan'
import { get_list_menu_ready, get_item_menu } from 'redux/action/actionMenu'
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
	},
	inline: {
		display: 'inline',
	},
	chip: {
		margin: theme.spacing.unit,
	},
	button: {
		margin: theme.spacing.unit,
	},
})

class AddPesanan extends Component {
	state = {
		item_pesanan: {
			nama_pelanggan: '',
			nomor_pesanan: '',
			status_pesanan: 'aktif',
			nomor_meja: '',
			daftar_pesanan:[],
			total_harga: 0,
		},
		daftar_menu: [],
		errors: {},
		message:'',
		isSnackbarOpen: false
	}
	
	handleInitialPesanan = () => {
		this.props.get_nomor_pesanan(this.props.authentication.token)
			.then(nomor_pesanan => {
				this.setState({
					item_pesanan: {
						...this.state.item_pesanan,
						nomor_pesanan: nomor_pesanan
					}
				})
			})
	}
	
	handleGenerateMenu = () => {
		const daftar_menu = this.props.list_menu.map(option => (
			{
				value: option.id,
				label: option.nama_menu,
			}
		))
		this.setState({daftar_menu: daftar_menu})
	}

	componentDidMount() {
		this.props.get_list_menu_ready(this.props.authentication.token)
			.then(()=> {
				{/*genereate initial data pesanan*/}
				this.handleInitialPesanan()
				{/*genereate data data menu*/}
				this.handleGenerateMenu()
			})
	}
	
	handleChooseMenu = (selectedOption) => {
		let total_harga = this.state.item_pesanan.total_harga

		this.props.get_item_menu(this.props.authentication.token, selectedOption.value)
			.then(result=>{
				total_harga = total_harga + result.harga_menu
				this.setState({ 
					item_pesanan: {
						...this.state.item_pesanan,
						total_harga: total_harga,
						daftar_pesanan: [
							...this.state.item_pesanan.daftar_pesanan,
							result
						]
					}
				})
			})
	}
	
	handleCancelMenu = (data) => {
		let total_harga = this.state.item_pesanan.total_harga
		let quantity = 0
		let count = []
		count = this.state.item_pesanan.daftar_pesanan.filter(item => {
			return item.id === data.id
		})
		quantity = count.length
		total_harga = total_harga - (data.harga_menu * quantity)

		this.setState({ 
			item_pesanan: {
				...this.state.item_pesanan,
				total_harga: total_harga,
				daftar_pesanan: this.state.item_pesanan.daftar_pesanan.filter(function(item) { 
			        return item.id !== data.id
			    })
			}
		})
	}
	
	
	handleInputChange = (event) => {
		this.setState({
			item_pesanan: {
				...this.state.item_pesanan,
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
		if (!data.nama_pelanggan) errors.nama_pelanggan = true
		if (!data.nomor_pesanan) errors.nomor_pesanan = true
		if (!data.nomor_meja) errors.nomor_meja = true
		return errors
	}
	
	createDataPesanan = (item_pesanan, id_account) => {
		// issue (jika kasir menambahkan pesanan maka id_pelayan akan diisi dengan id miliki kasir)
		const newDate = new Date()
		const date_created = newDate.toDateString()
		const data = {
			nama_pelanggan: item_pesanan.nama_pelanggan,
			nomor_pesanan: item_pesanan.nomor_pesanan,
			status_pesanan: 'aktif',
			nomor_meja: item_pesanan.nomor_meja,
			daftar_pesanan: item_pesanan.daftar_pesanan,
			total_harga: item_pesanan.total_harga,
			id_kasir: 'sample',
			id_pelayan: id_account,
			date_created: date_created,
		}
		return data
	}
	
	handleCreatePesanan = () => {
		const { authentication } = this.props
		const { item_pesanan } = this.state

		const err = this.handleValidate(item_pesanan)
		this.setState({ errors: err })

		if (Object.keys(err).length === 0) {
			const data = this.createDataPesanan(item_pesanan, authentication.id_account)
			// console.log(data)
			this.props.create_pesanan(authentication.token, data)
				.then(result => {					
					const keterangan = `Edit Pesanan ${result.id}-${result.nama_pelanggan}`
					this.props.create_log(authentication.token, authentication, keterangan)
					this.handleInitialPesanan()
				})
				.then(()=> {
					this.handleSnackbarShow('Add Menu Success')
				})
				.catch(error => {
					const message = `Add Pesanan Failed with error message: ${error.message}`
					this.handleSnackbarShow(message)
				})
		}
	}

	render() {
		const { classes } = this.props
		const { 
			item_pesanan, 
			daftar_menu, 
			errors, 
			message, 
			isSnackbarOpen 
		} = this.state
		
		return (
			<Grid container justify='center'>
				<Grid item xs={12}>
					<Typography variant='h5' component='h3'>
						Page Add Pesanan
					</Typography>
		        </Grid>
		        <Grid item xs={12}>
		        	<div className={classes.container}>
			        	<Link to={'/pesanan'}>
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
							onClick={this.handleCreatePesanan}
						>
							Tambah Pesanan
						</Button>
					</div>
		        </Grid>
				<Grid item xs={12}>
					{/*berisi list daftar menu*/}
					<form className={classes.container} noValidate autoComplete='off'>
						<TextField
							error={errors.nama_pelanggan}
							id='nama_pelanggan'
							label='Nama Pelanggan'
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								value: item_pesanan.nama_pelanggan,
								onChange: this.handleInputChange,
							}}
						/>
						<TextField
							error={errors.nomor_pesanan}
							id='nomor_pesanan'
							label='Nomor Pesanan'
							className={classes.textField}
							fullWidth
							readOnly
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								value: item_pesanan.nomor_pesanan,
							}}
						/>
						<TextField
							error={errors.nomor_meja}
							id='nomor_meja'
							label='Nomor Meja'
							className={classes.textField}
							fullWidth
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								value: item_pesanan.nomor_meja,
								onChange: this.handleInputChange,
							}}
						/>
					</form>
				</Grid>
				<Grid item xs={8}>
			        <Select					
						onChange={this.handleChooseMenu}
				        className={classes.textField}
						options={daftar_menu}
					/>
		        </Grid>
				<Grid item xs={4}>
		        	<TextField
				        id="total_harga"
				        className={classes.textField}
				        variant="outlined"
				        label="Total Harga"
				        InputProps={{
							value: item_pesanan.total_harga,
							onChange: this.handleInputChange,
				          	startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
				        }}
				    />
		        </Grid>
		        <Grid item xs={12}>
					<List className={classes.root}>
						{item_pesanan.daftar_pesanan.map((item, key) => {
							return (
								<React.Fragment key={key}>
									<ListMenu 
										item={item}
										url='pesanan' 
										handleDeleteMenu={()=>{
											this.handleCancelMenu(item)
										}}
									/>
									<Divider light />
								</React.Fragment>
							)
						})}
					</List>
		        </Grid>
				
		        <Snackbar
					place='tr'
					icon={'add_alert'}
					message={message}
					isSnackbarOpen={isSnackbarOpen}
					closeNotification={() => this.setState({ isSnackbarOpen: false })}
				/>
			</Grid>
		)
	}
}

const mapStateToProps = state => ({
	authentication: state.login,
	list_menu: state.menu.list_menu_ready
})

export default compose(
	withStyles(styles, {withTheme: true}),
	connect( mapStateToProps, { 
		create_pesanan, create_log, get_list_menu_ready, get_item_menu, get_nomor_pesanan 
	})
)(AddPesanan)
