import { Column, Model, Table } from 'sequelize-typescript'
@Table({
  tableName: 'reply'
})
export default class Reply extends Model<Reply> {
  @Column({
    field: 'replyid',
    primaryKey: true,
    autoIncrement: true
  })
  public replyid!: number

  @Column
  replycontent!: string
  @Column
  replydate!: Date
  strReplyDate!: string
  @Column
  evalid!: number
  @Column
  replyor!: string
}

// # drop table if exists reply;
// create table books.reply (
// 	replyid int not null auto_increment,
// 	replycontent varchar(255) null,
// 	replydate date not null,
// 	evalid int not null,
// 	replyor varchar(20) not null,

// 	primary key (replyid) using btree,
// 	index fk_evalid(evalid) using btree,
// 	constraint fk_evalid foreign key (evalid) references evaluate(evaluateid)
// );
