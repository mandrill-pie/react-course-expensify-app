import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

// run before running each test
let startEditExpense, startRemoveExpense, history, wrapper;
beforeEach(() => {
	// create spy functions
	startEditExpense = jest.fn();
	startRemoveExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditExpensePage
			expense={expenses[3]}
			startEditExpense={startEditExpense}
			startRemoveExpense={startRemoveExpense}
			history={history} />
	);
});

test('EditExpensePage - render page', () => {
	expect(wrapper).toMatchSnapshot();
});

test('EditExpensePage - handle submit', () => {
	// call onSubmit on ExpenseForm with demo expense data
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[3]);
	
	// expect the spy startEditExpense to have been called with demo expense data
	expect(startEditExpense).toHaveBeenLastCalledWith(expenses[3].id, expenses[3]);
	
	// expect the spy history to have been called with "/" (redirect)
	expect(history.push).toHaveBeenLastCalledWith('/');
});

test('EditExpensePage - handle remove expense', () => {
	// simulate which calls onRemove wich calls startRemoveExpense
	wrapper.find('button').simulate('click');
	
	// expect the spy removeExpense to have been called with demo expense data
	expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[3].id });
	
	// expect the spy history to have been called with "/" (redirect)
	expect(history.push).toHaveBeenLastCalledWith('/');
});