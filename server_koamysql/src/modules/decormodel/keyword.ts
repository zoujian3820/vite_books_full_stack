import { Column, Model, Table } from 'sequelize-typescript'
@Table({
  tableName: 'keyword'
})
export default class Keyword extends Model<Keyword> {
  @Column({
    field: 'keywordid',
    primaryKey: true,
    autoIncrement: true
  })
  keywordid!: number

  @Column
  public keyword!: string
}
