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
import Close from '@material-ui/icons/Close'

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

function ListPesanan({ ...props }) {
	const { classes, item } = props
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
						{item.nomor_pesanan}
					</React.Fragment>
				}
				secondary={
					<React.Fragment>
						<b>Nomor Meja:</b> {item.nomor_meja}<br/>
						<b>Nama Pelanggan:</b> {item.nama_pelanggan}<br/>
						<b>Total Harga:</b> {item.total_harga}
					</React.Fragment>
				}
			/>
			<Chip 
				label={item.status_pesanan} 
				className={classes.chip} 
				variant='outlined' 
			/>
			{/*action list daftar pesanan*/}
			{props.url === 'pesanan' ? (
				<React.Fragment>
					<Link to={`/pesanan/edit/${item.id}`}>
						<Button 
							variant='contained' 
							color='primary' 
							className={classes.button}
						>
							<Edit />
						</Button>
					</Link>
					<Button 
						variant='contained' 
						color='secondary' 
						className={classes.button}
						onClick={props.handleDeletePesanan}
					>
						<Trash />
					</Button>
					{props.role === 'kasir' ? (
						<Button 
							variant='contained' 
							color='primary' 
							className={classes.button}
							onClick={props.handleClosePesanan}
						>
							<Close />
						</Button>
					) : (
						<div></div>
					)}
				</React.Fragment>
			) : (
				<div></div>
			)}			
		</ListItem>
	)
}

ListPesanan.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ListPesanan)
