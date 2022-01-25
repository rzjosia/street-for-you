/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var StreetSpeechRecognition;

try {
  StreetSpeechRecognition = webkitSpeechRecognition ? webkitSpeechRecognition : SpeechRecognition;
} catch (error) {
  StreetSpeechRecognition = Object;
}

var recognition = new StreetSpeechRecognition();
var descriptionRecognition = new StreetSpeechRecognition();
descriptionRecognition.continuous = true;
var ZOOM = 15;
var rzMap = L.map("mapid").setView([51.505, -0.09], ZOOM);
var COMFORTABLE = 'COMFORTABLE';
var UNCOMFORTABLE = 'UNCOMFORTABLE';
var MAP_TOKEN = "pk.eyJ1Ijoicnpqb3NpYSIsImEiOiJja2dqZHdwdGYwZmxvMnBuNDNvbm16dHR5In0.BYovotHxlYRLns01BpYTJQ";
var WEATHER_TOKEN = "d4354106a2ca9ab50eebfc808698467f";
var cityInput = document.querySelector("#city");
var popup = L.popup();
var isStreetMicOpen = false;

var toggleSpeech = function toggleSpeech(value) {
  var micIcon = document.querySelector('#mic-icon');

  if (value) {
    recognition.start();
    micIcon.innerHTML = "mic_off";
  } else {
    recognition.stop();
    micIcon.innerHTML = "mic";
  }

  isStreetMicOpen = value;
};

var getLocation = function getLocation(latitude, longitude) {
  return fetch("https://geocode.xyz/".concat(latitude, ",").concat(longitude, "?json=1")).then(function (data) {
    return data.json();
  }).then(function (data) {
    return data;
  });
};

var getLocationByAddress = function getLocationByAddress(address) {
  return fetch("https://www.mapquestapi.com/geocoding/v1/address?key=rsqyf0EI5Am2rdQGwTEuNAzfGR0GpH0J&location=".concat(address)).then(function (data) {
    return data.json();
  }).then(function (data) {
    return data.results[0].locations[0];
  });
};

var getAddressByLocation = function getAddressByLocation(location) {
  var streeNumber = _typeof(location.stnumber) === 'object' || !location.stnumber ? '' : location.stnumber + ' ';
  var address = _typeof(location.staddress) === 'object' || !location.staddress ? '' : location.staddress + ', ';
  var zip = _typeof(location.postal) === 'object' || !location.postal ? '' : location.postal + ', ';
  var city = _typeof(location.city) === 'object' || !location.city ? '' : location.city;
  return location.success === false ? '' : "".concat(streeNumber).concat(address).concat(zip).concat(city);
};

var defaultIconParams = {
  iconSize: [25, 47],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'img/marker-shadow.png',
  shadowSize: [1, 34],
  shadowAnchor: [41, 41]
};
var comfortableMarkerIcon = L.icon(_objectSpread({
  iconUrl: 'img/marker-icon-green.png'
}, defaultIconParams));
var uncomfortableMarkerIcon = L.icon(_objectSpread({
  iconUrl: 'img/marker-icon-orange.png'
}, defaultIconParams));

var initTileLayer = function initTileLayer() {
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>',
    maxZoom: 20,
    id: "rzjosia/ckgjiei9u7ghh19qks3ffeyk4",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MAP_TOKEN
  }).addTo(rzMap);
};

var geoLocate = function geoLocate() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      rzMap.setView([position.coords.latitude, position.coords.longitude], ZOOM);
      M.updateTextFields();
    });
  }
};

var addMarker = function addMarker(data) {
  var icon = data.situation === COMFORTABLE ? comfortableMarkerIcon : uncomfortableMarkerIcon;
  var markerPoint = L.marker([data.geoPoint.latitude, data.geoPoint.longitude], {
    icon: icon
  }).addTo(rzMap);
  markerPoint.bindPopup("<b>".concat(data.situation === UNCOMFORTABLE ? 'Inconfortale' : 'Confortable', "</b><br/>").concat(data.description));
};

