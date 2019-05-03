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
import ListPesanan from 'views/PagePesanan/ListPesanan'
import { get_log_pesanan } from 'redux/action/actionLog'

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
})


class PageLogPesanan extends Component {

	componentDidMount() {
		const {authentication} = this.props
		this.props.get_log_pesanan(authentication.token, authentication.id_account, authentication.role)
			.then(result=> {
				console.log('Load List Log Success')
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { classes, authentication, log_pesanan } = this.props

		return (
			<Grid container justify='center'>
				<Grid item xs={12}>
					<Typography variant='h5' component='h3'>
						Page Log Aktivitas
					</Typography>
					<List className={classes.root}>
						{log_pesanan.map((item, key) => {
							return (
								<React.Fragment key={key}>
									<ListPesanan 
										role={authentication.role}										
										item={item} 
									/>
									<Divider light />
								</React.Fragment>
							)
						})}
					</List>
				</Grid>
			</Grid>
		)
	}
}

const mapStateToProps = state => ({
	log_pesanan: state.log.log_pesanan,
	authentication: state.login
})

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, { get_log_pesanan })
)(PageLogPesanan)
