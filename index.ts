import app from "./api/server";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