var addPlace = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
    var options,
        content,
        title,
        modal,
        elems,
        isDescriptionOpen,
        descriptionToggleSpeech,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            content = document.createElement('div');
            content.innerHTML = '<div class="input-field col s12">' + '<select id="situation">' + '<option value="" disabled selected>Selectionner la situation</option>' + '<option value="COMFORTABLE">Confortable</option>' + '<option value="UNCOMFORTABLE">Inconfortable</option>' + '<label>Situation</label>' + '</select>' + '</div>' + '<div class="input-field col s12">' + '<textarea id="description" class="materialize-textarea"' + 'placeholder="Qu\'avez-vous contasté ?"></textarea>' + '<button class="btn waves-effect waves-light" id="description-mic-button">' + '<i id="description-mic-icon" class="material-icons">mic</i>' + '</button>' + '</div>';

            if (options.location) {
              _context2.next = 7;
              break;
            }

            _context2.next = 6;
            return getLocation(e.latlng.lat, e.latlng.lng);

          case 6:
            options.location = _context2.sent;

          case 7:
            title = getAddressByLocation(options.location);
            modal = swal({
              title: title,
              content: content,
              buttons: {
                cancel: "Annuler",
                confirm: {
                  text: "Ajouter",
                  value: "add"
                }
              }
            });
            elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
            document.querySelector('#situation').value = options.situation ? options.situation : '';
            document.querySelector('#description').value = options.description ? options.description : '';
            isDescriptionOpen = false;

            descriptionToggleSpeech = function descriptionToggleSpeech(value) {
              var micIcon = document.querySelector('#description-mic-icon');

              if (value) {
                descriptionRecognition.start();
                micIcon.innerHTML = "mic_off";
              } else {
                descriptionRecognition.stop();
                micIcon.innerHTML = "mic";
              }
            };

            descriptionRecognition.onspeechend = function () {
              console.log("Speech end");
              descriptionToggleSpeech(false);
            };

            descriptionRecognition.onresult = function (event) {
              document.querySelector("#description").value = "";
              console.log(event);

              var _iterator = _createForOfIteratorHelper(event.results),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var result = _step.value;
                  document.querySelector("#description").value += result[0].transcript;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              M.textareaAutoResize(document.querySelector("#description"));
            };

            console.log(M);
            document.querySelector('#description-mic-icon').addEventListener('click', function () {
              isDescriptionOpen = !isDescriptionOpen;
              descriptionToggleSpeech(isDescriptionOpen);
            });
            _context2.next = 21;
            return modal.then( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(modal) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = modal;
                        _context.next = _context.t0 === 'add' ? 3 : 13;
                        break;

                      case 3:
                        if (!options.situation || options.situation.trim().length === 0) {
                          options.situation = document.querySelector('#situation').value;
                        }

                        if (!options.description || options.situation.trim().length === 0) {
                          options.description = document.querySelector('#description').value.trim();
                        }

                        if (!(options.situation.length === 0)) {
                          _context.next = 9;
                          break;
                        }

                        M.toast({
                          html: "Oups ! La situation est requise pour ajouter un lieu",
                          classes: 'toast-error'
                        });
                        addPlace(e, options);
                        return _context.abrupt("return");

                      case 9:
                        addMarker({
                          geoPoint: new firebase.firestore.GeoPoint(e.latlng.lat, e.latlng.lng),
                          situation: options.situation,
                          description: options.description
                        });
                        _context.next = 12;
                        return addLocation(e.latlng.lat, e.latlng.lng, options.situation, options.description);

                      case 12:
                        return _context.abrupt("break", 14);

                      case 13:
                        console.log('marker canceled');

                      case 14:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 21:
            M.updateTextFields();

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addPlace(_x) {
    return _ref.apply(this, arguments);
  };
}();

rzMap.on("click", function (e) {
  addPlace(e);
});
cityInput.addEventListener("keyup", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
    var city, location;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            e.preventDefault();
            city = cityInput.value.trim();

            if (!(e.keyCode === 13 && city.length > 0)) {
              _context3.next = 15;
              break;
            }

            _context3.prev = 3;
            _context3.next = 6;
            return getLocationByAddress(city);

          case 6:
            location = _context3.sent;
            console.log(location);
            rzMap.setView([location.latLng.lat, location.latLng.lng], ZOOM);
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](3);
            M.toast({
              html: "Oups ! Une erreur s'est produite",
              classes: 'toast-error'
            });
            console.error(_context3.t0);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 11]]);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());
