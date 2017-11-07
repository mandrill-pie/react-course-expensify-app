import moment from 'moment';
import { setFilterText, sort, setStartDate, setEndDate } from '../../actions/filters';

test('setFilterText', () => {
	expect(setFilterText('filtru')).toEqual({
		type: 'SET_FILTER_TEXT',
		text: 'filtru'
	});
});

test('setStartDate', () => {
	const startDate = moment('2017-09-12');
	expect(setStartDate(startDate)).toEqual({
		type: 'SET_START_DATE',
		startDate
	});
});

test('setEndDate', () => {
	const endDate = 2543;
	expect(setEndDate(endDate)).toEqual({
		type: 'SET_END_DATE',
		endDate
	});
});

test('sort - no data passed', () => {
	expect(sort()).toEqual({
		type: 'SORT',
		column: 'date'
	});
});

test('sort - "amount" passed', () => {
	const column = 'amount';
	expect(sort(column)).toEqual({
		type: 'SORT',
		column
	});
});

test('sort - "date" passed', () => {
	const column = 'date';
	expect(sort(column)).toEqual({
		type: 'SORT',
		column
	});
});