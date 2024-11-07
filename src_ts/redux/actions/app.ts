import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { EtoolsRouter } from "@unicef-polymer/etools-utils/dist/singleton/router";
import { EtoolsRouteDetails } from "@unicef-polymer/etools-utils/dist/interfaces/router.interfaces";

import { EtoolsRedirectPath } from "@unicef-polymer/etools-utils/dist/enums/router.enum";
import { Environment } from "@unicef-polymer/etools-utils/dist/singleton/environment";

export const UPDATE_ROUTE_DETAILS = "UPDATE_ROUTE_DETAILS";
export const UPDATE_DRAWER_STATE = "UPDATE_DRAWER_STATE";

export interface AppActionUpdateRouteDetails
  extends Action<"UPDATE_ROUTE_DETAILS"> {
  routeDetails: any;
}
export interface AppActionUpdateDrawerState
  extends Action<"UPDATE_DRAWER_STATE"> {
  opened: boolean;
}

export type AppAction =
  | AppActionUpdateRouteDetails
  | AppActionUpdateDrawerState;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

const updateStoreRouteDetails: ActionCreator<AppActionUpdateRouteDetails> = (
  routeDetails: any
) => {
  return {
    type: UPDATE_ROUTE_DETAILS,
    routeDetails,
  };
};

const loadPageComponents: ActionCreator<ThunkResult> =
  (routeDetails: EtoolsRouteDetails) => (dispatch) => {
    if (!routeDetails) {
      // invalid route => redirect to page not found
      EtoolsRouter.updateAppLocation(
        EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
      );
      return;
    }

    if (routeDetails.routeName === "page-not-found") {
      import("../../components/pages/page-not-found.js");
    } else {
      switch (routeDetails.routeName) {
        case "personalized":
          import("../../components/pages/view-personalized.js").catch(
            (error) => {
              console.log("Error at loadPageComponents", error);
              EtoolsRouter.updateAppLocation(
                EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
              );
            }
          );
          break;
        case "partnerships":
          import("../../components/pages/view-partnerships.js").catch(
            (error) => {
              console.log("Error at loadPageComponents", error);
              EtoolsRouter.updateAppLocation(
                EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
              );
            }
          );
          break;
        case "fam":
          import("../../components/pages/view-fam.js").catch((error) => {
            console.log("Error at loadPageComponents", error);
            EtoolsRouter.updateAppLocation(
              EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
            );
          });
          break;
        case "fmm":
          import("../../components/pages/view-fmm.js").catch((error) => {
            console.log("Error at loadPageComponents", error);
            EtoolsRouter.updateAppLocation(
              EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
            );
          });
          break;
        case "fmp":
          import("../../components/pages/view-fmp.js").catch((error) => {
            console.log("Error at loadPageComponents", error);
            EtoolsRouter.updateAppLocation(
              EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
            );
          });
          break;
        case "hact":
          import("../../components/pages/view-hact.js").catch((error) => {
            console.log("Error at loadPageComponents", error);
            EtoolsRouter.updateAppLocation(
              EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
            );
          });
          break;
        case "map":
          import("../../components/pages/view-map.js").catch((error) => {
            console.log("Error at loadPageComponents", error);
            EtoolsRouter.updateAppLocation(
              EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
            );
          });
          break;
        case "attachments":
          import("../../components/pages/view-attachments.js").catch(
            (error) => {
              console.log("Error at loadPageComponents", error);
              EtoolsRouter.updateAppLocation(
                EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
              );
            }
          );
          break;
        case "trips":
          import("../../components/pages/view-trips.js").catch((error) => {
            console.log("Error at loadPageComponents", error);
            EtoolsRouter.updateAppLocation(
              EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
            );
          });
          break;
        case "custom":
          import("../../components/pages/view-custom.js").catch((error) => {
            console.log("Error at loadPageComponents", error);
            EtoolsRouter.updateAppLocation(
              EtoolsRouter.getRedirectPath(EtoolsRedirectPath.NOT_FOUND)
            );
          });
          break;
      }
    }

    // add page details to redux store, to be used in other components
    dispatch(updateStoreRouteDetails(routeDetails));
  };

export const updateDrawerState: ActionCreator<AppActionUpdateDrawerState> = (
  opened: boolean
) => {
  return {
    type: UPDATE_DRAWER_STATE,
    opened,
  };
};

export const navigate: ActionCreator<ThunkResult> =
  (path: string) => (dispatch) => {
    // Check if path matches a valid app route, use route details to load required page components

    // if app route is accessed, redirect to default route (if not already on it)
    // @ts-ignore
    if (
      path === Environment.basePath &&
      Environment.basePath !==
        EtoolsRouter.getRedirectPath(EtoolsRedirectPath.DEFAULT)
    ) {
      EtoolsRouter.updateAppLocation(
        EtoolsRouter.getRedirectPath(EtoolsRedirectPath.DEFAULT)
      );
      return;
    }

    // some routes need redirect to subRoute list
    const redirectPath: string | undefined =
      EtoolsRouter.getRedirectToListPath(path);
    if (redirectPath) {
      EtoolsRouter.updateAppLocation(redirectPath);
      return;
    }

    // some routes need redirect to subRoute list
    const routeDetails: EtoolsRouteDetails | null =
      EtoolsRouter.getRouteDetails(path);

    dispatch(loadPageComponents(routeDetails));
  };
