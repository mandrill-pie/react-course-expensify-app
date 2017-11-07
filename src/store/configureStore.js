import {createStore, combineReducers} from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

export default () => {
	const store = createStore(
		combineReducers({
			expenses: expensesReducer, // map expensesReducer reducer to "expenses" key of state object
			filters: filtersReducer, // map filtersReducer reducer to "filters" key of state object
		}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	return store;
};