import {EtoolsRouter} from '@unicef-polymer/etools-utils/dist/singleton/router';
import {
  EtoolsRouteCallbackParams,
  EtoolsRouteDetails
} from '@unicef-polymer/etools-utils/dist/interfaces/router.interfaces';
import {Environment} from '@unicef-polymer/etools-utils/dist/singleton/environment';

EtoolsRouter.init({
  baseUrl: Environment.basePath,
  redirectPaths: {
    notFound: '/not-found',
    default: '/personalized'
  },
  redirectedPathsToSubpageLists: []
});

const availablePages = [
  'personalized',
  'hact',
  'attachments',
  'map',
  'partnerships',
  'trips',
  'custom',
  'fam',
  'fmm',
  'fmp',
  'not-found'
];

EtoolsRouter.addRoute(new RegExp(`^$`), (params: EtoolsRouteCallbackParams): EtoolsRouteDetails => {
  return {
    routeName: 'app',
    subRouteName: null, // tab name
    path: params.matchDetails[0],
    queryParams: params.queryParams,
    params: null
  };
});

availablePages.forEach((page) => {
  EtoolsRouter.addRoute(new RegExp(`^${page}$`), (params: EtoolsRouteCallbackParams): EtoolsRouteDetails => {
    return {
      routeName: page,
      subRouteName: null,
      path: params.matchDetails[0],
      queryParams: null,
      params: null
    };
  });
});
