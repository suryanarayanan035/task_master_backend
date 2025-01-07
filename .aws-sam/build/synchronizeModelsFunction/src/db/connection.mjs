import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://task_master:task_master@task-master-users-taskmasterdatabase-mvofiz9qku5b.c1wq626yq6su.ap-south-1.rds.amazonaws.com:5432/task_master",
);

export const User = sequelize.define("User", {
  id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

export const Project = sequelize.define("Project", {
  id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING, allowNull: false },
  owner: { type: DataTypes.INTEGER, allowNull: false },
});

Project.belongsTo(User, { foreignKey: "owner" });
User.hasMany(Project, { foreignKey: "owner" });

export const ProjectUser = sequelize.define("ProjectUser", {});
Project.belongsToMany(User, {
  through: ProjectUser,
  indexes: [{ unique: true, fields: ["projectId", "userId"] }],
});
User.belongsToMany(Project, { through: ProjectUser });

export const Task = sequelize.define("Task", {
  id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  assignee: { type: DataTypes.INTEGER, allowNull: true },
  projectId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  priority: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

Task.belongsTo(Project, { foreignKey: "projectId" });
Project.hasMany(Task, { foreignKey: "projectId" });
Task.belongsTo(User, { foreignKey: { name: "assignee", allowNull: true } });
User.hasMany(Task, { foreignKey: { name: "assignee", allowNull: true } });
