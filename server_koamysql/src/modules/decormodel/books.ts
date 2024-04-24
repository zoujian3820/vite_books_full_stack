import { Column, Model, Table } from 'sequelize-typescript'
// import { DataTypes } from 'sequelize'
@Table({
  tableName: 'books'
})
export default class BooksModel extends Model<BooksModel> {
  @Column({
    field: 'ISBN',
    primaryKey: true,
    autoIncrement: true
  })
  ISBN!: string

  @Column
  public bookname!: string

  @Column
  public author!: string
  @Column
  public publishid!: number
  @Column
  public publishername!: string
  @Column
  public monthsalecount!: number
  @Column
  public bookpicname!: string
  @Column
  public secondctgyid!: number // 外键
  @Column
  public thirdctgyid!: number // 外键
  @Column
  public originalprice!: number
  @Column
  public discount!: number
}
