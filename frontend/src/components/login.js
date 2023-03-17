import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Login = props => {
   const [name, setName] = useState("")
   const [id, setId] = useState("")

   const onChangeName = e => {
      const name = e.target.value
      setName(name)
   }

   const onChangeId = e => {
      const id = e.target.value
      setId(id)
   }

   const login = () => {
      props.login({ name: name, id: id})
      props.history.push('/')
   }

   return(
      <div>
         <Form>
            <Form.Group>
               <Form.Label>Nom d'utilisateur</Form.Label>
               <Form.Control type="text" value={name} onChange={onChangeName} />
            </Form.Group>
            <Form.Group>
               <Form.Label>ID</Form.Label>
               <Form.Control type="text" value={id} onChange={onChangeId} />
            </Form.Group>
            <Button variant="primary" onClick={login}>Se connecter</Button>
         </Form>
      </div>
   );
}

export default Login;