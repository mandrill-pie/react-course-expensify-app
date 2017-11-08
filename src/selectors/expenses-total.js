export default (expenses = []) => {
	return expenses.reduce((totalAmount, expense) => totalAmount + expense.amount, 0);
};