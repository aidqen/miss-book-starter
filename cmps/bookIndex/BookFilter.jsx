const { useState, useEffect } = React

export function BookFilter({ books, filterBy, onSetFilterBy}) {
  const [range, setRange] = useState(0)
  const [editFilterBy, setEditFilterBy] = useState(filterBy);
  
  const maxPrice = books.reduce((max, book) => {
    return Math.max(max, book.listPrice.amount)
  }, 0)

  function handleFilterChange({target}) {
    const field = target.name
    const value = target.value

    onSetFilterBy(prevFilter => ({ ...prevFilter, [field]:value}))
  }

  return (
    <section className="filter-container flex flex-row justify-between w-100">
      <div className="price-filter">
        <label>{range}</label>
        <input type="range" onChange={handleFilterChange} max={maxPrice}/>
      </div>
      <div className="name-filter">
        <input type="text" onChange={handleFilterChange} id="search" name="txt"/>
        <label htmlFor="search">Search Book</label>
      </div>
    </section>
  )
}
