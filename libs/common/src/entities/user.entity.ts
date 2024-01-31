import { AbstractEntity, Address } from '@app/common';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
@Entity()
export class User extends AbstractEntity<User> {
  @Index()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  homeAddress?: Address;
}
