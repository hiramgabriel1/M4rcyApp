import { Report } from "../../models/Report.js";

const createReport = async (req, res) => {
  try {
    // get data from report form
    const { report_name, report_type } = req.body

    const newReport = await Report.create({
     report_name,
     report_type
    });
    res.json({
      message: "new report created!",
      data: newReport,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export { createReport };