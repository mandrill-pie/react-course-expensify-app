import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
	// no constructor needed to get access to props!

	onSubmit = (expense) => {
		this.props.startAddExpense(expense);
		this.props.history.push('/');
	}

	render() {
		return (
			<div>
				<ExpenseForm
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(false, mapDispatchToProps)(AddExpensePage);