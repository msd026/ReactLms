// import BookApi from '../api/bookApi';
import Dispatcher from '../dispatcher/appDispatcher';
const axios = require('axios');
const Promise = require('es6-promise').Promise;


const BooksActions = {
    readBooks: function(){
        axios.get('http://localhost:8081/admin/books')
        .then(res => {
        Dispatcher.dispatch({
            actionType: 'read_books_success',
            data:res.data
        });
    })
    .catch((error) => {
    	Promise.resolve(error).then((e) => {
          Dispatcher.dispatch({
          type: 'read_book_failure',
          apiResponse: e,
          apiMessage : "System encountered error. Please try again later."
        });
        });
    })
    },

    addBook: function(data) {
        // console.log(data);
        axios.post('http://localhost:8081/admin/book', data)
        .then(
        Dispatcher.dispatch({
            actionType: 'add_book_success',
            newBook: data 
        }))
        .catch((error) => {
            Promise.resolve(error).then((e) => {
                Dispatcher.dispatch({
              type: 'add_book_failure',
              apiResponse: e,
              apiMessage : "System encountered error. Please try again later."
            });
            });
        })
    
    },

    deleteBook: (book) => {
        axios.delete('http://localhost:8081/admin/book/'+book.bookId)
        .then( 
            Dispatcher.dispatch({
                actionType: 'delete_book_success',
                deleteBook: book
            })
        )
        .catch((error) => {
            Promise.resolve(error).then((e) => {
                Dispatcher.dispatch({
              type: 'delete_book_failure',
              apiResponse: e,
              apiMessage : "System encountered error. Please try again later."
            });
            });
        })
    },

    updateBook: (book) => {
        // console.log(book);
        axios.put('http://localhost:3000/book/',book)
        .then(
            Dispatcher.dispatch({
                actionType: 'update_book_success',
                updateBook: book 
            })
        )
        .catch((error) => {
            Promise.resolve(error).then((e) => {
                Dispatcher.dispatch({
              type: 'update_book_failure',
              apiResponse: e,
              apiMessage : "System encountered error. Please try again later."
            });
            });
        })
    }
    
}

module.exports = BooksActions;