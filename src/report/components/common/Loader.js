import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

const Loader = () => {
  return (
    <ActivityIndicator
      animating={true}
      color='#fff'
      size="large"
      style={styles.style} />
  )
}
const styles = StyleSheet.create({
  style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
})
export default Loader;
