import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Icon from '@material-ui/core/Icon'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const styles = theme => ({
	item: {
		position: 'relative',
		display: 'block',
		textDecoration: 'none',
	},
	itemLink: {
		width: 'auto',
		borderRadius: '3px',
		backgroundColor: 'transparent',
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	},
})


const SidebarLink = ({ ...props }) => {
	const { classes, theme } = props
	// verifies if routeName is the one active (in browser input)
	function activeRoute(routeName) {
		return props.location.pathname.indexOf(routeName) > -1 ? true : false
	}

	function WithOutChildren(props) {
		const { data } = props
		const active = activeRoute(data.path)
		return (
			<NavLink to={data.path} className={classes.item} activeClassName='active'>
				{data.path === '/logout' ? (
					<ListItem
					  button
					  className={classes.itemLink}
					  onClick={props.logout}
					>
					  	<ListItemIcon>
							{typeof data.icon === 'string' ? (
						  		<Icon>{data.icon}</Icon>
							) : (
						  		<data.icon />
							)}
					  	</ListItemIcon>
					  	<ListItemText primary={data.sidebarName} />
					</ListItem>
				) : (
					<ListItem className={classes.itemLink} selected={active}>
						<ListItemIcon>
							{typeof data.icon === 'string' ? (
								<Icon>{data.icon}</Icon>
							) : (
								<data.icon />
							)}
						</ListItemIcon>
						<ListItemText primary={data.sidebarName}/>
					</ListItem>
				)}
			</NavLink>
		)
	}

	return (
		<List>
			{props.link.map((prop, key) => {
				if (prop.redirect) return null
				return <WithOutChildren data={prop} key={key} logout={()=>{props.handleLogout()}}/>
			})}
		</List>
	)
}

SidebarLink.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(SidebarLink)
