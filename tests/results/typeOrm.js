// templates de base
const templateTs = `import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity,
  } from "typeorm"

  @Entity()
  export class Test extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createDate: Date

    @UpdateDateColumn()
  updateDate: Date
}
`;

module.exports = {
  templateTs,
};
