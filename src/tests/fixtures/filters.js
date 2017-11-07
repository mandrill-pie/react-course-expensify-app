import moment from 'moment';

// baseline test data
export const defaultFilters = {
	text: '',
	sortBy: false,
	startDate: moment().startOf('year'),
	endDate: moment().endOf('year'),
};

export const altFilters = {
	text: 'bill',
	sortBy: 'amount',
	startDate: moment().startOf('year').add(120, 'days'),
	endDate: moment().endOf('year').subtract(120, 'days'),
};