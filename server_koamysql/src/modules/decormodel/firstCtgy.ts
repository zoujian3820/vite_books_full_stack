import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'firstctgy'
})
export default class FirstctgyModel extends Model<FirstctgyModel> {
  @Column({
    type: DataTypes.INTEGER,
    field: 'firstctgyId',
    primaryKey: true,
    autoIncrement: true,
    comment: '一级分类表的id字段'
  })
  firstctgyId!: number

  @Column({
    type: DataTypes.STRING(20),
    field: 'firstctgyname',
    allowNull: false,
    comment: '一级分类名'
  })
  firstctgyname!: string
}
