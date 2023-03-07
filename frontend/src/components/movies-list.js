import React, { useState, useEffect} from 'react'
import MovieDataService from '../services/movies'

import { Link } from "react-router-dom"
import Movie from './movie'

const MoviesList = props => {
    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSeartchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])

    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    }, [])

    const retrieveMovies = () => {
        MovieDataService.getAll().then(response => {
            console.log(response.data)
            setMovies(response.data.movies)
        }).catch (e => { console.log(e) })
    }

    const retrieveRatings = () => {
        MovieDataService.getRatings().then(response => {
            console.log(response.data)
            setRatings(["All Ratings"].concat(response.data))
        }).catch ( e => { console.log(e) }) 
    }
}

export default MoviesList;