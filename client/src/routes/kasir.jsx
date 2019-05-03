import Menu from '@material-ui/icons/Fastfood'
import Pesanan from '@material-ui/icons/Receipt'
import LogPesanan from '@material-ui/icons/Assignment'
import LogAktivitas from '@material-ui/icons/AssignmentInd'
import Logout from '@material-ui/icons/ExitToApp'

const kasirRoutes = [
	{
		path: '/menu',
		sidebarName: 'Daftar Menu',
		navbarName: 'Daftar Menu',
		show: true,
		icon: Menu,
		children: []
	},
	{
		path: '/pesanan',
		sidebarName: 'Daftar Pesanan',
		navbarName: 'Daftar Pesanan',
		show: true,
		icon: Pesanan,
		children: []
	},
	{
		path: '/log/order/me',
		sidebarName: 'Log Pesanan',
		navbarName: 'Log Pesanan',
		show: true,
		icon: LogPesanan,
		children: []
	},
	{
		path: '/log/activitas/me',
		sidebarName: 'Log Aktivitas',
		navbarName: 'Log Aktivitas',
		show: true,
		icon: LogAktivitas,
		children: []
	},
	{
		path: '/logout',
		sidebarName: 'Logout',
		navbarName: 'Logout',
		show: true,
		icon: Logout,
		children: []
	},
	{ redirect: true, path: '/', to: '/menu/daftar', navbarName: 'Redirect' }
]

export default kasirRoutes
