import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import { fade } from '@material-ui/core/styles/colorManipulator'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'

const drawerWidth = 240

const styles = theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	// Search
	grow: {
		flexGrow: 1,
	},
})

class Header extends React.Component {
	render () {
		const { classes, data } = this.props
		return (
			<AppBar
				position='fixed'
				className={classNames(classes.appBar, {
					[classes.appBarShift]: this.props.isDrawerOpen,
				})}
			>
				<Toolbar disableGutters={!this.props.isDrawerOpen}>
					{/* Header - Menu Icon goes here */}
					<IconButton
						color='inherit'
						aria-label='Open drawer'
						onClick={this.props.handleDrawerOpen}
						className={classNames(classes.menuButton, {
							[classes.hide]: this.props.isDrawerOpen,
						})}
					>
						<MenuIcon />
					</IconButton>

					{/* Header - Title goes here */}
					<Typography variant='h6' color='inherit' noWrap>
						Sistem Kasir {data.role}
					</Typography>

					{/* Header - Logout goes here */}
					<div className={classes.grow} />
				</Toolbar>
			</AppBar>
		)
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
}

export default withStyles(styles, { withTheme: true })(Header)