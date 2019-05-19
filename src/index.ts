import {
  createOafRouter,
  defaultSettings as oafRoutingDefaultSettings,
  RouterSettings,
} from "oaf-routing";

import Transition from "@ember/routing/-private/transition";
import RouteInfo from "@ember/routing/-private/route-info";

// tslint:disable: no-expression-statement
// tslint:disable: no-if-statement
// tslint:disable: object-literal-sort-keys

export { RouterSettings } from "oaf-routing";

export const defaultSettings: RouterSettings<RouteInfo> = {
  ...oafRoutingDefaultSettings,
  // TODO support pop page state restoration.
  restorePageStateOnPop: false,
  // We're not restoring page state ourselves so leave this enabled.
  disableAutoScrollRestoration: false,
};

export const createOafEmberRouter = (
  settingsOverrides?: Partial<RouterSettings<RouteInfo>>,
) => {
  const settings: RouterSettings<RouteInfo> = {
    ...defaultSettings,
    ...settingsOverrides,
  };

  const oafRouter = createOafRouter<RouteInfo>(
    settings,
    // TODO: get hash from route info itself.
    () => window.document.location.hash
  );

  return {
    routeDidChange: (transition: Transition) => {
      setTimeout(() =>{
        if (transition.from === null) {
          oafRouter.handleFirstPageLoad(transition.to);
        } else {
          oafRouter.handleLocationChanged(
            transition.from,
            transition.to,
            undefined,
            undefined
          );
        }
      });
    }
  };
};
