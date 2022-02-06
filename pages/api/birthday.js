import Birthday from "../../models/birthday.model";
import errorHandler from "../../utils/errorHandler";
import { connectDb } from "../../utils/db";

connectDb();

export default async (req, res) => {
	if (req.method === "POST") {
		try {
			await Birthday.create(req.body);
			res.status(201).json({ message: "Birthday added successfully" });
		} catch (error) {
			errorHandler(error, req, res);
		}
	} else {
		return res.status(405).json({ error: "Method not allowed" });
	}
};