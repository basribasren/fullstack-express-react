import Login from '@material-ui/icons/Lock'
import Home from '@material-ui/icons/Home'
import Profile from '@material-ui/icons/AccountCircle'
import Panduan from '@material-ui/icons/Pageview'
import Setting from '@material-ui/icons/Settings'

const publicRoutes = [{
		path: '/login',
		sidebarName: 'Login',
		navbarName: 'Login',
		show: true,
		icon: Login,
		children: []
	},
	{
		path: '/profile',
		sidebarName: 'Profile',
		navbarName: 'Profile',
		show: true,
		icon: Profile,
		children: []
	},
	{ redirect: true, path: '/', to: '/login', navbarName: 'Redirect' }
]

export default publicRoutes
