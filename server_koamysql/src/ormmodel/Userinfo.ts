import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'userinfo'
})
export default class UserinfoModel extends Model<UserinfoModel> {
  @Column({
    type: DataTypes.INTEGER,
    field: 'userid',
    primaryKey: true,
    autoIncrement: true,
    comment: '用户ID'
  })
  userid!: number

  @Column({ type: DataTypes.STRING(30), field: 'username', allowNull: false, comment: '用户名' })
  public username!: string

  @Column({ type: DataTypes.STRING(20), field: 'password', allowNull: false, comment: '密码' })
  password!: string

  @Column({ type: DataTypes.STRING(20), field: 'address', allowNull: true, comment: '地址' })
  address!: string

  @Column({ type: DataTypes.TINYINT, field: 'valid', comment: '有效性' })
  valid!: number
}
