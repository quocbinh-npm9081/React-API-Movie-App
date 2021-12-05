import React from 'react';
import { useParams } from 'react-router';
import PageHeader from '../components/page-header/PageHeader'; 
import {category as cate} from '../api/bmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';
function Catalog() {
    const {category} = useParams();
    console.log("use params: ",category);
    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' :'TV Series'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}>

                    </MovieGrid>
                </div>
            </div>
        </>
    )
}

export default Catalog
