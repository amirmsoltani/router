import {LocalObjectType} from "../types";


export function push(this:LocalObjectType,path:string){
    history.pushState(null,'',path);
    this.__setState__({...this.__state__,path:path});
}
