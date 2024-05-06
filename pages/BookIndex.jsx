import { BookFilter } from '../cmps/bookIndex/BookFilter.jsx';
import { BookList } from '../cmps/bookIndex/BookList.jsx';
import { bookService } from '../services/book.service.js'
const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState([]);
    const [filterBy, setFilterBy] = useState({minPrice: 0, txt: ''});
    
    
    useEffect(() => {
        bookService.query(filterBy)
            .then(booksPrm => setBooks(booksPrm));
    }, []);

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({...prevFilter, ...filterBy}))
    }
    
    
  return (
    <React.Fragment>
    <BookFilter books={books} filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
    <table>
        <thead>
            <tr>
                <td>Title:</td>
                <td>Authors:</td>
                <td>Subtitle:</td>
                <td>Publish Date:</td>
                <td>Page Count:</td>
                <td>Categories:</td>
                <td>Price:</td>
            </tr>
        </thead>
        <tbody>
            <BookList books={books}/>
        </tbody>
    </table>
    </React.Fragment>
  )
}
