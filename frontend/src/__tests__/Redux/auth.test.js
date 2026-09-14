import authReducer from '../../Redux/Reducers/auth';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from '../../Redux/Actions/types';

describe('Auth Reducer', () => {
    const initialState = {
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
        isAuthenticated: null,
        user: null,
        loading: false
    };

    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle LOGIN_SUCCESS', () => {
        const payload = { access: 'dummy-access', refresh: 'dummy-refresh' };
        const newState = authReducer(initialState, {
            type: LOGIN_SUCCESS,
            payload: payload
        });
        expect(newState.isAuthenticated).toEqual(true);
        expect(newState.access).toEqual('dummy-access');
        expect(newState.refresh).toEqual('dummy-refresh');
    });

    it('should handle LOGOUT and clear tokens', () => {
        const loggedInState = {
            ...initialState,
            access: 'dummy-access',
            refresh: 'dummy-refresh',
            isAuthenticated: true,
            user: { name: 'Test User' }
        };
        const newState = authReducer(loggedInState, { type: LOGOUT });
        expect(newState.isAuthenticated).toEqual(false);
        expect(newState.access).toBeNull();
        expect(newState.refresh).toBeNull();
        expect(newState.user).toBeNull();
    });

    it('should handle SIGNUP_FAIL properly', () => {
        const newState = authReducer(initialState, { type: SIGNUP_FAIL });
        expect(newState.access).toBeNull();
        expect(newState.refresh).toBeNull();
        expect(newState.isAuthenticated).toEqual(false);
        expect(newState.user).toBeNull();
    });
});
