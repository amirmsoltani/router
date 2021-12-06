import React, {Fragment, useCallback, useEffect, UIEvent, useState} from 'react';
import {LazyListPropsType} from "./types";

const randomKey = () => {
    const randInt = Math.floor(Math.random() * 0xeeeeee) + 0x111111;
    return randInt.toString(16);
};

function LazyList<D extends Object>({data, renderItem, itemPerLoad, defaultItems, ...props}: LazyListPropsType<D>) {
    const [state, setState] = useState<{ keys: string[], end: number }>({keys: [], end: defaultItems});
    useEffect(() => {
        const keys = data?.map(() => randomKey());
        setState({keys, end: defaultItems});
    }, [data]);

    const scrollHandler = useCallback((event: UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        // check scroll in down
        if (((target.scrollTop + target.offsetHeight) * 100) / target.scrollHeight > 90 && state.end + itemPerLoad <= state.keys.length)
            setState({...state, end: state.end + itemPerLoad});
    }, [state, data]);

    if (!state.keys || !state.keys.length)
        return null;
    return (
        <div {...props} onScroll={scrollHandler}>
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
