import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'

import TableHeader from 'components/Table/TableHeader'
import TableContent from 'components/Table/TableContent'

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
})

const header = [
	{ id: 'nomor', numeric: false, disablePadding: true, label: 'Nomor' },
	{ id: 'keterangan', numeric: true, disablePadding: false, label: 'Keterangan' },
	{ id: 'tanggal', numeric: true, disablePadding: false, label: 'Date' }
]

class TableLogAktivitas extends React.Component {
	state = {
		order: 'asc',
		orderBy: 'nomor',
		page: 0,
		rowsPerPage: 10,
	}

	handleRequestSort = (event, property) => {
		const orderBy = property
		let order = 'desc'

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc'
		}

		this.setState({ order, orderBy })
	}

	handleChangePage = (event, page) => {
		this.setState({ page })
	}

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value })
	}

	render() {
		const { classes, list } = this.props
		const { order, orderBy, rowsPerPage, page } = this.state
		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle">
						<TableHeader
							rows={header}
							order={order}
							orderBy={orderBy}
							onRequestSort={this.handleRequestSort}
						/>
						<TableContent 
							list={list}
							order={order}
							orderBy={orderBy}
							rowsPerPage={rowsPerPage}
							page={page}
							handleRequestSort={this.handleRequestSort}
						/>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={list.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
					}}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
				/>
			</Paper>
		)
	}
}

TableLogAktivitas.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles, {withTheme: true})(TableLogAktivitas)
