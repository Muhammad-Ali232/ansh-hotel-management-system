import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from "uuid";
 
const app = express();

cloudinary.config({ 
  cloud_name: 'dwvwxqhw2', 
  api_key: '362198547431528', 
  api_secret: '9GhcY_aIfQMpwnTrUK9fsioFic4'
});
 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'some-folder-name',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => uuidv4(),
  },
});
 
export const parser = multer({ storage: storage });
 
app.post('/upload', parser.single('image'), function (req, res) {
  res.json(req.file);
});