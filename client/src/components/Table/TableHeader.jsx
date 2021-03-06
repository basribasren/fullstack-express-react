import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'

class TableHeader extends React.Component {
	createSortHandler = property => event => {
		this.props.onRequestSort(event, property)
	}

	render() {
		const { order, orderBy, rows } = this.props

		return (
			<TableHead>
				<TableRow>
					{rows.map( row => (
						<TableCell
							key={row.id}
							align='center'
							sortDirection={orderBy === row.id ? order : false}
						>
						{row.label}
							{/*<Tooltip
								title="Sort"
								placement={row.numeric ? 'bottom-end' : 'bottom-start'}
								enterDelay={300}
							>
								<TableSortLabel
									active={orderBy === row.id}
									direction={order}
									onClick={this.createSortHandler(row.id)}
								>
									{row.label}
								</TableSortLabel>
							</Tooltip>*/}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		)
	}
}

TableHeader.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
}

export default TableHeader