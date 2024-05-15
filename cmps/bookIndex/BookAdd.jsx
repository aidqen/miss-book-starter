import { searchService } from '../../services/book-search.service.js'
import { BookSearchList } from './BookSearchList.jsx'

const { useState } = React

export function BookAdd({ addBook }) {
  const [bookSearch, setBookSearch] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  function handleSearch({ target }) {
    setBookSearch(target.value)
    if (target.value.length > 3) {
      searchService
        .getSearchBooks(target.value)
        .then(res => setSearchResults(res.slice(0, 5)))
    }
  }

  
  console.log(searchResults)

  return (
    <React.Fragment>
      <div className="searches-container">
        <div className="flex flex-column">
          <input type="text" className='search-book-input' placeholder='Search book to add' onChange={handleSearch} value={bookSearch} />
        </div>
        {searchResults && <BookSearchList searchResults={searchResults} addBook={addBook}/>}
      </div>
    </React.Fragment>
  )
}
