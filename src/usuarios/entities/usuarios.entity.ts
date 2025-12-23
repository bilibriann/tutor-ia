import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../../enum/rol.enum';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ name: 'password_hash' })
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USUARIO,
  })
  rol!: Roles;

  @Column({ default: true })
  active!: boolean;
}
