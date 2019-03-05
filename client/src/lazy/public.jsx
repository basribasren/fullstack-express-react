import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";

// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";

const UserProfile = lazy(() =>
	import(/*webpackChunkName: "UserProfile", webpackMode: "lazy"*/ "views/UserProfile/UserProfile.jsx")
);
const TableList = lazy(() =>
	import(/*webpackChunkName: "TableList", webpackMode: "lazy"*/ "views/TableList/TableList.jsx")
);
const Typography = lazy(() =>
	import(/*webpackChunkName: "Typography", webpackMode: "lazy"*/ "views/Typography/Typography.jsx")
);
const Icons = lazy(() =>
	import(/*webpackChunkName: "Icons", webpackMode: "lazy"*/ "views/Icons/Icons.jsx")
);
const Maps = lazy(() =>
	import(/*webpackChunkName: "Maps", webpackMode: "lazy"*/ "views/Maps/Maps.jsx")
);
const NotificationsPage = lazy(() =>
	import(/*webpackChunkName: "NotificationsPage", webpackMode: "lazy"*/ "views/Notifications/Notifications.jsx")
);
const UpgradeToPro = lazy(() =>
	import(/*webpackChunkName: "UpgradeToPro", webpackMode: "lazy"*/ "views/UpgradeToPro/UpgradeToPro.jsx")
);

const override = css`
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
	-webkit-justify-content: center;
	justify-content: center;
	margin: 0 auto;
	border-color: #ffffff;
`;
const lazyOnPublic = (
	<Switch>
		<Route path="/dashboard" component={DashboardPage} />
		<Route
			path="/user"
			render={() => (
				<Suspense
					fallback={
						<div className="sweet-loading">
							<PropagateLoader
								className={override}
								sizeUnit={"px"}
								size={50}
								color={"#BD10E0"}
								loading={true}
							/>
						</div>
					}
				>
					<UserProfile />
				</Suspense>
			)}
		/>
		<Route
			path="/table"
			render={() => (
				<Suspense
					fallback={
						<div className="sweet-loading">
							<PropagateLoader
								className={override}
								sizeUnit={"px"}
								size={50}
								color={"#BD10E0"}
								loading={true}
							/>
						</div>
					}
				>
					<TableList />
				</Suspense>
			)}
		/>
		<Route
			path="/typography"
			render={() => (
				<Suspense
					fallback={
						<div className="sweet-loading">
							<PropagateLoader
								className={override}
								sizeUnit={"px"}
								size={50}
								color={"#BD10E0"}
								loading={true}
							/>
						</div>
					}
				>
					<Typography />
				</Suspense>
			)}
		/>
		<Route
			path="/icons"
			render={() => (
				<Suspense
					fallback={
						<div className="sweet-loading">
							<PropagateLoader
								className={override}
								sizeUnit={"px"}
								size={50}
								color={"#BD10E0"}
								loading={true}
							/>
						</div>
					}
				>
					<Icons />
				</Suspense>
			)}
		/>
		<Route
			path="/maps"
			render={() => (
				<Suspense
					fallback={
						<div className="sweet-loading">
							<PropagateLoader
								className={override}
								sizeUnit={"px"}
								size={50}
								color={"#BD10E0"}
								loading={true}
							/>
						</div>
					}
				>
					<Maps />
				</Suspense>
			)}
		/>
		<Route
			path="/notifications"
			render={() => (
				<Suspense
					fallback={
						<div className="sweet-loading">
							<PropagateLoader
								className={override}
								sizeUnit={"px"}
								size={50}
								color={"#BD10E0"}
								loading={true}
							/>
						</div>
					}
				>
					<NotificationsPage />
				</Suspense>
			)}
		/>
		<Route
			path="/upgrade-to-pro"
			render={() => (
				<Suspense
					fallback={
						<div className="sweet-loading">
							<PropagateLoader
								className={override}
								sizeUnit={"px"}
								size={50}
								color={"#BD10E0"}
								loading={true}
							/>
						</div>
					}
				>
					<UpgradeToPro />
				</Suspense>
			)}
		/>
		<Redirect from="/" to="/dashboard" />
	</Switch>
);

export default lazyOnPublic;
