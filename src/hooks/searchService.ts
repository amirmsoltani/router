import {useState} from "react";
import axios from "axios";

export type ItemType = {
    title: string;
    address: string;
    neighbourhood: string;
    region: string;
    type: string;
    category: 'place' | 'municipal' | 'region';
    location: { x: number, y: number };
};
export type StateType = { count?: number, items?: ItemType[], status: 'loading' | 'ok' | 'error' | 'idle' };
export type UseSearchType = {
    search: (term: string) => void;
    state: StateType;
};

let timeOut: any;
export const useSearch = (): UseSearchType => {
    const [state, setState] = useState<StateType>({status: 'idle'});
    const getItems = async (term: string) => {
        timeOut = null;
        setState({...state, status: 'loading'});
        try {
            const response = await axios.get(
                `https://api.neshan.org/v1/search?term=${term}&lat=59.6157432&lng=36.2880443`,
                {headers: {'Api-Key': process.env.API_KEY}});
            setState({status: 'ok', ...response.data});
        } catch (e) {
            setState({...state, status: 'error'});
        }
    }
    const search = (term: string) => {
        if (typeof timeOut !== null) {
            clearTimeout(timeOut);
        }
        timeOut = setTimeout(getItems, 1000, term);
    }

    return {search, state};
}
