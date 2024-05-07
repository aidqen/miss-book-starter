import { BookPreview } from './BookPreview.jsx'

export function BookList({ books }) {
  console.log(books)
  return (
    <ul className='books-list'>
      {books.map(book => {
        return <BookPreview key={book.id} book={book}/>
      })}
    </ul>
  )
}
