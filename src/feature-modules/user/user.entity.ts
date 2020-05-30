import { Entity, Column } from 'typeorm';

import { AppBaseEntity } from '../../utils/base.entity';
import { Exclude } from 'class-transformer';

export const UserEntityConstraints = {
  password: {
    min: 4,
    max: 10,
  },
  login: {
    min: 4,
    max: 15,
  },
};

@Entity({ name: 'users' })
export class User extends AppBaseEntity {
  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  passwordHash: string;

  @Column({ default: false })
  isConfirmed: boolean;
}
