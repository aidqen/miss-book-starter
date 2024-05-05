import { bookService } from '../services/book.service.js'

export function BookIndex() {
    bookService.query().then(console.log)

    return 
}