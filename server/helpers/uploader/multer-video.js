import multer from 'multer'
import path from 'path'
import Boom from '@hapi/boom'

// Set The Storage Engine
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './public/uploads/video')
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

// Init Upload
const uploadVideo = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter: function(req, file, cb) {
		if (file == undefined) {
			return cb('file not selected', false)
		}
		isTypeVideo(file, cb)
	}
})

// Check File Type
function isTypeVideo(file, cb) {
	// Allowed ext
	const filetypes = /mp4|mkv/
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
