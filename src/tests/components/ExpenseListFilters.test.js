import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { defaultFilters, altFilters } from '../fixtures/filters';
//import expenses from '../fixtures/expenses';

// run before running each test
let setStartDate, setEndDate, setFilterText, sort, history, wrapper;

beforeEach(() => {
	// create spy functions
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	setFilterText = jest.fn();
	sort = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<ExpenseListFilters
			filters={defaultFilters} // mandatory!
			setStartDate={setStartDate}
			setEndDate={setEndDate}
			setFilterText={setFilterText}
			sort={sort}
			history={history} />
	);
});

test('ExpenseListFilters - render default filters', () => {
	expect(wrapper).toMatchSnapshot();
});

test('ExpenseListFilters - render alternative filters', () => {
	wrapper.setProps({
		filters: altFilters
	});
	expect(wrapper).toMatchSnapshot();
});

test('ExpenseListFilters - should change filter text', () => {
	wrapper.find('input').simulate('change', {
		target: { value: 'bill' }
	});
	expect(setFilterText).toHaveBeenLastCalledWith('bill');
	// check is filters state was set correctly
	// ?? expect(wrapper.prop('filters').text).toBe('bill');
});

test('ExpenseListFilters - should sort by date', () => {
	wrapper.find('select').simulate('change', {
		target: { value: 'date' }
	});
	expect(sort).toHaveBeenLastCalledWith('date');
});

test('ExpenseListFilters - should sort by amount', () => {
	wrapper.find('select').simulate('change', {
		target: { value: 'amount' }
	});
	expect(sort).toHaveBeenLastCalledWith('amount');
});

test('ExpenseListFilters - should change date', () => {
	wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate: altFilters.startDate, endDate: altFilters.endDate });
	
	expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(altFilters.endDate);

	// how to check global state of app?
	// expect(wrapper.state('filters').startDate).toEqual(altFilters.startDate);
	// expect(wrapper.state('filters').endDate).toEqual(altFilters.startDate);
});

test('ExpenseListFilters - should change focus', () => {
	// onFocusChange accepts null, 'startDate' or 'endaDate'
	const calendarFocused = 'startDate';
	wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
	expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});