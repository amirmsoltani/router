import React, {ChangeEvent, FC, useCallback, useEffect} from 'react';
import {LazyList, Link, RouterPropsType} from "../components";
import {useSearch} from "../hooks/searchService";
import ListItem from "../components/ListItem";
import {FaSearchLocation} from "@react-icons/all-files/fa/FaSearchLocation";

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
            <div style={{
                display:'flex',
                justifyContent:'center',
                position:"relative",
                backgroundColor:'rgb(10,20,30)',
                borderRadius:6,
            }}>
                <input
                    value={decodeURI(router.params.search || '')}
                    onChange={inputChangeHandler}
                    style={{
                        width:'100%',
                        margin:20,
                        height:50,
                        textAlign:"center",
                        borderRadius:6,
                        border: '1px solid white',
                        fontSize:18,
                        fontFamily:'Yekan',
                        fontWeight:"bold",
                    }}
                    disabled={false}
                />
                <FaSearchLocation size={25} style={{position:"absolute",left:40,top:33}}/>
            </div>
            <LazyList data={state.items}
                      renderItem={((data, index, key) =>
                                  <ListItem
                                      title={data.title}
                                      type={data.type}
                                      category={data.category}
                                      link={`/search/${router.params.search}/${data.title}`}
                                  />
                      )}
                      defaultItems={10}
                      itemPerLoad={5}
                      style={{display:'flex',flexDirection:'column',padding:'30px 25px 10px 0',position:'relative'}}
            />
        </div>
    );
};

export default Search;
