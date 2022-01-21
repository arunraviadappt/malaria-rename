import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { navigateHelper } from '../../utils/navigations/navigationHelper';
import Theme from '../../styles/Theme';


class MenuListItem extends PureComponent {

  onLayoutCall = (activekey, data, onActive, index, activeKeyBreadcrumb) => {
    this.refs.Marker.measure((x, y, width, height, pageX, pageY) => {
      activekey == data.nid || activeKeyBreadcrumb === data.nid ? onActive(index) : null
    })
  }

  render() {
    const { data, navigation, activekey, activeKeyBreadcrumb, onActive, index ,background_Color} = this.props;
    let { mainMenuBottomColor, mainMenuInSqMenu } = Theme.customColor;
    return (
      <TouchableOpacity style={styles.row} onPress={() => navigateHelper(data, navigation)}>
        <View ref="Marker"
          onLayout={({ nativeEvent }) => this.onLayoutCall(activekey, data, onActive, index, activeKeyBreadcrumb)}
          style={{ height: 45, backgroundColor:background_Color?background_Color:'#0067aa' , borderBottomColor: activekey == data.nid || activeKeyBreadcrumb === data.nid ? '#1da7e6' : 'transparent', borderBottomWidth: 3, justifyContent: 'center',    }}>
          <Text style={styles.title}>{data.title}</Text>

        </View>
      </TouchableOpacity>
    )
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    paddingTop: 4,
    paddingRight: 15,
    paddingLeft: 15,
    fontFamily: Theme.customFont.fontRegular,
    color: Theme.customColor.colorWhite //'#5a5959'
  },
  row: {
   // flexDirection: 'row',
   // borderBottomColor: Theme.customColor.itemSeparatorColor,
   // borderBottomWidth: StyleSheet.hairlineWidth,
   // paddingLeft: 10,
   // paddingRight: 15
   backgroundColor: '#fff'
  },
});

export default MenuListItem;
