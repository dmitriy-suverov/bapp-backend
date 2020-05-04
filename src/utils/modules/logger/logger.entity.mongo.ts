import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { classToPlain, serialize } from 'class-transformer';

@Entity()
export class Logger {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  url: string;

  @Column()
  headers: object;

  @Column()
  request: object | string;

  @Column()
  response: any;

  @Column()
  statusCode: number;

  toJSON() {
    return classToPlain(this);
  }

  toString() {
    return serialize(this);
  }
}
