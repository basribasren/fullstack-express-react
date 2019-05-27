import Profile from '@material-ui/icons/AccountCircle'

const adminRoutes = [{
		path: '/profile',
		sidebarName: 'Profile',
		navbarName: 'Profile',
		show: true,
		icon: Profile,
		children: []
	},

	{
		path: '/sign-out',
		sidebarName: 'sign-out',
		navbarName: 'Sign-out',
		show: true,
		icon: Profile,
		children: []
	},
	{ redirect: true, path: '/', to: '/profile', navbarName: 'Redirect' }
]

export default adminRoutes
