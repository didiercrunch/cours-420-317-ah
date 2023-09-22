let websites = [
    "https://google.com",
    "https://lapresse.ca",
    "https://theguardian.com"
];

function computeTimeToLoad(url: string): number{
    return 98;
}

function computeAllLoadTime(websites: string[]): Map<string, number>{
    let ret = new Map<string, number>();
    for(let website of websites){
        ret.set(website, computeTimeToLoad(website));
    }
    return ret;
}

