import{useState,useEffect,useCallback} from 'react'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './movie-grid.scss'
import MovieCard from '../movie-card/MovieCard';
import bmdbApi, { category, movieType,tvType} from '../../api/bmdbApi';
import Button,{OutlineButton} from '../button/Button';
import Input from '../input/Input';
const MovieGrid = (props) => {
    const [Items, setItems] = useState([]);
    const [Page, setPage] = useState(1);
    const [TotalPage, setTotalPage] = useState(0);
    const { keyword } = useParams();
    useEffect(() => {
        const getList = async ()=>{
            let response = null;
            console.log("keyword of useParams" , keyword);
            if(keyword === undefined){
                const params = {};
                switch(props.category){
                    case category.movie:
                        response = await bmdbApi.getMoviesList(movieType.popular, {params});
                        break;
                    default: 
                        response = await bmdbApi.getTvList(tvType.popular, {params});
                }
            }else{
                const params = {
                    query: keyword
                }
                response = await bmdbApi.search(props.category, {params});
            }
            console.log('results of response : ',response);
            console.log('total_pages of response : ',response.total_pages);
            setItems(response.results);
            setTotalPage(response.total_pages);
        }
        getList();
   
    }, [props.category, keyword]);
    const loadmore= async()=>{
        console.log('loadmore click');
        let response = null;
        console.log("keyword of useParams" , keyword);
        if(keyword === undefined){
            const params = {
                page:  Page +1,
            };
            switch(props.category){
                case category.movie:
                    response = await bmdbApi.getMoviesList(movieType.popular, {params});
                    break;
                default: 
                    response = await bmdbApi.getTvList(tvType.popular, {params});
            }
        }else{
            const params = {
                page:  Page +1,
                query: keyword
            }
            response = await bmdbApi.search(props.category, {params});
        }
        console.log('results of response : ',response);
        console.log('total_pages of response : ',response.total_pages);
        setItems([...Items,...response.results]);
        setTotalPage(Page+1);
    }
    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            <div className="movie-grid">
                {
                    Items.map((item, index)=><MovieCard category={props.category} item={item} key={index} />)
                }
            </div>
            {
                    Page < TotalPage ? (
                        <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadmore}>
                            Load More
                        </OutlineButton>
                        </div>
                    ) : null
            }
        </>
    )
}
const MovieSearch = props =>{
    
    const history = useNavigate();
    //console.log(history);
    const [Keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    const goToSearch = useCallback(
        () => {
            if(Keyword.trim().length > 0){
                history(`/${category[props.category]}/search/${Keyword}`);
            }
        },
        [Keyword,props.category,history],
    )
    useEffect(() => {
        const enterEvent = e =>{
            e.preventDefault();
            if(e.keyCode === 13){
                goToSearch();
            }
        }
        document.addEventListener('keyup',enterEvent);
        return () => {
            document.removeEventListener('keyup',enterEvent);
        }
    }, [Keyword,goToSearch]) ;
    return (
        <div className="movie__search">
            <Input type="text"
                   placeholder="Enter keyword"
                    value={Keyword}
                    onChange={(e)=>setKeyword(e.target.value)}
            >

            </Input>
            <Button className="small" onClick={goToSearch}>
                Search
            </Button>
        </div>
    )
}
export default MovieGrid
