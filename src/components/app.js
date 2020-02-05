"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';

import {Books} from './books.js';
import {Authors} from "./authors.js";

import BookStore from '../stores/bookStore';
import AuthorStore from '../stores/authorStore';


export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            bookList:[],
            authorList:[]
        };
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/books' render={(props) => (<Books {...props} bookList={this.state.bookList} />)}/>
                    <Route path='/authors' render={ (props) => (<Authors {...props} authorList={this.state.authorList} />)}/>
                </Switch>
            </div>
        );
    }

    componentDidMount(){
        BookStore.addChangeListener(this._onBookChange.bind(this));
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this));
        AuthorStore.throwError()
     }

    _onBookChange(){
        this.setState({bookList: BookStore.getAllBooks()});
    }

    _onAuthorChange(){
        this.setState({authorList: AuthorStore.getAllAuthors()});
    }

    _onErrorChange(){
        this.setState({authorList:AuthorStore.throwError()})
    }
}