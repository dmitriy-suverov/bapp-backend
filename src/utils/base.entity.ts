import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  BeforeRemove,
} from 'typeorm';

export class AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  updatedAt: number;

  @Column({ type: 'bigint', nullable: true })
  deletedAt: number;

  @BeforeInsert()
  beforeCreate() {
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = Date.now();
  }

  @BeforeRemove()
  beforeRemove() {
    this.deletedAt = Date.now();
  }
}
