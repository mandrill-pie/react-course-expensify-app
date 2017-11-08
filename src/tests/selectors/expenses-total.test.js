import expenses from '../fixtures/expenses';
import selectExpensesTotal from '../../selectors/expenses-total';

test('should return 0 if no expenses', () => {
	expect(selectExpensesTotal()).toBe(0);
});

test('should corectly add up a single expense', () => {
	expect(selectExpensesTotal([expenses[1]])).toBe(expenses[1].amount);
});

test('should corectly add up multiple expenses', () => {
	expect(selectExpensesTotal(expenses)).toBe(
		expenses.reduce((totalAmount, expense) => totalAmount + expense.amount, 0)
	);
});