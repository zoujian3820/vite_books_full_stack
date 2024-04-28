import { Column, Model, Table } from 'sequelize-typescript'
@Table({
  tableName: 'shopcart'
})
export default class Shopcart extends Model<Shopcart> {
  @Column({
    field: 'shopcartid',
    primaryKey: true,
    autoIncrement: true
  })
  shopcartid!: number

  @Column
  public bookisbn!: string

  @Column
  public bookname!: string
  @Column
  public bookpicname!: string
  @Column
  public bookprice!: number
  @Column
  public userid!: number
  @Column
  public purcharsenum!: number
}

// `shopcartid` int NOT NULL AUTO_INCREMENT,
// `bookisbn` varchar(20)  NOT NULL,
// `bookname` varchar(50)  NOT NULL,
// `bookpicname` varchar(60)  NOT NULL,
// `bookprice` int NOT NULL,
// `userid` int NOT NULL,
// `purcharsenum` int NULL DEFAULT 0,
// PRIMARY KEY (`shopcartid`)
