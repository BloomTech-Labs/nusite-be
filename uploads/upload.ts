const upload = require("express").Router();
const express = require("express");
const dotenv = require("dotenv");
// import Project from '../models/Model'

dotenv.config();

// MULTER
const multer = require("multer");

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
upload.post(
  "/upload",
  (
    req: { file: { path: any } },
    res: { send: (arg0: any) => any; json: (arg0: any) => void },
    next: any
  ) => {
    const upload = multer({ storage }).single("picture");
    upload(req, res, function(err: any) {
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

      const path = req.file.path;
      const uniqueFilename = new Date().toISOString();

      cloudinary.uploader.upload(
        path,
        { public_id: `partnerd/${uniqueFilename}`, tags: `partnerd` }, // directory and tags are optional
        function(err: any, image: any) {
          if (err) {
            return res.send(err);
          } else {
            console.log("file uploaded to Cloudinary");
          }

          var fs = require("fs");
          fs.unlinkSync(path);

          res.json(image);
        }
      );
    });
  }
);

module.exports = upload;
