import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from "react-redux";

const NetworkCheck = ({ network, children }) => {
  if (network) {
    return children;
  }
  return (
    <View style={styles.container} >
      <Text>Check you network connectivity</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});

const mapStateToProps = ({ network }) => ({
  network: network.isConnected
});

export default connect(mapStateToProps)(NetworkCheck);
