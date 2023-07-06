import { Report } from "../../models/Report.js";

export const showReports = async (req, res) => {
  try {
    const reports = await Report.findAll();

    if (reports != null) {
      console.log(reports);
      res.send({
        reportData: reports,
      });
    } else {
      res.send({
        reportData: "no reports found",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
