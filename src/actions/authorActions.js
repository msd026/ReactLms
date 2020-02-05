// import BookApi from '../api/bookApi';
import Dispatcher from '../dispatcher/appDispatcher';
const axios = require('axios');
const Promise = require('es6-promise').Promise;

const AuthorActions = {
    readAuthors: function(){
        axios.get('http://localhost:8081/admin/authors/')
        .then(res => {
        Dispatcher.dispatch({
            actionType: 'read_authors_success',
            data:res.data
        });
    })
    .catch((error) => {
    	Promise.resolve(error).then((e) => {
          Dispatcher.dispatch({
            actionType: 'read_author_failure',
          apiResponse: e,
          apiMessage : "List authors Unsuccessful"
        });
        });
    })
    },

    addAuthor: function(data) {
        console.log("authorAction  class  "+ data.authName);
        axios.post('http://localhost:8081/admin/author', data)
        .then(
        Dispatcher.dispatch({
            actionType: 'add_author_success',
            newAuthor: data 
        }))
        .catch((error) => {
            Promise.resolve(error).then((e) => {
                Dispatcher.dispatch({
                actionType: 'add_author_failure',
                apiResponse: e,
                apiMessage : "add Author unsuccessful"
            });
            });
        })
    
    },

    deleteAuthor: (author) => {
        axios.delete('http://localhost:8081/admin/author/'+author.authorId)
        .then( 
            Dispatcher.dispatch({
                actionType: 'delete_author_success',
                deleteAuthor: author
            })
        )
        .catch((error) => {
            Promise.resolve(error).then((e) => {
                Dispatcher.dispatch({
                actionType: 'delete_author_failure',
                apiResponse: e,
                apiMessage : "Delete Author unsuccessful."
            });
            });
        })
    },

    updateAuthor: (author) => {
        axios.put('http://localhost:8081/admin/author/',author)
        .then(
                Dispatcher.dispatch({
                actionType: 'update_author_success',
                updateAuthor: author
            })
        )
        .catch((error) => {
            Promise.resolve(error).then((e) => {
                Dispatcher.dispatch({
                actionType: 'update_author_failure',
                apiResponse: e,
                apiMessage : " Author Update unsuccessful."
            });
            });
        })
    }
    
}

module.exports = AuthorActions;