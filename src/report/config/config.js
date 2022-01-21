'use strict';
module.exports = {
  API:{
    latestupdate: 'https://s3.amazonaws.com/malaria-app/v7_prod/latestupdate.json',
    title: 'MALARIA',
    noconnection: 'No Internet Connection',
    serverError: 'Unable to connect to server',
    dataFetchError: 'no content available'
  },
  APIS: {
    FETCH_NEWS_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/news.json',
    FETCH_QUICKSTATS_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/quickstats.json',
    FETCH_PAGECONTENT_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/generalcontent.json',
    FETCH_REGIONS_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/regions.json',
    FETCH_INITIATIVES_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/initiatives.json',
    GET_INDICATORS_BY_COUNTRIES_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/dataelements.json',
    GET_INITIATIVES_INDICATORS_BY_COUNTRIES_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/initiatives-dataelements.json',
    FETCH_CHART_DATA_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/chartdata.json',
    GET_INDICATORS_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/indicators.json',
    GET_INDICATORS_BY_DATAELEMENTS_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/mapdata.json',
    GET_INITIATIVES_INDICATORS_BY_DATAELEMENTS_RECEIVED: 'https://s3.amazonaws.com/malaria-app/v7_prod/initiatives-mapdata.json'
  },
  STORE: {
    iosID:"1300199731",
    androidID: "uk.co.adappt.adapptlabs.who.malaria",
    iosURI: "itms-apps://itunes.apple.com/in/app/world-malaria-report/id1300199731?mt=8",
    iosURL: "https://itunes.apple.com/in/app/world-malaria-report/id1300199731?mt=8",
    androidURI: "market://play.google.com/store/apps/details?id=uk.co.adappt.adapptlabs.who.malaria",
    androidURL: "https://play.google.com/store/apps/details?id=uk.co.adappt.adapptlabs.who.malaria"
  }
};
