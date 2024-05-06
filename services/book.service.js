import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
//   getEmptyBook,
//   getDefaultFilter,
  
}
// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then(books => {
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

// function getEmptybook(ctg = '', maxSpeed = '') {
//   return { vendor, maxSpeed }
// }

// function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
//   return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
// }

function _createBooks() {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  const books = []
  for (let i = 0; i < 20; i++) {
    const book = {
      id: utilService.makeId(),
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
    }
    books.push(book)
  }
  storageService.save(BOOK_KEY, books)
}

// function _createbook(vendor, maxSpeed = 250) {
//   const book = getEmptybook(vendor, maxSpeed)
//   book.id = utilService.makeId()
//   return book
// }

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

