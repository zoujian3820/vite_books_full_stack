import { Column, Model, Table } from 'sequelize-typescript'
import Reply from './reply'

@Table({
  tableName: 'evaluate'
})
export default class Evaluate extends Model<Evaluate> {
  @Column({
    field: 'evaluateid',
    primaryKey: true,
    autoIncrement: true
  })
  public evaluateid!: number

  @Column
  content!: string
  @Column
  evaluator!: string
  @Column
  isbn!: string
  @Column
  headportrai!: string
  @Column
  givealikenum!: number
  @Column
  evaluatedegree!: number
  @Column
  pubdate!: Date
  @Column
  isanonymous!: number

  replyid!: number
  replycontent!: string
  replydate!: Date
  replyor!: string
  evalid!: number
  replyLst: Pick<Reply, 'replyid' | 'replycontent' | 'replydate' | 'replyor' | 'evalid'>[] = []
}

// # drop table if exists evaluate;
// create table books.evaluate (
// 	evaluateid int not null,
// 	content varchar(200) not null,
// 	evaluator varchar(20) not null comment '评价人',
// 	isbn varchar(20) not null,
// 	headportrai varchar(30) not null comment '头像',
// 	givealikenum int not null comment '点赞数',
// 	evaluatedegree tinyint(1) not null comment '好评，差评，中评',
// 	pubdate datetime(6) null comment '发表日期',
// 	isanonymous tinyint(1) not null comment '是否为匿名用户',

// 	primary key (evaluateid) using btree,
// 	index fk_evalid(evaluateid) using btree,
// 	constraint fk_isbn foreign key (isbn) references books.books(ISBN) on delete cascade
// );
