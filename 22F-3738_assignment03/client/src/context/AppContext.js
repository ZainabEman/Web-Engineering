import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  notifications: [],
  theme: localStorage.getItem('theme') || 'light',
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  TOGGLE_THEME: 'TOGGLE_THEME',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.id !== action.payload
        ),
      };
    case ActionTypes.TOGGLE_THEME:
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return {
        ...state,
        theme: newTheme,
      };
    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const setUser = (user) => dispatch({ type: ActionTypes.SET_USER, payload: user });
  const logout = () => dispatch({ type: ActionTypes.LOGOUT });
  const setLoading = (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
  const addNotification = (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      payload: { ...notification, id },
    });
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
    }, 5000);
  };
  const toggleTheme = () => dispatch({ type: ActionTypes.TOGGLE_THEME });

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUser,
        logout,
        setLoading,
        addNotification,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 