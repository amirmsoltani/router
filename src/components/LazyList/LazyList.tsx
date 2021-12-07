import React, {Fragment, useCallback, useEffect, UIEvent, useState, useRef} from 'react';
import {LazyListPropsType} from "./types";

const randomKey = () => {
    const randInt = Math.floor(Math.random() * 0xeeeeee) + 0x111111;
    return randInt.toString(16);
};
type StateType = { keys: string[], end: number };
function LazyList<D extends Object>({data, renderItem, itemPerLoad, defaultItems, ...props}: LazyListPropsType<D>) {
    const [state, setState] = useState<StateType>({keys: [], end: defaultItems});
    const list = useRef<HTMLDivElement>();
    const scrollHandler = useCallback(() => {
        const {offsetTop,scrollHeight} = list.current;
        const {scrollY,innerHeight} = window;
        const listScroll = scrollY-offsetTop;
        const listHeight = scrollHeight-innerHeight;
        const keyLength = state.keys.length;
        if(listScroll*100/listHeight > 90 && state.end < keyLength)
        {
            const end =state.end +itemPerLoad;
            setState({
                ...state,
                end:end>keyLength?state.end+(keyLength-state.end):end,
            })
        }

    }, [state, data]);

    useEffect(() => {
        const keys = data?.map(() => randomKey())||[];
        setState({keys, end: defaultItems});

    }, [data]);

    useEffect(()=>{
        window.addEventListener('scroll',scrollHandler);
        return ()=>{window.removeEventListener('scroll',scrollHandler);}
    },[state]);


    if (!state.keys || !state.keys.length)
        return null;
    return (
        <div {...props} onScroll={scrollHandler} ref={list}>
            {
                data?.slice(0, state.end).map((item, index) => (
                    <Fragment key={state.keys?.[index]}>
                        {
                            renderItem(item, index, state.keys?.[index])
                        }
                    </Fragment>
                ))
            }
        </div>
    );
};

export default LazyList;
