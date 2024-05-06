export function BookPreview({ book }) {
  const { title, authors, subtitle, publishedDate, pageCount, categories, listPrice } = book

  return (
    <tr>
      <td>{title}</td>
      <td>{authors.join(' ')}</td>
      <td>{subtitle}</td>
      <td>{publishedDate}</td>
      <td>{pageCount}</td>
      <td>{categories}</td>
      <td className={listPrice.isOnSale ? 'bold' : ''}>
        {`${listPrice.amount}${listPrice.currencyCode} ${
          listPrice.isOnSale ? 'On Sale!' : ''
        }`}
      </td>
    </tr>
  )
}
