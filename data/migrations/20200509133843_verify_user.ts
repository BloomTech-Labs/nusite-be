import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.table("users", tbl => {
    tbl.boolean("verified").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.table("users", tbl => {
    tbl.dropColumn("verified");
  });
}
