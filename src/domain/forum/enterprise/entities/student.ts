import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

interface IStudentProps {
  name: string
}

export class Student extends Entity<IStudentProps> {
  static create(props: IStudentProps, id?: UniqueEntityId) {
    const student = new Student(props, id)
    return student
  }
}
