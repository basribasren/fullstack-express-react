import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import TableLogAktivitas from './TableLogAktivitas'

import { get_log } from 'redux/action/actionLog'

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


class PageLogAktivitas extends Component {
	
	componentDidMount() {
		this.props.get_log(this.props.authentication.token, this.props.authentication.id_account)
			.then(result=> {
				console.log('Load List AKtivitas Success')
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { log_aktivitas } = this.props
		return (
			<Grid container justify='center'>
				<Grid item xs={12}>
					<Typography variant='h5' component='h3'>
						Page Log Aktivitas
					</Typography>
					<TableLogAktivitas list={log_aktivitas}/>
				</Grid>
			</Grid>
		)
	}
}

const mapStateToProps = state => ({
	log_aktivitas: state.log.list_activitas,
	authentication: state.login
})

export default compose(
	withStyles(styles, { withTheme: true }),
	connect(mapStateToProps, { get_log })
)(PageLogAktivitas)
