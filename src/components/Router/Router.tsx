import React, {useCallback, useEffect, useState} from "react";
import {LocalObjectType, StateType} from "./types";
import {push,back} from './actions';

export const RouterContext = React.createContext<Partial<LocalObjectType>>({});


const Router:React.FC = (props)=>{
    const [state,setState] = useState<StateType>({path:location.pathname});

    const popstateHandler = useCallback((event:PopStateEvent)=>{
        // @ts-ignore
        setState({...state,path:event.target?.location.pathname});
    },[]);

    // handle browser button back and undo
    useEffect(()=>{
        window.addEventListener('popstate',popstateHandler);
        return ()=>{window.removeEventListener('popstate',popstateHandler)};
    },[]);

    const values:Partial<LocalObjectType> ={
        route:state,
        __state__:state,
        __setState__:setState,
    };
    values['push'] = push.bind(values);
    values['back'] = back.bind(back);

    return(
        <RouterContext.Provider value={values}>
            {props.children}
        </RouterContext.Provider>
    )
};

export default Router;
