import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
	type: 'ADD_EXPENSE',
	expense
});

// Async action
export const startAddExpense = (expenseData = {}) => {
	return (dispatch, getState) => {
		// get uid from Store state
		const uid = getState().auth.user.uid;

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
		return database.ref(`users/${uid}/expenses`)
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

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

// Async action
export const startRemoveExpense = ({ id }) => {
	return (dispatch, getState) => {
		// get uid from Store state
		const uid = getState().auth.user.uid;

		// remove expense from DB
		return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
			// remove expense from state
			dispatch(removeExpense({ id }));
		});
	};
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});

// Async action
export const startEditExpense = (id, updates) => {
	return (dispatch, getState) => {
		// get uid from Store state
		const uid = getState().auth.user.uid;

		// Update expense in DB
		return database.ref(`users/${uid}/expenses/${id}`)
			.update(updates)
			.then(() => {
				// Update the Redux Store
				dispatch(editExpense(id, updates));	
			})
			.catch((error) => {
				console.log('Error: ', error);
			});
	};
};

// SET_EXPENSES (get expenses from DB)
export const setExpenses = (expenses) => ({
	type: 'SET_EXPENSES',
	expenses
});

// Async action
export const startSetExpenses = () => {
	return (dispatch, getState) => {
		// get uid from Store state
		const uid = getState().auth.user.uid;

		// Get expenses from DB
		return database.ref(`users/${uid}/expenses`)
			.once('value')
			.then((snapshot) => {
				const expenses = [];
				snapshot.forEach((childSnapshot) => {
					expenses.push({
						...childSnapshot.val(),
						id: childSnapshot.key,
					});
				});

				// Update the Redux Store
				dispatch(setExpenses(expenses));	
			})
			.catch((error) => {
				console.log('Error: ', error);
			});
	};
};