import {Platform, Linking, Alert} from 'react-native';
var DeviceInfo = require('react-native-device-info');

const UPGRADE_URLS = {
    ios: "https://apps.apple.com/us/app/id1300199731",
    android: "https://play.google.com/store/apps/details?id=uk.co.adappt.adapptlabs.who.malaria",
    versionCheck: "https://malaria-app.s3.amazonaws.com/upgrade.json"
}

const compareAppVersion = (v1,v2) => {
    if (typeof v1 !== 'string') return false;
      if (typeof v2 !== 'string') return false;
      v1 = v1.split('.');
      v2 = v2.split('.');
      const k = Math.min(v1.length, v2.length);
      for (let i = 0; i < k; ++ i) {
          v1[i] = parseInt(v1[i], 10);
          v2[i] = parseInt(v2[i], 10);
          if (v1[i] > v2[i]) return false;
          if (v1[i] < v2[i]) return true;        
      }
      return v1.length == v2.length ? false: (v1.length < v2.length ? true : false);
  }

const attemptUpgrade = () => {
    Linking.canOpenURL(Platform.OS === 'ios' ? UPGRADE_URLS.ios : UPGRADE_URLS.android).then(supported => {
      if (supported) {
        Linking.openURL(Platform.OS === 'ios' ? UPGRADE_URLS.ios : UPGRADE_URLS.android)
      } 
    })
}  

const renderAlert = () => {
    Alert.alert(
        'Update Available',
        `A newer version of this app is available on the ${Platform.OS === 'ios' ? 'AppStore': 'PlayStore'}.`,
        [
        {text: 'Cancel',},
        {text: 'Update', onPress: () => attemptUpgrade()},
        ],
        { cancelable: false }
    )
}
  

const upgradeDialogBox = () => {
    fetch(UPGRADE_URLS.versionCheck, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (Platform.OS === 'ios' && data.iosVersion && compareAppVersion(DeviceInfo.getVersion() , data.iosVersion)) {
            renderAlert()
        } else if (data.androidVersion && compareAppVersion(DeviceInfo.getVersion() , data.androidVersion)) {
            renderAlert()
        }
      })
}

export default upgradeDialogBox;