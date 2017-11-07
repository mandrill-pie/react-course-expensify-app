import React from 'react';
import ExpenseForm from '../../components/ExpenseForm';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('ExpenseForm - render form', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test('ExpenseForm - render form with expense data (editing)', () => {
	const expense = expenses[2];
	const wrapper = shallow(<ExpenseForm expense={expense} />);
	expect(wrapper).toMatchSnapshot();
});

test('ExpenseForm - render eror for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />);
	// before submit
	expect(wrapper).toMatchSnapshot();
	// submit
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {} // fake preventDefault call
	});
	// after submit
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('ExpenseForm - description change should change the state', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = 'Changed description';
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('description')).toEqual(value);
});

test('ExpenseForm - note change should change the state', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = 'Changed note';
	wrapper.find('textarea').simulate('change', {
		target: { value }
	});
	expect(wrapper.state('note')).toEqual(value);
});

test('ExpenseForm - valid amount change should change the state', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = '12.99';
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toEqual(value);
});

test('ExpenseForm - invalid amount change should not change the state', () => {
	const wrapper = shallow(<ExpenseForm />);
	const value = 'Invalid amount';
	wrapper.find('input').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toEqual('');
});

test('ExpenseForm - valid form submission (Call onSubmit())', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(
		<ExpenseForm
			expense={expenses[0]}
			onSubmit={onSubmitSpy} />
	);
	// submit
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {} // fake preventDefault call
	});
	// after submit
	expect(wrapper.state('error')).toEqual(false);
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		createdAt: expenses[0].createdAt,
		note: expenses[0].note,
	});
});

test('ExpenseForm - set state.createdAt to chosen date onDateChange', () => {
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('SingleDatePicker').prop('onDateChange')(moment(100));
	expect(wrapper.state('createdAt')).toEqual(moment(100));
});

test('ExpenseForm - set state.calendarFocused when onFocusChange is called', () => {
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused: true });
	expect(wrapper.state('calendarFocused')).toEqual(true);
});