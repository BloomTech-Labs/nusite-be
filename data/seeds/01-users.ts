import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("users").insert([
    {
      id: 1,
      username: "Grey05",
      first_name: "Meredith",
      last_name: "Grey",
      company: "Seattle Grace",
      password: "testing1",
      email: "meredith@grey.com",
    },
    {
      id: 2,
      username: "dev4lyfe",
      first_name: "Johnny",
      last_name: "Who",
      company: "Etsy",
      password: "password1",
      email: "johnnyW@gmail.com",
      dev_experience: 5,
      dev_education: 8,
    },
    {
      id: 3,
      username: "AdlerDesigns",
      first_name: "Grace",
      last_name: "Adler",
      company: "AdlerDesigner",
      password: "password2",
      email: "GraceA@gmail.com",
    },
    {
      id: 4,
      username: "coding4you",
      first_name: "Richard",
      last_name: "Lee",
      company: "Chase",
      password: "password3",
      email: "RichardLee@gmail.com",
      dev_experience: 4,
      dev_education: 7,
    },
    {
      id: 5,
      username: "Potter2001",
      first_name: "Harry",
      last_name: "Potter",
      company: "FaceBook",
      password: "password4",
      email: "HarryPotter@gmail.com",
      dev_experience: 9,
      dev_education: 10,
    },
  ]);
}
