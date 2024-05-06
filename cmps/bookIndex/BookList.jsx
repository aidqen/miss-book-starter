import { BookPreview } from './BookPreview.jsx'

export function BookList({ books }) {
  console.log(books)
  return (
    <React.Fragment>
      {books.map(book => {
        return <BookPreview key={book.id} book={book}/>
      })}
    </React.Fragment>
  )
}
