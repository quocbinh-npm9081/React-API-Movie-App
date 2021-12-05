import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './movie-list.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Link} from 'react-router-dom';
import bmdbApi, { category } from '../../api/bmdbApi';
import apiConfig from '../../api/apiConfig';
import Button from '../button/Button';
import  MovieCard from '../movie-card/MovieCard';
const MovieList = props => {
    const [Items, setItems] = useState([]);
    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await bmdbApi.getMoviesList(props.type, {params});
                        break;
                    default:
                        response = await bmdbApi.getTvList(props.type, {params});
                }
            } else {
                response = await bmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, []);

    return (
        <div>
            <div className="movie-list">
                <Swiper grabCursor={true}
                        spaceBetween={10}
                        slidesPerView={'auto'}
                >
                 {
                     Items.map((item,index)=>(
                         <SwiperSlide key={index}>
                             <MovieCard item={item} category={props.category}>

                             </MovieCard>
                         </SwiperSlide>
                     ))
                 }
                </Swiper>
            </div>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string
}

export default MovieList
