import rawData from "https://didier-ahuntsic.gitlab.io/cours-420-317-ah/data/grades.json" assert {type: "json"};


type Grade = {
    studentId: number,
    examId: number,
    grade: number
};

type Student = {name: string, studentId: number};

type Exam = {
    examId: number,
    maxGrade: number,
    weight: number,
    name: string,
};

type RawData = {
    exams: Exam[],
    grades: Grade[]
    students: Student[]};

type Mark = {
    grade: number,
    maxGrade: number,
    weight: number
};

type StudentReportCard = {
    studentId: number,
    studentName: string,
    marks: Mark[]
};

function computeFinalGrade(reportCard: StudentReportCard): number{
    let finalGrade = 0;
    for(let mark of reportCard.marks){
        finalGrade += (mark.grade / mark.maxGrade) * mark.weight / 100
    }
    return finalGrade;
}

function transformData(rawData: RawData): StudentReportCard[]{

}



function main(_rawData: RawData): void{


}



