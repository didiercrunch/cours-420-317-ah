import { delay } from "https://deno.land/std@0.202.0/async/delay.ts";

async function asyncSayHiAndBye(name: string): Promise<void>{
    await delay(1000);
    console.log("bonjour")
    await delay(1000);
    console.log("au revoir " + name);
}


function promiseSayHiAndBye(name: string): Promise<void>{
    return delay(1000)
        .then(function(){console.log("bonjour")})
        .then(function(){delay(1000)})
        .then(function(){console.log("au revoir " + name)});
}

function promiseWithFatArrowsSayHiAndBye(name: string): Promise<void>{
    return delay(1000)
        .then(() => console.log("bonjour"))
        .then(() => delay(1000))
        .then(() => console.log("au revoir " + name));
}



function callbackSayHiAndBye(name: string): void{
    setTimeout(function(){
        console.log("Bonjour");
        setTimeout(function(){
            console.log("au revoir " + name)
        }, 1000);
    }, 1000);
}

await asyncSayHiAndBye("didier");
await promiseSayHiAndBye("walid");
await promiseWithFatArrowsSayHiAndBye("Haikel")
callbackSayHiAndBye("jonathan")