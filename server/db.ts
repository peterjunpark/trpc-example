import { Sequelize, Model, DataTypes } from 'sequelize';

export const sequelize = new Sequelize('trpc_db', 'root', 'toor', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

// Model definition vv
class User extends Model {}

User.init(
  {
    first: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
  }
);
// Model definition ^^

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Connection successfully established.');
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

// Seed vv
async function seed() {
  await sequelize.sync({ force: true });
  await User.bulkCreate([
    { first: 'John', last: 'Smith', age: 10 },
    { first: 'Peter', last: 'Peterson', age: 11 },
    { first: 'Jane', last: 'Doe', age: 12 },
  ]);
}

async function test() {
  await start();
  await seed();
}

test();
