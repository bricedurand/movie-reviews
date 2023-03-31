import React, { useState, useEffect } from 'react'
import MovieDataService from '../services/movies'

import { Link } from "react-router-dom"
import Movie from './movie'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
// import Container from 'react-bootstrap/Container'
import { Form, Button, Col, Row, Container, Card } from 'react-bootstrap'

const MoviesList = props => {
   const [movies, setMovies] = useState([])
   const [searchTitle, setSearchTitle] = useState("")
   const [searchRating, setSearchRating] = useState("")
   const [ratings, setRatings] = useState(["Tout classement"])
   const [currentPage, setCurrentPage] = useState(0)
   const [entriesPerPage, setEntriesPerPage] = useState(0)

   useEffect(() => {
      findMovies()
      retrieveRatings()
   }, [])

   useEffect(() => {
      findMovies()
   }, [currentPage])

   const errorHandling = e => { console.log(e) }

   const findMovies = () => {
      MovieDataService.find(searchTitle, searchRating, currentPage).then(response => {
         setMovies(response.data.movies)
         setCurrentPage(response.data.page)
         setEntriesPerPage(response.data.entries_per_page)
      }).catch(errorHandling)
   }

   const retrieveRatings = () => {
      MovieDataService.getRatings().then(response => {
         setRatings(["All ratings"].concat(response.data))
      }).catch(errorHandling)
   }

   const onSubmitFindMovies = event => {
      event.preventDefault()
      findMovies()
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
            <Row>
               <Col>
                  <Form onSubmit={onSubmitFindMovies}>
                     <div className="input-group my-3">
                        <input type="text" className="form-control" placeholder="Titre du film..." aria-label="Titre du film..." aria-describedby="button-search-by-title" value={searchTitle} onChange={onChangeSearchTitle}/>
                        <Form.Select onChange={onChangeSearchRating}>
                              {ratings.map(rating => {
                                 return (
                                    <option value={rating}>{rating}</option>
                                 )
                              })}
                           </Form.Select>
                        
                           <Button
                              variant="primary"
                              type="submit">Trier</Button>
                        </div>
                  </Form>
               </Col>
            </Row>


            <Row>
               {movies.map((movie) => {
                  return (
                     <Col md="4">
                        <Card>
                           <Card.Img src={movie.poster + "/100px180"} />
                           <Card.Body>
                              <Card.Title>{movie.title}</Card.Title>
                              <Card.Text>Rating : {movie.rated}</Card.Text>
                              <Card.Text>{movie.plot}</Card.Text>
                              <Link to={"/movies/" + movie._id}>View Reviews</Link>
                           </Card.Body>
                        </Card>
                     </Col>
                  )
               })}
            </Row>
            <br/>
            Page: {currentPage}
            <Button variant="link" onClick={() => {setCurrentPage(currentPage + 1)}}>{entriesPerPage} prochains films &gt;</Button>
         </Container>
      </div>
   )
}

export default MoviesList;