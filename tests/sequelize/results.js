const { linter } = require("../../core/modules/common/linter");

const templateTs = `import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript'

@Table({
  timestamps: true
})
export class Cat extends Model<Cat> {

  @CreatedAt
  creationDate: Date
 
  @UpdatedAt
  updatedOn: Date

}`;

const oneToMany = `
  @Table
class Player extends Model<Player> {
 
  @Column
  name: string;
 
  @Column
  num: number;
 
  @ForeignKey(() => Team)
  @Column
  teamId: number;
 
  @BelongsTo(() => Team)
  team: Team;
}
 
@Table
class Team extends Model<Team> {
 
  @Column
  name: string;
 
  @HasMany(() => Player)
  players: Player[];
}
`;

const manyToMany = `
  @Table
class Book extends Model<Book> {
  @BelongsToMany(() => Author, () => BookAuthor)
  authors: Author[];
}
 
@Table
class Author extends Model<Author> {
 
  @BelongsToMany(() => Book, () => BookAuthor)
  books: Book[];
}
 
@Table
class BookAuthor extends Model<BookAuthor> {
 
  @ForeignKey(() => Book)
  @Column
  bookId: number;
 
  @ForeignKey(() => Author)
  @Column
  authorId: number;
}
`;

module.exports = {
  templateTs: linter(templateTs),
  oneToMany: linter(oneToMany),
  manyToMany: linter(manyToMany),
};
