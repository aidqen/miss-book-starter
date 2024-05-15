import { storageService } from "./async-storage.service.js";

export const searchService = {
    getSearchBooks
}




function getSearchBooks(searchValue) {
    if (storageService.loadFromStorage(searchValue)) return Promise.resolve(storageService.loadFromStorage(searchValue))
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchValue}`)
        .then(response => {
            storageService.save(searchValue, response.data.items)
            return response.data.items
        })
        
}