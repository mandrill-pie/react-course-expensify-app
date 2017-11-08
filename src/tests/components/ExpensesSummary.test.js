import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

let selectExpenses, selectExpensesTotal, wrapper;

beforeEach(() => {
	// create spy functions
	selectExpenses = jest.fn();
	selectExpensesTotal = jest.fn();
	wrapper = shallow(
		<ExpensesSummary
			selectExpenses={selectExpenses}
			selectExpensesTotal={selectExpensesTotal} />
	);
});

test('render ExpensesSummary with one expense', () => {
	expect(
		<ExpensesSummary
			expensesCount={1}
			expensesTotal={123} />
	).toMatchSnapshot();
});

test('render ExpensesSummary with multiple expenses', () => {
	expect(
		<ExpensesSummary
			expensesCount={3}
			expensesTotal={1234} />
	).toMatchSnapshot();
});