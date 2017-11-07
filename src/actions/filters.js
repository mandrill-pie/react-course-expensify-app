export const setFilterText = (text = false) => ({
	type: 'SET_FILTER_TEXT',
	text
});

export const sort = (column = 'date') => ({
	type: 'SORT',
	column
});

export const setStartDate = (startDate = false) => ({
	type: 'SET_START_DATE',
	startDate
});

export const setEndDate = (endDate = false) => ({
	type: 'SET_END_DATE',
	endDate
});