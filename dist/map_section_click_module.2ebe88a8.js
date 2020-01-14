// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/js/map_section_click_module.js":[function(require,module,exports) {
var calendarEventsCompleted_Flag = 0;

while (calendarEventsCompleted_Flag == 1) {
  var mapSectionClickModule = function (calendarEvents) {
    map.on('click', function (e) {
      console.log(e);
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['advance-fill']
      });

      if (!features.length) {
        features = map.queryRenderedFeatures(e.point, {
          layers: ['gfl-fill']
        });
        console.log(features);
      }

      if (features.length > 0) {
        var tempPoint = {
          coordinates: [e.lngLat.lng, e.lngLat.lat],
          type: "Point"
        };
        console.log(tempPoint);
        map.getSource('single-point').setData(tempPoint);
        map.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: 14,
          bearing: 0,
          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          speed: 2,
          // make the flying slow
          curve: 1,
          // change the speed at which it zooms out
          // This can be any easing function: it takes a number between
          // 0 and 1 and returns another number between 0 and 1.
          easing: function easing(t) {
            return t;
          }
        }); //=================== street sweeping ========================
        // $.getJSON('https://gis.detroitmi.gov/arcgis/rest/services/DPW/Weeks/MapServer/0/query?where=&text=&objectIds=&time=&geometry='+e.lngLat.lng+'%2C'+e.lngLat.lat+'&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson' , function( data ) {
        //   console.log(data.features[0].attributes.VISIBLE);
        //   console.log();
        //   console.log(moment('2017-05-01').add(((data.features[0].attributes.VISIBLE * 7)-7), 'days').format('MMM,DD'));
        //   console.log(moment('2017-05-01').add(((data.features[0].attributes.VISIBLE * 7)-3), 'days').format('MMM,DD'));
        //   document.querySelector('.info-container > .district').innerHTML = '<span>Street Sweeping</span> ' + moment('2017-05-01').add(((data.features[0].attributes.VISIBLE * 7)-7), 'days').format('MMM DD') + ' - ' + moment('2017-05-01').add(((data.features[0].attributes.VISIBLE * 7)-3), 'days').format('MMM DD');
        // });
        //=========================== street name ====================

        $.getJSON('https://api.mapbox.com/geocoding/v5/mapbox.places/' + e.lngLat.lng + '%2C' + e.lngLat.lat + '.json?access_token=pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q', function (data) {
          // console.log(data.features[0].place_name);
          document.querySelector('.info-container > .street-name').innerHTML = data.features[0].place_name.split(',')[0];
        }); //======================== pick up services ==================

        if (features[0].properties.contractor == 'advance') {
          document.querySelector('.info-container > .provider').innerHTML = '<span>Provider:</span> <a href="https://www.advanceddisposal.com/mi/detroit/detroit-residential-collection" target="_new">' + capitalizeFirstLetter(features[0].properties.contractor) + '</a> - <a href="tel:844-233-8764">(844) 233-8764</a>';
        } else {
          document.querySelector('.info-container > .provider').innerHTML = '<span>Provider:</span> <a href="http://gflusa.com/residential/detroit/" target="_new">' + capitalizeFirstLetter(features[0].properties.contractor) + '</a> - <a href="tel:844-464-3587">(844) 464-3587</a>';
        }

        document.querySelector('.info-container > input[name="route-id"]').value = features[0].properties.FID;
        document.querySelector('.service-check > #garbage-checkbox').value = features[0].properties.FID;
        document.querySelector('.service-check > #recycle-checkbox').value = features[0].properties.FID;
        document.querySelector('.service-check > #bulk-yard-checkbox').value = features[0].properties.FID;
        document.querySelector('.info-container > input[name="lng"]').value = e.lngLat.lng;
        document.querySelector('.info-container > input[name="lat"]').value = e.lngLat.lat;
        document.querySelector('#info').className === 'active' ? 0 : document.querySelector('#info').className = 'active';
        var todaysMonth = moment().month() + 1;
        var todaysYear = moment().year();
        $.ajax({
          // TODO change this to https
          url: 'https://apis.detroitmi.gov/waste_schedule/details/' + features[0].properties.FID + '/year/' + todaysYear + '/month/' + todaysMonth + '/',
          type: 'GET',
          dataType: 'json',
          success: function success(response) {
            console.log(url); // console.log(response);

            document.querySelector('.info-container > .garbage').innerHTML = '<span>Garbage:</span> ' + capitalizeFirstLetter(features[0].properties.day) + ' - ' + moment(response.next_pickups.trash.next_pickup).format('MMM Do');
            document.querySelector('.info-container > .recycle').innerHTML = '<span>Curbside Recycle:</span> ' + capitalizeFirstLetter(features[0].properties.day) + ' - ' + moment(response.next_pickups.recycling.next_pickup).format('MMM Do');
            document.querySelector('.info-container > .bulk').innerHTML = '<span>Bulk:</span> ' + capitalizeFirstLetter(features[0].properties.day) + ' - ' + moment(response.next_pickups.bulk.next_pickup).format('MMM Do');
            document.querySelector('.info-container > .yard').innerHTML = '<span>Yard Waste:</span> ' + capitalizeFirstLetter(features[0].properties.day) + ' - ' + moment(response.next_pickups['yard waste'].next_pickup).format('MMM Do');
          }
        });
      } else {
        console.log('No data on point');
      }

      return;
    });
  }(window, calendarEvents);

  calendarEventsCompleted_Flag = 2;
}
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45729" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/map_section_click_module.js"], null)
//# sourceMappingURL=/map_section_click_module.2ebe88a8.js.map