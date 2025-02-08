import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
	email: String,
	password: String
  });

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
 
  res.status(200);

}


async function init() {
	await mongoose.connect('mongodb://127.0.0.1:27017/socialchain');
}