import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
	type: 'ADD_EXPENSE',
	expense
});

export const startAddExpense = (expenseData = {}) => {
	return (dispatch) => {
		// Destructure received data (expenseData)
		const {
			description = '',
			note = '',
			amount = 0,
			createdAt = 0
		} = expenseData;

		// Save to db
		const expense = {
			description,
			note,
			amount,
			createdAt
		};
		return database.ref('expenses')
			.push(expense)
			.then((ref) => {
				// Update the Redux Store
				dispatch(addExpense({
					id: ref.key,
					...expense
				}));
			});
	};
};

export const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});