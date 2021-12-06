import {Dispatch, SetStateAction, JSXElementConstructor} from 'react';

export type StateType = {
    path: string;
};
export interface LocalObjectType extends RouterType {
    __state__: StateType;
    __setState__: Dispatch<SetStateAction<StateType>>;
};

export type RouteType = { path: string; };
export type ParamsType<K extends string = string> = { [key in K]: string };
export type RouterType<K extends string = string> = {
    back: () => void;
    push: (path: string) => void;
    route: RouteType;
    params?: ParamsType<K>;
};
export type RouterPropsType<K extends string = string> = { router: RouterType<K> };
export type RoutePropType<K extends string = string> = {
    path: string;
    component: JSXElementConstructor<RouterPropsType<K> | any>;
    exact?:boolean;
};
export type RedirectPropType = {
    from?:string;
    to:string;
    exact?:boolean;
};
export type LinkPropsType = Omit<JSX.IntrinsicElements['a'], 'href'> & { to: string };
