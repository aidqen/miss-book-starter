import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createbooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getSpeedStats,
    getVendorStats
}
// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.vendor))
            }

            if (filterBy.minSpeed) {
                books = books.filter(book => book.maxSpeed >= filterBy.minSpeed)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
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

function getEmptybook(vendor = '', maxSpeed = '') {
    return { vendor, maxSpeed }
}

function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
    return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
}

function getSpeedStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountBySpeedMap = _getbookCountBySpeedMap(books)
            const data = Object.keys(bookCountBySpeedMap).map(speedName => ({ title: speedName, value: bookCountBySpeedMap[speedName] }))
            return data
        })

}

function getVendorStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByVendorMap = _getbookCountByVendorMap(books)
            const data = Object.keys(bookCountByVendorMap)
                .map(vendor =>
                ({
                    title: vendor,
                    value: Math.round((bookCountByVendorMap[vendor] / books.length) * 100)
                }))
            return data
        })
}

function _createbooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const vendors = ['audu', 'fiak', 'subali', 'mitsu']
        for (let i = 0; i < 6; i++) {
            const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
            books.push(_createbook(vendor, utilService.getRandomIntInclusive(80, 300)))
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createbook(vendor, maxSpeed = 250) {
    const book = getEmptybook(vendor, maxSpeed)
    book.id = utilService.makeId()
    return book
}

function _setNextPrevbookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
        const nextbook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevbook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextbookId = nextbook.id
        book.prevbookId = prevbook.id
        return book
    })
}

function _getbookCountBySpeedMap(books) {
    const bookCountBySpeedMap = books.reduce((map, book) => {
        if (book.maxSpeed < 120) map.slow++
        else if (book.maxSpeed < 200) map.normal++
        else map.fast++
        return map
    }, { slow: 0, normal: 0, fast: 0 })
    return bookCountBySpeedMap
}

function _getbookCountByVendorMap(books) {
    const bookCountByVendorMap = books.reduce((map, book) => {
        if (!map[book.vendor]) map[book.vendor] = 0
        map[book.vendor]++
        return map
    }, {})
    return bookCountByVendorMap
}