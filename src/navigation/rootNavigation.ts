import * as React from 'react';
import {
  StackActions,
  NavigationContainerRef,
  NavigationAction,
} from '@react-navigation/native';
type NavigationRef = NavigationContainerRef<any>;

export const navigationRef = React.createRef<NavigationRef>();

export function navigate(name: string, params?: Record<string, any>): void {
  navigationRef.current?.navigate(name, params);
}
export function dispatch(action: NavigationAction): void {
  navigationRef.current?.dispatch(action);
}
export function replace(name: string, params?: Record<string, any>): void {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}
export function push(name: string, params?: Record<string, any>): void {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}
export function reset(index: number,name:string, params?: Record<string, any>): void {
  navigationRef.current?.reset({index,routes:[{name,params}]})
}
export function goBack(): void {
  navigationRef.current?.goBack();
}
export const navigation = {
  navigate,
  dispatch,
  replace,
  push,
  goBack,
  reset
};
