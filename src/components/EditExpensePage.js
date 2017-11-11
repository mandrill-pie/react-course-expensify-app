import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {

	onSubmit = (updates) => {
		// dispatch
		this.props.startEditExpense(this.props.expense.id, updates);
		// redirect
		this.props.history.push('/');
	}

	onRemove = () => {
		this.props.startRemoveExpense({ id: this.props.expense.id });
		this.props.history.push('/');
	}

	render() {
		return (
			<div>
				<ExpenseForm
					expense={this.props.expense}
					onSubmit={this.onSubmit}
				/>
				<button onClick={this.onRemove}>Remove</button>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	// populate props.expense with the required expense (based on id)
	expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
	// Give parent component (EditExpensePage) access to editExpense()
	// Needs access to props (second argument)! <- WHY?
	startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
	startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
});

// give EditExpensePage access to props
// so it can use props.dispatch()
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);