// still not test and not using
import fs from 'fs'
const fsPromises = fs.promises()
const fileUrl = new URL('file:///tmp/hello')

export const openFile = (path = '/open/some/file.txt') => {
	fs.open(path, 'r', (err, body) => {
		if (err) {
			throw err
		} else {
			// fs.close(fd, (err) => {
			// 	if (err) throw err
			// })
			return body
		}
	})
}

export const readFile = (path = './foo.txt') => {
	fs.readFile(path, (err, body) => {
		if (err) {
			throw err
		} else {
			return body
		}
	})
}

export const removeFile = (path = '/tmp/hello') => {
	fs.unlink(path, (err, body) => {
		if (err) {
			throw err
		} else {
			console.log('successfully deleted /tmp/hello')
		}
	})
}

export const renameFile = (path = '/tmp/hello', to = '/tmp/world') => {
	fs.rename(path, to, (err, body) => {
		if (err) {
			throw err
		} else {
			console.log('renamed complete')
		}
	})
}

export const statFile = (path = '/tmp/hello') => {
	fs.stat(path, (err, body) => {
		if (err) {
			throw err
		} else {
			console.log(`stats: ${JSON.stringify(stats)}`)
		}
	})
}

export const watchFile = (path = '/tmp/hello') => {
	fs.watch(path, { encoding: 'buffer' }, (err, body) => {
		if (err) {
			throw err
		} else {
			if (body) {
				console.log(body)
				// Prints: <Buffer ...>
			}
		}
	})
}

export const appendFile = (path = '/tmp/hello', data = 'data to append') => {
	fs.appendFile(path, data, (err, body) => {
		if (err) {
			throw err
		} else {
			console.log('The "data to append" was appended to file!')
		}
	})
}

export const copyFile = (path = 'source.txt', destination = 'destination.txt') => {
	fs.copyFile(path, destination, (err, body) => {
		if (err) {
			throw err
		} else {
			console.log('source.txt was copied to destination.txt')
		}
	})
}

export const makeDir = (path = 'source.txt') => {
	fs.mkdir(path, (err, body) => {
		if (err) {
			throw err
		} else {
			console.log('source.txt was copied to destination.txt')
		}
	})
}

const data = new Uint8Array(Buffer.from('Hello Node.js'))
export const writeFile = (path = 'source.txt', data = 'Hello Node.js') => {
	fs.writeFile(path, data, (err, body) => {
		if (err) {
			throw err
		} else {
			console.log('The file has been saved!')
		}
	})
}
