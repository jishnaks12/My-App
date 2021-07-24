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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './style.css'
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
    Input,
    CustomInput
} from "reactstrap";

const EditPost = ({
        history
    }) => {

        const id = history.location.state.id;

        const [fileName, setFileName] = useState('Choose image ');


        const [errors, setErrors] = useState({});

        const [values, setValues] = useState({

        });
        const hangleChange = (value, name) => {


            setValues({
                ...values,
                [name]: value
            })

        }
        useEffect(() => {
            Service.editPost(id)
                .then((response) => {
                        console.log("response", response)
                        var post = true;
                        if (response.data[0].public_post == 0) {
                            post = false
                        }
                        setFileName(response.data[0].image)
                        setValues({
                            postTitle: response.data[0].title,
                            description: response.data[0].description,
                            public: post,
                            post_id: id
                        })
                    },
                    (error) => {
                        return false;
                    });






        }, [id])
        const hangleFileChange = (e) => {
            const {
                name,
                files
            } = e.target;
            const [fileBlob] = name;
            const nameUrl = name + 'Url';
            setValues({
                ...values,
                [name]: files[0]
            })
            setFileName(files[0].name)
            setValues({
                ...values,
                [nameUrl]: {
                    preview: URL.createObjectURL(files[0]),
                    raw: files[0]
                }
            });
        }
        const staticValidation = () => {
            let errors = {}
            let formIsValid = true;
            console.log("values", values)
            if (!values.postTitle) {
                errors.validation = 'title required'
                formIsValid = false;
            }
            if (!values.description) {
                errors.validation = 'description required'
                formIsValid = false;

            }

            setErrors(errors);
            return formIsValid;
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            if (staticValidation() === true) {
                Service.updatePost(values, fileName)
                    .then((response) => {
                            console.log("response", response)
                            if (response.success == true) {

                                window.location.href = '/Details'
                            } else {
                                setErrors({
                                    'validation': response.message
                                });
                            }

                        },
                        (error) => {

                            return false;
                        });


            } else {

            }
        };
        const deletePost = () => {


            Service.deletePost(values.post_id)
                .then((response) => {
                        console.log("response", response)
                        if (response.data.success == true) {

                            window.location.href = '/Details'
                        } else {
                            setErrors({
                                'validation': response.message
                            });
                        }

                    },
                    (error) => {

                        return false;
                    });


        }
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
            <ListGroupItem style={{borderWidth: '0'}} onClick={deletePost}> Delete </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </CardBody>
  </Card>
  <Card style={{height: '350px',width: '70%',marginLeft: 'auto',marginRight: 'auto',border: 'none'}}>
    <CardBody>
      <Row>
        <Col lg={12} style={{marginLeft: 'auto',marginRight: 'auto'}}>
          <Input type="text" placeholder="Post Title" onChange={({ target })=> { hangleChange(target.value, 'postTitle') }} name="postTitle" style={{height: '50px'}} value={values.postTitle} /> </Col>
        <Col lg={12} style={{marginLeft: 'auto',marginRight: 'auto',marginTop: '2%'}}>
          <Input type="textarea" placeholder="Add Description Here" onChange={({ target })=> { hangleChange(target.value, 'description') }} name="description" style={{height: '170px'}} value={values.description} /> </Col>
      </Row>
      <Row style={{marginTop: '3%',width: '100%', height: '50px',marginLeft: 'auto',marginRight: 'auto'}}>
        <input type="file" name="file" id="file" class="inputfile" onChange={hangleFileChange}/>
        <label for="file">{fileName}</label>
      </Row>
      <Row style={{marginTop: '3%'}}>
        <Col>
          <CustomInput type="checkbox" id="public" name="public" label={<Fragment>Public</Fragment>} checked={values.public} style={{ zIndex: '3333333' }} onChange={({ target }) => { hangleChange(target.checked, 'public') }} /> </Col>
      </Row>
      <Row>
        <Col lg={2} style={{marginLeft: 'auto',marginRight: 'auto',marginTop: '3%'}}>
          <Button style={{backgroundColor: '#64a5b0'}} onClick={handleSubmit}> Submit </Button>
        </Col> {errors.validation &&
        <p style={{ color: 'red', fontStyle: 'Italic' ,marginLeft: '20%'}}>{errors.validation}</p>} </Row>
    </CardBody>
  </Card>
</div>
  );
};

export default EditPost;
