export const uploadAsset = async (req, res) => {
  try {
    console.log(req.files);
    res.json({
      message: "subido!",
    });
  } catch (error) {
    res, status(500).json({ message: error });
  }
};
