import { EtoolsRouter } from "@unicef-polymer/etools-utils/dist/singleton/router";
import {
  EtoolsRouteCallbackParams,
  EtoolsRouteDetails,
} from "@unicef-polymer/etools-utils/dist/interfaces/router.interfaces";
import { AsyncEffect, store } from "../redux/store";
import { Environment } from "@unicef-polymer/etools-utils/dist/singleton/environment";
import { navigate } from "../redux/actions/app";

EtoolsRouter.init({
  baseUrl: Environment.basePath,
  redirectPaths: {
    notFound: "/page-not-found",
    default: "/personalized",
  },
  redirectedPathsToSubpageLists: [],
});

const availablePages = [
  "personalized",
  "hact",
  "attachments",
  "map",
  "partnerships",
  "trips",
  "custom",
  "fam",
  "fmm",
  "fmp",
  "page-not-found",
];

EtoolsRouter.addRoute(
  new RegExp(`^$`),
  (params: EtoolsRouteCallbackParams): EtoolsRouteDetails => {
    return {
      routeName: "app",
      subRouteName: null, // tab name
      path: params.matchDetails[0],
      queryParams: params.queryParams,
      params: null,
    };
  }
);

availablePages.forEach((page) => {
  EtoolsRouter.addRoute(
    new RegExp(`^${page}$`),
    (params: EtoolsRouteCallbackParams): EtoolsRouteDetails => {
      return {
        routeName: page,
        subRouteName: null,
        path: params.matchDetails[0],
        queryParams: null,
        params: null,
      };
    }
  );
});

/**
 * Utility used to update location based on routes and dispatch navigate action (optional)
 */
export const updateAppLocation = (
  newLocation: string,
  dispatchNavigation = true
): void => {
  const _newLocation = EtoolsRouter.prepareLocationPath(newLocation);

  EtoolsRouter.pushState(_newLocation);

  if (dispatchNavigation) {
    store.dispatch<AsyncEffect>(navigate(decodeURIComponent(_newLocation)));
  }
};

export const replaceAppLocation = (
  newLocation: string,
  dispatchNavigation = true
): void => {
  const _newLocation = EtoolsRouter.prepareLocationPath(newLocation);

  EtoolsRouter.replaceState(_newLocation);

  if (dispatchNavigation) {
    store.dispatch<AsyncEffect>(navigate(decodeURIComponent(_newLocation)));
  }
};
