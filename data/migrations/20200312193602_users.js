async;
function up(knex) {
    await;
    knex.schema.createTable("users", function (table) {
        table.increments("id");
        table
            .string("username", 25)
            .notNullable()
            .unique();
        table
            .string("fist_name", 50)
            .notNullable()
            .unique();
        table
            .string("last_name", 50)
            .notNullable()
            .unique();
        table
            .string("company", 50)
            .notNullable()
            .unique();
        table
            .string("password", 255)
            .notNullable()
            .unique();
        table
            .string("email", 255)
            .notNullable()
            .unique();
        table
            .integer("dev_experience");
        table
            .integer("dev_education");
    });
}
async;
function down(knex) {
    await;
    knex.schema.dropTableIfExists("users");
}
