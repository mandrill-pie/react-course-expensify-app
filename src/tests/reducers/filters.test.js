import filtersReducer from '../../reducers/filters';
import moment from 'moment';

const defaultState = {
	text: '',
	sortBy: false,
	startDate: moment().startOf('year'),
	endDate: moment().endOf('year'),
};

test('filtersReducer - undefined filters state, @@INIT action -> should return default state', () => {
	const state = filtersReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual(defaultState);
});

test('filtersReducer - undefined filters state, action SORT by amount', () => {
	const state = filtersReducer(undefined, { type: 'SORT', column: 'amount' });
	expect(state).toEqual({
		...defaultState,
		sortBy: 'amount'
	});
});

test('filtersReducer - existing filters state, action SORT by date', () => {
	const currentState = {
		text: 'test',
		sortBy: 'amount',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month'),
	};
	const state = filtersReducer(currentState, { type: 'SORT', column: 'date' });
	expect(state).toEqual({
		...currentState,
		sortBy: 'date'
	});
});

test('filtersReducer - undefined filters state, action SET_FILTER_TEXT', () => {
	const state = filtersReducer(undefined, { type: 'SET_FILTER_TEXT', text: 'demo string' });
	expect(state).toEqual({
		...state,
		text: 'demo string'
	});
});

test('filtersReducer - undefined filters state, action SET_START_DATE', () => {
	const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: moment(0).add(4, 'days') });
	expect(state).toEqual({
		...state,
		startDate: moment(0).add(4, 'days')
	});
});