import React, {FC, useContext} from 'react';
import {RouterContext} from "./Router";
import {RedirectPropType} from "./types";
import {getParams} from "./Route";

const Redirect: FC<RedirectPropType> = ({from, to, exact}) => {
    const {push, route: {path}} = useContext(RouterContext);

    if (from && getParams(path, from, exact)[0]) {
        push(to);
    } else if (!from && !getParams(path, to, exact)[0]) {
        push(to);
    }

    return null;
};

Redirect.defaultProps = {
    exact: true
}


export default Redirect;
