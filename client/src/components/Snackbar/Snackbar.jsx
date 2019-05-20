import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'
import Snack from '@material-ui/core/Snackbar'
import Fade from '@material-ui/core/Fade'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

const styles = {
	snackbar: {
		position: 'absolute',
	},
	snackbarContent: {
		width: 360,
	},
	close: {
		width: '11px',
		height: '11px'
	},
	iconButton: {
		width: '24px',
		height: '24px',
		padding: '0px'
	},
	icon: {
		display: 'block',
		left: '15px',
		position: 'absolute',
		top: '50%',
		marginTop: '-15px',
		width: '30px',
		height: '30px'
	},
	message: {
		padding: '0 10px 0 30px',
		display: 'block',
		maxWidth: '89%'
	},
}

function Snackbar({ ...props }) {
	const { classes, place, isSnackbarOpen, message, icon } = props
	return (
			<Snack
			anchorOrigin={{
				vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
				horizontal:
				  place.indexOf('l') !== -1
				    ? 'left'
				    : place.indexOf('c') !== -1 ? 'center' : 'right'
			}}
			className={classes.snackbar}
			open={isSnackbarOpen}
			onClose={()=>props.closeNotification()}
			TransitionComponent={Fade}
			ContentProps={{
				'aria-describedby': 'message-id',
				className: classes.snackbarContent,
			}}
			action={
				<IconButton 
			        className={classes.iconButton}
			        key='close'
			        aria-label='Close'
			        color='inherit' 
			        onClick={()=>props.closeNotification()}
			    >
					<Close className={classes.close} />
				</IconButton>
			}
			message={
				<div>
					{icon !== undefined ? 
						<Icon className={classes.icon}>{icon}</Icon>
						: null
					}
					<span id='message-id' className={classes.message}>
						{message}
					</span>
				</div>
			}
		/>
	)
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  place: PropTypes.oneOf(['tl', 'tr', 'tc', 'br', 'bl', 'bc']),
}

export default withStyles(styles)(Snackbar)
