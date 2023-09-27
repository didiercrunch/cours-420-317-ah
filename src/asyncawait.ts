import { delay } from "https://deno.land/std@0.202.0/async/delay.ts";


async function downloadFilesWithDelay(urls: string[]): Promise<string[]>{
    let ret: string[] = [];
    for(const url of urls){
        await delay(1000);
        const resp = await fetch(url);
        ret.push(await resp.text());
    }
    return ret;
}

async function downloadFile(): Promise<void> {
    const url = "https://didier-ahuntsic.gitlab.io/cours-420-317-ah/data/grades.json";
    const resp = await fetch(url);
    const payload = await resp.json();
    let ser = JSON.stringify(payload);
    await Deno.writeTextFile("grades.json", ser);
}

type Index = {links: string[]};

async function getIndex(url: string): Promise<Index>{
    const resp = await fetch(url);
    return (await resp.json()) as Index;
}

async function getEachUrl(links: string[]): Promise<string> {
    const ret : string[] = [];
    for(const url of links){
        const resp = await fetch(url);
        ret.push(await resp.json());
    }
    return ret;
}

async function downloadSubUrls(url: string): Promise<string>{
    const index = await getIndex(url);
    return await getEachUrl(index.links);
}

// const url = "https://didier-ahuntsic.gitlab.io/cours-420-317-ah/data/exo-index.json";
// const ret = await downloadSubUrls(url);
// console.log(ret.length)

async function download2InParallel():Promise<string[]>{
    const url1 = "http://httpbin.org/delay/3";
    const url2 = "http://httpbin.org/delay/3";
    const pResp1 =  fetch(url1);
    const pResp2 =  fetch(url2);
    await Promise.all([pResp1, pResp2]);

}



