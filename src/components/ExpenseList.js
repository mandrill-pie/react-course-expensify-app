import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export class ExpenseList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="content-container">
				<div className="list-header">
					<div className="show-on-mobile">Expenses</div>
					<div className="show-on-desktop">Expense</div>
					<div className="show-on-desktop">Amount</div>
				</div>
				<div className="list-body">
					{
						this.props.expenses.length === 0 ? (
							<div className="list-item list-item--message">
								<span>No expenses found</span>
							</div>
						) : (
							<div>
								{
									this.props.expenses.map((expense) => (
										<ExpenseListItem key={expense.id} {...expense} />
									))
								}
							</div>
						)
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	expenses: selectExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);