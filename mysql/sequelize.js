const Sequelize = require('sequelize');
const Model = Sequelize.Model;
/**
 * @param 
 */
const sequelize = new Sequelize('nodeSql', 'wuwx', 'wuwx1224.', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        createdModel();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
function createdModel() {
    class teachInfor extends Model { }
    teachInfor.init({
        id: {
            type: Sequelize.STRING(50),
            primaryKey: true
        },
        teachName: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        major: {
            type: Sequelize.STRING(200),
            allowNull: true,
            comment: '专业'
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        sex: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'teachInfor',
        timestamps: false
    })
    var now = Date.now();
    teachInfor.sync({ force: true }).then(() => {
        return teachInfor.create({
            id: 'g' + now,
            teachName: '顶哥',
            major: '物理',
            age: 36,
            sex: 1
        })
    })
}



//module.exports = sequelize