import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.table("users", tbl => {
    tbl.string("provider", 50);
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.table("users", tbl => {
    tbl.dropColumn("provider");
  });
}
