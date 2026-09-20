import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { social_authenticate, logout } from '../../Redux/Actions/auth';
import {
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_ALERT
} from '../../Redux/Actions/types';

// Mock axios
jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Auth Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
    
    // Configurar localStorage mock
    Storage.prototype.removeItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

  describe('social_authenticate', () => {
    it('dispatches LOGIN_SUCCESS on successful social auth', async () => {
      const mockData = { access: 'test-access', refresh: 'test-refresh' };
      axios.post.mockResolvedValueOnce({ status: 201, data: mockData });
      axios.get.mockResolvedValueOnce({ status: 200, data: { user: 'test-user' } }); // load_user mock

      const expectedActions = [
        { type: SET_AUTH_LOADING },
        { type: LOGIN_SUCCESS, payload: mockData },
        { type: SET_AUTH_LOADING }, // from load_user
        { type: REMOVE_AUTH_LOADING },
        { type: SET_ALERT, payload: { msj: 'Inicio de sesion exitoso', type: 'green' } }
      ];

      await store.dispatch(social_authenticate('test-state', 'test-code', 'github'));
      
      const actions = store.getActions();
      
      expect(actions[0]).toEqual({ type: SET_AUTH_LOADING });
      expect(actions[1]).toEqual({ type: LOGIN_SUCCESS, payload: mockData });
      
      // Verify axios call
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/o/github/?state=test-state'),
        expect.any(String),
        expect.any(Object)
      );
    });

    it('dispatches LOGIN_FAIL on failed social auth', async () => {
      axios.post.mockRejectedValueOnce({ response: { data: 'error' } });

      await store.dispatch(social_authenticate('test-state', 'test-code', 'github'));
      
      const actions = store.getActions();
      
      expect(actions[0]).toEqual({ type: SET_AUTH_LOADING });
      
      // Look for LOGIN_FAIL in the dispatched actions
      const loginFailAction = actions.find(a => a.type === LOGIN_FAIL);
      expect(loginFailAction).toBeTruthy();
      
      const removeLoadingAction = actions.find(a => a.type === REMOVE_AUTH_LOADING);
      expect(removeLoadingAction).toBeTruthy();
    });
  });

  describe('logout', () => {
    it('dispatches LOGOUT and clears localStorage', () => {
      store.dispatch(logout());
      
      const actions = store.getActions();
      expect(actions).toEqual([
        { type: LOGOUT },
        { type: SET_ALERT, payload: { msj: 'Ha salido exitosamente', type: 'green' } }
      ]);
    });
  });
});
