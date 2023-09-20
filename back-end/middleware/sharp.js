const sharp = require("sharp")
const fs = require("fs")

module.exports = async (req, res, next) => {
  if (!req.file) {
    return next()
  }
  try {
    const originalFilePath = req.file.path

    const modifiedImageBuffer = await sharp(originalFilePath)
      .resize({ height: 800 })
      .toBuffer()

    // Supprimez l'image d'origine
    fs.unlinkSync(originalFilePath)

    // Enregistrez la nouvelle image modifiée
    fs.writeFileSync(originalFilePath, modifiedImageBuffer)

    next()
  } catch (error) {
    res.status(500).json({ error })
  }
}
