export function BookPreview({book}) {
    const { title, authors, subtitle, publishedDate, pageCount, categories} = book 

    return (
        <tr>
                <td>{title}</td>
                <td>{authors.join(' ')}</td>
                <td>{subtitle}</td>
                <td>{publishedDate}</td>
                <td>{pageCount}</td>
                <td>{categories}</td>
        </tr>
    )
}