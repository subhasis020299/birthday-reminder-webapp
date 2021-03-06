import Birthday from "../../models/birthday.model";
import errorHandler from "../../utils/errorHandler";
import { connectDb } from "../../utils/db";

connectDb();

export default async function (req, res) {
	if (req.method === "GET") {
		if (req.query.friend) {
			req.query.friend = JSON.parse(req.query.friend);
		}
		const birthdays = await Birthday.find(req.query).sort({ _id: -1 }).lean();
		return res.status(200).json(birthdays);
	} else if (req.method === "POST") {
		try {
			const months = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			req.body.month = months.indexOf(req.body.month) + 1;
			await Birthday.create(req.body);
			return res.status(201).json({ message: "Birthday added successfully" });
		} catch (error) {
			errorHandler(error, req, res);
		}
	} else if (req.method === "DELETE") {
		try {
			await Birthday.findByIdAndDelete(req.query.id);
			return res.status(200).json({ message: "Birthday deleted successfully" });
		} catch (error) {
			errorHandler(error, req, res);
		}
	} else {
		return res.status(405).json({ error: "Method not allowed" });
	}
}
