import multer from 'multer'
import path from 'path'
import Boom from '@hapi/boom'

// Set The Storage Engine
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './public/uploads/images')
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

// Init Upload
const uploadImage = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter: function(req, file, cb) {
		if (file == undefined) {
			return cb('file not selected', false)
		}
		isTypeImage(file, cb)
	}
})

// Check File Type
function isTypeImage(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	// Check mime
	const mimetype = filetypes.test(file.mimetype)

	if (mimetype && extname) {
		return cb(null, true)
	} else {
		return cb('Error: Images Only!', false)
	}
}

// export const uploadFileImage = (req, res, next) => {
// 	uploadImage(req, res, (err) => {
// 		if (err) {
// 			throw Boom.boomify(err, { statusCode: 409 })
// 		}
// 		if (req.file == undefined) {
// 			throw Boom.boomify('File not selected', { statusCode: 409 })
// 		}
// 		logger.info(req.file)
// 	})
// }
