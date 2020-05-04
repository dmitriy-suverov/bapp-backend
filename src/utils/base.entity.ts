import { PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

export class AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  updatedAt: number;

  @Column({ type: 'bigint' })
  deletedAt: number;

  @BeforeInsert()
  beforeCreate() {
    this.createdAt = Date.now();
  }
}
