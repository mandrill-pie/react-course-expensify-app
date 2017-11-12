import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	addExpense,
	startAddExpense,
	editExpense,
	startEditExpense,
	removeExpense,
	startRemoveExpense,
	setExpenses,
	startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

// fake user
const mockUser = {
	uid: '123abc',
	displayName: 'Logged In User'
};
// fake default state
const mockState = {
	auth: {
		user: mockUser
	}
};
// fake store
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	// wipe db user expenses and fill with dummy data
	const expensesData = {};
	expenses.forEach((expense) => {
		expensesData[expense.id] = {
			...expense,
			id: null
		};
	});
	database.ref(`users/${mockUser.uid}/expenses`).set(expensesData).then(() => { 
		done();
	});
});

test('remove expense from store', () => {
	const result = removeExpense({ id: '123abc' });
	expect(result).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});

test('should remove expense from db and store', (done) => {
	const store = createMockStore(mockState);
	const expense = expenses[2];

	store.dispatch(startRemoveExpense({ id: expense.id })).then(() => {
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id: expense.id
		});

		return database.ref(`users/${mockUser.uid}/expenses/${actions[0].id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});

test('should edit expense in store', () => {
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

test('should edit expense in db and store', (done) => {
	const store = createMockStore(mockState);
	const expense = expenses[2];
	const updates = {
		...expense,
		description: 'Description form test'
	};
	delete updates.id;

	store.dispatch(startEditExpense(expense.id, updates)).then(() => {
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id: expense.id,
			updates
		});

		return database.ref(`users/${mockUser.uid}/expenses/${actions[0].id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val().description).toEqual(updates.description);
		done();
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
	const store = createMockStore(mockState);
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

		return database.ref(`users/${mockUser.uid}/expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expense);
		done();
	});
});

test('should add expense to db and store (with default values)', (done) => {
	const store = createMockStore(mockState);
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

		return database.ref(`users/${mockUser.uid}/expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseDefaults);
		done();
	});
});

test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});

test('should fetch expenses from db', () => {
	const store = createMockStore(mockState);

	store.dispatch(startSetExpenses()).then((done) => {
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});