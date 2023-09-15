function plusOrMinus(noteRange: number): string{
    if(noteRange < 3){
        return "-"
    }
    if(noteRange > 7){
        return "+";
    }
    return "";
}

function grade(note: number): string {
    if(note > 90){
        return "A" + plusOrMinus(note - 90);
    }
    if(note > 80){
        return "B" + plusOrMinus(note - 80);
    }
    return "";
}

console.log(grade(81));

