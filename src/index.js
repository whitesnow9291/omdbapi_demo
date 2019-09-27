import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss?v=1.8.0";
import MovieListPage from "views/Test/MovieListPage";
import MovieDetailPage from "views/Test/MovieDetailPage"
// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/movielist-page"
                component={MovieListPage}
            />
            <Route path="/moviedetail-page/:imdbID"
                component={MovieDetailPage}
            />
            <Route path="/landing-page"
                component={LandingPage}
            />
            <Route path="/profile-page"
                component={ProfilePage}
            />
            <Route path="/login-page"
                component={LoginPage}
            />
            <Route path="/"
                component={MovieListPage}
            />
        </Switch>
    </Router>,
    document.getElementById("root")
);