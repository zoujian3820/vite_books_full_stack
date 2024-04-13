// import 'module-alias/register'
import { secondCtgyModel } from './SecCtgyModel'
import { thirdCtgyModel } from './ThirdCtgyModel'
// on to many: 一对多的关系, 一个二级分类，可以有多个三级分类

// 表示二级分类模型secondCtgyModel，有多个三级分类，对应模型thirdCtgyModel
// 且三级分类thirdCtgyModel 表别名设为 thirdctgy和原表名一样 两表之间外键为secctgyid

// as后的别名会直接用在反回数据中当三级分类数组的key值（前提是下面findAll方法中raw配置为false或不配置），
// 所以在后面加个s表示复数 thirdctgys，但这样会产生误解和原表名不同，有表示多个表的意思
// 且要和下面findAll中保持一致
/** 执行下面 findSecThrdCtgysByFstCtgyId 方法时，执行以下查询语句
 SELECT `secondctgy`.`secondctgyid`, `secondctgy`.`secondname`, `secondctgy`.`firstctgyId`,
  `thirdctgys`.`thirdctgyid` AS `thirdctgys.thirdctgyid`, `thirdctgys`.`thirdname` AS `thirdctgys.thirdname`,
   `thirdctgys`.`secctgyid` AS `thirdctgys.secctgyid` 
   FROM `secondctgy` AS `secondctgy` LEFT OUTER JOIN `thirdctgy` AS `thirdctgys`
    ON `secondctgy`.`secondctgyid` = `thirdctgys`.`secctgyid` WHERE `secondctgy`.`firstctgyId` = 1;
*/
secondCtgyModel.hasMany(thirdCtgyModel, { as: 'thirdctgys', foreignKey: 'secctgyid' })

// many to one: 多个三级分类可对应一个二级分类
// 三级分类thirdCtgyModel 属于(belongsTo) 二级分类secondCtgyModel
// 两表之间的外键为 secctgyid  与目标二级分类的主键为secondctgyid 相关联
thirdCtgyModel.belongsTo(secondCtgyModel, { foreignKey: 'secctgyid', targetKey: 'secondctgyid' })

// 开始查询
export async function findSecThrdCtgysByFstCtgyId(firstctgyId: number) {
  const result = await secondCtgyModel.findAll({
    // raw:true 表示让底层开启原生查询
    // raw: true,
    where: { firstctgyId },
    include: [{ model: thirdCtgyModel, as: 'thirdctgys' }]
  })
  // console.log(result)
  return result
}
