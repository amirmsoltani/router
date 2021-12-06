import React, {FC, useCallback, useContext} from 'react';
import {LinkPropsType} from "./types";
import {RouterContext} from "./Router";



const Link:FC<LinkPropsType> = ({to,onClick,...props}) => {
    const context = useContext(RouterContext);
    const clickHandler = useCallback((event:React.MouseEvent<HTMLAnchorElement,MouseEvent>)=>{
        event.preventDefault();
        context.push(to);
        onClick?.(event);
    },[]);

    return (
        <a href={to} onClick={clickHandler} {...props}/>
    );
};

export default Link;
