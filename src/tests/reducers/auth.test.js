import authReducer from '../../reducers/auth';

test('should set uid for LOGIN', () => {
	const action = {
		type: 'LOGIN',
		uid: 12
	};
	const state = authReducer({}, action);
	expect(state.uid).toEqual(action.uid);
});

test('should clear uid for LOGOUT', () => {
	const action = {
		type: 'LOGOUT'
	};
	const state = authReducer({ uid: 12 }, action);
	expect(state).toEqual({});
});