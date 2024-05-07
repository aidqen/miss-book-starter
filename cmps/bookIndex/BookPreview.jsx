const { Link } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouter

export function BookPreview({ book }) {
  const { id, title, authors, subtitle, publishedDate, pageCount, categories, listPrice, idx } = book
  return (
    <li className="book-preview">
      <h2>{title}</h2>
      <h3>Authors: <span>{authors.join(' ')}</span></h3>
      <h3>Subtitle: <span>{subtitle}</span></h3>
      <h3>Published: <span>{publishedDate}</span></h3>
      <h3>Pages: <span>{pageCount}</span></h3>
      <h3>Categories: <span>{categories}</span></h3>
      <h3 className={listPrice.isOnSale ? 'bold' : ''}>
        Price: <span>{`${listPrice.amount}${listPrice.currencyCode} ${
          listPrice.isOnSale ? 'On Sale!' : ''
        }`}</span>
      </h3>
      <img src={`../../BooksImages/${idx}.jpg`} alt="" />

      <div className="actions">
        <Link to={`/books/details/${id}`}>Details</Link>
        <button>Delete</button>
      </div>
    </li>
  )
}
