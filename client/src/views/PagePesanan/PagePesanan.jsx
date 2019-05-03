import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Add from '@material-ui/icons/AddCircle'

import Snackbar from 'components/Snackbar/Snackbar'
import ListPesanan from './ListPesanan'
import { get_list_pesanan, delete_pesanan, close_pesanan } from 'redux/action/actionPesanan'
import { create_log } from 'redux/action/actionLog'

const styles = theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
	chip: {
		margin: theme.spacing.unit,
	},
	grow: {
		flexGrow: 1,
	},
	button: {
		margin: theme.spacing.unit,
	},
})

class PagePesanan extends Component {
	state = {
		message:'',
		isSnackbarOpen: false
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

	componentDidMount() {
		this.props.get_list_pesanan(this.props.authentication.token)
			.then(() => {
				console.log('Load list pesanan done')
			})
			.catch(error => {
				this.handleSnackbarShow(`Load Data Pesanan Failed with error message: ${error.message}`)
			})
	}

	handleDeletePesanan = (id_pesanan, nama_pelanggan) => {
		const {authentication} = this.props

		this.props.delete_pesanan(authentication.token, id_pesanan)
			.then(()=> {
				this.handleSnackbarShow('Delete Pesanan Success')
			})
			.then(()=> {
				const keterangan = `Delete Pesanan ${id_pesanan}-${nama_pelanggan}`
				this.props.create_log(authentication.token, authentication, keterangan)
			})
			.then(() => {
				this.props.get_list_pesanan(authentication.token)
			})
			.catch(error => {
				this.handleSnackbarShow(`Delete Pesanan Failed with error message: ${error.message}`)
			})
	}

	handleClosePesanan = (authentication, data) => {

		this.props.close_pesanan(authentication, data.id, data)
			.then(()=> {
				this.handleSnackbarShow('Close Pesanan Success')
			})
			.then(()=> {
				const keterangan = `Close Pesanan ${data.id}-${data.nama_pelanggan}`
				this.props.create_log(authentication.token, authentication, keterangan)
			})
			.then(() => {
				this.props.get_list_pesanan(authentication.token)
			})
			.catch(error => {
				this.handleSnackbarShow(`Close Pesanan Failed with error message: ${error.message}`)
			})
	}

	render() {
		const { classes, list_pesanan, authentication } = this.props

		return (
			<Grid container justify='center'>
				<Grid item xs={12}>
					<Typography variant='h5' component='h3'>
						Page List Pesanan
					</Typography>
					<Link to={'/pesanan/add'}>
						<Button 
							variant='contained' 
							color='primary' 
							className={classes.button}
						>
							{/*disabled= {this.props.status.online ? (true) : (false) }*/}
							<Add /> Add Pesanan
						</Button>
					</Link>
					{/*berisi list daftar menu*/}
					<List className={classes.root}>
						{list_pesanan.map((item, key) => {
							return (
								<React.Fragment key={key}>
									<ListPesanan 
										role={authentication.role}										
										item={item} 
										url='pesanan'
										handleDeletePesanan={()=>{
											this.handleDeletePesanan(item.id, item.nama_pelanggan)
										}}
										handleClosePesanan={()=>{
											this.handleClosePesanan(authentication, item)
										}}
									/>
									<Divider light />
								</React.Fragment>
							)
						})}
					</List>
					<Snackbar
						place='tr'
						icon={'add_alert'}
						message={this.state.message || 'add menu success'}
						isSnackbarOpen={this.state.isSnackbarOpen}
						closeNotification={() => this.setState({ isSnackbarOpen: false })}
					/>
				</Grid>
			</Grid>
		)
	}
}

const mapStateToProps = state => ({
	authentication: state.login,
	status: state.layout,
	list_pesanan: state.pesanan.list_pesanan
})

export default compose(
	withStyles(styles, {withTheme: true}),
	connect( mapStateToProps, { 
		get_list_pesanan, delete_pesanan, create_log, close_pesanan
	})
)(PagePesanan)