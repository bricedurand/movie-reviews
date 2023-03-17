import React, { useState, useEffect } from 'react'
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom';
import { Card, Container, Image, Col, Row, Button, Media} from 'react-bootstrap'
import moment from 'moment'

const Movie = props => {
   const [movie, setMovie] = useState({
      id: null,
      title: "",
      rated: "",
      reviews: []
   })

   const getMovie = id => {
      MovieDataService.get(id).then(response =>{
         setMovie(response.data)
         console.log(response.data)
      }).catch(e => {
         console.log(e)
      })
   }

   useEffect(() => {
      getMovie(props.match.params.id)
   }, [props.match.params.id])

   const deleteReview = (reviewId, index) => {
      MovieDataService.deleteReview(reviewId, props.user.id).then(response => {
         setMovie((prevState) => {
            prevState.reviews.splice(index, 1)
            return({...prevState})
         })
      }).catch(e => { console.log(e) })
   }

   return (
      <div>
         <Container>
            <Row>
               <Col>
                  <Image src={movie.poster + "/100px250"} fluid/>
               </Col>
               <Col>
                  <Card>
                     <Card.Header as="h5">{movie.title}</Card.Header>
                     <Card.Body>
                        <Card.Text>{movie.plot}</Card.Text>
                        { props.user && 
                           <Link to={"/movies/" + props.match.params.id + "/review"}>Add Review</Link>
                        }
                     </Card.Body>
                  </Card>
                  <br/>
                  <h2>Reviews</h2>
                  <br/>
                  { movie.reviews.map((review, index) => {
                     return (
                        <Card key={index}>
                           <Card.Body>
                              <Card.Title>{`${review.name} reviewed on ${moment(review.date).format("Do MMM YYYY")}`}</Card.Title>
                              <p>{review.review}</p>
                              {props.user && props.user.id === review.user_id &&
                                 <Row>
                                    <Col>
                                       <Link to={{
                                          pathname: "/movies/" + props.match.params.id + "/review",
                                          state: {currentReview: review}
                                       }}>Edit</Link>
                                    </Col>
                                    <Col><Button variant="link" onClick={() => deleteReview(review._id, index)}>Supprimer</Button></Col>
                                 </Row>
                              }
                           </Card.Body>
                        </Card>
                     )
                  })}
               </Col>
            </Row>
         </Container>
      </div>
   );
}

export default Movie;