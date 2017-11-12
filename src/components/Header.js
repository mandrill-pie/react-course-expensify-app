import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import selectExpenses from '../selectors/expenses';

export const Header = ({ user, startLogout }) => (
	<header>
		<h1>Expensify</h1>
		<NavLink activeClassName="is-active" to="/dashboard">Dashboard</NavLink>
		<NavLink activeClassName="is-active" to="/create">Create Expense</NavLink>
		<button onClick={startLogout}>Logout {user.displayName}</button>
	</header>
);

const mapStateToProps = (state) => ({
	user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);