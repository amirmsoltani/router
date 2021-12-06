import {LocalObjectType} from "../types";


export function back(this:LocalObjectType){
    history.back();

    this.__setState__({...this.__state__,path:location.pathname});
}
