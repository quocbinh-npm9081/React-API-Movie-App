import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router';
import apiConfig from '../../api/apiConfig';
import bmdbApi from '../../api/bmdbApi';
const CastList = props => {
    const {category} = useParams();
    const [Casts, setCasts] = useState([]);
    useEffect(() => {
        const getCredits = async()=>{
            const res = await bmdbApi.credits(category ,props.id);
           // console.log(res);
            setCasts(res.cast.slice(0,5));
        }     
        getCredits();
    }, [category, props.id]);


    return (
        <div className="casts">
            {
                Casts.map((item,index)=>(
                    <div key={index} className="casts__item">
                        <div className="casts__item__img" style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}>

                        </div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CastList
