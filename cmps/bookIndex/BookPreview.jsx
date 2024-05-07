export function BookPreview({ book }) {
  const { title, authors, subtitle, publishedDate, pageCount, categories, listPrice } = book

  return (
    <li className="book-preview">
      <h2>{title}</h2>
      <h3>Authors: {authors.join(' ')}</h3>
      <h3>Subtitle: {subtitle}</h3>
      <h3>Published: {publishedDate}</h3>
      <h3>Pages: {pageCount}</h3>
      <h3>Categories: {categories}</h3>
      <h3 className={listPrice.isOnSale ? 'bold' : ''}>
        Price: {`${listPrice.amount}${listPrice.currencyCode} ${
          listPrice.isOnSale ? 'On Sale!' : ''
        }`}
      </h3>
    </li>
  )
}
