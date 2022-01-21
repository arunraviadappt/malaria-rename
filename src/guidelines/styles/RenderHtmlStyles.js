import { Dimensions, Platform } from 'react-native';
const { width } = Dimensions.get('window');
import Theme from './Theme';

const CUSTOM_CLASSES = {
  'abbreviation': {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flex: 1,
    flexDirection: 'row'
  },
  'shorttxt': {
    width: 90,
    fontSize: 10
  },
  'abbrtext': {
    width: width - 115,
    paddingLeft: 10,
  },
  'glossary': {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flex: 1,
  },
  'gltxt': {
    fontSize: 10,
    padding: 0,
    margin: 0,
    fontFamily: Theme.customFont.fontSemiBold,
  },
  'gldesc': {
    paddingLeft: 15,
    marginTop: -10,
  },
  //new styles
  'greenshade-content': {
    backgroundColor: "#e7f2f1",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    marginBottom: 15
  },
  'chapter4_table': {
    backgroundColor: "#e1f0f7",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    marginBottom: 15
  },
  'grayshade-content': {
    backgroundColor: "#ededef",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    marginBottom: 15
  },
  'source-content': {
    fontSize: 11,
    color: "#5f5f5f",
    lineHeight: 16
  },
  'bluebox-content': {
    backgroundColor: "#2c95cd",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    marginBottom: 15
  },
  'footer': {
    fontSize: 11,
    fontStyle: "italic"
  },
  'not_recommend': {
    backgroundColor: "#e5f1f0",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    marginBottom: 15
  },
  'updated_recommend': {
    backgroundColor: "#d4effb",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    marginBottom: 15
  },
  'new_recommend': {
    backgroundColor: "#ececee",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 5,
    paddingLeft: 15,
    marginBottom: 15,
    marginTop: 10
  },
  'recommend': {
    backgroundColor: "#ececee",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20,
    marginTop: 10
  },
  'good_practice': {
    backgroundColor: "#e8f6fd",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  'chapter1_table': {
    backgroundColor: "#e1e7f0",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  'chapter2_table': {
    backgroundColor: "#dde4e1",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  "blueshade-content": {
    backgroundColor: "#e1f0f7",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  'chapter5_table': {
    backgroundColor: "#fbebe0",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  'chapter6_table': {
    backgroundColor: "#ebefe3",
    color: "#333333",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  'chapter7_table': {
    backgroundColor: "#fdded6",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  'chapter3_darkbox': {
    backgroundColor: "#58b6b1",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20,
    color: "#ffffff"
  },
  'chapter4_darkbox': {
    backgroundColor: "#0094c8",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20,
    color: "#ffffff"
  },
  'chapter5_darkbox': {
    backgroundColor: "#e15727",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20,
    color: "#ffffff"
  },
  'chapter6_darkbox': {
    backgroundColor: "#648d3c",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  'chapter7_darkbox': {
    backgroundColor: "#ed1f45",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20,
    color: "#ffffff"
  },
  'chapter6_borderbox': {
    borderWidth: 1,
    borderColor: "#7d9f5c",
    borderStyle: "solid",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginBottom: 20
  },
  'recommend2018': {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#e2e7ee",
    marginBottom: 10
  },
  'recommendpattern2018': {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#e2e7ee",
    marginBottom: 10
  },
  'violetshade': {
    backgroundColor: "#e1d3e7",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    color: "#333333",
    marginBottom: 20
  },
  'blue-header': {
    backgroundColor: '#1b9ece',
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: '#fff',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  'blue-content': {
    backgroundColor: '#CCEBF7',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 10,
    marginTop: -10,
    marginBottom:10,
    fontSize: 16,
    color: '#595959'
  },
  'resource-block': {
    flex: 1,
    flexDirection: width > 700 ? 'row' : 'column'
  },
  'resource-text': {
    flex: 1,
    flexDirection: 'column'
  },
  'statement': {
    alignSelf: 'flex-start',
    paddingTop: 8,
    paddingBottom: 5,
    paddingHorizontal: 15
  }
};
const CUSTOM_TAGSSTYLE = {
  p: {
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 10,
    padding: 0,
    color: '#595959'
  },
  span: {
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 10,
    padding: 0,
    color: '#595959'
  },
  div: {
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 16,
    lineHeight: 22,
    padding: 0,
  },
  li: {
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 0,
    color: '#595959',
    marginBottom: 0,
    paddingBottom: 0
  },
  ul: {
    left: -10,
    marginBottom: 0,
    marginTop: 10
  },
  strong: {
    fontFamily: Theme.customFont.fontSemiBold,
    fontSize: 16,
    flexDirection: 'row',
  },
  em: {
    fontFamily: Theme.customFont.fontItalic,
    fontSize: 16,
  },
  i: {
    fontFamily: Theme.customFont.fontSemiBoldItalic,
    fontSize: 16,
  },
  a: {
    color: '#03adea',
    textDecorationLine: 'none',
    marginTop: 10,
    marginBottom: 10,
    padding: 0,
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 17
  },
  u: {
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 16,
    textDecorationLine: 'underline'
  }
};

export const RenderHtmlStyles = {
  CUSTOM_CLASSES,
  CUSTOM_TAGSSTYLE
}
