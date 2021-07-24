import React, {
    Fragment,
    useState,
    useEffect
} from "react";
import {
    Link
} from 'react-router-dom';
import {
    Service
} from './service';
import {
    PieChart
} from 'react-minimal-pie-chart';
import {
    makeStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    Series,
    CommonSeriesSettings,
    Legend,
    Export,
    Title
} from 'devextreme-react/chart';

import {
    CardBody,
    Col,
    Row,
    Card,
    Button,
    CardHeader,
    Label,
    ListGroup,
    ListGroupItem,
    Input
} from "reactstrap";
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

function Login() {

    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({});
    const hangleChange = (value, name) => {


        setValues({
            ...values,
            [name]: value
        })

    }
    const staticValidation = () => {
        let errors = {}
        let formIsValid = true;
        console.log("values", values)
        if (!values.username) {
            errors.email = 'username required'
            formIsValid = false;
        }
        if (!values.email) {
            errors.email = 'email required'
            formIsValid = false;

        }
        if (!values.password) {
            errors.email = 'password required'
            formIsValid = false;

        }
        setErrors(errors);
        return formIsValid;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (staticValidation() === true) {
            Service.signup(values)
                .then((response) => {
                        console.log("response", response)
                        if (response.success == true) {
                            console.log("success")
                            window.location.href = '/Details'
                        } else {
                            setErrors({
                                'email': response.message
                            });
                        }

                    },
                    (error) => {
                        console.log("response", error)

                        return false;
                    });


        } else {

        }
    };

  return (
 <div className="App">
  <Card style={{borderRadius: '0',border: 'none'}}>
    <CardBody>
      <Row>
        <Col lg={4}>
          <Label style={{fontSize: '1.5rem', color: '#5CB85C',marginLeft: '2rem'}}>conduit</Label>
        </Col>
        <Col lg={5}> </Col>
        <Col lg={3}>
          <ListGroup horizontal>
            <ListGroupItem style={{borderWidth: '0'}}>
              <Link style={{textDecoration: 'none'}} to={{ pathname: '/Home'}}> Home </Link>
            </ListGroupItem>
            <ListGroupItem style={{borderWidth: '0'}}>
              <Link style={{textDecoration: 'none'}} to={{ pathname: '/Login'}}> Sign in </Link>
            </ListGroupItem>
            <ListGroupItem style={{borderWidth: '0'}}>
              <Link style={{textDecoration: 'none'}} to={{ pathname: '/Signup'}}> Sign up </Link>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </CardBody>
  </Card>
  <Card style={{height: '350px',width: '50%',marginLeft: 'auto',marginRight: 'auto',border: 'none'}}>
    <CardBody>
      <Row>
        <h1 style={{textAlign: 'center'}}>Sign up</h1>
        <Link style={{textDecoration: 'none'}} to={{ pathname: '/Login'}}>
        <p style={{textAlign: 'center',color: '#5CB85C'}}>Have an account?</p>
        </Link>
      </Row>
      <Row>
        <Col lg={8} style={{marginLeft: 'auto',marginRight: 'auto'}}>
          <Input type="text" placeholder="Username" onChange={({ target })=> { hangleChange(target.value, 'username') }} name="Username" style={{height: '50px'}} /> </Col>
        <Col lg={8} style={{marginLeft: 'auto',marginRight: 'auto',marginTop: '3%'}}>
          <Input type="email" placeholder="Email" onChange={({ target })=> { hangleChange(target.value, 'email') }} name="email" style={{height: '50px'}} /> </Col>
        <Col lg={8} style={{marginLeft: 'auto',marginRight: 'auto',marginTop: '3%'}}>
          <Input type="Password" placeholder="Password" onChange={({ target })=> { hangleChange(target.value, 'password') }} name="Password" style={{height: '50px'}} /> </Col>
      </Row>
      <Row>
        <Col lg={2} style={{marginLeft: 'auto',marginRight: 'auto',marginTop: '3%'}}>
          <Button style={{backgroundColor: '#5CB85C'}} onClick={handleSubmit}> Sign up </Button>
        </Col> {errors.email &&
        <p style={{ color: 'red', fontStyle: 'Italic' ,marginLeft: '20%'}}>{errors.email}</p>} </Row>
    </CardBody>
  </Card>
</div>
  );
}

export default Login;
