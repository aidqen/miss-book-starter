import { DropdownRating } from './DynamicInputs/DropdownRating.jsx'
import { NumberRating } from './DynamicInputs/NumberRating.jsx'
import { StarRating } from './DynamicInputs/StarRating.jsx'

const { useState } = React

export function AddReview({ onToggleDialog, onSaveReview }) {
  const [cmpType, setCmpType] = useState('stars')

  const [review, setReview] = useState({
    fullName: 'Books Reader',
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    txt: '',
  })

  function handleChange({ target }) {
    const { value, name: field } = target

    setReview(prevReview => ({ ...prevReview, [field]: value }))
    console.log(review)
  }

  function onAddReview(ev) {
    ev.preventDefault()
    onSaveReview(review)
    onToggleDialog()
  }

  const { fullName, date, txt, rating } = review

  return (
    <React.Fragment>
      <div className="backdrop"></div>
      <div className="review-modal">
        <div className="review-modal-header">
          <h1>Add Review</h1>
          <button onClick={onToggleDialog}>Close</button>
        </div>

        <form className="dialog" onSubmit={onAddReview}>
          <label htmlFor="fullname-input">What is your name?</label>
          <input type="text" id="fullname-input" value={fullName} name="fullName" onChange={handleChange} />

          <div className="flex flex-row">
            <label htmlFor="stars-input">Rate the book:</label>
            <div className="flex flex-row">
              <label>Star:</label>
              <input type="radio" name="rating" value={'stars'} onChange={() => setCmpType('stars')} />
              <label>Drop list:</label>
              <input type="radio" name="rating" value={'dropdown'} onChange={() => setCmpType('dropdown')}/>
              <label>Numbers:</label>
              <input type="radio" name="rating" value={'numbers'} onChange={() => setCmpType('numbers')} />
            </div>
            <DynamicRating handleChange={handleChange} rating={rating} type={cmpType} />
          </div>

          <label htmlFor="read-at-input">Read At:</label>
          <input type="date" id="read-at-input" name="date" onChange={handleChange} value={date} />

          <div className="review-txt-input flex flex-column">
            <label htmlFor="txt">Your Thoughts:</label>
            <textarea id="txt" name="txt" cols="30" rows="10" value={txt} onChange={handleChange}></textarea>
          </div>

          <button>Submit</button>
        </form>
      </div>
    </React.Fragment>
  )
}

function DynamicRating(props) {
  console.log(props);
  switch (props.type) {
    case 'stars':
      return <StarRating {...props} />
    case 'numbers':
      return <NumberRating {...props} />
    case 'dropdown':
      return <DropdownRating {...props} />
  }
}
