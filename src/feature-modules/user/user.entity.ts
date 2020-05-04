import { Entity, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AppBaseEntity } from '../../utils/base.entity';

@Entity()
export class User extends AppBaseEntity {
  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  isConfirmed: boolean;

  validatePassword(password: string) {
    return bcrypt.compare(password, this.passwordHash);
  }

  getPasswordHash(password: string) {
    return bcrypt.hash(password, 10);
  }
}
