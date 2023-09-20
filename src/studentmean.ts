type StudentGrade = {name: string, grade: number};

const notes = [70, 80, 75, 60, 65, 45, 90];
const students = ['tao', 'kia', 'kim', 'sue', 'kim', 'kac', 'avi']

function createStudentGrade(grades: number[], names: string[]): StudentGrade[]{
    let ret: StudentGrade[] = [];
    for(let i = 0; i < grades.length; i++){
        ret.push({name: names[i], grade: grades[i]})
    }
    return ret;
}

function averageGrade(studentGrades: StudentGrade[]): number{
    let sum = 0;
    for(const studentGrade of  studentGrades){
        const note = studentGrade.grade;
        sum += note;
    }
    return sum / studentGrades.length;
}

let studentGrades = createStudentGrade(notes, students);
let average = averageGrade(studentGrades);
console.log(average)

