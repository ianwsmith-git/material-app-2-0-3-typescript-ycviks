import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";

import { sidebarRoutes } from "./index";
import Dashboard from "../layouts/Dashboard";
import { RouteType } from "../types/routes";



const childRoutes = (Layout: React.ElementType, routes: Array<RouteType>) =>
  routes.map(
    ({ component: Component, guard, children, path }, index: number) => {
      const Guard = guard || React.Fragment;

      return children ? (
        children.map((element, index: number) => {
          const Guard = element.guard || React.Fragment;

          return (
            <Route
              key={index}
              path={element.path}
              exact
              render={(props: RouteComponentProps) => (
                <Guard>
                  <Layout>
                    <element.component {...props} />
                  </Layout>
                </Guard>
              )}
            />
          );
        })
      ) : Component ? (
        <Route
          key={index}
          path={path}
          exact
          render={(props) => (
            <Guard>
              <Layout>
                <Component {...props} />
              </Layout>
            </Guard>
          )}
        />
      ) : null;
    }
  );

const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(Dashboard, sidebarRoutes)}
    </Switch>
  </Router>
);

export default Routes;