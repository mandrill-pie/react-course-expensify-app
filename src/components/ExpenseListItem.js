import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({id, description, amount, createdAt}) => (
	<tr>
		<td>
			ID {id}
		</td>
		<td>
			{description}
		</td>
		<td>{numeral(amount).format('$0,0.00')}</td>
		<td>{moment(createdAt).format('YYYY-MM-DD')}</td>
		<td>
			<Link to={`/edit/${id}`}>Edit</Link>
		</td>
	</tr>
);

export default ExpenseListItem;