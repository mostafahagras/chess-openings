if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let r={};const c=e=>n(e,f),t={module:{uri:f},exports:r,require:c};s[f]=Promise.all(a.map((e=>t[e]||c(e)))).then((e=>(i(...e),r)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts("/fallback-ce627215c0e4a9af.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/AmXK-jvyqgw7L7fpvfGJN/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/AmXK-jvyqgw7L7fpvfGJN/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/168-39280bb048b7bed7.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/190-5fed524668094ebe.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/318-d5516c098e6ab39d.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/586-ff3728df3875223b.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/799-0f8c048a2346904b.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/app/%5B...moves%5D/page-90d3db0cf08ddde2.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/app/_not-found/page-40fb95a92e691619.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/app/layout-4911fed7aa3d781f.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/app/offline/page-6774c875ae81f94c.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/app/page-2c9f5a0bad6a499e.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/fd9d1056-7bff04cda38d5d7d.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/main-3d54547b33520ee9.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/main-app-b2502af50e52ac6b.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-37e5246312c33119.js",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/_next/static/css/fbaea45bffac9c3e.css",revision:"fbaea45bffac9c3e"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/bp.png",revision:"cce7d827d9144584ffd9e03b34e27b89"},{url:"/fallback-ce627215c0e4a9af.js",revision:"a5281aa1504c5d6bcd7ba1097870376a"},{url:"/manifest.json",revision:"75bba4674ec427e0621809a3d418b456"},{url:"/offline",revision:"AmXK-jvyqgw7L7fpvfGJN"},{url:"/pieces/bb.webp",revision:"d4831e87215855879c4ebaaa0941c5ed"},{url:"/pieces/bk.webp",revision:"7dfc9fd8a116e77bdf03c882399a2969"},{url:"/pieces/bn.webp",revision:"e12f8d12028aee325a6383000398cf22"},{url:"/pieces/bp.webp",revision:"844e95ea1f9826ecf68277cd9923741d"},{url:"/pieces/bq.webp",revision:"43310a4f9ecef9fce3ab200b9b1dca30"},{url:"/pieces/br.webp",revision:"fc1ebb6c44bf7982347894ca771e5a08"},{url:"/pieces/wb.webp",revision:"80cb753f0b36ed73601d4226a80eef28"},{url:"/pieces/wk.webp",revision:"a22a79333d00f83bce5250c9b91438ee"},{url:"/pieces/wn.webp",revision:"2a108a9eedbf4ebee56973fd3f5c317b"},{url:"/pieces/wp.webp",revision:"f70df0f57e9e5947fb3476854ad47106"},{url:"/pieces/wq.webp",revision:"1140ed426093555f69395544b41875e8"},{url:"/pieces/wr.webp",revision:"872fbfb10cfea07cd913688f3f3d6b54"},{url:"/sounds/capture.webm",revision:"24b1f33099c33f58ace4e7e9b6c8c128"},{url:"/sounds/castle.webm",revision:"21ec18608e82ea972bc436f7935573de"},{url:"/sounds/illegal.webm",revision:"9faaf8b92f8aef735311bc16b3963bf2"},{url:"/sounds/move-check.webm",revision:"4357e894d5ab882f0ae42d704e8d460a"},{url:"/sounds/move-opponent.webm",revision:"0154031026876ce53de664c5283f1bd6"},{url:"/sounds/move-self.webm",revision:"85b7b9745fd2849ad6455dec6a832f8d"},{url:"/sounds/promote.webm",revision:"d88d6d644375008aafb20411d334714d"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e},{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
