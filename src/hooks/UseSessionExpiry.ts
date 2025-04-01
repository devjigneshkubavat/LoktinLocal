import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { jwtDecode } from 'jwt-decode';
import Toast from 'react-native-toast-message';
import store from '@/store/store';
import { signOut } from '@/redux/services/authServices';

export interface decodedToken {
    exp: number
}

const UseSessionExpiry = () => {
  const dispatch = store.dispatch;
const userToken = store.getState().auth.userToken;
  const checkTokenExpiry = (token: string): boolean => {
    const decoded = jwtDecode<decodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      if (!!userToken && checkTokenExpiry(userToken)) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    Toast.show({
      type: 'error',
      text1: 'Session Expired',
      text2: 'Please log in again.',
      visibilityTime: 3000,
    });
    dispatch(signOut());
  };

  useEffect(() => {
    const unsubscribe = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      unsubscribe.remove();
    };
  }, []);

  return null;
};

export default UseSessionExpiry;
