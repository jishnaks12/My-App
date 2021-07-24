import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./components/Home.js";

import Login from "./components/Login.js";
import Register from "./components/Register.js";
import userPage from "./components/userPage.js";
import newPost from "./components/newPost.js";
import editPost from "./components/editPost.js"
export default (props) => {
  // const {
  //  createShop,
  //  createCheckout,
  //  fetchProducts,
  //  //fetchCollection,
  // } = useShopify()

  // useEffect(() => {

  //  //createCheckout()
  //  //fetchCollection()
  // }, [])

  return (
    <Router>
      <div id="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/Home" />} />
          <Route path="/Home" component={Home} />
          <Route path="/Login" component={Login} />
          <Route path="/Signup" component={Register} />
          <Route path="/Details" component={userPage} />
          <Route path="/Newpost" component={newPost} />
          <Route path="/Editpost" component={editPost} />

         
        </Switch>
      </div>
    </Router>
  );
};