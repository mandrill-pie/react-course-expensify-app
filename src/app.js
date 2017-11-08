/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import expenses from './tests/fixtures/expenses';
import selectExpenses from './selectors/expenses';
import { addExpense } from './actions/expenses';
import { sort, setFilterText } from './actions/filters';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';

'use strict';

const store = configureStore();

// Subscribe
store.subscribe(() => {
	const state = store.getState();
	const selectedExpenses = selectExpenses(state.expenses, state.filters);
	console.log('STATE --------------------');
	console.log('state.expenses (actually selectedExpenses)');
	console.log(selectedExpenses);
	console.log('state.filters');
	console.log(state.filters);
});


// Add some dummy data
for (const expense of expenses) {
	store.dispatch(addExpense(expense));
}

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));