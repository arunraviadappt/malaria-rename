
export async function navigateHelper(data = '', navigation, nodeMap) {
  if (!data) {
    navigation.navigate({ routeName: 'Home', params: { isParent: true }, key: 'Home' });
  }
  let searchText = data.searchText ? data.searchText : null;
  var nextNid = (data && data.next_nid) ? data.next_nid : '';
  var prevNid = (data && data.prev_nid) ? data.prev_nid : '';
  var parentNid = (data && data.parent_nid) ? data.parent_nid : '';
  var nodeMapData = nodeMap ? nodeMap[parentNid] : {};
  var nodeId = (data && data.nid) ? data.nid : '';
  var deeperLink = (data && data.deeperlink) ? data.deeperlink : [];
  switch (data.menu_type) {
    case "mirror_content":
    case "content":
    case "decision_tree":
    case "news_feed":
    case "accord":
      navigation.navigate({
        routeName: 'CarousalView',
        params: {
          nid: nodeId,
          nodeMap: nodeMap,
          title: (nodeMapData && nodeMapData.title) ? nodeMapData.title.toUpperCase() : '',
          parentNid: parentNid,
          nextNid: nextNid,
          prevNid: prevNid,
          searchText
        },
        key: nodeId
      });
      break;
    case "menu_list":
      navigation.navigate({
        routeName: 'MenuList',
        params: {
          data: deeperLink,
          nodeMap: nodeMap,
          title: (data && data.title) ? data.title.toUpperCase() : '',
          parentNid: parentNid
        },
        key: nodeId
      });
      break;
    case "content-menulist":
      navigation.navigate({
        routeName: 'CarousalView',
        params: {
          data: deeperLink,
          nid: nodeId,
          nodeMap: nodeMap,
          title: (nodeMapData && nodeMapData.title) ? nodeMapData.title.toUpperCase() : '',
          parentNid: parentNid,
          nextNid: nextNid,
          prevNid: prevNid,
          searchText
        },
        key: nodeId
      });
      break;
    case "menu_squares":
      navigation.navigate({
        routeName: 'SquareMenu',
        params: {
          data: deeperLink,
          nodeMap: nodeMap,
          title: (data && data.title) ? data.title.toUpperCase() : '',
          parentNid: (data.parent_nid) ? data.parent_nid : ''
        },
        key: nodeId
      });
      break;
    case "jump_page":
      navigation.navigate({
        routeName: 'CarousalView',
        params: {
          data: deeperLink,
          nid: nodeId,
          nodeMap: nodeMap,
          title: (nodeMapData && nodeMapData.title) ? nodeMapData.title.toUpperCase() : '',
          parentNid: parentNid,
          nextNid: nextNid,
          prevNid: prevNid,
          searchText
        },
        key: nodeId
      })
      break;
    default:
      navigation.navigate({ routeName: 'Home', params: { isParent: true }, key: 'Home' });
      break;
  }
}

export async function navigateReplaceWithAnimation(data = '', navigation, nodeMap) {

  if (!data) {
    navigation.navigate({ routeName: 'Home', params: { isParent: true }, key: 'Home' });
  }
  let searchText = data.searchText ? data.searchText : null;
  var nextNid = (data && data.next_nid) ? data.next_nid : '';
  var prevNid = (data && data.prev_nid) ? data.prev_nid : '';
  var parentNid = (data && data.parent_nid) ? data.parent_nid : '';
  var nodeMapData = nodeMap ? nodeMap[parentNid] : {};
  var nodeId = (data && data.nid) ? data.nid : '';
  var deeperLink = (data && data.deeperlink) ? data.deeperlink : [];
  switch (data.menu_type) {
    case "mirror_content":
    case "content":
    case "decision_tree":
    case "news_feed":
    case "accord":
      navigation.replace('CarousalView',
        {
          nid: nodeId,
          nodeMap: nodeMap,
          title: (nodeMapData && nodeMapData.title) ? nodeMapData.title.toUpperCase() : '',
          parentNid: parentNid,
          nextNid: nextNid,
          prevNid: prevNid,
          theme: data.theme ? data.theme : '#006998',
          searchText
        });
      break;
    case "menu_list":
      navigation.replace('MenuList',
        {
          data: deeperLink,
          nodeMap: nodeMap,
          title: (data && data.title) ? data.title.toUpperCase() : '',
          parentNid: parentNid,
          theme: data.theme ? data.theme : '#006998',
        });
      break;
    case "content-menulist":
      navigation.replace('CarousalView',
        {
          data: deeperLink,
          nid: nodeId,
          nodeMap: nodeMap,
          title: (nodeMapData && nodeMapData.title) ? nodeMapData.title.toUpperCase() : '',
          parentNid: parentNid,
          nextNid: nextNid,
          prevNid: prevNid,
          theme: data.theme ? data.theme : '#006998',
          searchText
        });
      break;
    case "menu_squares":
      navigation.replace('SquareMenu',
        {
          data: deeperLink,
          nodeMap: nodeMap,
          title: (data && data.title) ? data.title.toUpperCase() : '',
          parentNid: (data.parent_nid) ? data.parent_nid : ''
        });
      break;
    case "jump_page":
      navigation.replace('SquareMenu',
        {
          data: deeperLink,
          nid: nodeId,
          nodeMap: nodeMap,
          title: (nodeMapData && nodeMapData.title) ? nodeMapData.title.toUpperCase() : '',
          parentNid: parentNid,
          nextNid: nextNid,
          prevNid: prevNid,
          searchText,
          theme: data.theme ? data.theme : '#006998',
        });
      break;
    default:
      navigation.navigate({ routeName: 'Home', params: { isParent: true }, key: 'Home' });
      break;
  }
}
