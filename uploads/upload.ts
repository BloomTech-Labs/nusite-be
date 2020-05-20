const upload = require("express").Router();
import { User } from "../models/Model";
// import { Project } from "../models/Model";

// MULTER
import multer from "multer";

const storage = multer.diskStorage({
  destination: function(
    req: any,
    file: any,
    cb: (arg0: null, arg1: string) => void
  ) {
    cb(null, "uploads/");
  },
  filename: function(
    req: any,
    file: { originalname: any },
    cb: (arg0: null, arg1: any) => void
  ) {
    console.log(file);
    cb(null, file.originalname);
  },
});
//POST ROUTE
upload.put("/upload/:id", (req: any, res: any, next: any) => {
  const upload = multer({ storage }).single("picture");
  upload(req, res, function(err: any) {
    const { id, user_avatar } = req.params;
    if (err) {
      return res.send(err);
    }

    console.log("file uploaded to server");
    console.log(req.file);

    // SEND FILE TO CLOUDINARY
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { path, secure_url } = req.file;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `partnerd/${uniqueFilename}`, tags: `partnerd` }, // directory and tags are optional
      function(err: any, image: any) {
        if (err) {
          return res.send(err);
        } else {
          User.findById(id).then(user => {
            if (user) {
              User.update(id, { user_avatar: image.secure_url }).then(
                update => {
                  console.log(update);
                  return update;
                }
              );
            }
          });
          console.log(image.secure_url, "SU");
          console.log("file uploaded to Cloudinary");
        }

        var fs = require("fs");
        fs.unlinkSync(path);

        res.json(image);
      }
    );
  });
});

module.exports = upload;
