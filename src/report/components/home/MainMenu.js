import React, { PureComponent } from 'react';
import { View, Dimensions, ScrollView, Text, StyleSheet, FlatList } from 'react-native';
// import { connect } from 'react-redux';
import MainMenuItem from './MainMenuItem';
import Theme from '../../styles/Theme';


class MainMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onActive = this.onActive.bind(this);
  }

  onActive = (index, lastindex) => {
    if (this._flatList) {
      if (index == lastindex) {
        this._flatList.scrollToIndex({ animated: true, index: index, viewPosition: 1 });
      } else {
        this._flatList.scrollToIndex({ animated: true, index: index, viewPosition: 0.5 });
      }
    }
  };

  renderItem = (item, index, lastindex) => {
    return (
      <MainMenuItem
        index={index}
        onActive={(index) => this.onActive(index, lastindex)}
        activekey={this.props.activekey}
        activeKeyBreadcrumb={this.props.activeKeyBreadcrumb}
        data={item} 
        navigation={this.props.navigation}
        background_Color={this.props.background_Color}
      />
    )
  }

  render() {
    const lastindex = this.props.menuLists.length - 1;
    // console.log('this.props.navigation', this.props.navigation)
    return (
      <View style={[this.props.route.params.routeName === "Home" ? styles.homescreenMenu : styles.menusquareMenu,]}>
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          showsHorizontalScrollIndicator={false}
          ref={(ref) => this._flatList = ref}
          horizontal={true}
          data={this.props.menuLists}
          renderItem={({ item, index }) => this.renderItem(item, index, lastindex)}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homescreenMenu: {
    backgroundColor:Theme.customColor.mainMenuBottomColor, //Theme.customColor.headerMenuBgColor,
    // position: 'absolute',
    height: 45,
    zIndex: 5
  },
  menusquareMenu: {
    backgroundColor:Theme.customColor.mainMenuBottomColor,// Theme.customColor.headerMenuBgColor, //'#FFF',
    height: 45
  }
});

export default MainMenu