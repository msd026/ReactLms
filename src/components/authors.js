"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import {AuthorList} from '../components/AuthorList';
// import AuthorActions from '../actions/authorActions.js'
import {UserInput} from '../components/UserInput'

export class Authors extends React.Component{

    render() {
        return(
            <div>  
                <div>
                    <UserInput /> 
                </div>
                  
                <div>
                    <AuthorList authorList = {this.props.authorList} />
                </div>
                
            </div>
        );
    }
}


Authors.propTypes = {
    authorList: PropTypes.array.isRequired
};
