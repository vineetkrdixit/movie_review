import React,{useState} from 'react'
import MovieCard from '../../CustomComponent/MoviesCard'
import axios from "axios"
export default function AllMovies() {

    const [allMoviesData,setAllMoviesData]=useState()
    console.log(allMoviesData)


    React.useEffect(() => {
        axios
            .get("http://localhost:3004/getallmovies")
            .then((res) => {
                console.log("res", res);
                setAllMoviesData(res.data)
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);


    return (
    <>
        <div>AllMovies</div>
        <MovieCard allMoviesData={allMoviesData} />
    </>

    )
}
