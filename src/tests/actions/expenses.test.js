import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('removeExpense', () => {
	const result = removeExpense({ id: '123abc' });
	expect(result).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});


test('editExpense', () => {
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

test('addExpense - with some data passed', () => {
	const expenseData = {
		description: 'Coffee over at Starbucks',
		amount: 12.35,
		note: 'The really crappy coffee on Thursday',
		createdAt: 1000
	};
	const result = addExpense(expenseData);
	expect(result).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)
		}
	});
});

test('addExpense - with no data passed', () => {
	const result = addExpense();
	expect(result).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),	
			description: '',
			amount: 0,
			note: '',
			createdAt: 0
		}
	});
});