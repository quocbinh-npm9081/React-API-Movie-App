import React, { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router';
import bmdbApi from '../../api/bmdbApi';
function VideoList(props) {
    const {category} = useParams();
    const [Videos, setVideos] = useState([]);
    useEffect(() => {
        const getCredits = async()=>{
            const res = await bmdbApi.getVideos(category ,props.id);
           // console.log(res);
            setVideos(res.results.slice(0,5));
        }     
        getCredits();
    }, [category, props.id]);
    return (
        <>
            {
                Videos.map((item, index)=>(
                    <Video key={index} item={item} />
                ))
            }
        </>
    )
}
const Video = props => {

    const item = props.item;

    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            ></iframe>
        </div>
    )
}
export default VideoList;
