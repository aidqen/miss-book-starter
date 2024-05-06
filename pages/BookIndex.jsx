import { BookList } from '../cmps/bookIndex/BookList.jsx';
import { bookService } from '../services/book.service.js'
const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        bookService.query().then(booksPrm => setBooks(booksPrm));
    }, []);
    
    
  return (
    <table>
        <thead>
            <tr>
                <td>Title:</td>
                <td>Authors:</td>
                <td>Subtitle:</td>
                <td>Publish Date:</td>
                <td>Page Count:</td>
                <td>Categories:</td>
            </tr>
        </thead>
        <tbody>
            <BookList books={books}/>
        </tbody>
    </table>
  )
}
