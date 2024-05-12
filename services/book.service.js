import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
// _createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  saveReview

}
// For Debug (easy access from console):
// window.cs = bookService

function saveReview(bookId, review) {
  const books = _loadBooksFromStorage()
  const book = books.find((book) => book.id === bookId)
  const modReview = _createReview(review)
  console.log(modReview);
  console.log(book);
  console.log(book.reviews);
  book.reviews.unshift(modReview)
  _saveBooksToStorage(books)
  return Promise.resolve(modReview)
}

function _createReview(reviewToSave) {
  return {
    id: utilService.makeId(),
    ...reviewToSave,
  }
}

function _saveBooksToStorage(books) {
  storageService.saveToStorage(BOOK_KEY, books)
}

function _loadBooksFromStorage() {
  return storageService.loadFromStorage(BOOK_KEY)
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then(books => {
    if (books.length === 0) {
      _createBooks()
    }
    
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      books = books.filter(book => regExp.test(book.title))
    }

    if (filterBy.minPrice) {
      books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
    }


    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then(book => {
    book = _setNextPrevbookId(book)
    return book
  })
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function _createBooks() {
  // if ((storageService.query(BOOK_KEY).then(books => books.length === 0))) return

  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  const books = []
  for (let i = 0; i < 20; i++) {
    const book = {
      id: utilService.makeId(),
      idx: i + 1,
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [utilService.makeLorem(1)],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(20),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
      language: 'en',
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
      reviews: []
    }
    books.push(book)
  }
  storageService.save(BOOK_KEY, books)
}


function _setNextPrevbookId(book) {
  return storageService.query(BOOK_KEY).then(books => {
    const bookIdx = books.findIndex(currbook => currbook.id === book.id)
    const nextbook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevbook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1]
    book.nextbookId = nextbook.id
    book.prevbookId = prevbook.id
    return book
  })
}

