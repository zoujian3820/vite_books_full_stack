import { Column, Model, Table } from 'sequelize-typescript'
@Table({
  tableName: 'historykeyword'
})
export default class Historykeyword extends Model<Historykeyword> {
  @Column({
    field: 'historykeywordid',
    primaryKey: true,
    autoIncrement: true
  })
  historykeywordid!: number

  @Column
  public historykeyword!: string

  @Column
  public clickcount!: number
}
