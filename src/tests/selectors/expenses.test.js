import expenses from '../fixtures/expenses';
import moment from 'moment';
import selectExpenses from '../../selectors/expenses';

test('selectExpenses - filter by text value', () => {
	const filters = {
		text: 'gum',
		sortBy: 'date',
		startDate: false,
		endDate: false,
	};
	expect(selectExpenses(expenses, filters)).toEqual([
		expenses[3],
		expenses[0]
	]);
});

test('selectExpenses - filter by startDate', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: moment('20170501'),
		endDate: false,
	};
	expect(selectExpenses(expenses, filters)).toEqual([
		expenses[3],
		expenses[2],
		expenses[0]
	]);
});

test('selectExpenses - filter by endDate', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: false,
		endDate: moment('20171001'),
	};
	expect(selectExpenses(expenses, filters)).toEqual([
		expenses[0],
		expenses[1]
	]);
});

test('selectExpenses - filter by startDate and endDate', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: moment('20170101'),
		endDate: moment('20171001'),
	};
	expect(selectExpenses(expenses, filters)).toEqual([
		expenses[0],
		expenses[1]
	]);
});

test('selectExpenses - sort by date', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: false,
		endDate: false,
	};
	expect(selectExpenses(expenses, filters)).toEqual([
		expenses[3],
		expenses[2],
		expenses[0],
		expenses[1]
	]);
});

test('selectExpenses - sort by amount', () => {
	const filters = {
		text: '',
		sortBy: 'amount',
		startDate: false,
		endDate: false,
	};
	expect(selectExpenses(expenses, filters)).toEqual([
		expenses[2],
		expenses[3],
		expenses[0],
		expenses[1]
	]);
});