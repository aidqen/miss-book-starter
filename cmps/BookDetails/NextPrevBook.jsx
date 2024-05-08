const { Link } = ReactRouterDOM

export function NextPrevBook({ nextbookId, prevbookId }) {
  return (
    <div className="next-prev-book">
      <Link to={`/books/details/${nextbookId}`}>Next Book</Link>
      <Link to={`/books/details/${prevbookId}`}>Previous Book</Link>
    </div>
  )
}
