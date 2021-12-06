import React from 'react';
import {GrMap} from '@react-icons/all-files/gr/GrMap'
import {FaCity} from '@react-icons/all-files/fa/FaCity'
import {GiCrossroad} from '@react-icons/all-files/gi/GiCrossroad';
export type ListItemPropsType = {
    title: string;
    type: string;
    category: 'place' | 'municipal' | 'region';
}
const cateGoryObject = {
    place:<FaCity size={80}/>,
    municipal:<GiCrossroad size={80}/>,
    region:<GrMap  size={80}/>
}
const ListItem: React.FC<ListItemPropsType> = ({type,title,category}) => {
    return <div>
        {cateGoryObject[category]}
            <h4>{title}</h4>
            </div>
}

export default ListItem;
