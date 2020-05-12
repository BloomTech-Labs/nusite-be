import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.table("users", tbl => {
    tbl.dropColumn("dev_experience");
    tbl.dropColumn("dev_education");
  });

  await knex.schema.table("users", tbl => {
    tbl.string("dev_experience", 50);
    tbl.string("dev_education", 50);
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.table("users", tbl => {
    tbl.dropColumn("dev_experience");
    tbl.dropColumn("dev_education");
  });
}
