export function ReviewsList({ bookReviews }) {
  
    return (
        <div className="book-reviews">
            <h1>Reviews</h1>
            {bookReviews.map(review => {
                const { fullName, rating, txt, date } = review
                return <section className="book-review" key={review.id}>
                    <h2>{fullName}</h2>
                    <h4>{date}</h4>
                    <h3>{'&#9733;'.repeat(rating)}</h3>
                    <p>{txt}</p>
                </section>
            })}
        </div>
    )
}
