import React, {useState} from 'react'
import MovieDataService from '../services/movies'
import { Link } from "react-router-dom"
import { Form, Button } from 'react-bootstrap';
import Movie from './movie';

const AddReview = props => {
   let editing = false
   let initialReviewState = ""

   const [review, setReview] = useState(initialReviewState)
   const [submitted, setSubmitted] = useState(false)

   const onChangeReview = e => {
      const review = e.target.value
      setReview(review)
   }
   const saveReview = () => {
      var data = { 
         review: review, 
         name: props.user.name, 
         user_id: props.user.id, 
         movie_id: props.match.params.id
      }
      MovieDataService.createReview(data).then(response => {
         setSubmitted(true)
      }).catch( e => { console.log(e) })
   }
   return(
      <div>
         { submitted ? (
            <div>
               <h4>Votre avis a été publié</h4>
               <Link to={ `/movies/${props.match.params.id}`}>Retour au film</Link>
            </div>
         ) : (
            <Form>
               <Form.Group>
                  <Form.Label>Contenu de l'avis</Form.Label>
                  <Form.Control type='text' required value={review} onChange={onChangeReview}></Form.Control>
                  <Button variant='primary' onClick={saveReview}>{ editing ? "Modifier" : "Publier" }</Button>
               </Form.Group>
            </Form>
         )}
      </div>
   );
}

export default AddReview;