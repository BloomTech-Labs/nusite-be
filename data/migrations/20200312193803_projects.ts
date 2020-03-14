import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable("projects", table => {
    table.increments("id");
    table
      .string("project_name", 255)
      .notNullable()
      .unique();
    table.string("project_avatar", 255);
    table
      .integer("project_owner")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .integer("project_developer")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .unsigned();
    table.boolean("completed").defaultTo(false);
    table.boolean("marketplace").defaultTo(false);
    table.boolean("showcase").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists("projects");
}
