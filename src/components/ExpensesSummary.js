import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export class ExpensesSummary extends React.Component {

	render = () => (
		<div>
			Viewing	{this.props.expenseCount}	{this.props.expenseCount > 1 ? 'expenses' : 'expense'} totalling {this.props.expensesTotal}
		</div>
	)
}

const mapStateToProps = (state) => ({
	expenseCount: selectExpenses(state.expenses, state.filters).length,
	expensesTotal: selectExpensesTotal(state.expenses)
});

export default connect(mapStateToProps)(ExpensesSummary);