import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import publicRoutes from 'routes/public'
import SidebarLink from './SidebarLink'
import { logout } from 'redux/action/actionLogin'

const drawerWidth = 240

const styles = theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
})

class Sidebar extends React.Component {
	handleLogout = () => {
		const { data } = this.props
		return this.props.logout(data.token)
	}

	render() {
		const { classes, theme, data, ...rest } = this.props
		let SidebarMenu = <SidebarLink 
				link={publicRoutes}
				color="blue"
				{...rest}
			/>
		return (
			<div>
				<Drawer
					variant="permanent"
					className={classNames(classes.drawer, {
						[classes.drawerOpen]: this.props.isDrawerOpen,
						[classes.drawerClose]: !this.props.isDrawerOpen,
					})}
					classes={{
						paper: classNames({
							[classes.drawerOpen]: this.props.isDrawerOpen,
							[classes.drawerClose]: !this.props.isDrawerOpen,
						}),
					}}
					open={this.props.isDrawerOpen}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={this.props.handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<Divider />
					{SidebarMenu}
				</Drawer>
			</div>
		)
	}
}

Sidebar.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
}

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(null, { logout })
)(Sidebar)
