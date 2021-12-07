import React from 'react';
import {GrMap} from '@react-icons/all-files/gr/GrMap'
import {FaCity} from '@react-icons/all-files/fa/FaCity'
import {GiCrossroad} from '@react-icons/all-files/gi/GiCrossroad';
import {Link} from "./Router";
export type ListItemPropsType = {
    title: string;
    type: string;
    category: 'place' | 'municipal' | 'region';
    link:string;
}
const cateGoryObject = {
    place:<FaCity size={80}/>,
    municipal:<GiCrossroad size={80}/>,
    region:<GrMap  size={80}/>
}
const ListItem: React.FC<ListItemPropsType> = ({type,title,category,link}) => {
    return <Link to={link}
                 style={{
                     display:'flex',
                     flexWrap:"wrap",
                     justifyContent:'space-between',
                     fontFamily:'Yekan',
                     textDecoration:'none',
                     color:'black',
                     border: '1px solid black',
                     borderRadius:4,
                     margin:'5px 0',
                     width:'100%',
                     padding:'5px 10px',

                 }}
    >
        {cateGoryObject[category]}
            <h4>{title}</h4>
            </Link>
}

export default ListItem;
