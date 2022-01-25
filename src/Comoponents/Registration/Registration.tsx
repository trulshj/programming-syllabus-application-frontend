import React from 'react';
import {Form, Button, Row, Col, Image} from 'react-bootstrap'
import LoggInn from '../../LoggInn.jpg'
import {registration} from "../../Api";



const  Registration = (props) => {
  // @ts-ignore
  let username:string="";
  let email:string="";
  let password:string="";
  let passwordConfirm:string="";

  function keyDownEvent(event){
    //key 13 is enter-key
    if (event.keyCode === 13 ) {
      event.preventDefault();
      if(username&&email&&(password===passwordConfirm)){
        registration(email,password,username).then((res)=>{
          props.history.push("/logginn")
        }).catch(error=>console.log("error",error))
      }else {
        console.log("registraion error")
        console.log(username,email,password,passwordConfirm)
      }
    }
  }

    return (
        <div>
            <br/>
            <br/>
            <br/>
      
      <Row>
        <Col>
        <h3 className="text-info">Lag ny bruker</h3>
        <hr />
          <Form onKeyDown={keyDownEvent} style={{width:"50%", marginLeft:"30%", marginTop:"5%"}}>
            <Form.Group>
              <Form.Label style={{float:"left"}}>Brukernavn</Form.Label>
              <Form.Control onChange={(event)=>{
                username = event.target.value;
              }}
                type="text"
                name="name"
                placeholder="Ditt navn"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{float:"left"}}>epost adresse</Form.Label>
              <Form.Control onChange={(event)=>{
                email = event.target.value;
              }}
                type="email"
                name="email"
                placeholder="Din epost"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{float:"left"}}>Passord</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Passord"
                required
                onChange={(event)=>{
                  password = event.target.value;
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{float:"left"}}>Bekrefte Passord</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                placeholder="Bekreft Passord"
                required
                onChange={(event)=>{
                  passwordConfirm = event.target.value;
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={(e)=>{
                keyDownEvent({keyCode:13,preventDefault:()=>{}})
              }}
            >
              Registrer Bruker
            </Button>
          </Form>
        </Col>
        <Col>
        <Image src={LoggInn} thumbnail style={{border:"none"}}></Image>
        </Col>
      </Row>
      <Row className="py-4">
        <Col>
          Har du allerede en konto <a href="/logginn">login her</a>
        </Col>
      </Row>
        </div>
    )
    
}

export default Registration;
