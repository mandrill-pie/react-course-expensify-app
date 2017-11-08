import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setFilterText, sort, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			calendarFocused: null,
		};
	}

	onDatesChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate);
		this.props.setEndDate(endDate);
	}

	onFocusChange = (calendarFocused) => {
		this.setState(() => ({ calendarFocused }));
	}

	onTextChange = (e) => {
		this.props.setFilterText(e.target.value);
	}

	onSortChange = (e) => {
		this.props.sort(e.target.value);
	}

	render = () => (
		<div>
			<input
				type="text"
				value={this.props.filters.text}
				onChange={this.onTextChange} />
			<select 
				value={this.props.filters.sortBy}
				onChange={this.onSortChange}>
				<option value="date">Date</option>
				<option value="amount">Amount</option>
			</select>
			<DateRangePicker
				startDate={this.props.filters.startDate}
				endDate={this.props.filters.endDate}
				onDatesChange={this.onDatesChange}
				focusedInput={this.state.calendarFocused}
				onFocusChange={this.onFocusChange}
				showClearDates={true}
				numberOfMonths={1}
				isOutsideRange={() => false} />
		</div>
	);
}

const mapStateToProps = (state) => ({
	filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
	setStartDate: (startDate) => dispatch(setStartDate(startDate)),
	setEndDate: (endDate) => dispatch(setEndDate(endDate)),
	setFilterText: (text) => dispatch(setFilterText(text)),
	sort: (value) => dispatch(sort(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);