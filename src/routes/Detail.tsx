import React, {FC} from 'react';
import {RouterPropsType} from "../components";

const Detail:FC<RouterPropsType<'id'>> = ({router:{params}}) => {
    return (
        <div>
            {params?.id}
        </div>
    );
};

export default Detail;
