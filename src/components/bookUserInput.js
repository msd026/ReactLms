"use strict"

import React from 'react';
// import PropTypes from 'prop-types';
// import {BookList} from '../components/BookList';
import BookActions from '../actions/bookActions'

export class BookUserInput extends React.Component{
constructor(props){
    super(props);
    
    this.state = {
      bookId : '',
      title : '',
      authId: '',
      pubId : ''
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

handleSubmit(){
const book = {
bookId : this.state.bookId,
title : this.state.title,
authId : this.state.authId,
pubId : this.state.pubId
}
 BookActions.addBook(book);   
}

handleDeleteSubmit(id){
const book = {
    bookId : id
}
BookActions.deleteBook(book);
}

handleUpdateSubmit(){
const book = {
    bookId : this.state.bookId,
    title : this.state.title,
    authId : this.state.authId,
    pubId : this.state.pubId
    }
    BookActions.updateBook(book);
}

handleChange(evt){
    this.setState({
        [evt.target.name]: evt.target.value, 
})  
}

render(){
    return(
        <div>
             <p>Add / Update / Delete a New Book:</p>
                     <form name='userinput'>
                        <label> Book ID:
                            <input type='number' value={this.state.message} placeholder='id' name="bookId" onChange={this.handleChange} pattern="^-?[0-9]\d*\.?\d*$"/>
                        </label>

                        <label> Book title:
                            <input type="text"  placeholder='title of the book' name="title" onChange={this.handleChange} />
                        </label>

                        <label> Book Author ID:
                            <input type='number' placeholder='author ID' name="authId" onChange={this.handleChange} pattern="^-?[0-9]\d*\.?\d*$" />
                        </label>

                        <label> Book Publisher ID:
                            <input type='number' placeholder='publisher ID' name="pubId" onChange={this.handleChange} pattern="^-?[0-9]\d*\.?\d*$" />
                        </label>
                        <button type="button" onClick={this.handleSubmit}>Add</button>
                        <button type="button" onClick={this.handleUpdateSubmit}>Update</button>
                        <button type="button" onClick={() => this.handleDeleteSubmit(this.state.bookId)}>delete</button>
                     </form>
                 </div>
    )

}

}