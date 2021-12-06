import React, {ChangeEvent, FC, useCallback, useEffect} from 'react';
import {LazyList, Link, RouterPropsType} from "../components";
import {useSearch} from "../hooks/searchService";
import ListItem from "../components/ListItem";

const Search: FC<RouterPropsType<'search'>> = ({router}) => {
    const {search, state} = useSearch();
    useEffect(() => {
        if (router.params.search !== '')
            search(router.params.search);
    }, []);

    const inputChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if ('/' + value !== router.route.path) {
            router.push('/search/' + value);
        }
        search(event.target.value);
    }, []);

    return (
        <div>
            <input
                value={decodeURI(router.params.search||'')}
                onChange={inputChangeHandler}
            />
            <LazyList data={state.items}
                      renderItem={((data, index, key) =>
                          <Link to={`/search/${router.params.search}/${data.title}`}>
                          <ListItem title={data.title} type={data.type} category={data.category}/>
                          </Link>
                              )}

                      defaultItems={10}
                      itemPerLoad={5}
                      style={{maxHeight:'85%',overflowY:'scroll'}}
            />
        </div>
    );
};

export default Search;
