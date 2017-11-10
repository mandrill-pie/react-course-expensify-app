import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses';

// test if the default state gets set to an ampty array
test('expensesReducer - undefined state, @@INIT action', () => {
	expect(expensesReducer(undefined, { type: '@@INIT' })).toEqual([]);
});

test('expensesReducer - REMOVE_EXPENSE action, remove by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	// ! the state of this reducer is the expenses array
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([
		expenses[0],
		expenses[2],
		expenses[3],
	]);
});

test('expensesReducer - REMOVE_EXPENSE action, but id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: 'does-not-exist'
	};
	// ! the state of this reducer is the expenses array
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('expensesReducer - ADD_EXPENSE action', () => {
	const action = {
		type: 'ADD_EXPENSE',
		expense: {
			description: 'Testing bubble gum',
			amount: 12.45
		}
	};
	// ! the state of this reducer is the expenses array
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([
		...expenses,
		action.expense,
	]);
});

test('expensesReducer - EDIT_EXPENSE action', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[2].id,
		updates: {
			...expenses[2],
			note: 'Edited note'
		}
	};
	// ! the state of this reducer is the expenses array
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([
		expenses[0],
		expenses[1],
		{
			...expenses[2],
			note: action.updates.note
		},
		expenses[3]
	]);
	// OR expect(state[2].note).toBe(action.updates.note);
});

test('expensesReducer - EDIT_EXPENSE action, no editing if expense not found', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: 'missing-id',
		updates: {
			...expenses[2],
			note: 'will not be added',
			description: 'will not be added'
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should set expenses', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses: expenses[1]
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses[1]);
});