import React from 'react';
import {StackActions, DrawerActions, CommonActions } from '@react-navigation/native';
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function reset(name, params) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: name}],
  });
}

export function drawer() {
  navigationRef.current.dispatch(
    DrawerActions.toggleDrawer()     
  );
}

export function drawerClose() {
  navigationRef.current.dispatch(
    DrawerActions.closeDrawer()
  );
}

export function push(routeName) {
  navigationRef.current.dispatch(
    StackActions.push({
      routeName
    })
  );
}
export function goBack() {
  navigationRef.current?.goBack();
}
function setParams(key, payload) {
  navigationRef.current.dispatch(
    CommonActions.setParams({
      params: payload,
      key
    })
  )
}
export default {
  navigate,
  reset,
  drawer,
  drawerClose,
  push,
  setParams,
  goBack
};
