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
        finalGrade += (mark.grade / mark.maxGrade) * mark.weight
    }
    return finalGrade;
}

function getGrade(studentId: number, examId: number, grades: Grade[]): number{
    for(let grade of grades){
        if(grade.examId === examId && grade.studentId === studentId){
            return grade.grade;
        }
    }
    return 0;
}

function createMarkForExam(studentId: number,
                           exam: Exam,
                           rawData: RawData): Mark{
    return {
        grade: getGrade(studentId, exam.examId, rawData.grades),
        maxGrade: exam.maxGrade,
        weight: exam.weight
    };
}

function createMarks(studentId: number, rawData: RawData): Mark[]{
    let ret: Mark[] = [];
    for(let exam of rawData.exams){
        ret.push(createMarkForExam(studentId, exam, rawData))
    }
    return ret;

}
function createStudentReportCard(student: Student,
                                 rawData: RawData): StudentReportCard{
    return {
        studentId: student.studentId,
        studentName: student.name,
        marks: createMarks(student.studentId, rawData)
    }
}
function transformData(rawData: RawData): StudentReportCard[]{
    let ret: StudentReportCard[] = [];
    for(let student of rawData.students){
        ret.push(createStudentReportCard(student, rawData));
    }
    return ret;
}



function main(rawData: RawData): void{
    let reportCards = transformData(rawData);
    for(let reportCard of reportCards){
        console.log(reportCard.studentName + " = " + computeFinalGrade(reportCard) )
    }
}

main(rawData);


