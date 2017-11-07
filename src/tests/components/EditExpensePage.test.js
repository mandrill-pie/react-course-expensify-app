import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

// run before running each test
let editExpense, removeExpense, history, wrapper;
beforeEach(() => {
	// create spy functions
	editExpense = jest.fn();
	removeExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditExpensePage
			expense={expenses[3]}
			editExpense={editExpense}
			removeExpense={removeExpense}
			history={history} />
	);
});

test('EditExpensePage - render page', () => {
	expect(wrapper).toMatchSnapshot();
});

test('EditExpensePage - handle submit', () => {
	// call onSubmit on ExpenseForm with demo expense data
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[3]);
	
	// expect the spy editExpense to have been called with demo expense data
	expect(editExpense).toHaveBeenLastCalledWith(expenses[3].id, expenses[3]);
	
	// expect the spy history to have been called with "/" (redirect)
	expect(history.push).toHaveBeenLastCalledWith('/');
});

test('EditExpensePage - handle remove expense', () => {
	// simulate which calls onRemove wich calls removeExpense
	wrapper.find('button').simulate('click');
	
	// expect the spy removeExpense to have been called with demo expense data
	expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[3].id });
	
	// expect the spy history to have been called with "/" (redirect)
	expect(history.push).toHaveBeenLastCalledWith('/');
});