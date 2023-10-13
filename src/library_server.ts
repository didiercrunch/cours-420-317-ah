// https://gist.github.com/didiercrunch/f605ec5bdb034f3eb2acd3cf0b858895

// @deno-types="npm:@types/express@4"
import express, {Response, Request} from "npm:express@4";
import bodyParser from "npm:body-parser@1.20.2";


const app = express()
app.use(bodyParser.json());


export type Book = {
    isbn: string,
    author: string,
    title: string,
    publicationYear: number,
}

type BookQuery = {
    author?: string
}

const library_server : Book[] = [];

function bookAlreadyExists(book: Book, library: Book[]): boolean{
    for(const bookInLibrary of library){
        if(book.isbn === bookInLibrary.isbn){
            return true;
        }
    }
    return false;
}

function isValidBook(maybeBook: any){
    return Object.keys(maybeBook).length === 4
        && "isbn" in maybeBook
        && "author" in maybeBook
        && "title" in maybeBook
        && "publicationYear" in maybeBook;
}

function getBookByIsbn(isbn: string, library: Book[]): Book | null {
    for(const bookInLibrary of library){
        if(bookInLibrary.isbn === isbn){
            return bookInLibrary;
        }
    }
    return null;
}

function matches(book: Book, query: BookQuery){
    if(!query.author){
        return true;
    }
    return book.author === query.author;
}

app.get("/ping", (req: Request, res: Response): void => {
    res.send("pongi");
})

app.get("/books", (req: Request, res: Response): void => {
    const books = [];
    const query = req.query as BookQuery;
    for(const book of library_server){
        if(matches(book, query)){
            books.push({isbn: book.isbn});
        }
    }
    const ret = {
        "books": books
    }
    res.send(ret);
});

app.get("/books/:isbn", (req: Request, res: Response): void => {
    const isbn = req.params.isbn;
    const book = getBookByIsbn(isbn, library_server);
    if(book === null){
        res.status(404);
        res.send({});
        return
    }
    res.send(book);
});

app.post("/books", (req: Request, res: Response): void => {
    const book = req.body;
    if(!isValidBook(book) || bookAlreadyExists(book, library_server)){
        res.status(400);
        res.send({})
        return;
    }

    library_server.push(book);
    res.send(book);
});


const port = 3000
app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`)
})


