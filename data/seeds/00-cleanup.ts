import * as Knex from "knex";
const cleaner = require("knex-cleaner");

export async function seed(knex: Knex): Promise<any> {
  return cleaner.clean(knex, {
    mode: "truncate",
    ignoreTables: ["knex_migrations", "knex_migrations_lock"],
  });
}
