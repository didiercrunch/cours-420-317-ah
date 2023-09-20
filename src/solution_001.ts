// Correction du travail formatif 004.
//  https://didier-ahuntsic.gitlab.io/cours-420-317-ah/_exercices/004.pdf

// solution exercice 1

function test_number_original(x: number): string {
    if (x % 2 === 0) {
        if (x < 0) {
            return "nombre pair et negatif"
        }
        if (x <= 20) {
            return "petit nombre pair"
        }
        if (x <= 100) {
            return "grand nombre pair"
        }
    }
    return "impair"
}


// solution exercice 2
function estCarreParfait(x: number): boolean {
    if (x <= 0) {
        return false; // Les nombres négatifs ne sont pas des carrés parfaits.
    }

    for (let i = 1; i <= x; i++) {
        if (i * i === x) {
            return true;
        }
    }
    return false;
}

// console.log(estCarreParfait(9));
// console.log(estCarreParfait(7));


// solution exercice 3

function trouverMultiples(): void {

    let multiplesTrouves = 0;
    for (let i = 1; multiplesTrouves < 10; i++) {
        if (i % 5 === 0 && i % 3 === 0) {
            console.log(i);
            multiplesTrouves++;
        }
    }
}


// solution exercice 4

function isUglyNumber(n: number): boolean {
    if (n === 1) {
        return true;
    }
    if (n % 2 === 0) {
        return isUglyNumber(n / 2);
    }
    if (n % 3 === 0) {
        return isUglyNumber(n / 3)
    }
    if (n % 5 === 0) {
        return isUglyNumber(n / 5)
    }
    return false
}

//console.log(isUglyNumber(61))

// solution exercice 5

function fibonacci(): void {
    let fib_1 = 1;
    let fib_2 = 1;

    console.log(fib_1);
    console.log(fib_2);

    for (let i = 3; i <= 100; i++) {
        const nextFib = fib_1 + fib_2;
        console.log(nextFib);

        fib_1 = fib_2;
        fib_2 = nextFib;
    }
}

fibonacci();







