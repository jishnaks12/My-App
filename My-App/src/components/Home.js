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
    Tabs,
    Tab
} from "react-bootstrap";
import {
    CardBody,
    Col,
    Row,
    Card,
    Button,
    CardHeader,
    Label,
    ListGroup,
    ListGroupItem
} from "reactstrap";
require('dotenv')


function App() {
    //  const classes = useStyles();
    const [key, setKey] = useState("posts");

    const margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };
    const [value, setValue] = React.useState(0);
    const [globalPosts, setGlobalPosts] = useState([])
    const [backupPostListData, setBackupPostListData] = useState([])
    const [search, setSearch] = useState('');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        Service.getPost()
            .then((response) => {
                    console.log("response", response.data[0])
                    console.log("image", process.env.THUMBNAIL_URL)
                    setGlobalPosts(response.data)
                    setBackupPostListData(response.data)
                },
                (error) => {
                    return false;
                });






    }, [])
    const hangleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }
    const updateFilterdPosts = () => {
        var filteredData = [];
        if (search.length !== 0) {
            if (backupPostListData.length < globalPosts.length) {
                globalPosts.filter(ele => {
                        if (ele.title) {
                            var x = (ele.title.toLowerCase()).includes(search.toLocaleLowerCase())
                            if (x) {
                                filteredData.push(ele);
                            }
                        }
                    }

                )

                setGlobalPosts(filteredData)
            } else if (backupPostListData.length > globalPosts.length) {
                backupPostListData.filter(ele => {
                        if (ele.title) {
                            var x = (ele.title.toLowerCase()).includes(search.toLocaleLowerCase())
                            if (x) {
                                filteredData.push(ele);
                            }
                        }
                    }

                )
                setGlobalPosts(filteredData)
            } else {
                backupPostListData.filter(ele => {
                        if (ele.title) {
                            var x = (ele.title.toLowerCase()).includes(search.toLocaleLowerCase())
                            if (x) {
                                filteredData.push(ele);
                            }
                        }
                    }

                )
                setGlobalPosts(filteredData)
            }
        } else {
            setGlobalPosts(backupPostListData)
        }
    }
    useEffect(() => {

        updateFilterdPosts()
    }, [search])
  return (
   <div className="App">
  <Card style={{borderRadius: '0'}}>
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
              <Link style={{textDecoration: 'none'}} to={{ pathname: '/Signup'}}> Sign Up </Link>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </CardBody>
  </Card>
  <Card style={{height: '150px',backgroundColor: '#5CB85C',borderRadius: '0'}}>
    <CardBody>
      <h1 style={{color: '#fff',textShadow: '0px 1px 3px rgb(0 0 0 / 30%)',fontWeight: '700 !important',textAlign: 'center', fontSize: '3.5rem',paddingBottom: '0.5rem'}}>conduit</h1>
      <p style={{color: '#fff',textAlign: 'center',fontSize: '1.5rem', fontWeight: '300 !important',marginBottom: '0px'}}>A place to share your knowledge.</p>
    </CardBody>
  </Card> {/*
  <Paper square className={classes.root} style={{width: '80%',marginLeft: 'auto',marginRight: 'auto'}}>
    <Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary" aria-label="icon tabs example">
      <Tab label="Gobal Feed">
        <p></p>
      </Tab>
    </Tabs>
  </Paper>*/}
  <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k)=> setKey(k)} style={{width: '70%', marginLeft: 'auto',marginRight: 'auto'}} >
    <Tab eventKey="posts" title="Global Posts">
      <Row className="search" style={{width: '87%',marginBottom: '1%',marginTop: '1%'}}>
        <Col lg={7} className="pr-lg-2"> </Col>
        <Col lg={5} className="pr-lg-2">
          <input placeholder="Search post title..." type="text" className=" form-control form-control-rounded " onChange={hangleChange}></input>
        </Col>
      </Row> {globalPosts && globalPosts.length > 0 && globalPosts.map((data, index) => { return (
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
        </>); })} </Tab>
  </Tabs>
</div>
  );
}

export default App;
