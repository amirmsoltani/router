import {RouterType} from "./types";
import {useContext} from "react";
import {RouterContext} from "./Router";

export const useRouter = (): RouterType => {
    const router = useContext(RouterContext);
    return {push: router.push, back: router.back, route: router.route, params: router.params};
};
