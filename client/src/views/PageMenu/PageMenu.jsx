import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import LocalDrink from '@material-ui/icons/LocalDrink'
import Menu from '@material-ui/icons/Fastfood'
import Edit from '@material-ui/icons/Edit'
import Trash from '@material-ui/icons/Delete'
import Add from '@material-ui/icons/AddCircle'

import Snackbar from 'components/Snackbar/Snackbar'
import ListMenu from './ListMenu'
import { get_list_menu, delete_menu } from 'redux/action/actionMenu'

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


class PageMenu extends Component {
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
		this.props.get_list_menu(this.props.authentication.token)
			.then(() => {
				console.log('Load list menu done')
			})
			.catch(error => {
				this.handleSnackbarShow(`Load Menu Failed with error message: ${error.message}`)
			})
	}

	handleDeleteMenu = (id_menu, nama_menu) => {
		const {authentication} = this.props

		this.props.delete_menu(authentication.token, id_menu)
			.then(()=> {
				this.handleSnackbarShow('Delete Menu Success')
			})
			.then(()=> {
				const keterangan = `Delete Menu ${id_menu}-${nama_menu}`
				this.props.create_log(authentication.token, authentication, keterangan)
			})
			.then(() => {
				this.props.get_list_menu(authentication.token)
			})
			.catch(error => {
				this.handleSnackbarShow(`Delete Menu Failed with error message: ${error.message}`)
			})
	}

	render() {
		const { classes, list_menu } = this.props

		return (
			<Grid container justify='center'>
				<Grid item xs={12}>
					<Typography variant='h5' component='h3'>
						Page List Menu
					</Typography>
					<Link to={'/menu/add'}>
						<Button 
							variant='contained' 
							color='primary' 
							className={classes.button}
						>
							{/*disabled= {this.props.status.online ? (true) : (false) }*/}
							<Add /> Add Menu
						</Button>
					</Link>
					{/*berisi list daftar menu*/}
					<List className={classes.root}>
						{list_menu.map((item, key) => {
							return (
								<React.Fragment key={key}>
									<ListMenu 
										item={item} 
										url='menu'
										handleDeleteMenu={()=>{
											this.handleDeleteMenu(item.id, item.nama_menu);
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
	list_menu: state.menu.list_menu
})

export default compose(
	withStyles(styles, {withTheme: true}),
	connect( mapStateToProps, { 
		get_list_menu, delete_menu, create_log
	})
)(PageMenu)