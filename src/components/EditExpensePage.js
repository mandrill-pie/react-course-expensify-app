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
				<div className="page-header">
					<div className="content-container">
						<h2 className="page-header__title">Edit Expense</h2>
					</div>
				</div>
				<div className="content-container">
					<ExpenseForm
						expense={this.props.expense}
						onSubmit={this.onSubmit}
					/>
					<button className="btn btn--secondary" onClick={this.onRemove}>Remove Expense</button>
				</div>
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