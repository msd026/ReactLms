import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';

let _bookStore = {
  books: [],
  message:''
};

class BookStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    // addErrorChangeListener(cb){
    //     this.on(CHANGE_EVENT, cb);
    // }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getAllBooks(){
        return _bookStore.books;
    }

    updateBook(book){
        const index = _bookStore.books.findIndex((elem) => { return elem.bookId === book.bookId});
        _bookStore.books[index] = book;        
    }

    deleteBook(book){
        const newBooks = _bookStore.books.filter(elem => {return elem.bookId !== book.bookId});
        _bookStore.books = newBooks;
    }    
}

const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_books_success':
            _bookStore.books = action.data;
            BookStore.emitChange();
            break;

        case 'add_book_success':
            _bookStore.books.push(action.newBook);
            BookStore.emitChange();
            break;

        case 'update_book_success':
            BookStore.updateBook(action.updateBook);
            BookStore.emitChange();
            break;
        case 'delete_book_success':
            BookStore.deleteBook(action.deleteBook);
            BookStore.emitChange();
            break;     
        case 'read_book_failure':
            BookStore.emitChange();
            break;
        default:
                return;
    }
} );

export default BookStore;