import multer from 'multer'
import path from 'path'
import Boom from '@hapi/boom'

// Set The Storage Engine
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './public/uploads/docs')
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

// Init Upload
const uploadDocument = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter: function(req, file, cb) {
		if (file == undefined) {
			return cb('file not selected', false)
		}
		isTypeDocument(file, cb)
	}
})

// Check File Type
function isTypeDocument(file, cb) {
	// Allowed ext
	const filetypes = /pdf|doc|docx/
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	// Check mime
	const mimetype = filetypes.test(file.mimetype)

	if (mimetype && extname) {
		return cb(null, true)
	} else {
		return cb('Error: Documents Only!', false)
	}
}
