// @deno-types="npm:@types/express@4"
import express, {Response, Request} from "npm:express@4";
import bodyParser from "npm:body-parser@1.20.2";


const app = express()
app.use(bodyParser.json());


type Book = {
    isbn: string,
    author: string,
    title: string,
    publicationYear: number,
}

const library : Book[] = [];

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

app.get("/ping", (req: Request, res: Response): void => {
    res.send("pongi");
})

app.get("/books", (req: Request, res: Response): void => {
    const books = [];
    for(const book of library){
        books.push({isbn: book.isbn});
    }
    const ret = {
        "books": books
    }
    res.send(ret);
});

app.post("/books", (req: Request, res: Response): void => {
    const book = req.body;
    if(!isValidBook(book) || bookAlreadyExists(book, library)){
        res.status(400);
        res.send({})
        return;
    }

    library.push(book);
    res.send(book);
});


const port = 3000
app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`)
})