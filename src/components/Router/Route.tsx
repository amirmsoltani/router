import React from "react";
import {ParamsType, RoutePropType} from "./types";
import {RouterContext} from "./Router";

export function getParams(path: string, routePath: string, exact: boolean): [boolean, ParamsType?] {
    const routePathSplit = routePath.split('/');
    const pathSplit = path.split('/');
    const params: ParamsType = {};
    // check pathname size equal together
    if (pathSplit.length !== routePathSplit.length && !exact || (exact && pathSplit.length < routePathSplit.length)) {
        return [false];
    }
    // check route path scope is param get value from path
    for (let arrayIndex = 0; arrayIndex < routePathSplit.length; arrayIndex++) {
        const index = routePathSplit[arrayIndex].indexOf(':');
        if (index !== -1) {
            params[routePathSplit[arrayIndex].substring(index + 1)] = pathSplit[arrayIndex];
        } else if (routePathSplit[arrayIndex] !== pathSplit[arrayIndex]) {
            return [false];
        }
    }

    return [true, params];
}

const Route: React.FC<RoutePropType> = ({path, component: Component, exact}) => {
    // get context
    const router = React.useContext(RouterContext);
    // get params and check equality
    const [sameTogether, params] = getParams(router.route.path, path, exact);
    if (sameTogether) {
        return <Component router={
            {
                push: router.push,
                back: router.back,
                route: router.route,
                params
            }}/>
    }
    return null;
}
Route.defaultProps = {exact: true};
export default Route;
