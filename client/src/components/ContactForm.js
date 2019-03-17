import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
class ContactForm extends Component {
    constructor (){
      super();
      this.state={
          name:"",
          email:"",
          message:""
      }
    }
      handleChange = e => {
        this.setState({ [e.target.name]: e.target.value})
      }

      handleSubmit = async e => {
          //console.log("submit event");
        e.preventDefault();
        const {name, email, message} = this.state;
        const form = await axios.post('http://localhost:8081/api/form',{
            name,
            email, 
            message
        }) 

      }
    
    
      render(){
        return(
            <Form className="contact" onSubmit={this.handleSubmit}>
            <h1>Contact Form</h1>
            <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input type="text" name="name"  placeholder="" onChange={this.handleChange}/>
          </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" placeholder="" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Message</Label>
              <Input type="textarea" name="message" onChange={this.handleChange} />
            </FormGroup>
  

            <Button>Submit</Button>
          </Form>);
      }
    }  
    
    export default ContactForm;