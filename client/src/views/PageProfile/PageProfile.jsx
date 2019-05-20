import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60,
	},
})


class PageProfile extends Component {
	state = {

	}

	handleInputChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		})
		this.setState({
			errors: {
				[event.target.id]: false
			}
		})
	}

	handleValidate = (username, password) => {
		const errors = {}
		if (!username) errors.username = true
		if (!password) errors.password = true
		return errors
	}

	render() {
		const { classes } = this.props
		const { errors, isSnackbarOpen } = this.state
		return (
			<Grid container justify='center'>
				<Grid item xs={12} sm={4} md={4}>
					<Card>
						<CardContent>
							<Avatar alt="Remy Sharp" 
								src="https://dlscenter.com/wp-content/uploads/2017/06/Manchester-City-Kits-Logo-URL.jpg" 
								className={classes.bigAvatar} />
							<Typography variant="h5" component="h2">
					          Ganera
					        </Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={8} md={8}>
					<Card>
						<CardContent>
							<Typography component="p">
					          Ganera
					        </Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		)
	}
}

PageProfile.propTypes = {
	classes: PropTypes.object.isRequired,
}

// export default compose(
// 	withStyles(styles, { withTheme: true }),
// 	connect(null, { login, create_log })
// )(PageProfile)

export default withStyles(styles, { withTheme: true })(PageProfile)
