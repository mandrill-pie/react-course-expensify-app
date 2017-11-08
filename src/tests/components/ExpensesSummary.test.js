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

test('render ExpensesSummary', () => {
	expect(wrapper).toMatchSnapshot();
});