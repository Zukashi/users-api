import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '@app/common/database';

@Entity()
export class Address extends AbstractEntity<Address> {
  @Column()
  country: string;

  @Column()
  municipality: string;

  @Column()
  postalCode: string;

  @Column()
  street: string;

  @Column()
  houseNumber: string;
}
