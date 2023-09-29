
import { delay } from "https://deno.land/std@0.202.0/async/delay.ts";

function createAllResponses(urls: string[]): Promise<Response>[]{
    const ret: Promise<Response>[] = [];
    for(const url of urls){
        ret.push(fetch(url));
    }
    return ret;
}

function getTextOfAllResponses(responses: Response[]): Promise<string>[]{
    const ret: Promise<string>[] = [];
    for(const resp of responses){
        ret.push(resp.text());
    }
    return ret;
}

async function downloadAll(urls: string[]): Promise<string[]> {

    const promises = createAllResponses(urls);
    const responses = await Promise.all(promises);
    const textes  = getTextOfAllResponses(responses);
    return await Promise.all(textes);
}



