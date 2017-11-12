import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
	const expenseWord = props.expensesCount === 1 ? 'expense' : 'expenses';
	const formattedExpensesCount = numeral(props.expensesTotal).format('$0,0.00');
	return (
		<div className="page-header">
			<div className="content-container">
				<h2 className="page-header__title">
					Viewing <span>{props.expensesCount}</span> {expenseWord} totalling <span>{formattedExpensesCount}</span>
				</h2>
				<div className="page-header__actions">
					<Link className="btn" to="/create">Add expense</Link>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters);
	return {
		expensesCount: visibleExpenses.length,
		expensesTotal: selectExpensesTotal(visibleExpenses)
	};
};

export default connect(mapStateToProps)(ExpensesSummary);