import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
	// no constructor needed to get access to props!

	onSubmit = (expense) => {
		// dispatch by using addExpense (defined in mapDispatchToProps)
		// workaround for testing, used instead of:
		// props.dispatch(addExpense(expense));
		this.props.addExpense(expense);
		// redirect
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
	// Give AddExpensePage component access to addExpense()
	addExpense: (expense) => dispatch(addExpense(expense))
});

// give AddExpensePage access to props
// so it can use props.dispatch()
// do not pass a mapStateToProps() function
// but do pass a mapDispatchToProps() (used in testing)
export default connect(false, mapDispatchToProps)(AddExpensePage);