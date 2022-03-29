<<<<<<< HEAD
if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>t(e,a),m={module:{uri:a},exports:c,require:r};s[a]=Promise.all(n.map((e=>m[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-62f137f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next//static/media/logo.abd7ff6d.png",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/VlS0178t_mb_VjS-mvqrP/_buildManifest.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/VlS0178t_mb_VjS-mvqrP/_middlewareManifest.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/VlS0178t_mb_VjS-mvqrP/_ssgManifest.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/158-811c68af1d508565.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/175-cb2d9ea7db70bd66.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/231-8d1c2461925b3b43.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/305-e6b9b1a4ef0568c1.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/360-62abd6d83a4fc645.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/545f34e4-594895368f00cf21.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/715-3230495b0d328eba.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/750-b688b5d7d4b5ed77.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/753-aa0db2a0986aa9eb.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/925-b0188b171c8cec92.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/d7eeaac4-11dc5a4993da9e31.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/framework-91d7f78b5b4003c8.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/main-c5dd74d995e0136b.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/pages/404-89b529ac18bcdb39.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/pages/_app-d5c3d5bf3f5198e9.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/pages/account-cfd5700a5328a13c.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/pages/control-032147a316dca2d3.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/pages/index-95cf5f55a5dab339.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/chunks/webpack-f8fe1f0eb2299c5d.js",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/css/de04ba29619363a7.css",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/media/primeicons.29151a74.woff",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/media/primeicons.5f5d08cd.ttf",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/media/primeicons.76044b1c.svg",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/_next/static/media/primeicons.964f445f.eot",revision:"VlS0178t_mb_VjS-mvqrP"},{url:"/favicon.ico",revision:"e77c69aceae715d8db6987ecf29ed836"},{url:"/logo152x152.png",revision:"aecc188ce56779b70332329ccb5881bf"},{url:"/logo192x192.png",revision:"58355420837809232ba8a2076ceef619"},{url:"/logo512x512.png",revision:"a03c08d1f30185396032b87ac0e85da2"},{url:"/manifest.json",revision:"230e8b26ce00d3868408a23128dddfab"},{url:"/static/images/not_found.png",revision:"19302660994a495f202e28060bec52af"},{url:"/static/images/undraw_page_not_found_su7k.svg",revision:"6695af9986412e75985538255ca87866"},{url:"/static/images/undraw_resume_folder_2_arse.svg",revision:"fd77e55e562daef2619ebf7e299665fa"},{url:"/static/logo.svg",revision:"9bd13925d9400e9699f7a82e2bf55ed4"},{url:"/static/thumbnail.png",revision:"ecc4acc3919eae77d450c0f78afad457"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
=======
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-f8f28168'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }

        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
>>>>>>> f656b348cbf2fa8a05cdc07f95c9c6c22d001b05
