import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
	// need a constructor to get access to props
	constructor(props) {
		super(props);

		this.state = {
			description: props.expense ? props.expense.description : '',
			amount: props.expense ? props.expense.amount : '',
			createdAt: props.expense ? moment(props.expense.createdAt): moment(),
			note: props.expense ? props.expense.note : '',
			calendarFocused: false,
			error: false,
		};
	}

	onDescriptionChange = (e) => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	}
	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => ({ note }));
	}
	onAmountChange = (e) => {
		const amount = e.target.value;
		if (!amount || amount.match(/^\d{1,10}(\.\d{0,2})?$/)) {
			this.setState(() => ({ amount }));
		}
	}
	onDateChange = (createdAt) => {
		if (createdAt) {
			this.setState(() => ({ createdAt }));
		}
	}
	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }));	
	}
	onSubmit = (e) => {
		e.preventDefault();

		if (!this.state.description || !this.state.amount) {
			this.setState(() => ({ error: 'Please provide a description and amount!' }));
		} else {
			this.setState(() => ({ error: false }));
			// call props.onSubmit() that gets passed to this component
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount),
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note,
			});
		}

	}
	render() {
		return (
			<form onSubmit={this.onSubmit}>
				{
					this.state.error &&
					<p>{this.state.error}</p>
				}
				<input
					type="text"
					placeholder="Description"
					autoFocus
					value={this.state.description}
					onChange={this.onDescriptionChange} />
				<input
					type="text" // number
					placeholder="Amount"
					value={this.state.amount}
					onChange={this.onAmountChange} />
				<SingleDatePicker
					date={this.state.createdAt}
					onDateChange={this.onDateChange}
					focused={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					numberOfMonths={1}
					isOutsideRange={() => false} />
				<textarea
					placeholder="Add a note"
					onChange={this.onNoteChange}
					value={this.state.note}>
				</textarea>
				<input type="submit" value="Add expense" />
			</form>
		);
	}
}