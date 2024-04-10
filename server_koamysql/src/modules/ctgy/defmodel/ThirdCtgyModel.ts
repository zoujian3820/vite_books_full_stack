import { DataTypes } from 'sequelize'
import { sequelize } from '@/modules/BaseDao'
class ThirdCtgyModel {
  static createModel() {
    const model = sequelize.define(
      'thirdctgy',
      {
        thirdctgyid: {
          type: DataTypes.INTEGER, // 表示属性的数据类型
          // field属性对应的列名
          field: 'thirdctgyid',
          primaryKey: true, // 表示主键
          autoIncrement: true // 表示主键自增
        },
        thirdname: {
          type: DataTypes.STRING(20),
          field: 'thirdname',
          // 表示当前列是否允许为空，false表示该列不能为空
          allowNull: false
          // unique: true // 表示该列的值必须唯一
        },
        // 外键 secctgyid
        secctgyid: {
          type: DataTypes.INTEGER,
          field: 'secctgyid',
          allowNull: false
        }
      },
      {
        // true表示使用给定的表名，false表示模型名后加s作为表名
        freezeTableName: true,
        // true表示给模型加上时间戳属生(createAt, updateAt), false表示不带时间戳属性
        timestamps: false
      }
    )
    // force为false表示若存在则不创建
    // model.sync({ force: false })
    return model
  }
}

export const thirdCtgyModel = ThirdCtgyModel.createModel()
