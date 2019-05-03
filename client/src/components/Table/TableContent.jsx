import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	table: {
		minWidth: 700,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
})

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

class TableContent extends React.Component {

	render() {
		const {list, order, orderBy, rowsPerPage, page} = this.props
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage)
		let counter = 0
		return (
			<TableBody>
				{stableSort(list, getSorting(order, orderBy))
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map(n => {
						counter += 1
						return (
							<TableRow
								hover
								tabIndex={-1}
								key={n.id}
							>
								<TableCell component="th" scope="row" align="center">
									{counter}
								</TableCell>
								<TableCell align="left">{n.keterangan}</TableCell>
								<TableCell align="center">{n.date_create}</TableCell>
							</TableRow>
						)
					})}
				{emptyRows > 0 && (
					<TableRow style={{ height: 49 * emptyRows }}>
						<TableCell colSpan={6} />
					</TableRow>
				)}
			</TableBody>
		)
	}
}

export default withStyles(styles, { withTheme: true })(TableContent)
