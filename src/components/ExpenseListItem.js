import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({id, description, amount, createdAt}) => (
	<tr>
		<td>
			{id}
		</td>
		<td>
			{description}
		</td>
		<td>{amount}</td>
		<td>{moment(createdAt).format('YYYY-MM-DD')}</td>
		<td>
			<Link to={`/edit/${id}`}>Edit</Link>
		</td>
	</tr>
);

export default ExpenseListItem;