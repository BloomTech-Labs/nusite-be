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
      password: `${await hash("testing11")}`,
      email: "meredith@grey.com",
      user_avatar: null,
    },
    {
      username: "dev4lyfe",
      first_name: "Betty",
      last_name: "Who",
      company: "Etsy",
      password: `${await hash("testing11")}`,
      email: "BettyW@gmail.com",
      user_avatar: null,
    },
    {
      username: "AdlerDesigns",
      first_name: "Grace",
      last_name: "Adler",
      company: "AdlerDesigner",
      password: `${await hash("testing11")}`,
      email: "GraceA@gmail.com",
      user_avatar: null,
    },
    {
      username: "coding4you",
      first_name: "Leslie",
      last_name: "Knope",
      company: "Chase",
      password: `${await hash("testing11")}`,
      email: "Leslie@gmail.com",
      user_avatar: null,
    },
    {
      username: "Potter2001",
      first_name: "Harry",
      last_name: "Potter",
      company: "FaceBook",
      password: `${await hash("testing11")}`,
      email: "HarryPotter@gmail.com",
      user_avatar: null,
    },
  ]);
}
