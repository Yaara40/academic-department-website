export class Course {
  id: string;
  name: string;
  credits: number;
  semester: string;
  courseId?: string;
  description?: string;
  year?: string;
  syllabus?: string;
  isMandatory?: string;
  isActive?: string;

  constructor(
    id: string,
    name: string,
    credits: number,
    semester: string,
    courseId?: string,
    description?: string,
    year?: string,
    syllabus?: string,
    isMandatory?: string,
    isActive?: string
  ) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.semester = semester;
    this.courseId = courseId;
    this.description = description;
    this.year = year;
    this.syllabus = syllabus;
    this.isMandatory = isMandatory;
    this.isActive = isActive;
  }
}