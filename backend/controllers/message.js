const Message = require('../models/message')
const User = require('../models/user')
const AWS = require("aws-sdk");
const fs = require("fs");

exports.addMsg = async(req,res,next)=>{
        
    try {
      let obj = {
        message: req.body.message,
        name: req.user.name,
        userId: req.user.id,
        groupId: req.body.groupId,
        type:'text'
      };
      await Message.create(obj);
      res.status(200).json({ msg: "message sent", data: req.user.name });
    } catch (error) {
      console.log(error);
      res.status(404).json({ msg: "message not sent", err: error });
    }

}


exports.getPrevChat = async(req,res,next)=>{
  try {
		const { groupId } = req.params;
		let chats = await Message.findAll({ where: { groupId: groupId } });
		res.status(201).json(chats);
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: "unable to load chats at this moment. Please try refreshing page", err: error });
	}

    
}


exports.uploadFile=  async(req, res, next)=>{
	try {
		const { groupId } = req.params;
    const userId = req.user.id
    const userName = req.user.name
		const filename = "File" + userId + "/" + new Date() + req.file.originalname;
    // console.log(req.file)//coming from multer for processing incoming requrest from FE which act as middleware.
		const fileURL = await uploadToS3(req.file, filename);
		await Message.create({
			groupId: groupId,
			userId: userId,
			message: fileURL,
			name: userName,
			type:'file'
		});

		res.status(200).send({ data: fileURL, username: userName });
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: "error uploading file", err: error });
	}
}

const uploadToS3 = async(data, filename)=>{
	try {
		const fileStream = await fs.createReadStream(data.path);//reading data from Uploads/filename in chunk format

		const BUCKET_NAME = "chataap1215";
		const IAM_USER_KEY = process.env.IAM_USER_KEY;
		const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
		let s3bucket = new AWS.S3({
			accessKeyId: IAM_USER_KEY,
			secretAccessKey: IAM_USER_SECRET,
		});
		var params = {
			Bucket: BUCKET_NAME,
			Key: filename,
			Body: fileStream,
			ACL: "public-read",
		};
		const response = await s3bucket.upload(params).promise();
		await fs.unlinkSync(data.path);// delete file from uploads Folder

		return response.Location;
	} catch (err) {
		console.log(err);
		return err;
	}
}
