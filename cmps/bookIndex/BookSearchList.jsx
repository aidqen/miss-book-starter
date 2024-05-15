export function BookSearchList({ searchResults, addBook }) {

    return <ul className="search-book">
        {searchResults.map(res => {
        const { volumeInfo } = res
            return (
                <li key={res.id} onClick={() => addBook(res)} className="search-book-res flex flex-row">
                    <h3>{volumeInfo.title}</h3>
                    <button>+</button>
                </li>
            )
        })}
    </ul>
}