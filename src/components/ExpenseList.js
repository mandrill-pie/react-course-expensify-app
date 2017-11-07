import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export class ExpenseList extends React.Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		if (this.props.expenses.length === 0) {
			return <p>No expenses found</p>;
		}	else {
			return (
				<table>
					<tbody>
						{
							this.props.expenses.map((expense) => (
								<ExpenseListItem key={expense.id} {...expense} />
							))
						}
					</tbody>
				</table>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	expenses: selectExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);