import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../dao/BaseDaoDefine'
import Userinf from '../model/Userinfo'

// 继承两个, 继承Userinf公共数据类型接口，可以少写内部这份代码
export interface UserInstance extends Userinf, Model {
  // userid: number
  // username: string
  // password: string
  // address: string
  // valid: number
  // birth: Date
}

class Userinfo {
  static createModel() {
    // TS使用 sequelize.define  https://www.sequelize.cn/other-topics/typescript#%E4%BD%BF%E7%94%A8%E2%80%8B
    // 此处传了泛型UserInstance后，后面调用create、findAll等方法的反回值，会自带UserInstance类型提示
    // 就是后面接口，获取到的数据反回值，能有数据结构提示
    const model = sequelize.define<UserInstance>(
      // 模型的名称, 对应mysql中表名
      'userinfo',
      {
        userid: {
          type: DataTypes.INTEGER, // 表示属性的数据类型
          // field属性对应的列名 不写就用上面的key值userid
          field: 'userid',
          primaryKey: true, // 表示主键
          autoIncrement: true // 表示主键自增
        },
        username: {
          type: DataTypes.STRING(30),
          field: 'username',
          // 表示当前列是否允许为空，false表示该列不能为空
          allowNull: false
          // unique: true // 表示该列的值必须唯一
        },
        password: {
          type: DataTypes.STRING(20),
          field: 'password',
          // 传参时，password不能为空
          allowNull: false
        },
        address: {
          type: DataTypes.STRING(50),
          field: 'address',
          allowNull: true
        },
        valid: {
          type: DataTypes.TINYINT,
          field: 'valid',
          allowNull: true
        },
        birth: {
          // DataTypes.DATE能表示日期、时间、或日期时间(datetime)
          type: DataTypes.DATE,
          field: 'birth',
          allowNull: true
        }
      },
      {
        // true表示使用给定的表名，false表示模型名后加s作为表名
        freezeTableName: true,
        // true表示给模型加上时间戳属生(createAt, updateAt), false表示不带时间戳属性
        timestamps: false
      }
    )

    // 同步数据库，直接按照当前模型配置有的字段创建一个新表
    // force的值为true 表示若存在，则先删除后再创建，
    // force为false表示若存在则不创建
    // model.sync({ force: false })
    return model
  }
}

export const model = Userinfo.createModel()
