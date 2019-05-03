importScripts("/precache-manifest.842d53e6807d12a37d696a99c8d6b40e.js", "/workbox-v4.0.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/workbox-v4.0.0"});
// alter the default cache names
this.workbox.core.setCacheNameDetails({
	prefix: "biolerplate-static-store",
	// beginning of the precache and runtime cache names.
	suffix: "v1",
	// end of the precache and runtime cache names.
	precache: "install-time",
	// The cache name to use for precache caching.
	runtime: "run-time",
	// The cache name to use for runtime caching.
	googleAnalytics: "ga"
	// The cache name to use for workbox-google-analytics caching.
});
// console.log(this);
// get list name cache
const googleAnalyticsCache = this.workbox.core.cacheNames.googleAnalytics;
// console.log(this.workbox.core.cacheNames.googleAnalytics);
const precacheName = this.workbox.core.cacheNames.precache;
// console.log(this.workbox.core.cacheNames.precache);
const runtimeCache = this.workbox.core.cacheNames.runtime;
// console.log(this.workbox.core.cacheNames.runtime);
this.workbox.skipWaiting();
this.workbox.clientsClaim();
// The most verbose - displays all logs.
this.workbox.core.setLogLevel(this.workbox.core.LOG_LEVELS.silent);

// add entries to the precache list
// add a route to respond to fetch events
this.workbox.precaching.precacheAndRoute(self.__precacheManifest);

// This is useful for the application shell pattern.
this.workbox.routing.registerNavigationRoute("/index.html");

this.workbox.routing.registerRoute(
	// Match common image extensions.
	new RegExp(".(?:png|gif|jpg|svg|ico)$"),
	// Use a cache-first strategy with the following config:
	this.workbox.strategies.cacheFirst({
		// You need to provide a cache name when using expiration.
		cacheName: "cache-for-image"
	})
);

this.workbox.routing.registerRoute(
	new RegExp(".(?:js|css)$"),
	this.workbox.strategies.staleWhileRevalidate({
		cacheName: "cache-for-static"
	})
);

this.workbox.routing.registerRoute(
	new RegExp(".(?:xml|json)$"),
	this.workbox.strategies.cacheFirst({
		cacheName: "cache-for-another"
	})
);

const bgSyncPlugin = new this.workbox.backgroundSync.Plugin(
	"cache-for-failed",
	{
		maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
	}
);

this.workbox.routing.registerRoute(
	"https://api-siresi-ft-umm.herokuapp.com/api/*",
	this.workbox.strategies.staleWhileRevalidate({
		cacheName: "cache-for-api",
		cacheExpiration: {
			maxEntries: 50,
			maxAgeSeconds: 86400
		}
	}),
	"GET"
);

this.workbox.routing.registerRoute(
	"https://api-siresi-ft-umm.herokuapp.com/api/*",
	this.workbox.strategies.networkOnly({
		plugins: [bgSyncPlugin]
	}),
	"POST"
);

