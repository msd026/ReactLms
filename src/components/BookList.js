"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';


export class BookList extends React.Component{

    createBookRow(book){
        console.log(book);
        return (
            <tr key={book.bookId}>
                <td>{book.bookId}</td>
                <td>{book.title}</td>
                <td>{book.author.authorName}</td>
                <td>{book.publisher.pubName}</td>
            </tr>
        );
        
    }

    componentDidMount(){
        BookActions.readBooks();
    }

    // listChanged() {  
    //     // Since the list changed, trigger a new render.
    //     this.forceUpdate();
    // }

    // componentWillUnmount() {  
    //     this.unbind( 'change', this.listChanged );
    // }

    render() {
        // var newBook=bookList.getAll();
        return(
            <div>
                <h1>Books</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bookList.map(this.createBookRow, this)}
                        {/* console.log(this.bookList) */}
                    </tbody>    
                </table>
            </div>
        );
    }
}

BookList.propTypes = {
    bookList: PropTypes.array.isRequired
};



