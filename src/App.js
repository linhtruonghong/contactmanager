import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import {Provider} from "./context";
import Contacts from "./components/contact/Contacts";
import AddContact from "./components/contact/AddContact";

import Header from "./components/layout/Header";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Test from "./components/test/test";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import EditContact from "./components/contact/EditContact";

function App() {

    return (
        <Provider>
            <Router>
                <div className="App">
                    <Header branding="Contact Manager"/>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Contacts}/>
                            <Route exact path="/contact/add" component={AddContact}/>
                            <Route exact path="/contact/edit/:id" component={EditContact}/>
                            <Route exact path="/about" component={About}/>
                            <Route exact path="/test" component={Test}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </Provider>
    );
}

export default App;