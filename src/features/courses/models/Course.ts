export class Course {
  id: string;
  name: string;
  credits: number;
  semester: string;

  constructor(id: string, name: string, credits: number, semester: string) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.semester = semester;
  }
}