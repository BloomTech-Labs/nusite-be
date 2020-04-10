import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("projects").insert([
    {
      project_name: "Hospital",
      project_avatar: null,
      project_owner: 1,
      completed: true,
      marketplace: false,
      showcase: true,
    },
    {
      project_name: "Etsy",
      project_avatar: null,
      project_owner: 2,
      project_developer: 2,
      completed: true,
      marketplace: true,
      showcase: true,
    },
    {
      project_name: "AdlerDesigner",
      project_avatar: null,
      project_owner: 3,
      project_developer: 4,
      completed: true,
      marketplace: false,
      showcase: true,
    },
    {
      project_name: "Banking4You",
      project_avatar: null,
      project_owner: 4,
      completed: true,
      marketplace: false,
      showcase: true,
    },
  ]);
}
