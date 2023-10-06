async function getPing(): Promise<void> {
    const resp = await fetch("http://localhost:3000/ping")
    const text = await resp.text()
    console.log(text)
}

function extractIsbn(rawResponse: any): string[]{
    const ret: string[] = [];
    for(const elm of rawResponse.books){
        ret.push(elm.isbn)
    }
    return ret;
}

async function getAllIsbn(){
    const resp = await fetch("http://localhost:3000/books")
    const ret = await resp.json();
    return extractIsbn(ret);

}

async function createBook(isbn: string,
                          author: string,
                          title: string,
                          publicationYear: number): Promise<boolean>{
    const book = {isbn: isbn, author: author, title: title, publicationYear: publicationYear};

    const resp = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    return resp.status < 300 && resp.status > 199;
}

async function createFourBooks(): Promise<void>{
    await createBook("0000", "jk rolling", "harry potter I", 2004);
    await createBook("1111", "jk rolling", "harry potter II", 2005);
    await createBook("2222", "jk rolling", "harry potter III", 2006);
    await createBook("3333", "jk rolling", "harry potter IV", 2007);
}

async function getCreateBook(): Promise<void> {
    await createFourBooks();
    console.log(await getAllIsbn());
}

await getCreateBook();