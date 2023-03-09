import React, { useState, useEffect} from 'react'
import MovieDataService from '../services/movies'

import { Link } from "react-router-dom"
import Movie from './movie'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
// import Container from 'react-bootstrap/Container'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'

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

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle);
    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value
        setSearchRating(searchRating);
    }

    return (
        <div className='App'>
            <Container>
                <Form>
                    <Row>
                        
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default MoviesList;