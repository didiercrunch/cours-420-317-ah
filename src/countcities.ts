import rawData from "https://didier-ahuntsic.gitlab.io/cours-420-317-ah/data/cities.json" assert {type: "json"};

type CityWithCount = [string, number]

function countOccurrences(cities: string[]): Map<string,number> {
    let ret = new Map<string, number>();
    for(const city of cities) {
        ret.set(city, (ret.get(city) ?? 0) + 1)
    }
    return ret;
}

function maxOccurrence(occurrences: Map<string, number>): CityWithCount {
    let maxOccurrenceName = "";
    let maxOccurrenceValue = 0;
    for(const [name, value] of occurrences.entries()){
        if(value > maxOccurrenceValue){
            maxOccurrenceName = name;
            maxOccurrenceValue = value;
        }
    }
    return [maxOccurrenceName, maxOccurrenceValue];
}


function getMostListedCity(cities: string[]): CityWithCount{
    const occurrences: Map<string, number> = countOccurrences(cities);
    return maxOccurrence(occurrences);
}

console.log(getMostListedCity(rawData as string[]));



