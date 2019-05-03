import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

import LocalDrink from '@material-ui/icons/LocalDrink'
import Menu from '@material-ui/icons/Fastfood'
import Edit from '@material-ui/icons/Edit'
import Trash from '@material-ui/icons/Delete'

const styles = theme => ({
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

function ListMenu({...props}){
	const { classes, item, url, handleDeleteMenu } = props
	return (			
		<ListItem alignItems='flex-start'>
			<ListItemIcon>
				{item.jenis_menu === 'makanan' ? (
					<Menu />
				): (
					<LocalDrink />
				)}
			</ListItemIcon>
			<ListItemText
				primary={
					<React.Fragment>
						{item.nama_menu} - ({item.jenis_menu})
					</React.Fragment>
				}
				secondary={
					<React.Fragment>
						<b>Harga Menu:</b> {item.harga_menu}<br/>
						<b>Keterangan: </b> {item.keterangan}<br/>
					</React.Fragment>
				}
			/>
			<Chip label={item.status} className={classes.chip} variant='outlined' />
			{url === 'menu' ? (
				<Link to={`/menu/edit/${item.id}`}>
					<Button variant='contained' color='primary' className={classes.button}>
						<Edit />
					</Button>
				</Link>
			) : (
				<div></div>
			)}
			<Button 
				variant='contained' 
				color='primary' 
				className={classes.button}
				onClick={handleDeleteMenu}
			>
				<Trash />
			</Button>
		</ListItem>
	)
}

ListMenu.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ListMenu)
