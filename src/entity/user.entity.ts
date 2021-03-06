import * as bcrypt from 'bcryptjs';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, AfterLoad, BeforeUpdate, OneToMany } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column()
  role: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  private _password: string;

  @Column()
  password: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this._password = this.password;
  }

  @BeforeUpdate()
  private async encryptPassword() {
    if (this._password !== this.password) {
      this.password = await this.hashPassword(this.password);
      this.loadTempPassword()
    }
  }

  @Column()
  salt: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  async hashPassword(newPassword: string) {
    this.salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(newPassword, this.salt);
  }

  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

}