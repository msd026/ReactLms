import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';


const CHANGE_EVENT = 'change';

let _authorStore = {
    authors: [],
    error:{
        APIMessage : '',
        APIResponse : ''
    }
};

class AuthorStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    updateAuthor(author){
        const index = _authorStore.authors.findIndex((elem) => { return elem.authorId == author.authorId});
        _authorStore.authors[index] = author;   
    }

    getAllAuthors(){
        return _authorStore.authors;
    }

    throwError(ApiResponse,ApiMessage){
        _authorStore.APIMessage=ApiMessage;
        _authorStore.APIResponse=ApiResponse; 
    }

    deleteAuthor(author){
        // console.log(author);
        const newAuthors = _authorStore.authors.filter(elem => {return elem.authorId !== author.authorId});
        _authorStore.authors = newAuthors;
    }    
}

const AuthorStore = new AuthorStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_authors_success':
            _authorStore.authors = action.data;
            AuthorStore.emitChange();
            break;

        case 'add_author_success':
            console.log('actions si'+ action.newAuthor);
            _authorStore.authors.push(action.newAuthor);
            AuthorStore.emitChange();
            break;

        case 'update_author_success':           
            AuthorStore.updateAuthor(action.updateAuthor);
            AuthorStore.emitChange();
            break;
        case 'delete_author_success':
            AuthorStore.deleteAuthor(action.deleteAuthor);
            AuthorStore.emitChange();
            break;      
        case 'add_author_failure':  
            AuthorStore.throwError(action.apiResponse, action.apiMessage);
            AuthorStore.emitChange();
            break;   
        case 'get_author_failure':  
            AuthorStore.throwError(action.apiResponse, action.apiMessage);
            AuthorStore.emitChange();
            break; 
        case 'update_author_failure':  
            AuthorStore.throwError(action.apiResponse, action.apiMessage);
            AuthorStore.emitChange();
            break; 
        case 'delete_author_failure':  
            AuthorStore.throwError(action.apiResponse, action.apiMessage);
            AuthorStore.emitChange();
            break; 
        default:
                return;
    }
} );

export default AuthorStore;