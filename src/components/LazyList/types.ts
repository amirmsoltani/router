import {ReactNode, DelHTMLAttributes} from 'react';

export type DataType = { [K: string]: string };
export type LazyListPropsType<D extends Object> = DelHTMLAttributes<HTMLDivElement> & {
    data: D[];
    renderItem: (data: D , index: number,key:string) => ReactNode;
    itemPerLoad:number;
    defaultItems:number;
};
