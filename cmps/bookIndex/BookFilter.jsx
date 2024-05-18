const { useState, useEffect } = React

export function BookFilter({ books, filterBy, onSetFilterBy }) {
  const [range, setRange] = useState(0)
  const [editFilterBy, setEditFilterBy] = useState(filterBy)

  const maxPrice = books.reduce((max, book) => {
    return Math.max(max, book.listPrice.amount)
  }, 0)

  useEffect(() => {
    onSetFilterBy(editFilterBy)
  }, [editFilterBy])

  function handleFilterChange({ target }) {
    const field = target.name
    let value = target.value

    if (field === 'minPrice') {
      value = +value
      setRange(value)
    }

    setEditFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section className="filter-container flex flex-row justify-between w-100">
      <div className="price-filter">
        <label>Min Price: {range} EUR</label>
        <input
          type="range"
          name="minPrice"
          onChange={handleFilterChange}
          max={maxPrice}
        />
      </div>
      <div className="name-filter">
        <div className="search-book-container">
          <input
            type="text"
            onChange={handleFilterChange}
            id="search"
            name="txt"
          />
          <i className="search-emoji fa-solid fa-magnifying-glass fa-lg"></i>
        </div>
        <label htmlFor="search">Search Book</label>
      </div>
    </section>
  )
}
