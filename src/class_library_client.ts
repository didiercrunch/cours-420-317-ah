// https://gist.github.com/didiercrunch/8fbe1e26595e41817c92bed4efc44bcd
import {Book} from "./library_server.ts"

class LibraryClient{
    host: string;
    constructor(host: string) {
        this.host = host;
    }


    async getPing(): Promise<void> {
        const resp = await fetch(this.host + "/ping")
        const text = await resp.text()
        console.log(text)
    }

    extractIsbn(rawResponse: any): string[]{
        const ret: string[] = [];
        for(const elm of rawResponse.books){
            ret.push(elm.isbn)
        }
        return ret;
    }

    async getAllIsbn(): Promise<string[]>{
        const resp = await fetch(this.host + "/books");
        const ret = await resp.json();
        return this.extractIsbn(ret);

    }

    async createBook(isbn: string,
                              author: string,
                              title: string,
                              publicationYear: number): Promise<boolean>{
        const book = {isbn: isbn, author: author, title: title, publicationYear: publicationYear};

        const resp = await fetch(this.host + "/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        });
        return resp.status < 300 && resp.status > 199;
    }

    async createFourBooks(): Promise<void>{
        await this.createBook("0000", "jk rolling", "harry potter I", 2004);
        await this.createBook("1111", "jk rolling", "harry potter II", 2005);
        await this.createBook("2222", "jk rolling", "harry potter III", 2006);
        await this.createBook("3333", "jk rolling", "harry potter IV", 2007);
    }

    async getBook(isbn: string): Promise<Book>{
        const url = this.host + "/books/" + isbn;
        const resp = await fetch(url);
        const ret = await resp.json();
        return ret;

    }

    async  getBookByAuthor(author: string): Promise<string[]>{
        const urlParams =  new URLSearchParams({
            author: author,
        });

        const url = this.host + "/books?" + urlParams;
        const resp = await fetch(url);
        const ret = await resp.json();
        return this.extractIsbn(ret);
    }

}




const client = new LibraryClient("http://localhost:3000");
await client.createFourBooks();
console.log(await client.getBookByAuthor("jk rolling"))


