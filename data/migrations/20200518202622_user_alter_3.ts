import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.table("users", tbl => {
    tbl.string("user_avatar");
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.table("users", tbl => {
    tbl.dropColumn("user_avatar");
  });
}
