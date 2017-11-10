import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('remove expense from store', () => {
	const result = removeExpense({ id: '123abc' });
	expect(result).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});


test('edit expense in store', () => {
	const result = editExpense('123abc', {
		description: 'Coffee over at Starbucks',
		amount: 12.35,
		note: 'The really crappy coffee on Thursday'
	});
	expect(result).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			description: 'Coffee over at Starbucks',
			amount: 12.35,
			note: 'The really crappy coffee on Thursday'
		}
	});
});

test('add expense to store with some data passed', () => {
	const expense = expenses[1];
	const result = addExpense(expense);
	expect(result).toEqual({
		type: 'ADD_EXPENSE',
		expense
	});
});

test('should add expense to db and store', (done) => {
	const store = createMockStore({});
	const expense = {
		...expenses[0],
	};
	delete(expense.id);

	store.dispatch(startAddExpense(expense)).then(() => {
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				...expense,
				id: expect.any(String)
			}
		});

		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expense);
		done();
	});
});

test('should add expense to db and store (with default values)', (done) => {
	const store = createMockStore({});
	const expenseDefaults = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0
	};

	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				...expenseDefaults,
				id: expect.any(String),	
			}
		});

		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseDefaults);
		done();
	});
});

// test('addExpense - with no data passed', () => {
// 	const result = addExpense();
// 	expect(result).toEqual({
// 		type: 'ADD_EXPENSE',
// 		expense: {
// 			id: expect.any(String),	
// 			description: '',
// 			amount: 0,
// 			note: '',
// 			createdAt: 0
// 		}
// 	});
// });