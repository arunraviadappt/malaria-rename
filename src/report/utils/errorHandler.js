import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';

export const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      `
          Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
          We have reported this to our team !
          `,
      [{
        text: 'Restart',
        onPress: () => RNRestart.Restart(),
      }]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};
