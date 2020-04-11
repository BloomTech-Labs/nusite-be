import * as Knex from "knex";
const bcrypt = require("bcryptjs");
const hash = async (password: string) => await bcrypt.hash(password, 12);

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("users").insert([
    {
      username: "Grey05",
      first_name: "Meredith",
      last_name: "Grey",
      company: "Seattle Grace",
      password: `${await hash("testing1")}`,
      email: "meredith@grey.com",
    },
    {
      username: "dev4lyfe",
      first_name: "Betty",
      last_name: "Who",
      company: "Etsy",
      password: `${await hash("testing1")}`,
      email: "BettyW@gmail.com",
      dev_experience: 5,
      dev_education: 8,
    },
    {
      username: "AdlerDesigns",
      first_name: "Grace",
      last_name: "Adler",
      company: "AdlerDesigner",
      password: `${await hash("testing1")}`,
      email: "GraceA@gmail.com",
    },
    {
      username: "coding4you",
      first_name: "Leslie",
      last_name: "Knope",
      company: "Chase",
      password: `${await hash("testing1")}`,
      email: "Leslie@gmail.com",
      dev_experience: 4,
      dev_education: 7,
    },
    {
      username: "Potter2001",
      first_name: "Harry",
      last_name: "Potter",
      company: "FaceBook",
      password: `${await hash("testing1")}`,
      email: "HarryPotter@gmail.com",
      dev_experience: 9,
      dev_education: 10,
    },
  ]);
}
