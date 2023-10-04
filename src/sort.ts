const lst = [{id: 90, name: "dinh", temps: "10:10"},
                    {id: 30, name: "didier", temps: "10:40"},
                    {id: 100, name: "paul", temps: "10:30"}];


function tempsToNumber(temps: string): number{
    const heures = parseInt(temps.split(":")[0]);
    const minutes = parseInt(temps.split(":")[1]);
    return 60 * heures + minutes;
}
function sortFunction(a, b){
    return tempsToNumber(a.temps) - tempsToNumber(b.temps);
}

lst.sort(sortFunction)
console.log(lst);

