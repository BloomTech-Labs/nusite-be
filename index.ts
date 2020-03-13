import app from "./api/server";

app.listen({ port: 4000 }, () =>
  console.log(`Server listening at http://localhost:4000`)
);
