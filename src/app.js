/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import expenses from './tests/fixtures/expenses';
import selectExpenses from './selectors/expenses';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

'use strict';

const store = configureStore();

// Subscribe
// store.subscribe(() => {
// 	const state = store.getState();
// 	const selectedExpenses = selectExpenses(state.expenses, state.filters);
// 	console.log('STATE --------------------');
// 	console.log('state.expenses (actually selectedExpenses)');
// 	console.log(selectedExpenses);
// 	console.log('state.filters');
// 	console.log(state.filters);
// });

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		console.log(user);
		store.dispatch(login(user));
		console.log(`User ${user.email} logged in`);
		store.dispatch(startSetExpenses()).then(() => {
			renderApp();
			if (history.location.pathname === '/') {
				history.push('dashboard');
			}
		});		
	} else {
		store.dispatch(logout());
		console.log('User logged out');
		renderApp();
		history.push('/');
	}
});