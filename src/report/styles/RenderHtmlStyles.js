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
    width: 70,
    fontSize: 10
  },
  'abbrtext': {
    width: width - 90
  }
};
const CUSTOM_TAGSSTYLE = {
  p: {
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 10,
    padding: 0,
    color: '#595959'
  },
  span: {
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 10,
    padding: 0,
    color: '#595959'
  },
  div: {
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 16,
    lineHeight: 24,
    padding: 0,
  },
  li: {
    fontFamily: Theme.customFont.fontRegular,
    fontSize: 16,
    lineHeight: 24,
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
    fontSize: 16
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
