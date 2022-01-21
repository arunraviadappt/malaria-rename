import React from 'react';
import {StackActions, DrawerActions, CommonActions } from '@react-navigation/native';
export const navigatorRef = React.createRef();

export function navigate(name, params) {
  navigatorRef.current?.navigate(name, params);
}

export function reset(name, params) {
  navigatorRef.current?.reset({
    index: 0,
    routes: [{ name: name}],
  });
}

export function drawer() {
  navigatorRef.current.dispatch(
    DrawerActions.toggleDrawer()     
  );
}

export function drawerClose() {
  navigatorRef.current.dispatch(
    DrawerActions.closeDrawer()
  );
}

export function push(routeName) {
  navigatorRef.current.dispatch(
    StackActions.push({
      routeName
    })
  );
}
export function replace()
{
  navigatorRef.current.dispatch(
    StackActions.replace({
      routeName: 'MalariaReportHome'
      
    })     
  );

}
export function goBack() {
  navigatorRef.current.dispatch(
    CommonActions.goBack()
  );
}
function setParams(key, payload) {
  navigatorRef.current.dispatch(
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
  goBack,
  replace
};
