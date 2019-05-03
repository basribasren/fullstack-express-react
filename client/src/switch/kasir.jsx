import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// core components/views
import PageMenu from 'views/PageMenu/PageMenu'
const PageAddMenu = lazy(() =>
	import(/*webpackChunkName: 'PageAddMenu', webpackMode: 'lazy'*/ 'views/PageMenu/AddMenu')
)
const PageEditMenu = lazy(() =>
	import(/*webpackChunkName: 'PageEditMenu', webpackMode: 'lazy'*/ 'views/PageMenu/EditMenu')
)

const PagePesanan = lazy(() =>
	import(/*webpackChunkName: 'PagePesanan', webpackMode: 'lazy'*/ 'views/PagePesanan/PagePesanan')
)
const PageAddPesanan = lazy(() =>
	import(/*webpackChunkName: 'PageAddPesanan', webpackMode: 'lazy'*/ 'views/PagePesanan/AddPesanan')
)
const PageEditPesanan = lazy(() =>
	import(/*webpackChunkName: 'PageEditPesanan', webpackMode: 'lazy'*/ 'views/PagePesanan/EditPesanan')
)


const PageLogPesanan = lazy(() =>
	import(/*webpackChunkName: 'PageLogPesanan', webpackMode: 'lazy'*/ 'views/PageLogPesanan/PageLogPesanan')
)
const PageLogAktivitas = lazy(() =>
	import(/*webpackChunkName: 'PageLogAktivitas', webpackMode: 'lazy'*/ 'views/PageLogAktivitas/PageLogAktivitas')
)

const kasirSwitch = (
	<Switch>
		<Route
			path='/menu/edit/:id'
			render={() => (
				<Suspense fallback={<div>Loading...</div>}>
					<PageEditMenu />
				</Suspense>
			)}
		/>
		<Route
			path='/menu/add'
			render={() => (
				<Suspense fallback={<div>Loading...</div>}>
					<PageAddMenu />
				</Suspense>
			)}
		/>
		<Route
			path='/menu'
			render={() => (
				<Suspense fallback={<div>Loading...</div>}>
					<PageMenu />
				</Suspense>
			)}
		/>	
		<Route
			path='/pesanan/edit/:id'
			render={() => (
				<Suspense fallback={<div>Loading...</div>}>
					<PageEditPesanan />
				</Suspense>
			)}
		/>
		<Route
			path='/pesanan/add'
			render={() => (
				<Suspense fallback={<div>Loading...</div>}>
					<PageAddPesanan />
				</Suspense>
			)}
		/>
		<Route
			path='/pesanan'
			render={() => (
				<Suspense fallback={<div>Loading...</div>}>
					<PagePesanan />
				</Suspense>
			)}
		/>	
		<Route
			path='/log/order/me'
			render={() => (
				<Suspense fallback={<div>Loading...</div>}>
					<PageLogPesanan />
				</Suspense>
			)}
		/>
		<Route
			path='/log/activitas/me'
			render={() => (
				<Suspense fallback={<div>Loading...</div>}>
					<PageLogAktivitas />
				</Suspense>
			)}
		/>
		<Route
			path='/logout'
			render={() => (
				<Suspense fallback={<div>Loading...</div>}>
					<div></div>
				</Suspense>
			)}
		/>
		
		<Redirect from='/' to='/menu' />
	</Switch>
)

export default kasirSwitch
