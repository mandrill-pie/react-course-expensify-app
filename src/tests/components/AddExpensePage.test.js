import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

// run before running each test
let addExpense, history, wrapper;
beforeEach(() => {
	// create spy functions
	addExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test('AddExpensePage - render page', () => {
	expect(wrapper).toMatchSnapshot();
});

test('AddExpensePage - handle submit', () => {
	// call onSubmit on ExpenseForm with demo expense data
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
	
	// expect the spy addExpense to have been called with demo expense data
	expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
	
	// expect the spy history to have been called with "/" (redirect)
	expect(history.push).toHaveBeenLastCalledWith('/');
});
