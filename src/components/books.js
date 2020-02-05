"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {BookList} from '../components/BookList';
import {BookUserInput} from '../components/bookUserInput'

export class Books extends React.Component{

  

    render() {
        return(
            <div>
                <div>
                    <BookUserInput />
                </div>
                     
                <div>
                    <BookList bookList = {this.props.bookList} />
                </div>
             </div>   
                    
                
            
        );
    }
}


Books.propTypes = {
    bookList: PropTypes.array.isRequired
};
