import { Column, Entity, ObjectIdColumn, ObjectID, BeforeInsert } from 'typeorm';
import { classToPlain, serialize } from 'class-transformer';

@Entity()
export class Log {
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

  @Column()
  createdAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
  }

  toJSON() {
    return classToPlain(this);
  }

  toString() {
    return serialize(this);
  }
}
