import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router';
import apiConfig from '../../api/apiConfig';
import bmdbApi from '../../api/bmdbApi';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList';
function Detail(props) {
    const {category, id} = useParams();  
    const [Item, setItem] = useState(null);
    useEffect(() => {
        const getDetail =async ()=>{
            const response = await bmdbApi.detail(category, id ,{params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category,id]);
    return (
       <>
            {
                Item && (
                    <>
                    <div className="banner" style={{backgroundImage: `url(${apiConfig.originImage(Item.backdrop_path || Item.poster_path)})`}}> </div>
                    <div className="mb-3 movie-content container">
                        <div className="movie-content__poster">
                            <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originImage(Item.poster_path || Item.backdrop_path)})`}}>

                            </div>
                        </div>
                        <div className="movie-content__info">
                            <div className="title">
                                {Item.title || Item.name}
                            </div>
                            <div className="genres">
                             {
                                 Item.genres && Item.genres.slice(0,5).map((genre,index)=>(
                                     <span key={index} className="genres__item">{genre.name}</span>
                                 ))
                             }
                            </div>
                            <p className="overview">
                                {Item.overview}
                            </p>
                            <div className="cast">
                                <div className="section__header">
                                    <h2>Cast</h2>
                                     
                                </div>
                                {/* Cast List */}
                                <CastList id={Item.id} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="section mb-3"> 
                            <VideoList id={Item.id} />
                        </div>
                        <div className="section mb-3"> 
                            <div className="section__header mb-2">
                                <h2>Similar</h2>
                            </div>
                                <MovieList category={category} type="similar" id={Item.id} />
                        </div>
                    </div>
                    </>
                )       
            }

       </>
    )
}

export default Detail
