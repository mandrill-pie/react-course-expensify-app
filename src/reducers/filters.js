import moment from 'moment';

const filtersReducerDefaultState = {
	text: '',
	sortBy: false,
	startDate: moment().startOf('year'),
	endDate: moment().endOf('year'),
};

export default (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
	case 'SET_FILTER_TEXT':
		return {
			...state,
			text: action.text
		};
	case 'SORT':
		return {
			...state,
			sortBy: action.column
		};
	case 'SET_START_DATE':
		return {
			...state,
			startDate: action.startDate
		};
	case 'SET_END_DATE':
		return {
			...state,
			endDate: action.endDate
		};
	default:
		return state;
	}
};