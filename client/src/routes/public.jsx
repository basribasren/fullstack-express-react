import Login from '@material-ui/icons/Lock'

const publicRoutes = [{
		path: '/login',
		sidebarName: 'Login',
		navbarName: 'Login',
		show: true,
		icon: Login,
		children: []
	},
	{ redirect: true, path: '/', to: '/login', navbarName: 'Redirect' }
]

export default publicRoutes
