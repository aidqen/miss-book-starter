import { LongTxt } from "./LongTxt.jsx";

export function BookDetailsMain({ book }) {
  return (
    <React.Fragment>
        <h2>{book.title}</h2>
        <h3>
          Authors: <span>{book.authors.join(' ')}</span>
        </h3>
        <h3>
          Subtitle: <span>{book.subtitle}</span>
        </h3>
        <h3>
          Published: <span>{book.publishedDate}</span>
        </h3>
        <h3>
          Pages: <span>{book.pageCount}</span>
        </h3>
        <h3>
          Categories: <span>{book.categories}</span>
        </h3>
        <h3 className={book.listPrice.isOnSale ? 'bold' : ''}>
          Price:{' '}
          <span>{`${book.listPrice.amount}${book.listPrice.currencyCode} ${
            book.listPrice.isOnSale ? 'On Sale!' : ''
          }`}</span>
        </h3>
        <LongTxt desc={book.description}/>
    </React.Fragment>
  )
}
