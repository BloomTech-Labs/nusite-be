import db from "../data/dbconfig";

class Model {
  tablename: string;
  constructor(tablename: string) {
    this.tablename = tablename;
  }

  find() {
    return db(this.tablename);
  }

  findBy(filter: any) {
    return db(this.tablename)
      .where(filter)
      .first();
  }

  findById(id: number) {
    return db(this.tablename)
      .where({ id })
      .first();
  }

  add(item: any) {
    return db(this.tablename)
      .insert(item)
      .returning("*");
  }

  update(id: number, item: any) {
    return db(this.tablename)
      .where({ id })
      .update(item)
      .returning("*");
  }

  remove(id: number) {
    return db(this.tablename)
      .where({ id })
      .del();
  }

  findUserById(id: any) {
    return db(this.tablename)
      .where({ auth_id: id })
      .first();
  }

  createUser(user: any) {
    return db(this.tablename).insert(user);
  }
}

class ProjectModel extends Model {
  tablename: string;
  constructor(tablename: string) {
    super(tablename);
    this.tablename = tablename;
  }

  findOwnerProjects(id: number) {
    return db(this.tablename).where({ project_owner: id });
  }
}

export const User = new Model("users");
export const Project = new ProjectModel("projects");
