import api from './api';

const messages = {
  name: "English",
  code: "en",
  primaryLabel: "Language",
  secondaryLabel: "Select Language",
  quickMenu: "Quick Menu",
  search: "Search",
  searchHere: "Search here",
  noContent: "No Content Available",
  noResultSearch: "No results found for",
  favorites: "Favorites",
  noFavorite: "No Favorites Found",
  switchLanguage: "Switching Language...",
  changeLanguageConfirmation1: "Your current language is",
  changeLanguageConfirmation2: "Do you want to switch to ",
  confirmation: "Confirmation",
  ok: "OK",
  cancel: "Cancel",
  message1: "The content you are trying to view is in",
  message2: "To view it please switch to",
  message3: "and click the shared link again.",
  related: "Related Content",
  shareText1: "Somebody has shared content from the WHO Malaria Toolkit app! If you have WHO Malaria Toolkit installed on your device please click the link below to view the shared content",
  shareText2: "If you do not yet have the WHO Malaria Toolkit installed on your device, you may download it here:",
  notificationTitle: "Notification",
  externalNotificationMsg: "This is an external link. Do you want to leave WHO Malaria Toolkit?",
  checkingUpdate: "Checking for updates...",
  noUpdate: "Data is up-to-date.",
  fetchingUpdate: "Fetching updates...",
  updateSuccess: "App updated successfully.",
  serverIssue: "Updation failed.",
  lowInternet: "Low internet connection.",
  noInternet: "No internet connection.",
  noCountry: "No Countries found",
  requestFailure: "Web page is not available",
  internetLost: "Please try again later"
};

export default {
  ...messages,
  ...api
}
