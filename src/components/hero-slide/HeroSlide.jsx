import {useState, useEffect, useRef} from 'react';
import { useNavigate} from 'react-router-dom';
import tmdApi, {category, movieType} from '../../api/bmdbApi';
import apiConfig from '../../api/apiConfig';
import bmdbApi from '../../api/bmdbApi';
import SwiperCore, { Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import Modal, {ModalContent} from '../model/Modal';
import './hero-slide.scss';
import Button, {OutlineButton} from '../button/Button';
function HeroSlide() {
    SwiperCore.use([Autoplay]);
    const [MovieItems, setMovieItems] = useState([]);
    useEffect(() => {
        const getMovies = async ()=>{
            const params = {page: 1};
            try {
                const response = await bmdbApi.getMoviesList(movieType.popular, {params});
                console.log("respon: ", response); // lay tat ca
                console.log("res_result_slice",response.results.slice(0,4));// lay 4 film dau`
                setMovieItems(response.results.slice(0,4));

            } catch (err) {
                console.log(err);
            }
        }
        getMovies();
    }, []);
    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 4000}}
            >
                {
                    MovieItems.map((item ,index)=>{
                        return <SwiperSlide key={index}>
                                    {
                                        ({isActive})=>(
                                            <HeroSlideItem item={item} className={`${isActive ? 'active': ''}`} />
                                        )
                                    }

                                </SwiperSlide>
                               
                    })
                }
            </Swiper>
            {
                MovieItems.map((item, index)=>
                    <TrailerModal key={index} item={item}/>
                )
            }
        </div>
    )
}
const HeroSlideItem = props =>{
    let history = useNavigate();
    const item =props.item;
    const background = apiConfig.originImage(item.backdrop_path ? item.backdrop_path : item.poster_path );
    const setModalActive = async() =>{
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdApi.getVideos(category.movie, item.id);
        if(videos.results.length > 0){
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            console.log(videos.results);
            modal.querySelector('.modal__content > iframe ').setAttribute("src",videoSrc);
        }else{
            modal.querySelector('.modal__content').innerHTML="No trailer";
        }
        modal.classList.toggle('active');
    }
    return (
        <div className={`hero-slide__item ${props.className}`} 
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">
                        {item.title}
                    </h2>
                    <div className="overview">
                        {item.overview}
                    </div>
                    <div className="btns">
                        <Button onClick={()=>{history.push('/movie' + item.id)}}>
                            Watch Now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

export const TrailerModal = (props) =>{
    const item = props.item;
    const iframeRef = useRef();
    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )

}
export default HeroSlide
