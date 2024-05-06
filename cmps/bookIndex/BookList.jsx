import { BookPreview } from './BookPreview'

export function BookList({ books }) {
  console.log(books)
  return (
    <React.Fragment>
      {books.map(book => {
        return (
          <tr>
            <BookPreview book={book}/>
          </tr>
        )
      })}
    </React.Fragment>
  )
}
