import { StarRating } from "./StarRating.jsx";

export function ReviewsList({ bookReviews }) {

  console.log(bookReviews);

    return (
        <div className="book-reviews">
            <h1>{bookReviews.length === 0 ? 'No reviews...' : 'Reviews'}</h1>
            {bookReviews.map(review => {
                const { fullName, rating, txt, date } = review

                return <section className="book-review" key={review.id}>
                    <h2>{fullName}</h2>
                    <h4>{date}</h4>
                    <StarRating rating={rating}/>
                    <p>{txt}</p>
                </section>
            })}
        </div>
    )
}
