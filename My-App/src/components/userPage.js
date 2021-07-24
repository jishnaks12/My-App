import React, {
    Fragment,
    useState,
    useEffect
} from "react";
import {
    Service
} from './service';
import {
    Link
} from 'react-router-dom';

import {
    makeStyles
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
    Tabs,
    Tab
} from "react-bootstrap";
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import edit from './edit-alt-.svg'
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

function UserPage() {
    const [globalPosts, setGlobalPosts] = useState([])
    const [myPosts, setMyPosts] = useState([])

    const [key, setKey] = useState("myposts");


    const logout = () => {


        localStorage.removeItem('user_id');
        window.location.href = '/Home'

    }
    useEffect(() => {
        Service.getPost()
            .then((response) => {
                    if (response.success == true) {
                        setGlobalPosts(response.data)
                    }
                },
                (error) => {
                    return false;
                });

        Service.getUserPost()
            .then((response) => {
                    if (response.success == true) {
                        setMyPosts(response.data)
                    }
                },
                (error) => {
                    return false;
                });




    }, [])
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
              <Link style={{textDecoration: 'none'}} to={{ pathname: '/Details'}}> Home </Link>
            </ListGroupItem>
            <ListGroupItem style={{borderWidth: '0'}}>
              <Link style={{textDecoration: 'none'}} to={{ pathname: '/Newpost'}}> New Post </Link>
            </ListGroupItem>
            <ListGroupItem style={{borderWidth: '0'}} onClick={logout} className="logout">Logout</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </CardBody>
  </Card>
  <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k)=> setKey(k)} style={{width: '70%', marginLeft: 'auto',marginRight: 'auto'}} >
    <Tab eventKey="myposts" title="My Posts"> {myPosts && myPosts.length > 0 ? myPosts.map((data, index) => { return (
      <>
        <Card style={{height: 'auto',borderRadius: '0',width: '70%', marginLeft: 'auto',marginRight: 'auto',borderLeft: 'none',borderRight: 'none'}}>
          <CardBody>
            <Row>
              <Col lg={1}> <img src={ 'https://gizmeon.s.llnwi.net/vod/thumbnails/images/'+data.image} alt="Girl in a jacket" style={{maxWidth: '120px',maxHeight: '100px'}} /> </Col>
              <Col lg={10}>
                <ul style={{listStyleType: 'none',marginLeft: '-10px'}}>
                  <li style={{fontWeight: 'bolder',color: '#5CB85C'}}>{data.name} </li>
                  <li> {data.day}</li>
                </ul>
              </Col>
              <Col lg={1}>
                <Fragment>
                  <Link to={{ pathname: '/Editpost', state:{id:data.post_id} }}> <img src={edit} style={{ width: "25px", marginLeft: "80%", marginTop: "-25px", }}/> </Link>
                </Fragment>
              </Col>
            </Row>
            <Row>
              <p style={{fontWeight: 'bolder'}}>{data.title}</p>
            </Row>
            <Row style={{marginTop: '-1%'}}>
              <p>{data.description}</p>
            </Row>
          </CardBody>
        </Card>
        </>); }):
        <Card style={{height: 'auto',borderRadius: '0',width: '70%', marginLeft: 'auto',marginRight: 'auto',border: 'none'}}>
          <CardBody>
            <p>No posts are here... yet</p>
          </CardBody>
        </Card>} </Tab>
    <Tab eventKey="posts" title="Global Posts"> {globalPosts && globalPosts.length > 0 ? globalPosts.map((data, index) => { return (
      <>
        <Card style={{height: 'auto',borderRadius: '0',width: '70%', marginLeft: 'auto',marginRight: 'auto',borderLeft: 'none',borderRight: 'none'}}>
          <CardBody>
            <Row>
              <Col lg={1}> <img src={ 'https://gizmeon.s.llnwi.net/vod/thumbnails/images/'+data.image} alt="Girl in a jacket" style={{maxWidth: '120px',maxHeight: '100px'}} /> </Col>
              <Col>
                <ul style={{listStyleType: 'none',marginLeft: '-10px'}}>
                  <li style={{fontWeight: 'bolder',color: '#5CB85C'}}>{data.name} </li>
                  <li> {data.day}</li>
                </ul>
              </Col>
            </Row>
            <Row>
              <p style={{fontWeight: 'bolder'}}>{data.title}</p>
            </Row>
            <Row style={{marginTop: '-1%'}}>
              <p>{data.description}</p>
            </Row>
          </CardBody>
        </Card>
        </>); }):
        <Card style={{height: 'auto',borderRadius: '0',width: '70%', marginLeft: 'auto',marginRight: 'auto',border: 'none'}}>
          <CardBody>
            <p>No posts are here... yet</p>
          </CardBody>
        </Card>} </Tab>
  </Tabs>
</div>
  );
}

export default UserPage;
