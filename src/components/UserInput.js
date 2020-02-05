"use strict"

import React from 'react';
import AuthorActions from '../actions/authorActions.js'

export class UserInput extends React.Component{


    constructor(props){
        super(props);
        
        this.state = {
          authorId : '',
          authorName : '' ,
          error : ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }

handleSubmit(){
    
    const author = {
    authorId : this.state.authorId,
    authorName : this.state.authorName
    }
    // console.log(author)
     AuthorActions.addAuthor(author);   
}

handleDeleteSubmit(id){
    const author = {
        authorId : id
    }
    AuthorActions.deleteAuthor(author);
}

handleUpdateSubmit(){
    const author = {
        authorId : this.state.authorId,
        authorName : this.state.authorName
        }
        AuthorActions.updateAuthor(author);
}

handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value, 
    })  
}

render(){
return(
             <div>
                    <p>Add / Update / Delete an Author:</p>
                     <form name='userinput'>
                         {/* <h1 name='Place'> {this.state.error}</h1> */}
                            <label> Author ID:
                                <input type='number' placeholder=' author id' name="authorId" onChange={this.handleChange} pattern="^-?[0-9]\d*\.?\d*$"/>
                            </label>

                        <label> Author Name:
                            <input type="text"  placeholder='author name' name="authorName" onChange={this.handleChange} />
                        </label>

                        <button type="button" onClick={this.handleSubmit}>Add</button>
                        <button type="button" onClick={this.handleUpdateSubmit}>Update</button>
                        <button type="button" onClick={() => this.handleDeleteSubmit(this.state.authorId)}>delete</button>
                     </form>
            </div> );
}

}