initTileLayer();
geoLocate();
getLocations().then(function (querySnapshot) {
  querySnapshot.forEach( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(marker) {
      var data;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              data = marker.data();

              if (data.geoPoint && data.geoPoint.latitude && data.geoPoint.longitude) {
                addMarker(data);
              }

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());
});

recognition.onspeechend = function () {
  console.log("Speech end");
  toggleSpeech(false);
};

recognition.onresult = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(event) {
    var transcript, confidence, location;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            transcript = event.results[0][0].transcript;
            confidence = event.results[0][0].confidence;
            console.log(transcript);
            _context5.prev = 3;
            _context5.next = 6;
            return getLocationByAddress(transcript);

          case 6:
            location = _context5.sent;
            rzMap.setView([location.latLng.lat, location.latLng.lng], ZOOM);
            cityInput.value = transcript;
            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](3);
            M.toast({
              html: "Oups ! Une erreur s'est produite",
              classes: 'toast-error'
            });
            console.error(_context5.t0);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 11]]);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}();

document.querySelector('#mic-icon').addEventListener('click', function () {
  isStreetMicOpen = !isStreetMicOpen;
  toggleSpeech(isStreetMicOpen);
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/style.css ***!
  \*****************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, module.id, __webpack_require__.d, __webpack_require__.*, module */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@keyframes fadeIn {\r\n    0% {\r\n        opacity: 0;\r\n    }\r\n    100% {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\nbody {\r\n    transition: background-color ease-in-out 1s;\r\n    background-color: #fafafa;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nimg {\r\n    animation: fadeIn 0.7s ease-in-out;\r\n}\r\n\r\n.title {\r\n    color: #e46a6a;\r\n}\r\n\r\n.toast-error {\r\n    background-color: #e46a6a;\r\n    color: #fff;\r\n}\r\n\r\n.bg-offline {\r\n    background-color: bisque;\r\n}\r\n\r\n#mapid {\r\n    z-index: -99999;\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    height: 100%;\r\n    width: 100%;\r\n}\r\n\r\n#search {\r\n    background-color: white;\r\n    object-fit: contain;\r\n    opacity: 0.95;\r\n    display: flex;\r\n    justify-content: space-between;\r\n}\r\n\r\n#mic-button {\r\n    margin-top: 10px;\r\n}\r\n\r\n.cancel-button {\r\n    background-color: #e46a6a;\r\n    color: #fff;\r\n    margin-left: 2px;\r\n}\r\n\r\n.add-button {\r\n    background-color: rgb(118, 191, 194);\r\n    color: #fff;\r\n    margin-left: 10 !important;\r\n}", "",{"version":3,"sources":["webpack://src/css/style.css"],"names":[],"mappings":"AAAA;IACI;QACI,UAAU;IACd;IACA;QACI,UAAU;IACd;AACJ;;AAEA;IACI,2CAA2C;IAC3C,yBAAyB;IACzB,SAAS;IACT,UAAU;AACd;;AAEA;IACI,kCAAkC;AACtC;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,yBAAyB;IACzB,WAAW;AACf;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,eAAe;IACf,kBAAkB;IAClB,MAAM;IACN,SAAS;IACT,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,uBAAuB;IACvB,mBAAmB;IACnB,aAAa;IACb,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,yBAAyB;IACzB,WAAW;IACX,gBAAgB;AACpB;;AAEA;IACI,oCAAoC;IACpC,WAAW;IACX,0BAA0B;AAC9B","sourcesContent":["@keyframes fadeIn {\r\n    0% {\r\n        opacity: 0;\r\n    }\r\n    100% {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\nbody {\r\n    transition: background-color ease-in-out 1s;\r\n    background-color: #fafafa;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nimg {\r\n    animation: fadeIn 0.7s ease-in-out;\r\n}\r\n\r\n.title {\r\n    color: #e46a6a;\r\n}\r\n\r\n.toast-error {\r\n    background-color: #e46a6a;\r\n    color: #fff;\r\n}\r\n\r\n.bg-offline {\r\n    background-color: bisque;\r\n}\r\n\r\n#mapid {\r\n    z-index: -99999;\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    height: 100%;\r\n    width: 100%;\r\n}\r\n\r\n#search {\r\n    background-color: white;\r\n    object-fit: contain;\r\n    opacity: 0.95;\r\n    display: flex;\r\n    justify-content: space-between;\r\n}\r\n\r\n#mic-button {\r\n    margin-top: 10px;\r\n}\r\n\r\n.cancel-button {\r\n    background-color: #e46a6a;\r\n    color: #fff;\r\n    margin-left: 2px;\r\n}\r\n\r\n.add-button {\r\n    background-color: rgb(118, 191, 194);\r\n    color: #fff;\r\n    margin-left: 10 !important;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 15:0-14 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/style.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__.nc, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 230:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/css/style.css");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ 	__webpack_require__("./src/js/app.js");
/******/ })()
;
//# sourceMappingURL=bundle.js.map