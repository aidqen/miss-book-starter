const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React

import { AddReview } from '../cmps/BookDetails/AddReview.jsx'
import { BookDetailsMain } from '../cmps/BookDetails/BookDetailsMain.jsx'
import { NextPrevBook } from '../cmps/BookDetails/NextPrevBook.jsx'
import { bookService } from '../services/book.service.js'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const params = useParams()

  useEffect(() => {
    bookService.get(params.bookId)
    .then(setBook)
  }, [params])

  function openDialog() {
    setIsDialogOpen(true)
  }

  function closeDialog() {
    setIsDialogOpen(false)
  }

  return (
    <div className="book-details">
      {!book ? (<h2>Loading...</h2>) : (
        <React.Fragment>
          <img src={`../BooksImages/${book.idx}.jpg`} alt="" />
          <div className="details-container">
            <BookDetailsMain book={book}/>
            <NextPrevBook nextbookId={book.nextbookId} prevbookId={book.prevbookId}/>
            <button className="review-btn" onClick={openDialog}>Add Review</button>
            {isDialogOpen && <AddReview isDialogOpen={isDialogOpen} closeDialog={closeDialog} />}
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
