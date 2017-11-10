import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

// run before running each test
let startAddExpense, history, wrapper;
beforeEach(() => {
	// create spy functions
	startAddExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('render page', () => {
	expect(wrapper).toMatchSnapshot();
});

test('handle submit', () => {
	// call onSubmit on ExpenseForm with demo expense data
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
	
	// expect the spy startAddExpense to have been called with demo expense data
	expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
	
	// expect the spy history to have been called with "/" (redirect)
	expect(history.push).toHaveBeenLastCalledWith('/');
});
