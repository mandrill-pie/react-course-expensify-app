import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({id, description, amount, createdAt}) => (
	<Link className="list-item" to={`/edit/${id}`}>
		<div>
			<h3 className="list-item__title">{description}</h3>
			<span className="list-item__date">{moment(createdAt).format('YYYY-MM-DD')}</span>
		</div>
		<div>
			<h3 className="list-item__amount">
				{numeral(amount).format('$0,0.00')}
			</h3>
		</div>
	</Link>
);

export default ExpenseListItem;