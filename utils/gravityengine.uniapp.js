function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		enumerableOnly && (symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable
		})), keys.push.apply(keys, symbols)
	}
	return keys
}

function _objectSpread2(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = null != arguments[i] ? arguments[i] : {};
		i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
			_defineProperty(target, key, source[key])
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(
			source)) : ownKeys(Object(source)).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
		})
	}
	return target
}

function _regeneratorRuntime() {
	_regeneratorRuntime = function() {
		return exports
	};
	var exports = {},
		Op = Object.prototype,
		hasOwn = Op.hasOwnProperty,
		defineProperty = Object.defineProperty || function(obj, key, desc) {
			obj[key] = desc.value
		},
		$Symbol = "function" == typeof Symbol ? Symbol : {},
		iteratorSymbol = $Symbol.iterator || "@@iterator",
		asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
		toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	function define(obj, key, value) {
		return Object.defineProperty(obj, key, {
			value: value,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}), obj[key]
	}
	try {
		define({}, "")
	} catch (err) {
		define = function(obj, key, value) {
			return obj[key] = value
		}
	}

	function wrap(innerFn, outerFn, self, tryLocsList) {
		var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
			generator = Object.create(protoGenerator.prototype),
			context = new Context(tryLocsList || []);
		return defineProperty(generator, "_invoke", {
			value: makeInvokeMethod(innerFn, self, context)
		}), generator
	}

	function tryCatch(fn, obj, arg) {
		try {
			return {
				type: "normal",
				arg: fn.call(obj, arg)
			}
		} catch (err) {
			return {
				type: "throw",
				arg: err
			}
		}
	}
	exports.wrap = wrap;
	var ContinueSentinel = {};

	function Generator() {}

	function GeneratorFunction() {}

	function GeneratorFunctionPrototype() {}
	var IteratorPrototype = {};
	define(IteratorPrototype, iteratorSymbol, function() {
		return this
	});
	var getProto = Object.getPrototypeOf,
		NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
		(IteratorPrototype = NativeIteratorPrototype);
	var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

	function defineIteratorMethods(prototype) {
		["next", "throw", "return"].forEach(function(method) {
			define(prototype, method, function(arg) {
				return this._invoke(method, arg)
			})
		})
	}

	function AsyncIterator(generator, PromiseImpl) {
		function invoke(method, arg, resolve, reject) {
			var record = tryCatch(generator[method], generator, arg);
			if ("throw" !== record.type) {
				var result = record.arg,
					value = result.value;
				return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value
					.__await).then(function(value) {
					invoke("next", value, resolve, reject)
				}, function(err) {
					invoke("throw", err, resolve, reject)
				}) : PromiseImpl.resolve(value).then(function(unwrapped) {
					result.value = unwrapped, resolve(result)
				}, function(error) {
					return invoke("throw", error, resolve, reject)
				})
			}
			reject(record.arg)
		}
		var previousPromise;
		defineProperty(this, "_invoke", {
			value: function(method, arg) {
				function callInvokeWithMethodAndArg() {
					return new PromiseImpl(function(resolve, reject) {
						invoke(method, arg, resolve, reject)
					})
				}
				return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
					callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg()
			}
		})
	}

	function makeInvokeMethod(innerFn, self, context) {
		var state = "suspendedStart";
		return function(method, arg) {
			if ("executing" === state) throw new Error("Generator is already running");
			if ("completed" === state) {
				if ("throw" === method) throw arg;
				return {
					value: void 0,
					done: !0
				}
			}
			for (context.method = method, context.arg = arg;;) {
				var delegate = context.delegate;
				if (delegate) {
					var delegateResult = maybeInvokeDelegate(delegate, context);
					if (delegateResult) {
						if (delegateResult === ContinueSentinel) continue;
						return delegateResult
					}
				}
				if ("next" === context.method) context.sent = context._sent = context.arg;
				else if ("throw" === context.method) {
					if ("suspendedStart" === state) throw state = "completed", context.arg;
					context.dispatchException(context.arg)
				} else "return" === context.method && context.abrupt("return", context.arg);
				state = "executing";
				var record = tryCatch(innerFn, self, context);
				if ("normal" === record.type) {
					if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
						continue;
					return {
						value: record.arg,
						done: context.done
					}
				}
				"throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg)
			}
		}
	}

	function maybeInvokeDelegate(delegate, context) {
		var methodName = context.method,
			method = delegate.iterator[methodName];
		if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return &&
			(context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" ===
				context.method) || "return" !== methodName && (context.method = "throw", context.arg =
				new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
		var record = tryCatch(method, delegate.iterator, context.arg);
		if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null,
			ContinueSentinel;
		var info = record.arg;
		return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc,
			"return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate =
			null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError(
			"iterator result is not an object"), context.delegate = null, ContinueSentinel)
	}

	function pushTryEntry(locs) {
		var entry = {
			tryLoc: locs[0]
		};
		1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]),
			this.tryEntries.push(entry)
	}

	function resetTryEntry(entry) {
		var record = entry.completion || {};
		record.type = "normal", delete record.arg, entry.completion = record
	}

	function Context(tryLocsList) {
		this.tryEntries = [{
			tryLoc: "root"
		}], tryLocsList.forEach(pushTryEntry, this), this.reset(!0)
	}

	function values(iterable) {
		if (iterable || "" === iterable) {
			var iteratorMethod = iterable[iteratorSymbol];
			if (iteratorMethod) return iteratorMethod.call(iterable);
			if ("function" == typeof iterable.next) return iterable;
			if (!isNaN(iterable.length)) {
				var i = -1,
					next = function next() {
						for (; ++i < iterable.length;)
							if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
						return next.value = undefined, next.done = !0, next
					};
				return next.next = next
			}
		}
		throw new TypeError(typeof iterable + " is not iterable");
	}
	return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
			value: GeneratorFunctionPrototype,
			configurable: !0
		}), defineProperty(GeneratorFunctionPrototype, "constructor", {
			value: GeneratorFunction,
			configurable: !0
		}), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"),
		exports.isGeneratorFunction = function(genFun) {
			var ctor = "function" == typeof genFun && genFun.constructor;
			return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name))
		}, exports.mark = function(genFun) {
			return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun
					.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")),
				genFun.prototype = Object.create(Gp), genFun
		}, exports.awrap = function(arg) {
			return {
				__await: arg
			}
		}, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol,
			function() {
				return this
			}), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList,
			PromiseImpl) {
			void 0 === PromiseImpl && (PromiseImpl = Promise);
			var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
			return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
				return result.done ? result.value : iter.next()
			})
		}, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol,
	function() {
			return this
		}), define(Gp, "toString", function() {
			return "[object Generator]"
		}), exports.keys = function(val) {
			var object = Object(val),
				keys = [];
			for (var key in object) keys.push(key);
			return keys.reverse(),
				function next() {
					for (; keys.length;) {
						var key = keys.pop();
						if (key in object) return next.value = key, next.done = !1, next
					}
					return next.done = !0, next
				}
		}, exports.values = values, Context.prototype = {
			constructor: Context,
			reset: function(skipTempReset) {
				if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this
					.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(
						resetTryEntry), !skipTempReset)
					for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(
						1)) && (this[name] = undefined)
			},
			stop: function() {
				this.done = !0;
				var rootRecord = this.tryEntries[0].completion;
				if ("throw" === rootRecord.type) throw rootRecord.arg;
				return this.rval
			},
			dispatchException: function(exception) {
				if (this.done) throw exception;
				var context = this;

				function handle(loc, caught) {
					return record.type = "throw", record.arg = exception, context.next = loc, caught && (context
						.method = "next", context.arg = undefined), !!caught
				}
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i],
						record = entry.completion;
					if ("root" === entry.tryLoc) return handle("end");
					if (entry.tryLoc <= this.prev) {
						var hasCatch = hasOwn.call(entry, "catchLoc"),
							hasFinally = hasOwn.call(entry, "finallyLoc");
						if (hasCatch && hasFinally) {
							if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
							if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc)
						} else if (hasCatch) {
							if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0)
						} else {
							if (!hasFinally) throw new Error("try statement without catch or finally");
							if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc)
						}
					}
				}
			},
			abrupt: function(type, arg) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry
						.finallyLoc) {
						var finallyEntry = entry;
						break
					}
				}
				finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <=
					finallyEntry.finallyLoc && (finallyEntry = null);
				var record = finallyEntry ? finallyEntry.completion : {};
				return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next =
					finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record)
			},
			complete: function(record, afterLoc) {
				if ("throw" === record.type) throw record.arg;
				return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" ===
					record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") :
					"normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel
			},
			finish: function(finallyLoc) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc),
						resetTryEntry(entry), ContinueSentinel
				}
			},
			catch: function(tryLoc) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.tryLoc === tryLoc) {
						var record = entry.completion;
						if ("throw" === record.type) {
							var thrown = record.arg;
							resetTryEntry(entry)
						}
						return thrown;
					}
				}
				throw new Error("illegal catch attempt");
			},
			delegateYield: function(iterable, resultName, nextLoc) {
				return this.delegate = {
					iterator: values(iterable),
					resultName: resultName,
					nextLoc: nextLoc
				}, "next" === this.method && (this.arg = undefined), ContinueSentinel
			}
		}, exports
}

function _typeof(obj) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
		return typeof obj
	} : function(obj) {
		return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ?
			"symbol" : typeof obj
	}, _typeof(obj)
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	try {
		var info = gen[key](arg);
		var value = info.value
	} catch (error) {
		reject(error);
		return
	}
	if (info.done) {
		resolve(value)
	} else {
		Promise.resolve(value).then(_next, _throw);
	}
}

function _asyncToGenerator(fn) {
	return function() {
		var self = this,
			args = arguments;
		return new Promise(function(resolve, reject) {
			var gen = fn.apply(self, args);

			function _next(value) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
			}

			function _throw(err) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
			}
			_next(undefined)
		})
	}
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
	}
}

function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", {
		writable: false
	});
	return Constructor
}

function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		})
	} else {
		obj[key] = value
	}
	return obj
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function");
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			writable: true,
			configurable: true
		}
	});
	Object.defineProperty(subClass, "prototype", {
		writable: false
	});
	if (superClass) _setPrototypeOf(subClass, superClass)
}

function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o)
	};
	return _getPrototypeOf(o)
}

function _setPrototypeOf(o, p) {
	_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o
	};
	return _setPrototypeOf(o, p)
}

function _isNativeReflectConstruct() {
	if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	if (Reflect.construct.sham) return false;
	if (typeof Proxy === "function") return true;
	try {
		Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
		return true
	} catch (e) {
		return false
	}
}

function _assertThisInitialized(self) {
	if (self === void 0) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	return self
}

function _possibleConstructorReturn(self, call) {
	if (call && (typeof call === "object" || typeof call === "function")) {
		return call
	} else if (call !== void 0) {
		throw new TypeError("Derived constructors may only return object or undefined");
	}
	return _assertThisInitialized(self)
}

function _createSuper(Derived) {
	var hasNativeReflectConstruct = _isNativeReflectConstruct();
	return function _createSuperInternal() {
		var Super = _getPrototypeOf(Derived),
			result;
		if (hasNativeReflectConstruct) {
			var NewTarget = _getPrototypeOf(this).constructor;
			result = Reflect.construct(Super, arguments, NewTarget)
		} else {
			result = Super.apply(this, arguments)
		}
		return _possibleConstructorReturn(this, result)
	}
}

function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen)
}

function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2
}

function _createForOfIteratorHelper(o, allowArrayLike) {
	var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
	if (!it) {
		if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length ===
			"number") {
			if (it) o = it;
			var i = 0;
			var F = function() {};
			return {
				s: F,
				n: function() {
					if (i >= o.length) return {
						done: true
					};
					return {
						done: false,
						value: o[i++]
					}
				},
				e: function(e) {
					throw e;
				},
				f: F
			}
		}
		throw new TypeError(
			"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
			);
	}
	var normalCompletion = true,
		didErr = false,
		err;
	return {
		s: function() {
			it = it.call(o)
		},
		n: function() {
			var step = it.next();
			normalCompletion = step.done;
			return step
		},
		e: function(e) {
			didErr = true;
			err = e
		},
		f: function() {
			try {
				if (!normalCompletion && it.return != null) it.return()
			} finally {
				if (didErr) throw err;
			}
		}
	}
}

function _toPrimitive(input, hint) {
	if (typeof input !== "object" || input === null) return input;
	var prim = input[Symbol.toPrimitive];
	if (prim !== undefined) {
		var res = prim.call(input, hint || "default");
		if (typeof res !== "object") return res;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (hint === "string" ? String : Number)(input)
}

function _toPropertyKey(arg) {
	var key = _toPrimitive(arg, "string");
	return typeof key === "symbol" ? key : String(key)
}
var Config = {
	LIB_VERSION: "1.0.1",
	LIB_NAME: "uniapp",
	LIB_STACK: "UniApp",
	BASE_URL: "https://backend.gravity-engine.com/event_center/api/v1"
};
var PlatformProxy = function() {
	function PlatformProxy() {
		_classCallCheck(this, PlatformProxy);
		this.config = {
			persistenceName: "GravityEngine",
			persistenceNameOld: "GravityEngine_web"
		}
	}
	_createClass(PlatformProxy, [{
		key: "getConfig",
		value: function getConfig() {
			return this.config
		}
	}, {
		key: "getStorage",
		value: function getStorage(name, async, callback) {
			var data = localStorage.getItem(name);
			if (async) {
				if (_.isJSONString(data)) {
					callback(JSON.parse(data))
				} else {
					callback({})
				}
			} else {
				if (_.isJSONString(data)) {
					return JSON.parse(data)
				} else {
					return {}
				}
			}
		}
	}, {
		key: "setStorage",
		value: function setStorage(name, value) {
			localStorage.setItem(name, value)
		}
	}, {
		key: "removeStorage",
		value: function removeStorage(name) {
			localStorage.removeItem(name)
		}
	}, {
		key: "_setSystemProxy",
		value: function _setSystemProxy(callback) {
			this._sysCallback = callback
		}
	}, {
		key: "getSystemInfo",
		value: function getSystemInfo(options) {
			var os = this._getOs();
			var res = {
				mp_platform: "web",
				system: os,
				platform: os,
				screenWidth: window.screen.width,
				screenHeight: window.screen.height,
				systemLanguage: navigator.language
			};
			if (this._sysCallback) {
				res = _.extend(res, this._sysCallback(options))
			}
			options.success(res);
			options.complete()
		}
	}, {
		key: "_getOs",
		value: function _getOs() {
			var a = navigator.userAgent;
			if (/Windows/i.test(a)) {
				if (/Phone/.test(a) || /WPDesktop/.test(a)) {
					return "Windows Phone"
				}
				return "Windows"
			} else if (/(iPhone|iPad|iPod)/.test(a)) {
				return "iOS"
			} else if (/Android/.test(a)) {
				return "Android"
			} else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
				return "BlackBerry"
			} else if (/Mac/i.test(a)) {
				return "MacOS"
			} else if (/Linux/.test(a)) {
				return "Linux"
			} else if (/CrOS/.test(a)) {
				return "ChromeOS"
			} else {
				return ""
			}
		}
	}, {
		key: "getNetworkType",
		value: function getNetworkType(options) {
			options.complete()
		}
	}, {
		key: "onNetworkStatusChange",
		value: function onNetworkStatusChange() {}
	}, {
		key: "request",
		value: function request(options) {
			var res = {};
			var xhr = new XMLHttpRequest();
			xhr.open(options.method, options.url);
			if (options.header) {
				for (var key in options.header) {
					xhr.setRequestHeader(key, options.header[key])
				}
			}
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && xhr.status === 200) {
					res["statusCode"] = 200;
					if (_.isJSONString(xhr.responseText)) {
						res["data"] = JSON.parse(xhr.responseText)
					}
					options.success(res)
				} else if (xhr.status !== 200) {
					res.errMsg = "network error";
					options.fail(res)
				}
			};
			xhr.ontimeout = function() {
				res.errMsg = "timeout";
				options.fail(res)
			};
			xhr.send(options.data);
			return xhr
		}
	}, {
		key: "initAutoTrackInstance",
		value: function initAutoTrackInstance(instance, config) {
			this.instance = instance;
			this.autoTrack = config.autoTrack;
			var _that = this;
			if ("onpagehide" in window) {
				window.onpagehide = function() {
					_that.onPageHide(true)
				}
			} else {
				window.onbeforeunload = function() {
					_that.onPageHide(true)
				}
			}
			_that.onPageShow();
			if (_that.autoTrack.appHide) {
				_that.instance.timeEvent("ta_page_hide")
			}
			if ("onvisibilitychange" in document) {
				document.onvisibilitychange = function() {
					if (document.hidden) {
						_that.onPageHide(false)
					} else {
						_that.onPageShow();
						if (_that.autoTrack.appHide) {
							_that.instance.timeEvent("ta_page_hide")
						}
					}
				}
			}
		}
	}, {
		key: "setGlobal",
		value: function setGlobal(instance, name) {
			window[name] = instance
		}
	}, {
		key: "getAppOptions",
		value: function getAppOptions() {}
	}, {
		key: "showToast",
		value: function showToast() {}
	}, {
		key: "onPageShow",
		value: function onPageShow() {
			if (this.autoTrack.appShow) {
				var properties = {};
				_.extend(properties, this.autoTrack.properties);
				if (_.isFunction(this.autoTrack.callback)) {
					_.extend(properties, this.autoTrack.callback("appShow"))
				}
				this.instance._internalTrack("$WebPageView", properties)
			}
		}
	}, {
		key: "onPageHide",
		value: function onPageHide(tryBeacon) {
			if (this.autoTrack.appHide) {
				var properties = {};
				_.extend(properties, this.autoTrack.properties);
				if (_.isFunction(this.autoTrack.callback)) {
					_.extend(properties, this.autoTrack.callback("appHide"))
				}
				this.instance._internalTrack("$WebPageHide", properties, new Date(), null,
					tryBeacon)
			}
		}
	}], [{
		key: "createInstance",
		value: function createInstance() {
			return new PlatformProxy()
		}
	}]);
	return PlatformProxy
}();
var AutoTrackBridge = function() {
	function AutoTrackBridge(instance, config) {
		_classCallCheck(this, AutoTrackBridge);
		this.taInstance = instance;
		this.config = config || {};
		this.referrer = "Directly open";
		if (this.config.isPlugin) {
			instance.App = function() {
				App.apply(this, arguments)
			};
			inension(instance.Page)
		} else {
			var originalApp = App;
			App = this._initAppExtention(originalApp);
			var originalPage = Page;
			Page = this._initPageExtension(originalPage)
		}
	}
	_createClass(AutoTrackBridge, [{
		key: "_initPageExtension",
		value: function _initPageExtension(Page) {
			var _that = this;
			return function(page) {
				var onLoad = page.onLoad,
					onShow = page.onShow,
					onShareAppMessage = page.onShareAppMessage;
				var onLoadOption = {};
				page["onLoad"] = function(e) {
					onLoadOption = e || {};
					if (typeof onLoad === "function") {
						onLoad.call(this, e)
					}
				};
				page.onShow = function(options) {
					_that.onPageShow(onLoadOption);
					if (typeof onShow === "function") {
						onShow.call(this, options)
					}
				};
				return Page(page)
			}
		}
	}, {
		key: "_initAppExtention",
		value: function _initAppExtention(App) {
			var _that = this;
			return function(app) {
				var onLaunch = app.onLaunch,
					onShow = app.onShow,
					onHide = app.onHide;
				app.onLaunch = function(options) {
					_that.onAppLaunch(options, this);
					if (typeof onLaunch === "function") {
						onLaunch.call(this, options)
					}
				};
				app.onShow = function(options) {
					_that.onAppShow(options);
					if (typeof onShow === "function") {
						onShow.call(this, options)
					}
				};
				app.onHide = function() {
					_that.onAppHide();
					if (typeof onHide === "function") {
						onHide.call(this)
					}
				};
				return App(app)
			}
		}
	}, {
		key: "onAppLaunch",
		value: function onAppLaunch(options, app) {
			this._setAutoTrackProperties(options);
			if (!_.isUndefined(app)) {
				app[this.taInstance.name] = this.taInstance
			}
			if (this.config.appLaunch) {
				var prop = {};
				if (options && options.path) {
					prop["$url_query"] = _.setQuery(options.query);
					prop["$scene"] = String(options.scene || options.from)
				}
				this.taInstance._internalTrack("$MPLaunch", prop)
			}
		}
	}, {
		key: "onAppShow",
		value: function onAppShow(options) {
			if (this.config.appHide) {
				this.taInstance.timeEvent("$MPHide")
			}
			this._setAutoTrackProperties(options);
			if (this.config.appShow) {
				var prop = {};
				if (options && options.path) {
					prop["$url_path"] = this._getPath(options.path);
					prop["$url_query"] = _.setQuery(options.query);
					prop["$scene"] = String(options.scene || options.from)
				}
				_.extend(prop, this.config.properties);
				if (_.isFunction(this.config.callback)) {
					_.extend(prop, this.config.callback("appShow"))
				}
				this.taInstance._internalTrack("$MPShow", prop)
			}
		}
	}, {
		key: "onAppHide",
		value: function onAppHide() {
			if (this.config.appHide) {
				var prop = {};
				_.extend(prop, this.config.properties);
				if (_.isFunction(this.config.callback)) {
					_.extend(prop, this.config.callback("appHide"))
				}
				this.taInstance._internalTrack("$MPHide", prop)
			}
		}
	}, {
		key: "_getCurrentPath",
		value: function _getCurrentPath() {
			var url = "Not to get";
			try {
				var pages = getCurrentPages();
				var currentPage = pages[pages.length - 1];
				url = currentPage.route
			} catch (e) {
				logger$1.info(e)
			}
			return url
		}
	}, {
		key: "_setAutoTrackProperties",
		value: function _setAutoTrackProperties(options) {
			var props = {};
			this.taInstance._setAutoTrackProperties(props)
		}
	}, {
		key: "_getPath",
		value: function _getPath(path) {
			return path = "string" === typeof path ? path.replace(/^\//, "") : "Abnormal values"
		}
	}, {
		key: "onPageShare",
		value: function onPageShare(result) {
			if (this.config.pageShare) {
				var share_depth = 1;
				try {
					share_depth = getCurrentPages().length
				} catch (e) {
					share_depth = 1
				}
				this.taInstance._internalTrack("$MPShare", {
					$share_method: "转发消息卡片",
					$share_depth: share_depth,
					$url_path: this._getCurrentPath()
				})
			}
			var ret = _.isObject(result) ? result : {};
			return ret
		}
	}, {
		key: "onPageShow",
		value: function onPageShow(onLoadOption) {
			if (this.config.pageShow) {
				var path = this._getCurrentPath();
				var prop = {
					$url_path: path || "The system did not get a value",
					$url_query: _.setQuery(onLoadOption)
				};
				this.referrer = path
			}
		}
	}]);
	return AutoTrackBridge
}();
var AutoTrackBridge$1 = function() {
	function AutoTrackBridge(instance, config, currentPlatform) {
		var _this = this;
		_classCallCheck(this, AutoTrackBridge);
		this.taInstance = instance;
		this.config = config || {};
		var options = {};
		try {
			options = currentPlatform.getLaunchOptionsSync()
		} catch (e) {
			options = {}
		}
		this._onShow(options);
		this.startTracked = true;
		currentPlatform.onShow(function(options) {
			_this._onShow(options)
		});
		currentPlatform.onHide(function() {
			_this.startTracked = false;
			if (_this.config.appHide) {
				var properties = {};
				_.extend(properties, _this.config.properties);
				if (_.isFunction(_this.config.callback)) {
					_.extend(properties, _this.config.callback("appHide"))
				}
				_this.taInstance._internalTrack("$MPHide", properties)
			}
		})
	}
	_createClass(AutoTrackBridge, [{
		key: "_onShow",
		value: function _onShow(options) {
			if (!_.isObject(options)) {
				options = {}
			}
			if (this.startTracked) return;
			if (this.config.appHide) {
				this.taInstance.timeEvent("$MPHide")
			}
			if (this.config.appShow) {
				var _options, _options2, _PlatformAPI$getAppOp;
				var properties = {};
				_.extend(properties, this.config.properties);
				if (_.isFunction(this.config.callback)) {
					_.extend(properties, this.config.callback("appShow"))
				}
				this.taInstance._internalTrack("$MPShow", _objectSpread2(_objectSpread2({},
					properties), {}, {
					$scene: String(((_options = options) === null || _options ===
						void 0 ? void 0 : _options.scene) || ((_options2 =
							options) === null || _options2 === void 0 ? void 0 :
						_options2.from)),
					$url_query: _.setQuery(((_PlatformAPI$getAppOp = PlatformAPI
							.getAppOptions()) === null ||
						_PlatformAPI$getAppOp === void 0 ? void 0 :
						_PlatformAPI$getAppOp.query) || {})
				}))
			}
		}
	}]);
	return AutoTrackBridge
}();

function xhrRequest(options) {
	var res = {};
	var xhr = new XMLHttpRequest();
	xhr.open(options.method, options.url);
	if (options.header) {
		for (var key in options.header) {
			xhr.setRequestHeader(key, options.header[key])
		}
	}
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			res["statusCode"] = 200;
			if (_.isJSONString(xhr.responseText)) {
				res["data"] = JSON.parse(xhr.responseText)
			}
			options.success(res)
		} else if (xhr.status !== 200) {
			res.errMsg = "network error";
			options.fail(res)
		}
	};
	xhr.ontimeout = function() {
		res.errMsg = "timeout";
		options.fail(res)
	};
	xhr.send(JSON.parse(options.data));
	return xhr
}
var PlatformProxy$1 = function() {
	function PlatformProxy$1(api, platformConfig, internalConfig) {
		_classCallCheck(this, PlatformProxy$1);
		this.api = api;
		this.config = platformConfig;
		this._config = internalConfig
	}
	_createClass(PlatformProxy$1, [{
		key: "getConfig",
		value: function getConfig() {
			return this.config
		}
	}, {
		key: "getStorage",
		value: function getStorage(name, async, callback) {
			if (async) {
				this.api.getStorage({
					key: name,
					success: function success(res) {
						var data = _.isJSONString(res.data) ? JSON.parse(res.data) : {};
						callback(data)
					},
					fail: function fail() {
						callback({})
					}
				})
			} else {
				try {
					if (["dd_mp", "ali_mp", "ali_mg"].includes(this._config.platform)) {
						var res = this.api.getStorageSync({
							key: name
						});
						if (_.isJSONString(res.data)) {
							return JSON.parse(res.data)
						} else {
							return {}
						}
					}
					var data = this.api.getStorageSync(name);
					if (_.isJSONString(data)) {
						return JSON.parse(data)
					} else {
						return {}
					}
				} catch (e) {
					return {}
				}
			}
		}
	}, {
		key: "setStorage",
		value: function setStorage(name, value) {
			try {
				if (["ali_mp", "tb_mp", "dd_mp", "ali_mg"].includes(this._config.platform)) {
					this.api.setStorageSync({
						key: name,
						data: value
					})
				} else {
					this.api.setStorageSync(name, value)
				}
			} catch (e) {}
		}
	}, {
		key: "removeStorage",
		value: function removeStorage(name) {
			try {
				if (_.isFunction(this.api.removeStorage)) {
					this.api.removeStorage({
						key: name
					})
				} else if (_.isFunction(this.api.deleteStorage)) {
					this.api.deleteStorage({
						key: name
					})
				}
			} catch (e) {}
		}
	}, {
		key: "_getPlatform",
		value: function _getPlatform() {
			return ""
		}
	}, {
		key: "getSystemInfo",
		value: function getSystemInfo(options) {
			var platform = this._config.mpPlatform;
			this.api.getSystemInfo({
				success: function success(res) {
					if (_.isFunction(platform)) {
						res["mp_platform"] = platform(res)
					} else {
						res["mp_platform"] = platform
					}
					options.success(res);
					if (platform === "wechat") {
						options.complete()
					}
				},
				complete: function complete() {
					options.complete()
				}
			})
		}
	}, {
		key: "getNetworkType",
		value: function getNetworkType(options) {
			if (!_.isFunction(this.api.getNetworkType)) {
				options.success({});
				options.complete()
			} else {
				this.api.getNetworkType({
					success: function success(res) {
						options.success(res)
					},
					complete: function complete() {
						options.complete()
					}
				})
			}
		}
	}, {
		key: "onNetworkStatusChange",
		value: function onNetworkStatusChange(callback) {
			if (!_.isFunction(this.api.onNetworkStatusChange)) {
				callback({})
			} else {
				this.api.onNetworkStatusChange(callback)
			}
		}
	}, {
		key: "request",
		value: function request(options) {
			if (this._config.platform === "ali_mp" || this._config.platform === "dd_mp") {
				var config = _.extend({}, options);
				config.headers = options.header;
				config.success = function(res) {
					res.statusCode = res.status;
					options.success(res)
				};
				config.fail = function(res) {
					res.errMsg = res.errorMessage;
					options.fail(res)
				};
				if (this._config.platform === "dd_mp") {
					return this.api.httpRequest(config)
				} else {
					return this.api.request(config)
				}
			} else {
				try {
					if (this._config.platform === "taobao_mg") {
						return xhrRequest(options)
					}
					return this.api.request(options)
				} catch (e) {}
			}
		}
	}, {
		key: "initAutoTrackInstance",
		value: function initAutoTrackInstance(instance, config) {
			if (_.isObject(config.autoTrack)) {
				config.autoTrack["isPlugin"] = config.is_plugin
			}
			if (this._config.mp) {
				return new AutoTrackBridge(instance, config.autoTrack, this.api)
			} else {
				return new AutoTrackBridge$1(instance, config.autoTrack, this.api)
			}
		}
	}, {
		key: "setGlobal",
		value: function setGlobal(instance, name) {
			if (this._config.mp) {
				logger$1.warn(
					"GravityAnalytics: we do not set global name for GE instance when you do not enable auto track."
					)
			} else {
				if (this._config.platform !== "ali_mg") {
					try {
						GameGlobal[name] = instance
					} catch (e) {}
				}
			}
		}
	}, {
		key: "getAppOptions",
		value: function getAppOptions(callback) {
			var options = {};
			try {
				options = this.api.getLaunchOptionsSync()
			} catch (e) {
				options = {}
			}
			if (_.isFunction(callback)) {
				try {
					if (this._config.mp) {
						this.api.onAppShow(callback)
					} else {
						this.api.onShow(callback)
					}
				} catch (e) {
					logger$1.warn("Cannot register onShow callback.")
				}
			}
			return options
		}
	}, {
		key: "showToast",
		value: function showToast(msg) {
			if (_.isFunction(this.api.showToast)) {
				var content = {
					title: msg
				};
				if (this._config.platform === "dd_mp" || this._config.platform === "ali_mp") {
					content.content = msg
				}
				this.api.showToast(content)
			}
		}
	}], [{
		key: "createInstance",
		value: function createInstance() {
			return this._createInstance("R_CURRENT_PLATFORM")
		}
	}, {
		key: "_createInstance",
		value: function _createInstance(option) {
			switch (option) {
				case "wechat_mp":
					return new PlatformProxy$1(wx, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_wechat"
					}, {
						mpPlatform: "wechat",
						mp: true,
						platform: option
					});
				case "wechat_mg":
					return new PlatformProxy$1(wx, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_wechat_game"
					}, {
						mpPlatform: "wechat",
						platform: option
					});
				case "qq_mp":
					return new PlatformProxy$1(qq, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_qq"
					}, {
						mpPlatform: "qq",
						mp: true,
						platform: option
					});
				case "qq_mg":
					return new PlatformProxy$1(qq, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_qq_game"
					}, {
						mpPlatform: "qq",
						platform: option
					});
				case "baidu_mp":
					return new PlatformProxy$1(swan, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_swan"
					}, {
						mpPlatform: function mpPlatform(res) {
							return res["host"]
						},
						mp: true,
						platform: option
					});
				case "baidu_mg":
					return new PlatformProxy$1(swan, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_swan_game"
					}, {
						mpPlatform: function mpPlatform(res) {
							return res["host"]
						},
						platform: option
					});
				case "taobao_mg":
					return new PlatformProxy$1(my, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_taobao_game"
					}, {
						mpPlatform: "taobao",
						platform: option
					});
				case "tt_mg":
					return new PlatformProxy$1(tt, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_tt_game"
					}, {
						mpPlatform: function mpPlatform(res) {
							return res["appName"]
						},
						platform: option
					});
				case "tt_mp":
					return new PlatformProxy$1(tt, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_tt"
					}, {
						mpPlatform: function mpPlatform(res) {
							return res["appName"]
						},
						mp: true,
						platform: option
					});
				case "ali_mp":
					return new PlatformProxy$1(my, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_ali"
					}, {
						mpPlatform: function mpPlatform(res) {
							return res["app"]
						},
						mp: true,
						platform: option
					});
				case "ali_mg":
					return new PlatformProxy$1(my, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_ali_game"
					}, {
						mpPlatform: function mpPlatform(res) {
							return res["app"]
						},
						platform: option
					});
				case "dd_mp":
					return new PlatformProxy$1(dd, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_dd"
					}, {
						mpPlatform: "dingding",
						mp: true,
						platform: option
					});
				case "bl_mg":
					return new PlatformProxy$1(bl, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_bl_game"
					}, {
						mpPlatform: "bilibili",
						platform: option
					});
				case "kuaishou_mp":
					return new PlatformProxy$1(ks, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_kuaishou_program"
					}, {
						mpPlatform: "kuaishou",
						mp: true,
						platform: option
					});
				case "kuaishou_mg":
					return new PlatformProxy$1(ks, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_kuaishou_game"
					}, {
						mpPlatform: "kuaishou_game",
						platform: option
					});
				case "qh360_mg":
					return new PlatformProxy$1(qh, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_qh360"
					}, {
						mpPlatform: "qh360",
						platform: option
					});
				case "tb_mp":
					return new PlatformProxy$1(my, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_tb"
					}, {
						mpPlatform: "tb",
						mp: true,
						platform: option
					});
				case "jd_mp":
					return new PlatformProxy$1(jd, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_jd"
					}, {
						mpPlatform: "jd",
						mp: true,
						platform: option
					});
				case "qh360_mp":
					return new PlatformProxy$1(qh, {
						persistenceName: "GravityEngine",
						persistenceNameOld: "GravityEngine_qh360"
					}, {
						mpPlatform: "qh360",
						mp: true,
						platform: option
					});
				case "WEB":
					return new PlatformProxy.createInstance()
			}
		}
	}]);
	return PlatformProxy$1
}();
var PlatformProxyUniapp = function(_PlatformProxy) {
	_inherits(PlatformProxyUniapp, _PlatformProxy);
	var _super = _createSuper(PlatformProxyUniapp);

	function PlatformProxyUniapp() {
		_classCallCheck(this, PlatformProxyUniapp);
		return _super.apply(this, arguments)
	}
	_createClass(PlatformProxyUniapp, [{
		key: "initAutoTrackInstance",
		value: function initAutoTrackInstance(instance, config) {
			logger$1.info(instance);
			logger$1.info(config)
		}
	}], [{
		key: "createInstance",
		value: function createInstance() {
			var proxy = new PlatformProxyUniapp(uni, {
				persistenceName: "gravityengine",
				persistenceNameOld: "gravityengine_uniapp"
			}, {
				mpPlatform: "uniapp",
				mp: true,
				platform: "uniapp"
			});
			proxy = PlatformProxy$1._createInstance("wechat_mp");
			proxy = PlatformProxy$1._createInstance("ali_mp");
			proxy = PlatformProxy$1._createInstance("baidu_mp");
			proxy = PlatformProxy$1._createInstance("tt_mp");
			proxy = PlatformProxy$1._createInstance("tt_mp");
			proxy = PlatformProxy$1._createInstance("qq_mp");
			proxy = PlatformProxy$1._createInstance("kuaishou_mp");
			proxy = PlatformProxy$1._createInstance("jd_mp");
			proxy = PlatformProxy$1._createInstance("qh360_mp");
			proxy = PlatformProxy$1._createInstance("WEB");
			return proxy
		}
	}]);
	return PlatformProxyUniapp
}(PlatformProxy$1);
var PlatformAPI = function() {
	function PlatformAPI() {
		_classCallCheck(this, PlatformAPI)
	}
	_createClass(PlatformAPI, null, [{
		key: "_getCurrentPlatform",
		value: function _getCurrentPlatform() {
			return this.currentPlatform || (this.currentPlatform = PlatformProxyUniapp
				.createInstance())
		}
	}, {
		key: "getConfig",
		value: function getConfig() {
			return this._getCurrentPlatform().getConfig()
		}
	}, {
		key: "getStorage",
		value: function getStorage(name, async, callback) {
			return this._getCurrentPlatform().getStorage(name, async, callback)
		}
	}, {
		key: "setStorage",
		value: function setStorage(name, value) {
			return this._getCurrentPlatform().setStorage(name, value)
		}
	}, {
		key: "removeStorage",
		value: function removeStorage(name) {
			return this._getCurrentPlatform().removeStorage(name)
		}
	}, {
		key: "getSystemInfo",
		value: function getSystemInfo(options) {
			return this._getCurrentPlatform().getSystemInfo(options)
		}
	}, {
		key: "getNetworkType",
		value: function getNetworkType(options) {
			return this._getCurrentPlatform().getNetworkType(options)
		}
	}, {
		key: "getQuickDevice",
		value: function getQuickDevice(options) {
			return this._getCurrentPlatform().getQuickDevice(options)
		}
	}, {
		key: "onNetworkStatusChange",
		value: function onNetworkStatusChange(callback) {
			this._getCurrentPlatform().onNetworkStatusChange(callback)
		}
	}, {
		key: "request",
		value: function request(options) {
			return this._getCurrentPlatform().request(options)
		}
	}, {
		key: "initAutoTrackInstance",
		value: function initAutoTrackInstance(instance, config) {
			return this._getCurrentPlatform().initAutoTrackInstance(instance, config)
		}
	}, {
		key: "setGlobal",
		value: function setGlobal(instance, name) {
			if (instance && name) {
				this._getCurrentPlatform().setGlobal(instance, name)
			}
		}
	}, {
		key: "getAppOptions",
		value: function getAppOptions(callback) {
			return this._getCurrentPlatform().getAppOptions(callback)
		}
	}, {
		key: "showDebugToast",
		value: function showDebugToast(msg) {
			this._getCurrentPlatform().showToast(msg)
		}
	}]);
	return PlatformAPI
}();
var _ = {};
var ArrayProto = Array.prototype,
	ObjProto = Object.prototype,
	slice = ArrayProto.slice,
	nativeToString = ObjProto.toString,
	nativeHasOwnProperty = Object.prototype.hasOwnProperty,
	nativeForEach = ArrayProto.forEach,
	nativeIsArray = Array.isArray,
	breaker = {};
_.isNumber = function(a) {
	return "number" === typeof a ? 0 === a - a : "string" === typeof a && "" !== a.trim() ? Number.isFinite ? Number
		.isFinite(+a) : isFinite(+a) : !1
};
_.each = function(obj, iterator, context) {
	if (obj === null || obj === undefined) {
		return false
	}
	if (nativeForEach && obj.forEach === nativeForEach) {
		obj.forEach(iterator, context)
	} else if (obj.length === +obj.length) {
		for (var i = 0, l = obj.length; i < l; i++) {
			if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
				return false
			}
		}
	} else {
		for (var key in obj) {
			if (nativeHasOwnProperty.call(obj, key)) {
				if (iterator.call(context, obj[key], key, obj) === breaker) {
					return false
				}
			}
		}
	}
};
_.sleep = function(time) {
	return new Promise(function(resolve) {
		return setTimeout(resolve, time)
	})
};
_.extend = function(obj) {
	_.each(slice.call(arguments, 1), function(source) {
		for (var prop in source) {
			if (source[prop] !== void 0) {
				obj[prop] = source[prop]
			}
		}
	});
	return obj
};
_.extend2Layers = function(obj) {
	_.each(slice.call(arguments, 1), function(source) {
		for (var prop in source) {
			if (source[prop] !== void 0) {
				if (_.isObject(source[prop]) && _.isObject(obj[prop])) {
					_.extend(obj[prop], source[prop])
				} else {
					obj[prop] = source[prop]
				}
			}
		}
	});
	return obj
};
_.isArray = nativeIsArray || function(obj) {
	return nativeToString.call(obj) === "[object Array]"
};
_.isFunction = function(f) {
	try {
		return typeof f === "function"
	} catch (x) {
		return false
	}
};
_.isPromise = function(obj) {
	return nativeToString.call(obj) === "[object Promise]" && obj !== null && obj !== undefined
};
_.isObject = function(obj) {
	return nativeToString.call(obj) === "[object Object]" && obj !== null && obj !== undefined
};
_.isEmptyObject = function(obj) {
	if (_.isObject(obj)) {
		for (var key in obj) {
			if (nativeHasOwnProperty.call(obj, key)) {
				return false
			}
		}
		return true
	}
	return false
};
_.isUndefined = function(obj) {
	return obj === void 0
};
_.isString = function(obj) {
	return nativeToString.call(obj) === "[object String]"
};
_.isDate = function(obj) {
	return nativeToString.call(obj) === "[object Date]"
};
_.isBoolean = function(obj) {
	return nativeToString.call(obj) === "[object Boolean]"
};
_.isNumber = function(obj) {
	return nativeToString.call(obj) === "[object Number]" && /[\d\.]+/.test(String(obj))
};
_.isJSONString = function(str) {
	try {
		JSON.parse(str)
	} catch (e) {
		return false
	}
	return true
};
_.decodeURIComponent = function(val) {
	var result = "";
	try {
		result = decodeURIComponent(val)
	} catch (e) {
		result = val
	}
	return result
};
_.encodeURIComponent = function(val) {
	var result = "";
	try {
		result = encodeURIComponent(val)
	} catch (e) {
		result = val
	}
	return result
};
_.utf8Encode = function(string) {
	string = (string + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	var utftext = "";
	var start, end;
	var stringl = 0;
	var n;
	start = end = 0;
	stringl = string.length;
	for (n = 0; n < stringl; n++) {
		var c1 = string.charCodeAt(n);
		var enc = null;
		if (c1 < 128) {
			end++
		} else if (c1 > 127 && c1 < 2048) {
			enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128)
		} else {
			enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128)
		}
		if (enc !== null) {
			if (end > start) {
				utftext += string.substring(start, end)
			}
			utftext += enc;
			start = end = n + 1
		}
	}
	if (end > start) {
		utftext += string.substring(start, string.length)
	}
	return utftext
};
_.base64Encode = function(data) {
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1, o2, o3, h1, h2, h3, h4, bits;
	var i = 0,
		ac = 0,
		enc = "",
		tmpArr = [];
	if (!data) {
		return data
	}
	data = _.utf8Encode(data);
	do {
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);
		bits = o1 << 16 | o2 << 8 | o3;
		h1 = bits >> 18 & 0x3f;
		h2 = bits >> 12 & 0x3f;
		h3 = bits >> 6 & 0x3f;
		h4 = bits & 0x3f;
		tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
	} while (i < data.length);
	enc = tmpArr.join("");
	switch (data.length % 3) {
		case 1:
			enc = enc.slice(0, -2) + "==";
			break;
		case 2:
			enc = enc.slice(0, -1) + "=";
			break
	}
	return enc
};
_.encodeDates = function(obj) {
	_.each(obj, function(v, k) {
		if (_.isDate(v)) {
			obj[k] = _.formatDate(v)
		} else if (_.isObject(v)) {
			obj[k] = _.encodeDates(v)
		} else if (_.isArray(v)) {
			for (var i = 0; i < v.length; i++) {
				if (_.isDate(v[i])) {
					obj[k][i] = _.formatDate(v[i])
				}
			}
		}
	});
	return obj
};
_.formatDate = function(d) {
	function pad(n) {
		return n < 10 ? "0" + n : n
	}

	function secondPad(n) {
		if (n < 100 && n > 9) return "0" + n;
		else if (n < 10) return "00" + n;
		else return n
	}
	return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" +
		pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + "." + secondPad(d.getMilliseconds())
};
_.searchObjDate = function(o) {
	try {
		if (_.isObject(o) || _.isArray(o)) {
			_.each(o, function(a, b) {
				if (_.isObject(a) || _.isArray(a)) {
					_.searchObjDate(o[b])
				} else {
					if (_.isDate(a)) {
						o[b] = _.formatDate(a)
					}
				}
			})
		}
	} catch (err) {
		logger$1.warn(err)
	}
};
_.UUID = function() {
	var visitTime = new Date().getTime();
	var uuid = "" + String(Math.random()).replace(".", "").slice(1, 11) + "-" + visitTime;
	return uuid
};
_.UUIDv4 = function() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c === "x" ? r : r & 0x3 | 0x8;
		return v.toString(16)
	})
};
_.setMpPlatform = function(mpPlatform) {
	_.mpPlatform = mpPlatform
};
_.getMpPlatform = function() {
	return _.mpPlatform
};
_.createExtraHeaders = function() {
	return {
		"GE-Integration-Type": Config.LIB_NAME,
		"GE-Integration-Version": Config.LIB_VERSION,
		"GE-Integration-Count": "1",
		"GE-Integration-Extra": _.getMpPlatform()
	}
};
_.checkAppId = function(appId) {
	if (typeof appId === "number") {
		appId = String(appId)
	} else if (typeof appId !== "string") {
		return ""
	}
	appId = appId.replace(/\s*/g, "");
	return appId
};
_.checkUrl = function(url) {
	url = url.replace(/\s*/g, "");
	url = _.url("basic", url);
	return url
};
_.url = function() {
	function _t() {
		return new RegExp(
			/(.*?)\.?([^.]*?)\.(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|net\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/
			)
	}

	function _d(s) {
		return _.decodeURIComponent(s.replace(/\+/g, " "))
	}

	function _i(arg, str) {
		var sptr = arg.charAt(0);
		var split = str.split(sptr);
		if (sptr === arg) {
			return split
		}
		arg = parseInt(arg.substring(1), 10);
		return split[arg < 0 ? split.length + arg : arg - 1]
	}

	function _f(arg, str) {
		var sptr = arg.charAt(0);
		var split = str.split("&");
		var field = [];
		var params = {};
		var tmp = [];
		var arg2 = arg.substring(1);
		for (var i = 0, ii = split.length; i < ii; i++) {
			field = split[i].match(/(.*?)=(.*)/);
			if (!field) {
				field = [split[i], split[i], ""]
			}
			if (field[1].replace(/\s/g, "") !== "") {
				field[2] = _d(field[2] || "");
				if (arg2 === field[1]) {
					return field[2]
				}
				tmp = field[1].match(/(.*)\[([0-9]+)\]/);
				if (tmp) {
					params[tmp[1]] = params[tmp[1]] || [];
					params[tmp[1]][tmp[2]] = field[2]
				} else {
					params[field[1]] = field[2]
				}
			}
		}
		if (sptr === arg) {
			return params
		}
		return params[arg2]
	}
	return function(arg, url) {
		var _l = {},
			tmp;
		if (arg === "tld?") {
			return _t()
		}
		url = url || window.location.toString();
		if (!arg) {
			return url
		}
		arg = arg.toString();
		if (url.match(/^mailto:([^/].+)/)) {
			tmp = url.match(/^mailto:([^/].+)/);
			_l.protocol = "mailto";
			_l.email = tmp[1]
		} else {
			if (url.match(/(.*?)\/#!(.*)/)) {
				tmp = url.match(/(.*?)\/#!(.*)/);
				url = tmp[1] + tmp[2]
			}
			if (url.match(/(.*?)#(.*)/)) {
				tmp = url.match(/(.*?)#(.*)/);
				_l.hash = tmp[2];
				url = tmp[1]
			}
			if (_l.hash && arg.match(/^#/)) {
				return _f(arg, _l.hash)
			}
			if (url.match(/(.*?)\?(.*)/)) {
				tmp = url.match(/(.*?)\?(.*)/);
				_l.query = tmp[2];
				url = tmp[1]
			}
			if (_l.query && arg.match(/^\?/)) {
				return _f(arg, _l.query)
			}
			if (url.match(/(.*?):?\/\/(.*)/)) {
				tmp = url.match(/(.*?):?\/\/(.*)/);
				_l.protocol = tmp[1].toLowerCase();
				url = tmp[2]
			}
			if (url.match(/(.*?)(\/.*)/)) {
				tmp = url.match(/(.*?)(\/.*)/);
				_l.path = tmp[2];
				url = tmp[1]
			}
			_l.path = (_l.path || "").replace(/^([^/])/, "/$1").replace(/\/$/, "");
			if (arg.match(/^[-0-9]+$/)) {
				arg = arg.replace(/^([^/])/, "/$1")
			}
			if (arg.match(/^\//)) {
				return _i(arg, _l.path.substring(1))
			}
			tmp = _i("/-1", _l.path.substring(1));
			if (tmp && (tmp = tmp.match(/(.*?)\.(.*)/))) {
				_l.file = tmp[0];
				_l.filename = tmp[1];
				_l.fileext = tmp[2]
			}
			if (url.match(/(.*):([0-9]+)$/)) {
				tmp = url.match(/(.*):([0-9]+)$/);
				_l.port = tmp[2];
				url = tmp[1]
			}
			if (url.match(/(.*?)@(.*)/)) {
				tmp = url.match(/(.*?)@(.*)/);
				_l.auth = tmp[1];
				url = tmp[2]
			}
			if (_l.auth) {
				tmp = _l.auth.match(/(.*):(.*)/);
				_l.user = tmp ? tmp[1] : _l.auth;
				_l.pass = tmp ? tmp[2] : undefined
			}
			_l.hostname = url.toLowerCase();
			if (arg.charAt(0) === ".") {
				return _i(arg, _l.hostname)
			}
			if (_t()) {
				tmp = _l.hostname.match(_t());
				if (tmp) {
					_l.tld = tmp[3];
					_l.domain = tmp[2] ? tmp[2] + "." + tmp[3] : undefined;
					_l.sub = tmp[1] || undefined
				}
			}
			var portInfo = _l.port ? ":" + _l.port : "";
			_l.protocol = _l.protocol || window.location.protocol.replace(":", "");
			_l.port = _l.port || (_l.protocol === "https" ? "443" : "80");
			_l.protocol = _l.protocol || (_l.port === "443" ? "https" : "http");
			_l.basic = _l.protocol + "://" + _l.hostname + portInfo
		}
		if (arg in _l) {
			return _l[arg]
		}
		if (arg === "{}") {
			return _l
		}
		return ""
	}
}();
_.createString = function(length) {
	var expect = length;
	var str = Math.random().toString(36).substr(2);
	while (str.length < expect) {
		str += Math.random().toString(36).substr(2)
	}
	str = str.substr(0, length);
	return str
};
_.createAesKey = function() {
	return _.createString(16)
};
_.setQuery = function(obj) {
	try {
		if (!_.isObject(obj)) {
			return ""
		}
		var platform = PlatformAPI.getConfig().persistenceNameOld;
		var isAliPay = platform.includes("GravityEngine_ali");
		var str = [];
		for (var p in obj) {
			if (isAliPay || obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
			}
		}
		return str.join("&")
	} catch (e) {
		return ""
	}
};
_.generateEncryptyData = function(text, secretKey) {
	if (typeof secretKey === "undefined") {
		return text
	}
	var pkey = secretKey["publicKey"];
	var v = secretKey["version"];
	if (typeof pkey === "undefined" || typeof v === "undefined") {
		return text
	}
	if (typeof CryptoJS === "undefined" || typeof JSEncrypt === "undefined") {
		return text
	}
	var strKey = _.createAesKey();
	try {
		var key = CryptoJS.enc.Utf8.parse(strKey);
		var data = CryptoJS.enc.Utf8.parse(JSON.stringify(text));
		var padding = _.isUndefined(CryptoJS.pad.Pkcs7) ? CryptoJS.pad.PKCS7 : CryptoJS.pad.Pkcs7;
		var aesStr = CryptoJS.AES.encrypt(data, key, {
			mode: CryptoJS.mode.ECB,
			padding: padding
		}).toString();
		var encrypt = new JSEncrypt();
		encrypt.setPublicKey(pkey);
		var rsaStr = encrypt.encrypt(strKey);
		if (rsaStr === false) {
			logger$1.warn("私钥加密失败，返回原数据");
			return text
		}
		return {
			pkv: v,
			ekey: rsaStr,
			payload: aesStr
		}
	} catch (e) {
		logger$1.warn("数据加密失败，返回原数据: " + e)
	}
	return text
};
var logger$1 = _typeof(logger$1) === "object" ? logger$1 : {};
logger$1.info = function() {
	if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object" && console.log && logger$1
		.enabled) {
		try {
			return console.log.apply(console, arguments)
		} catch (e) {
			console.log(arguments[0])
		}
	}
};
logger$1.warn = function() {
	if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object" && console.log && logger$1
		.enabled) {
		try {
			return console.warn.apply(console, arguments)
		} catch (e) {
			console.warn(arguments[0])
		}
	}
};
logger$1.tencentSdkLog = function(val) {
	console.log("触发tencentSDK：", val)
};
var KEY_NAME_MATCH_REGEX = /^\$?[a-zA-Z][a-zA-Z0-9_]{0,49}$/;
var PropertyChecker = function() {
	function PropertyChecker() {
		_classCallCheck(this, PropertyChecker)
	}
	_createClass(PropertyChecker, null, [{
		key: "stripProperties",
		value: function stripProperties(prop) {
			if (!_.isObject(prop)) {
				return prop
			}
			_.each(prop, function(v, k) {
				if (!(_.isString(v) || _.isNumber(v) || _.isDate(v) || _.isBoolean(v) || _
						.isArray(v) || _.isObject(v))) {
					logger$1.warn('Your data -', k, v,
						'- format does not meet requirements and may not be stored correctly. Attribute values only support String, Number, Date, Boolean, Array, Object'
						)
				}
			});
			return prop
		}
	}, {
		key: "_checkPropertiesKey",
		value: function _checkPropertiesKey(obj) {
			var flag = true;
			_.each(obj, function(content, key) {
				if (!KEY_NAME_MATCH_REGEX.test(key)) {
					logger$1.warn('Invalid KEY: ' + key);
					flag = false
				}
			});
			return flag
		}
	}, {
		key: "event",
		value: function event(s) {
			if (!_.isString(s) || !KEY_NAME_MATCH_REGEX.test(s)) {
				logger$1.warn(
					'Check the parameter format. The eventName must start with an English letter and contain no more than 50 characters including letters, digits, and underscores: ' +
					s);
				return false
			} else {
				return true
			}
		}
	}, {
		key: "propertyName",
		value: function propertyName(s) {
			if (!_.isString(s) || !KEY_NAME_MATCH_REGEX.test(s)) {
				logger$1.warn(
					'Check the parameter format. PropertyName must start with a letter and contain letters, digits, and underscores (_). The value is a string of no more than 50 characters: ' +
					s);
				return false
			} else {
				return true
			}
		}
	}, {
		key: "properties",
		value: function properties(p) {
			this.stripProperties(p);
			if (p) {
				if (_.isObject(p)) {
					if (this._checkPropertiesKey(p)) {
						return true
					} else {
						logger$1.warn(
							'Check the parameter format. The properties key must start with a letter, contain digits, letters, and underscores (_), and contain a maximum of 50 characters'
							);
						return false
					}
				} else {
					logger$1.warn('properties can be none, but it must be an object');
					return false
				}
			} else {
				return true
			}
		}
	}, {
		key: "propertiesMust",
		value: function propertiesMust(p) {
			this.stripProperties(p);
			if (p === undefined || !_.isObject(p) || _.isEmptyObject(p)) {
				logger$1.warn('properties must be an object with a value');
				return false
			} else {
				if (this._checkPropertiesKey(p)) {
					return true
				} else {
					logger$1.warn(
						'Check the parameter format. The properties key must start with a letter, contain digits, letters, and underscores (_), and contain a maximum of 50 characters'
						);
					return false
				}
			}
		}
	}, {
		key: "userId",
		value: function userId(id) {
			if (_.isString(id) && /^.{1,64}$/.test(id)) {
				return true
			} else {
				logger$1.warn(
					'The user ID must be a string of less than 64 characters and cannot be null'
					);
				return false
			}
		}
	}, {
		key: "userAddProperties",
		value: function userAddProperties(p) {
			if (!this.propertiesMust(p)) return false;
			for (var i in p) {
				if (!_.isNumber(p[i])) {
					logger$1.warn('The attributes of userAdd need to be Number');
					return false
				}
			}
			return true
		}
	}, {
		key: "userAppendProperties",
		value: function userAppendProperties(p) {
			if (!this.propertiesMust(p)) return false;
			for (var i in p) {
				if (!_.isArray(p[i])) {
					logger$1.warn('The attribute of userAppend must be Array');
					return false
				}
			}
			return true
		}
	}]);
	return PropertyChecker
}();

function t(t, e, n) {
	return (e = p(e)) in t ? Object.defineProperty(t, e, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[e] = n, t
}

function e(t) {
	return function(t) {
		if (Array.isArray(t)) return r(t)
	}(t) || function(t) {
		if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array
			.from(t)
	}(t) || n(t) || function() {
		throw new TypeError(
			"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
			);
	}()
}

function n(t, e) {
	if (t) {
		if ("string" == typeof t) return r(t, e);
		var n = Object.prototype.toString.call(t).slice(8, -1);
		return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) :
			"Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(t, e) : void 0
	}
}

function r(t, e) {
	(null == e || e > t.length) && (e = t.length);
	for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
	return r
}

function o(t, e) {
	if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
	t.prototype = Object.create(e && e.prototype, {
		constructor: {
			value: t,
			writable: !0,
			configurable: !0
		}
	}), Object.defineProperty(t, "prototype", {
		writable: !1
	}), e && i(t, e)
}

function i(t, e) {
	return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
		return t.__proto__ = e, t
	}, i(t, e)
}

function a(t) {
	var e = function() {
		if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
		if (Reflect.construct.sham) return !1;
		if ("function" == typeof Proxy) return !0;
		try {
			return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
		} catch (t) {
			return !1
		}
	}();
	return function() {
		var n, r = s(t);
		if (e) {
			var o = s(this).constructor;
			n = Reflect.construct(r, arguments, o)
		} else n = r.apply(this, arguments);
		return u(this, n)
	}
}

function u(t, e) {
	if (e && ("object" === l(e) || "function" == typeof e)) return e;
	if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
	return c(t)
}

function c(t) {
	if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return t
}

function s(t) {
	return s = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
		return t.__proto__ || Object.getPrototypeOf(t)
	}, s(t)
}

function l(t) {
	return l = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
		return _typeof(t)
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" :
			_typeof(t)
	}, l(t)
}

function f(t, e) {
	if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function d(t, e) {
	for (var n = 0; n < e.length; n++) {
		var r = e[n];
		r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object
			.defineProperty(t, p(r.key), r)
	}
}

function v(t, e, n) {
	return e && d(t.prototype, e), n && d(t, n), Object.defineProperty(t, "prototype", {
		writable: !1
	}), t
}

function p(t) {
	var e = function(t, e) {
		if ("object" !== l(t) || null === t) return t;
		var n = t[Symbol.toPrimitive];
		if (void 0 !== n) {
			var r = n.call(t, e || "default");
			if ("object" !== l(r)) return r;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === e ? String : Number)(t)
	}(t, "string");
	return "symbol" === l(e) ? e : String(e)
}
var h, y, _$1 = "LOCAL_ID",
	g = "QUEUE_ACTIONS",
	m = "CLICK_ID",
	A = "QUEUE_LOST_MAP",
	R = "REMOTE_CONFIG",
	k = "REMOTE_COMMON_CONFIG",
	T = "OPENID",
	S = {
		init: "init",
		reporting: "reporting",
		fail: "fail"
	},
	E = {
		maxSdkInstance: 4,
		maxQueueLength: 500,
		actionParamMaxLength: 1e4,
		autoTrack: !0,
		reportThreshold: 5,
		reportDelay: 1,
		inspectDelay: 30,
		cgiBatchSize: 50,
		requestConcurrency: 4,
		requestTimeout: 1e4,
		signVersion: "1.0",
		realTimeActionList: ["START_APP", "REGISTER", "PURCHASE"]
	},
	b = {
		JS_RUN_ERROR: "JS_RUN_ERROR",
		REQUEST_ERROR: "REQUEST_ERROR",
		REQUEST_CONFIG_ERROR: "REQUEST_CONFIG_ERROR",
		JS_QUEUE_LOG: "JS_QUEUE_LOG",
		PROXY_ERROR: "PROXY_ERROR",
		PROXY_POLYFILL: "PROXY_POLYFILL",
		QUEUE_LOST_NUM: "QUEUE_LOST_NUM",
		REQ_TOTAL: "REQ_TOTAL",
		SIGN_ERROR: "SIGN_ERROR"
	},
	O = "ANDROID",
	I = "IOS",
	w = "WINDOWS",
	C = "OSX",
	x = "UNKNOWN",
	N = 1e3,
	L = 100,
	P = 10,
	M = "START_APP",
	D = "ENTER_FOREGROUND",
	U = "ENTER_BACKGROUND",
	q = "ADD_TO_WISHLIST",
	j = "PURCHASE",
	F = "APP_QUIT",
	B = "REGISTER",
	V = "CREATE_ROLE",
	K = "TUTORIAL_FINISH",
	G = "TRUE",
	Q = "FALSE",
	Y = "TENCENT",
	W = "BYTEDANCE",
	J = "KUAISHOU",
	H = "ALIBABA",
	z = "BAIDU",
	$ = "OTHERS",
	X = "UNKNOWN",
	Z = "TICKET_INTERVAL_CHANGE",
	tt$1 = (y = function y(t) {
		return "".concat("@dn-sdk/minigame", "_").concat("production", "_").concat(t)
	}, {
		getSync: function getSync(t) {
			var e;
			try {
				e = wx.getStorageSync(y(t))
			} catch (t) {
				return console.error("storage get error", t), e
			}
			return e
		},
		setSync: function setSync(t, e) {
			try {
				wx.setStorageSync(y(t), e)
			} catch (t) {
				return console.error("storage set error", t), !1
			}
			return !0
		}
	}),
	et = function et() {
		if (h) return h;
		try {
			return h = wx.getSystemInfoSync()
		} catch (t) {
			return {}
		}
	},
	nt = function() {
		var t;
		return function() {
			if (!t) {
				var e = et(),
					n = e.system,
					r = void 0 === n ? "" : n,
					o = (null == r ? void 0 : r.split(" ")) || [],
					i = function(t) {
						if (!t) return x;
						var e = (null == t ? void 0 : t.toUpperCase()) || "";
						return e.indexOf("ANDROID") > -1 ? O : e.indexOf("IOS") > -1 ? I : e.indexOf("MAC") > -1 ?
							C : e.indexOf("WINDOWS") > -1 ? w : x
					}(o[0]),
					a = function(t) {
						return !t || t.length <= 0 ? "" : 2 === t.length ? t[1] : 3 === t.length && "Windows" === t[
							0] ? "".concat(t[1], " ").concat(t[2]) : t[t.length - 1]
					}(o);
				t = {
					benchmark_level: e.benchmarkLevel,
					device_brand: e.brand,
					screen_height: Math.floor(e.screenHeight),
					screen_width: Math.floor(e.screenWidth),
					wx_lib_version: e.SDKVersion,
					wx_version: e.version,
					wx_platform: e.platform,
					device_model: e.model,
					os: i,
					os_version: a
				}
			}
			return t
		}
	}(),
	rt = function() {
		var t;
		return function() {
			try {
				if (t) return t;
				t || (t = tt$1.getSync(_$1) || ""), t || (t = mt(), tt$1.setSync(_$1, t))
			} catch (t) {}
			return t
		}
	}();
var ot = function() {
	var t = "unknown",
		e = !1;
	return function() {
		if (!e) try {
			wx.getNetworkType({
				success: function success(e) {
					t = e.networkType
				},
				fail: function fail() {
					t = "unknown"
				}
			}), wx.onNetworkStatusChange(function(e) {
				t = e.networkType
			}), e = !0
		} catch (t) {}
		return t
	}
}();
ot();
var it = function() {
		var t = "";
		return function() {
			return t || (t = tt$1.getSync(T) || ""), t
		}
	}(),
	at = function() {
		var t;
		return function() {
			if (t) return t;
			try {
				var e = wx.getAccountInfoSync();
				return ht(e.miniProgram) ? t = e.miniProgram : {}
			} catch (e) {
				return {}
			}
		}
	}();

function ut(t) {
	var e = null == t ? void 0 : t.query;
	if (!ht(e)) return "";
	var n = "";
	return e.gdt_vid || [1045, 1046, 1084].indexOf(null == t ? void 0 : t.scene) > -1 ? n = Y : e.clue_token || e
		.clickid && e.item_id ? n = W : e.callback && "kuaishou" === e.ksChannel ? n = J : e.bd_vid || e.ai && e.d && e
		.q && e.c ? n = z : e.uctrackid ? n = H : (e.trackid || e.imp || [1065, 1069, 1194].indexOf(null == t ? void 0 :
			t.scene) > -1 && (e.callback || e.u)) && (n = $), n
}

function ct(t, e) {
	try {
		var n = nt(),
			r = {
				sdk_version: "1.5.4",
				sdk_name: "@dn-sdk/minigame",
				device_brand: null == n ? void 0 : n.device_brand,
				device_model: null == n ? void 0 : n.device_model,
				wx_version: null == n ? void 0 : n.wx_version,
				wx_lib_version: null == n ? void 0 : n.wx_lib_version,
				wx_platform: null == n ? void 0 : n.wx_platform,
				os: null == n ? void 0 : n.os,
				os_version: null == n ? void 0 : n.os_version,
				local_id: rt()
			},
			o = Object.assign(r, t);
		wx.request({
			url: "https://api.datanexus.qq.com/data-nexus-trace/log",
			data: o,
			method: "POST",
			timeout: E.requestTimeout,
			success: function success(t) {
				"function" == typeof e && 200 === (null == t ? void 0 : t.statusCode) && e()
			}
		})
	} catch (n) {
		xt.error(n)
	}
}
var st = function() {
	function t() {
		f(this, t)
	}
	return v(t, null, [{
		key: "revise",
		value: function value(t) {
			t > 0 && !this.isRevised && (this.offsetTime = t - Date.now(), this.isRevised = !0)
		}
	}, {
		key: "getRevisedcurrentTimeMillis",
		value: function value() {
			return this.isRevised ? Date.now() + this.offsetTime : -1
		}
	}]), t
}();

function lt(t) {
	return new Promise(function(e, n) {
		wx.request({
			method: "POST",
			url: "https://api.datanexus.qq.com/data-nexus-config/v1/sdk/config/get",
			data: t,
			timeout: E.requestTimeout,
			success: function success(t) {
				ft(t, e, "config/get", n), vt(t)
			},
			fail: function fail(t) {
				dt(t, "config/get", n)
			}
		})
	})
}

function ft(t, e, n, r) {
	var o, i, a, u, c = null == t ? void 0 : t.statusCode,
		s = null == (o = null == t ? void 0 : t.data) ? void 0 : o.code;
	if (200 !== c || 0 !== s) {
		var l = s;
		200 !== c && (l = "number" == typeof c ? -1 * c : -888), ct({
			log_type: b.REQUEST_CONFIG_ERROR,
			message: "cgiName: ".concat(n, ", statusCode: ").concat(c, ", code: ").concat(s, ", traceid: ")
				.concat(null == (a = null == t ? void 0 : t.data) ? void 0 : a.trace_id),
			code: l
		}), null == r || r(null == (u = null == t ? void 0 : t.data) ? void 0 : u.data)
	} else e(null == (i = t.data) ? void 0 : i.data)
}

function dt(t, e, n) {
	ct({
		log_type: b.REQUEST_CONFIG_ERROR,
		message: "cgiName: ".concat(e, " , message: ").concat(null == t ? void 0 : t.errMsg, " "),
		code: "number" == typeof(null == t ? void 0 : t.errno) ? -1 * t.errno : -999
	}), null == n || n(t)
}

function vt(t) {
	var e, n = 1 * (null == (e = null == t ? void 0 : t.header) ? void 0 : e["Server-Time"]);
	n > 17266752e5 && st.revise(n)
}
st.offsetTime = 0, st.isRevised = !1;
var pt = Object.prototype.toString,
	ht = function ht(t) {
		return "[object Object]" === pt.call(t)
	},
	yt = function yt(t) {
		return "[object Array]" === pt.call(t)
	},
	_t = function _t(t) {
		return "[object Function]" === pt.call(t)
	},
	gt = new Date().getTime();

function mt() {
	var t = new Date().getTime(),
		e = Math.abs(1e3 * (t - gt));
	return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(n) {
		var r = 16 * Math.random();
		return t > 0 ? (r = (t + r) % 16 | 0, t = Math.floor(t / 16)) : (r = (e + r) % 16 | 0, e = Math.floor(
			e / 16)), ("x" === n ? r : 3 & r | 8).toString(16).replace(/-/g, "")
	})
}
var At =
	/^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,
	Rt = function Rt(t) {
		if ("string" != typeof t) throw new TypeError("Invalid argument expected string");
		if (!At.test(t)) throw new Error("Invalid argument not valid semver ('".concat(t, "' received)"));
	},
	kt = function kt(t) {
		return isNaN(Number(t)) ? t : Number(t)
	},
	Tt = function Tt(t) {
		var e = t.replace(/^v/, "").replace(/\+.*$/, ""),
			n = function(t, e) {
				return -1 === t.indexOf(e) ? t.length : t.indexOf(e)
			}(e, "-"),
			r = e.substring(0, n).split(".");
		return r.push(e.substring(n + 1)), r
	},
	St = function St(t, e) {
		[t, e].forEach(Rt);
		for (var n = Tt(t), r = Tt(e), o = 0; o < Math.max(n.length - 1, r.length - 1); o++) {
			var i = parseInt(n[o] || "0", 10),
				a = parseInt(r[o] || "0", 10);
			if (i > a) return 1;
			if (a > i) return -1
		}
		var u = n[n.length - 1],
			c = r[r.length - 1];
		if (u && c)
			for (var s = u.split(".").map(kt), l = c.split(".").map(kt), f = 0; f < Math.max(s.length, l.length); f++) {
				if (void 0 === s[f] || "string" == typeof l[f] && "number" == typeof s[f]) return -1;
				if (void 0 === l[f] || "string" == typeof s[f] && "number" == typeof l[f] || s[f] > l[f]) return 1;
				if (l[f] > s[f]) return -1
			} else if (u || c) return u ? -1 : 1;
		return 0
	},
	Et = function Et(t) {
		return ht(t) ? (function(t) {
				var e = ["user_action_set_id", "secret_key", "appid", "openid", "unionid", "user_unique_id",
					"auto_track", "auto_attr"
				];
				for (var n in t) e.includes(n) || xt.warn("Invalid property '".concat(n, "' found in config"))
			}(t), "number" != typeof t.user_action_set_id ? "user_action_set_id 参数需为 number 类型" : t
			.user_action_set_id <= 0 ? "user_action_set_id 参数需大于 0" : "string" != typeof t.secret_key ?
			"secret_key 参数需为 string 类型" : "" === t.secret_key.trim() ? "缺少 secret_key 参数" : 32 !== t.secret_key
			.length ? "secret_key 参数需为 32 位字符串" : "string" != typeof t.appid ? "appid 参数需为 string 类型" : "" !== t
			.appid.trim() || "缺少 appid") : "初始化参数需为 object 类型"
	};

function bt(t) {
	return Ot()[t]
}

function Ot() {
	return E
}

function It(t, e) {
	return Object.prototype.hasOwnProperty.call(t, e)
}
var wt = function wt(t) {
		try {
			return t && "string" == typeof t ? -1 === (t = t.replace(/\s/g, "")).indexOf(".") ? t : t.split(".").slice(
				0, 2).join(".") : ""
		} catch (e) {
			return t
		}
	},
	Ct = function() {
		function t() {
			f(this, t)
		}
		return v(t, null, [{
			key: "error",
			value: function value(t) {
				for (var e, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
					r[o - 1] = arguments[o];
				(e = console).error.apply(e, ["".concat("[@dn-sdk/minigame v1.5.4]", ": ").concat(t)]
					.concat(r))
			}
		}, {
			key: "info",
			value: function value(e) {
				for (var n, r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
					o[i - 1] = arguments[i];
				t.debug && (n = console).info.apply(n, ["".concat("[@dn-sdk/minigame v1.5.4]", ": ")
					.concat(e)
				].concat(o))
			}
		}, {
			key: "log",
			value: function value(e) {
				for (var n, r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
					o[i - 1] = arguments[i];
				t.debug && (n = console).log.apply(n, ["".concat("[@dn-sdk/minigame v1.5.4]", ": ")
					.concat(e)
				].concat(o))
			}
		}, {
			key: "warn",
			value: function value(t) {
				for (var e, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
					r[o - 1] = arguments[o];
				(e = console).warn.apply(e, ["".concat("[@dn-sdk/minigame v1.5.4]", ": ").concat(t)]
					.concat(r))
			}
		}, {
			key: "devLog",
			value: function value(e) {
				for (var n, r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
					o[i - 1] = arguments[i];
				t.isDev && (n = console).log.apply(n, ["".concat("[@dn-sdk/minigame v1.5.4]", ": ")
					.concat(e)
				].concat(o))
			}
		}]), t
	}(),
	xt = Ct;
xt.debug = !1, xt.isDev = !1;
var Nt = function() {
	var t;
	return function() {
		if (!t) try {
			var e = wx.getLaunchOptionsSync(),
				n = e.query.gdt_vid || "";
			n ? tt$1.setSync(m, n) : n = tt$1.getSync(m) || "";
			var r = JSON.stringify(e);
			r.length > 1e4 && (r = JSON.stringify({
				cut: 1,
				scene: e.scene
			})), t = {
				source_scene: e.scene,
				pkg_channel_id: e.query.wxgamepro || "",
				ad_trace_id: n,
				launch_options: r,
				channel: ut(e)
			}
		} catch (e) {
			t = {}, xt.log("获取场景值和渠道号失败", e)
		}
		return t
	}
}();

function Lt(t, e, n) {
	var r = n.value;
	return n.value = function() {
		for (var n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];
		try {
			return r.apply(this, o)
		} catch (n) {
			try {
				xt.error.apply(xt, ["calling ".concat(t.constructor.name, ".").concat(e, " error with arguments")]
					.concat(o)), xt.error(n);
				var a = {
					log_type: b.JS_RUN_ERROR,
					message: "[safeExcutable] ".concat(t.constructor.name, ".").concat(e, ": ").concat(null ==
						n ? void 0 : n.message),
					err_stack: null == n ? void 0 : n.stack
				};
				_t(this.reportLog) ? this.reportLog(a) : ct(a)
			} catch (a) {}
		}
	}, n
}
var Pt = function Pt(t, e, n) {
		var r = n.value;
		return n.value = function() {
			if (this.inited) {
				for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
				return r.apply(this, e)
			}
			xt.error("上报失败，请先完成初始化")
		}, n
	},
	Mt = Object.defineProperty,
	Dt = Object.getOwnPropertyDescriptor,
	Ut = function Ut(t, e, n, r) {
		for (var o, i = r > 1 ? void 0 : r ? Dt(e, n) : e, a = t.length - 1; a >= 0; a--)(o = t[a]) && (i = (r ? o(e, n,
			i) : o(i)) || i);
		return r && i && Mt(e, n, i), i
	},
	qt = function() {
		function t(e) {
			var n = e.userActionSetId,
				r = e.maxLength,
				o = void 0 === r ? 500 : r;
			f(this, t), this.lostActionMaps = {}, this.stack = [], this.localStorageKey = "", this.localStorageKey = ""
				.concat(g, "_").concat(null == n ? void 0 : n.toString()), this.maxLength = o, this.userActionSetId = n,
				this.setTimeStamp(), this.init()
		}
		return v(t, [{
			key: "getItems",
			value: function value() {
				return this.stack
			}
		}, {
			key: "getStorage",
			value: function value() {
				var t, e = (null == (t = tt$1) ? void 0 : t.getSync(this.localStorageKey)) || "[]";
				return JSON.parse(e)
			}
		}, {
			key: "reportLostNum",
			value: function value() {
				var t = this,
					e = Object.assign({}, this.lostActionMaps),
					n = [];
				for (var r in e) {
					var o = null == r ? void 0 : r.split("_");
					n.push({
						queue_lost_session_id: o[0],
						queue_lost_timestamp: o[1],
						queue_lost_num: e[r]
					})
				}
				n.length && (this.setTimeStamp(), n.forEach(function(e) {
					var n = Object.assign({}, {
							user_action_set_id: t.userActionSetId,
							log_type: b.QUEUE_LOST_NUM
						}, e),
						r = null == e ? void 0 : e.queue_lost_session_id,
						o = null == e ? void 0 : e.queue_lost_timestamp,
						i = "".concat(r, "_").concat(o);
					ct(n, function() {
						It(t.lostActionMaps, i) && (delete t.lostActionMaps[i], tt$1
							.setSync(A, JSON.stringify(t.lostActionMaps)))
					})
				}))
			}
		}, {
			key: "getLostMaps",
			value: function value() {
				return this.lostActionMaps
			}
		}, {
			key: "init",
			value: function value() {
				var t = this,
					e = this.getStorage(),
					n = null == e ? void 0 : e.map(function(t) {
						var e, n;
						return t.inner_status === (null == (e = S) ? void 0 : e.reporting) ? Object
							.assign({}, t, {
								inner_status: null == (n = S) ? void 0 : n.fail,
								is_retry: !0,
								retry_count: t.retry_count + 1
							}) : t
					});
				this.stack = n, this.lostActionMaps = JSON.parse(tt$1.getSync(A) || "{}"), setTimeout(
					function() {
						t.reportLostNum()
					}, 1e3)
			}
		}, {
			key: "addItem",
			value: function value(t) {
				var e;
				null == (e = null == this ? void 0 : this.stack) || e.push(t)
			}
		}, {
			key: "removeItems",
			value: function value(t) {
				var e, n = null == (e = null == this ? void 0 : this.stack) ? void 0 : e.filter(
					function(e) {
						return !(null != t && t.includes(null == e ? void 0 : e.action_id))
					});
				this.stack = n
			}
		}, {
			key: "updateForReportFail",
			value: function value(t) {
				var e;
				this.stack = null == (e = this.stack) ? void 0 : e.map(function(e) {
					var n;
					return null != t && t.includes(null == e ? void 0 : e.action_id) ? Object
						.assign({}, e, {
							inner_status: null == (n = S) ? void 0 : n.fail,
							retry_count: e.retry_count + 1,
							is_retry: !0
						}) : e
				})
			}
		}, {
			key: "updateForReporting",
			value: function value(t) {
				var e;
				this.stack = null == (e = this.stack) ? void 0 : e.map(function(e) {
					var n;
					return null != t && t.includes(null == e ? void 0 : e.action_id) ? Object
						.assign({}, e, {
							inner_status: null == (n = S) ? void 0 : n.reporting
						}) : e
				})
			}
		}, {
			key: "updateAllStack",
			value: function value(t) {
				this.stack = t
			}
		}, {
			key: "updateToStorage",
			value: function value() {
				tt$1.setSync(this.localStorageKey, JSON.stringify(this.stack))
			}
		}, {
			key: "updateLostAction",
			value: function value(t) {
				if (t) {
					var e = "".concat(t, "_").concat(this.timeStamp),
						n = this.lostActionMaps[e] || 0;
					this.lostActionMaps[e] = n + 1, tt$1.setSync(A, JSON.stringify(this.lostActionMaps))
				}
			}
		}, {
			key: "setTimeStamp",
			value: function value() {
				this.timeStamp = Date.now().toString()
			}
		}]), t
	}();
Ut([Lt], qt.prototype, "getItems", 1), Ut([Lt], qt.prototype, "getStorage", 1), Ut([Lt], qt.prototype, "reportLostNum",
	1), Ut([Lt], qt.prototype, "getLostMaps", 1), Ut([Lt], qt.prototype, "init", 1), Ut([Lt], qt.prototype,
	"addItem", 1), Ut([Lt], qt.prototype, "removeItems", 1), Ut([Lt], qt.prototype, "updateForReportFail", 1), Ut([
	Lt
], qt.prototype, "updateForReporting", 1), Ut([Lt], qt.prototype, "updateAllStack", 1), Ut([Lt], qt.prototype,
	"updateToStorage", 1), Ut([Lt], qt.prototype, "updateLostAction", 1);
var jt = Object.defineProperty,
	Ft = Object.getOwnPropertyDescriptor,
	Bt = function Bt(t, e, n, r) {
		for (var o, i = r > 1 ? void 0 : r ? Ft(e, n) : e, a = t.length - 1; a >= 0; a--)(o = t[a]) && (i = (r ? o(e, n,
			i) : o(i)) || i);
		return r && i && jt(e, n, i), i
	},
	Vt = function(t) {
		o(n, qt);
		var e = a(n);

		function n(t) {
			var r, o = t.userActionSetId,
				i = t.maxLength,
				a = void 0 === i ? 500 : i,
				u = t.ogEvents,
				c = void 0 === u ? [] : u;
			return f(this, n), (r = e.call(this, {
				userActionSetId: o,
				maxLength: a
			})).ogEvents = c, r
		}
		return v(n, [{
			key: "getReportableActions",
			value: function value() {
				var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100,
					e = this.getItems(),
					n = [];
				return null == e || e.forEach(function(e) {
					var r;
					(null == n ? void 0 : n.length) < t && (null == e ? void 0 : e
						.inner_status) !== (null == (r = S) ? void 0 : r.reporting) && (null ==
							n || n.push(e))
				}), n
			}
		}, {
			key: "addAction",
			value: function value(t) {
				var e = this.getItems();
				if ((null == e ? void 0 : e.length) >= this.maxLength) {
					var n = "队列长度超过最大限制".concat(this.maxLength, "条，SDK将按照行为优先级排序，丢弃优先级最低的行为事件");
					xt.warn(n), ct({
						user_action_set_id: this.userActionSetId,
						log_type: b.JS_QUEUE_LOG,
						message: n
					});
					var r = this.sortQueue(t, e);
					xt.debug && xt.info("超过".concat(this.maxLength, "条按优先级排序的队列："), r.concat([]));
					var o = r.pop();
					this.updateAllStack(r), this.updateLostAction((null == o ? void 0 : o.session_id) ||
						"")
				} else this.addItem(t);
				this.updateToStorage()
			}
		}, {
			key: "removeActions",
			value: function value(t) {
				this.removeItems(t), this.updateToStorage()
			}
		}, {
			key: "updateActionsForReportFail",
			value: function value(t) {
				this.updateForReportFail(t), this.updateToStorage()
			}
		}, {
			key: "updateActionsForReporting",
			value: function value(t) {
				this.updateForReporting(t), this.updateToStorage()
			}
		}, {
			key: "getReportableActionsLength",
			value: function value() {
				var t = this.getItems().filter(function(t) {
					var e;
					return (null == t ? void 0 : t.inner_status) !== (null == (e = S) ? void 0 :
						e.reporting)
				});
				return null == t ? void 0 : t.length
			}
		}, {
			key: "sortQueue",
			value: function value(t, e) {
				var n = this,
					r = {},
					o = null == t ? void 0 : t.action_time,
					i = e.concat([t]),
					a = function a(t) {
						return r[t.action_id] || (r[t.action_id] = n.caculateWeight(o, t)), r[t
							.action_id]
					};
				return i.sort(function(t, e) {
					return a(e) - a(t)
				})
			}
		}, {
			key: "caculateWeight",
			value: function value(t, e) {
				var n, r = 0,
					o = this.formatWeight(t, null == e ? void 0 : e.action_time),
					i = o.ogWeight,
					a = o.sdkWeight,
					u = o.userWeight;
				null != (n = this.ogEvents) && n.includes(null == e ? void 0 : e.action_type) && (r +=
					i), null != e && e.is_sdk_auto_track ? r += a : r += u;
				var c = t - (null == e ? void 0 : e.action_time) + 1;
				return r = c > 0 ? r + 1 / c : r
			}
		}, {
			key: "formatWeight",
			value: function value(t, e) {
				var n = N,
					r = P,
					o = L;
				return t - e > 2592e6 && (n /= 100, r /= 100, o /= 100), {
					ogWeight: n,
					sdkWeight: r,
					userWeight: o
				}
			}
		}]), n
	}();
Bt([Lt], Vt.prototype, "getReportableActions", 1), Bt([Lt], Vt.prototype, "addAction", 1), Bt([Lt], Vt.prototype,
	"removeActions", 1), Bt([Lt], Vt.prototype, "updateActionsForReportFail", 1), Bt([Lt], Vt.prototype,
	"updateActionsForReporting", 1), Bt([Lt], Vt.prototype, "getReportableActionsLength", 1), Bt([Lt], Vt.prototype,
	"sortQueue", 1), Bt([Lt], Vt.prototype, "caculateWeight", 1), Bt([Lt], Vt.prototype, "formatWeight", 1);
var Kt = function() {
		function t() {
			f(this, t), this.events = {}
		}
		return v(t, [{
			key: "subscribe",
			value: function value(e, n) {
				t.checkCallback(n), yt(this.events[e]) ? this.events[e].push(n) : this.events[e] = [n]
			}
		}, {
			key: "once",
			value: function value(e, n) {
				t.checkCallback(n), this.subscribe(this.onceEventName(e), n)
			}
		}, {
			key: "unsubscribe",
			value: function value(e, n) {
				t.checkCallback(n), yt(this.events[e]) && (this.events[e] = this.events[e].filter(
					function(t) {
						return t !== n
					})), yt(this.events[this.onceEventName(e)]) && (this.events[this.onceEventName(
					e)] = this.events[this.onceEventName(e)].filter(function(t) {
					return t !== n
				}))
			}
		}, {
			key: "publish",
			value: function value(t) {
				for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[
					r - 1] = arguments[r];
				var o = Date.now();
				yt(this.events[t]) && this.events[t].forEach(function(t) {
					return t.apply(void 0, [o].concat(n))
				}), yt(this.events[this.onceEventName(t)]) && (this.events[this.onceEventName(t)]
					.forEach(function(t) {
						return t.apply(void 0, [o].concat(n))
					}), this.events[this.onceEventName(t)] = [])
			}
		}, {
			key: "onceEventName",
			value: function value(t) {
				return "once_event_prefix_".concat(t)
			}
		}], [{
			key: "checkCallback",
			value: function value(e) {
				_t(e) || xt.error(t.ERROR_CALLBACK_IS_NOT_A_FUNCTION)
			}
		}]), t
	}(),
	Gt = Kt;
Gt.ERROR_CALLBACK_IS_NOT_A_FUNCTION = "callback 不是函数";
var Qt = new Gt(),
	Yt = ["REGISTER", "VIEW_CONTENT", "ADD_TO_CART", "PURCHASE", "COMPLETE_ORDER", "ADD_TO_WISHLIST", "START_APP",
		"CREATE_ROLE", "AUTHORIZE", "TUTORIAL_FINISH", "START_PAY", "FINISH_PAY"
	],
	Wt = "START_APP",
	Jt = "TICKET",
	Ht = "ENTER_FOREGROUND",
	zt = "ENTER_BACKGROUND",
	$t = "LOGIN",
	Xt = "SHARE",
	Zt = "TAP_GAME_CLUB",
	te = "CREATE_GAME_CLUB",
	ee = "CREATE_GAME_ROOM",
	ne = "JOIN_GAME_ROOM",
	re = "FINISH_PAY",
	oe = "START_PAY",
	ie = "ADD_TO_WISHLIST",
	ae = ["REGISTER", "START_APP", "RE_ACTIVE"],
	ue = ["TICKET", "ENTER_FOREGROUND", "ENTER_BACKGROUND"],
	ce = function() {
		function t() {
			f(this, t), this.channelClaimActionList = ae, this.noClaimActionList = ue, this.realTimeActionList = E
				.realTimeActionList, this.ticketInterval = 60, this.requestTimeout = E.requestTimeout, this.loadConfig()
		}
		return v(t, [{
			key: "getChannelClaimActionList",
			value: function value() {
				return this.channelClaimActionList
			}
		}, {
			key: "getNoClaimActionList",
			value: function value() {
				return this.noClaimActionList
			}
		}, {
			key: "getRealTimeActionList",
			value: function value() {
				return this.realTimeActionList
			}
		}, {
			key: "getTicketInterval",
			value: function value() {
				return this.ticketInterval
			}
		}, {
			key: "getRequestTimeout",
			value: function value() {
				return this.requestTimeout
			}
		}, {
			key: "loadConfig",
			value: function value() {
				var t = this;
				try {
					if ("undefined" == typeof wx) return;
					var e = tt$1.getSync(k);
					e && this.updateConfig(e), lt({
						conf_name: "mini_game_sdk_common",
						conf_key: "config"
					}).then(function(e) {
						e && ht(e) && (t.updateConfig(e), tt$1.setSync(k, e))
					})
				} catch (e) {
					console.error(e)
				}
			}
		}, {
			key: "updateConfig",
			value: function value(t) {
				t.channelClaimActionList && yt(t.channelClaimActionList) && (this
						.channelClaimActionList = t.channelClaimActionList), t.noClaimActionList && yt(t
						.noClaimActionList) && (this.noClaimActionList = t.noClaimActionList), t
					.realTimeActionList && yt(t.realTimeActionList) && (this.realTimeActionList = t
						.realTimeActionList), t.ticketInterval && "number" == typeof t.ticketInterval &&
					t.ticketInterval > 1 && t.ticketInterval !== this.ticketInterval && (this
						.ticketInterval = t.ticketInterval, Qt.publish(Z)), t.requestTimeout &&
					"number" == typeof t.requestTimeout && t.requestTimeout > 5e3 && (this
						.requestTimeout = t.requestTimeout)
			}
		}]), t
	}(),
	se = new ce(),
	le = Wt,
	fe = Jt,
	de = Ht,
	ve = zt,
	pe = function() {
		var t = !1,
			e = !1,
			n = !0,
			r = !0,
			o = !0,
			i = !1;
		return function() {
			if (!i) {
				i = !0;
				var a = tt$1.getSync(R);
				if ((null == a ? void 0 : a.bg) === G ? t = !0 : (null == a ? void 0 : a.bg) === Q && (t = !1), (
						null == a ? void 0 : a.fg) === G ? e = !0 : (null == a ? void 0 : a.fg) === Q && (e = !1), (
						null == a ? void 0 : a.st) === G ? n = !0 : (null == a ? void 0 : a.st) === Q && (n = !1), (
						null == a ? void 0 : a.ti) === G ? r = !0 : (null == a ? void 0 : a.ti) === Q && (r = !1),
					xt.devLog("当前缓存开关 bgOn，fgOn，stOn，tiOn：", t, e, n, r), n && Qt.publish(le), r) {
					var u = function u() {
							o && Qt.publish(fe)
						},
						c = setInterval(u, 1e3 * se.getTicketInterval());
					Qt.subscribe(Z, function() {
						c && clearInterval(c), c = setInterval(u, 1e3 * se.getTicketInterval())
					})
				}
				wx.onShow(function(t) {
					if (o = !0, e) {
						var n = "";
						try {
							(n = JSON.stringify(t)).length > 1e4 && (n = JSON.stringify({
								cut: 1,
								scene: t.scene
							}))
						} catch (t) {}
						Qt.publish(de, {
							enter_options: n
						})
					}
				}), wx.onHide(function() {
					o = !1, t && Qt.publish(ve)
				})
			}
		}
	}(),
	he = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" !=
	typeof global ? global : "undefined" != typeof self ? self : {};

function ye(t) {
	return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t["default"] : t
}
var _e, ge = ye(function() {
		var _t2, e = null;

		function n(t) {
			return !!t && ("object" == l(t) || "function" == typeof t)
		}

		function r(t) {
			if (null !== t && !n(t)) throw new TypeError("Object prototype may only be an Object or null: " + t);
		}
		var o = Object,
			i = !(!o.create && {
					__proto__: null
				}
				instanceof o),
			a = o.create || (i ? function(t) {
				return r(t), {
					__proto__: t
				}
			} : function(t) {
				if (r(t), null === t) throw new SyntaxError(
					"Native Object.create is required to create objects with null prototype");
				var e = function e() {};
				return e.prototype = t, new e()
			}),
			u = function u() {
				return null
			},
			c = o.getPrototypeOf || ([].__proto__ === Array.prototype ? function(t) {
				var e = t.__proto__;
				return n(e) ? e : null
			} : u);
		return _t2 = function t(s, l) {
			if (void 0 === (this && this instanceof _t2 ? this.constructor : void 0)) throw new TypeError(
				"Constructor Proxy requires 'new'");
			if (!n(s) || !n(l)) throw new TypeError(
				"Cannot create proxy with a non-object as target or handler");
			var f = function f() {};
			e = function e() {
				s = null, f = function f(t) {
					throw new TypeError("Cannot perform '".concat(t,
						"' on a proxy that has been revoked"));
				}
			}, setTimeout(function() {
				e = null
			}, 0);
			var d = l;
			for (var v in l = {
					get: null,
					set: null,
					apply: null,
					construct: null
				}, d) {
				if (!(v in l)) throw new TypeError("Proxy polyfill does not support trap '".concat(v, "'"));
				l[v] = d[v]
			}
			"function" == typeof d && (l.apply = d.apply.bind(d));
			var _p, h = c(s),
				y = !1,
				_ = !1;
			"function" == typeof s ? (_p = function p() {
				var t = this && this.constructor === _p,
					e = Array.prototype.slice.call(arguments);
				return f(t ? "construct" : "apply"), t && l.construct ? l.construct.call(this, s, e) : !
					t && l.apply ? l.apply(s, this, e) : t ? (e.unshift(s), new(s.bind.apply(s, e))()) :
					s.apply(this, e)
			}, y = !0) : s instanceof Array ? (_p = [], _ = !0) : _p = i || null !== h ? a(h) : {};
			var g = l.get ? function(t) {
					return f("get"), l.get(this, t, _p)
				} : function(t) {
					return f("get"), this[t]
				},
				m = l.set ? function(t, e) {
					f("set"), l.set(this, t, e, _p)
				} : function(t, e) {
					f("set"), this[t] = e
				},
				A = o.getOwnPropertyNames(s),
				R = {};
			A.forEach(function(t) {
				if (!y && !_ || !(t in _p)) {
					var e = {
						enumerable: !!o.getOwnPropertyDescriptor(s, t).enumerable,
						get: g.bind(s, t),
						set: m.bind(s, t)
					};
					o.defineProperty(_p, t, e), R[t] = !0
				}
			});
			var k = !0;
			if (y || _) {
				var T = o.setPrototypeOf || ([].__proto__ === Array.prototype ? function(t, e) {
					return r(e), t.__proto__ = e, t
				} : u);
				h && T(_p, h) || (k = !1)
			}
			if (l.get || !k)
				for (var S in s) R[S] || o.defineProperty(_p, S, {
					get: g.bind(s, S)
				});
			return o.seal(s), o.seal(_p), _p
		}, _t2.revocable = function(n, r) {
			return {
				proxy: new _t2(n, r),
				revoke: e
			}
		}, _t2
	}),
	me = {};
try {
	_e || (_e = ge())
} catch (h) {
	Se(h)
}

function Ae(t, n, r, o) {
	try {
		if (!_e || null == t || !t[n]) return;
		t[n] = new _e(t[n], {
			apply: function apply(t, n, i) {
				var a, u;
				o && Te(function() {
					return o.apply(void 0, e(i))
				});
				var c = !!(null != (a = i[0]) && a.success || null != (u = i[0]) && u.fail);
				c && ["success", "fail"].forEach(function(t) {
					if (i[0][t]) try {
						i[0][t] = new _e(i[0][t], {
							apply: function apply(n, o, a) {
								return Te(function() {
									return r.apply(void 0, [t, i[0]].concat(
										e(a)))
								}), n.apply(o, a)
							}
						})
					} catch (t) {
						Se(t)
					}
				});
				var s = t.apply(n, i);
				return !c && s && "[object Promise]" === Object.prototype.toString.call(s) ? s.then(
					function(t) {
						return Te(function() {
							return r("success", i[0], t)
						}), t
					})["catch"](function(t) {
					throw Te(function() {
						return r("fail", i[0], t);
					}), t
				}) : s
			}
		})
	} catch (t) {
		Se(t)
	}
}

function Re(t, n, r) {
	try {
		if (!_e || null == t || !t[n]) return;
		t[n] = new _e(t[n], {
			apply: function apply(t, n, o) {
				var i = "function" == typeof o[0];
				if (i) try {
					o[0] = new _e(o[0], {
						apply: function apply(t, n, o) {
							var i = t.call.apply(t, [n].concat(e(o)));
							return Te(function() {
								return r(i)
							}), i
						}
					})
				} catch (t) {
					Se(t)
				}
				var a = t.call.apply(t, [n].concat(e(o)));
				return i || Te(function() {
					return r(a)
				}), a
			}
		})
	} catch (t) {
		Se(t)
	}
}

function ke(t) {
	var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
		r = arguments.length > 2 ? arguments[2] : void 0,
		o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [],
		i = arguments.length > 4 ? arguments[4] : void 0;
	try {
		if (!_e || null == t || !t[n]) return;
		t[n] = new _e(t[n], {
			apply: function apply(t, a, u) {
				var c = t.call.apply(t, [a].concat(e(u)));
				return (!r || !me[n]) && (Te(function() {
					return null == i ? void 0 : i(c)
				}), o.forEach(function(t) {
					var e = t.eventName,
						n = t.isAsync,
						r = t.proxyEvent;
					n ? Ae(c, e, r) : Re(c, e, r)
				})), r && (me[n] = !0), c
			}
		})
	} catch (t) {
		Se(t)
	}
}

function Te(t) {
	try {
		t()
	} catch (t) {
		Se(t)
	}
}

function Se(t) {
	ct({
		log_type: b.PROXY_ERROR,
		message: null == t ? void 0 : t.message,
		err_stack: null == t ? void 0 : t.stack
	})
}
var Ee = $t,
	be = ie,
	Oe = Xt,
	Ie = Zt,
	we = te,
	Ce = ne,
	xe = oe,
	Ne = re,
	Le = function() {
		var t = !1;
		return function() {
			t || (t = !0, Ae(wx, "login", function(t) {
				"success" === t && Qt.publish(Ee)
			}), Re(wx, "onAddToFavorites", function() {
				Qt.publish(be)
			}), Re(wx, "onShareTimeline", function() {
				Qt.publish(Oe, {
					target: "TIME_LINE",
					trigger: "MENU"
				})
			}), Re(wx, "onShareAppMessage", function() {
				Qt.publish(Oe, {
					target: "APP_MESSAGE",
					trigger: "MENU"
				})
			}), Re(wx, "shareAppMessage", function() {
				Qt.publish(Oe, {
					target: "APP_MESSAGE",
					trigger: "BUTTON"
				})
			}), ke(wx, "createGameClubButton", !1, [{
				isAsync: !1,
				eventName: "onTap",
				proxyEvent: function proxyEvent() {
					Qt.publish(Ie)
				}
			}], function() {
				Qt.publish(we)
			}), ke(wx, "getGameServerManager", !0, [{
				isAsync: !0,
				eventName: "createRoom",
				proxyEvent: function proxyEvent(t) {
					"success" === t && Qt.publish("CREATE_GAME_ROOM")
				}
			}, {
				isAsync: !0,
				eventName: "joinRoom",
				proxyEvent: function proxyEvent(t) {
					"success" === t && Qt.publish(Ce)
				}
			}]), Ae(wx, "requestMidasPayment", function(t, e) {
				Qt.publish(Ne, {
					status: "success" === t ? "SUCCESS" : "FAIL",
					quantity: (null == e ? void 0 : e.buyQuantity) || 0,
					mode: (null == e ? void 0 : e.mode) || "",
					platform: (null == e ? void 0 : e.platform) || "",
					no: (null == e ? void 0 : e.outTradeNo) || "",
					payType: "Midas"
				})
			}, function(t) {
				Qt.publish(xe, {
					quantity: (null == t ? void 0 : t.buyQuantity) || 0,
					mode: (null == t ? void 0 : t.mode) || "",
					platform: (null == t ? void 0 : t.platform) || "",
					no: (null == t ? void 0 : t.outTradeNo) || "",
					payType: "Midas"
				})
			}), Ae(wx, "requestMidasPaymentGameItem", function(t, e) {
				var n = (e || {}).signData;
				Qt.publish(Ne, {
					status: "success" === t ? "SUCCESS" : "FAIL",
					quantity: (null == n ? void 0 : n.buyQuantity) || 0,
					mode: (null == n ? void 0 : n.mode) || "",
					platform: (null == n ? void 0 : n.platform) || "",
					no: (null == n ? void 0 : n.outTradeNo) || "",
					p: (null == n ? void 0 : n.goodsPrice) || 0,
					productId: (null == n ? void 0 : n.productId) || "",
					payType: "MidasGameItem"
				})
			}, function(t) {
				var e = (t || {}).signData;
				Qt.publish(xe, {
					quantity: (null == e ? void 0 : e.buyQuantity) || 0,
					mode: (null == e ? void 0 : e.mode) || "",
					platform: (null == e ? void 0 : e.platform) || "",
					no: (null == e ? void 0 : e.outTradeNo) || "",
					p: (null == e ? void 0 : e.goodsPrice) || 0,
					productId: (null == e ? void 0 : e.productId) || "",
					payType: "MidasGameItem"
				})
			}))
		}
	}(),
	Pe = function() {
		function t() {
			f(this, t)
		}
		return v(t, null, [{
			key: "isEmpty",
			value: function value(t) {
				return !t || "" === t.trim()
			}
		}, {
			key: "format",
			value: function value(t) {
				for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[
					r - 1] = arguments[r];
				return t.replace(/\${(\d+)}/g, function(t, e) {
					return n[e]
				})
			}
		}, {
			key: "customStringify",
			value: function value(t) {
				var e = [];
				try {
					return JSON.stringify(t, function(t, n) {
						if (void 0 === n) return "undefined";
						if ("object" == l(n) && null !== n) {
							if (-1 !== e.indexOf(n)) return "[Circular]";
							e.push(n)
						}
						return "bigint" == typeof n ? n.toString() : n
					})
				} catch (t) {
					return "[Param Error]"
				}
			}
		}]), t
	}(),
	Me = /^([a-zA-Z][a-zA-Z\d_]{0,63})$/i,
	De = /^ams_reserved_(.*)/i,
	Ue = function() {
		function t() {
			f(this, t)
		}
		return v(t, null, [{
			key: "validateActionType",
			value: function value(e) {
				return Pe.isEmpty(e) ? (xt.error(t.ERROR_ACTION_TYPE_NULL), !1) : !!Me.test(e) || (xt
					.error(t.ERROR_ACTION_TYPE_INVALID), !1)
			}
		}, {
			key: "validateActionParam",
			value: function value(e) {
				if (!e) return !0;
				if (!ht(e)) return xt.error(t.ERROR_ACTION_PARAM_IS_NOT_OBJECT), !1;
				for (var n in e) {
					if (Pe.isEmpty(n)) return xt.error(t.ERROR_ACTION_PARAM_KEY_NULL), !1;
					if (!Me.test(n)) return xt.error(t.ERROR_ACTION_PARAM_KEY_INVALID), !1;
					De.test(n) && xt.warn(t.WARN_ACTION_PARAM_KEY_RESERVED);
					var r = e[n];
					if (!t.isValidValue(r)) return xt.error(Pe.format(t
						.ERROR_ACTION_PARAM_VALUE_INVALID, n, r)), !1;
					if (yt(r)) {
						if (!t.isValidArrayValue(r)) {
							for (var o = 0; o < r.length; o++) xt.error(Pe.format(t
								.ERROR_ACTION_PARAM_VALUE_ARRAY_INVALID, n, Pe.customStringify(
									r), o, r[o]));
							return !1
						}
						if (!t.checkArrayElementTypes(r)) return xt.error(t
							.ERROR_ACTION_PARAM_VALUE_ARRAY_TYPE_UNUNIQUE), !1
					}
				}
				return !0
			}
		}, {
			key: "isValidValue",
			value: function value(t) {
				return null == t || "string" == typeof t || "number" == typeof t || "boolean" ==
					typeof t || yt(t)
			}
		}, {
			key: "isValidArrayValue",
			value: function value(t) {
				for (var e = 0; e < t.length; e++) {
					var n = t[e];
					if ("string" != typeof n && "number" != typeof n && "boolean" != typeof n) return !1
				}
				return !0
			}
		}, {
			key: "checkArrayElementTypes",
			value: function value(t) {
				if (!t || t.length <= 1) return !0;
				for (var e = l(t[0]), n = 1; n < t.length; n++)
					if (l(t[n]) !== e) return !1;
				return !0
			}
		}]), t
	}(),
	qe = Ue;
qe.ERROR_ACTION_TYPE_NULL = "在track方法中，action_type参数不能为空！", qe.ERROR_ACTION_TYPE_INVALID =
	"在track方法中，action_type参数只能包含字母、数字和下划线，且只能以字母开头，长度不能超过64个字符！", qe.ERROR_ACTION_PARAM_KEY_NULL =
	"在track方法中，action_param参数的key不能为空！", qe.ERROR_ACTION_PARAM_KEY_INVALID =
	"在track方法中，action_param参数的key只能包含字母、数字和下划线，且不能以数字开头，长度不能超过64个字符！", qe.WARN_ACTION_PARAM_KEY_RESERVED =
	"SDK内部预留参数的key均以'ams_reserved_'开头，该参数的值会被SDK内部覆盖，请不要使用！", qe.ERROR_ACTION_PARAM_VALUE_INVALID =
	"在track方法中，action_param参数的value必须是String/Number/Boolean/Array中的一种！[key=${0}, value=${1}]", qe
	.ERROR_ACTION_PARAM_VALUE_ARRAY_INVALID =
	"在track方法中，如果action_param参数中的某个元素的value是Array，那么这个Array中的每个元素必须是String/Number/Boolean中的一种！[key=${0}, value=${1}, 数组的第${2}个元素为${3}]",
	qe.ERROR_ACTION_PARAM_VALUE_ARRAY_TYPE_UNUNIQUE =
	"在track方法中，如果action_param参数中的某个元素的value是Array，那么这个Array中所有元素的类型必须是同一种！", qe.ERROR_ACTION_PARAM_IS_NOT_OBJECT =
	"action_param 参数不是Object";
var je = {
	exports: {}
};
! function(t) {
	! function(e) {
		function n(t, e) {
			var n = (65535 & t) + (65535 & e);
			return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
		}

		function r(t, e, r, o, i, a) {
			return n(function(t, e) {
				return t << e | t >>> 32 - e
			}(n(n(e, t), n(o, a)), i), r)
		}

		function o(t, e, n, o, i, a, u) {
			return r(e & n | ~e & o, t, e, i, a, u)
		}

		function i(t, e, n, o, i, a, u) {
			return r(e & o | n & ~o, t, e, i, a, u)
		}

		function a(t, e, n, o, i, a, u) {
			return r(e ^ n ^ o, t, e, i, a, u)
		}

		function u(t, e, n, o, i, a, u) {
			return r(n ^ (e | ~o), t, e, i, a, u)
		}

		function c(t, e) {
			t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
			var r, c, s, l, f, d = 1732584193,
				v = -271733879,
				p = -1732584194,
				h = 271733878;
			for (r = 0; r < t.length; r += 16) c = d, s = v, l = p, f = h, d = o(d, v, p, h, t[r], 7, -680876936), h =
				o(h, d, v, p, t[r + 1], 12, -389564586), p = o(p, h, d, v, t[r + 2], 17, 606105819), v = o(v, p, h, d,
					t[r + 3], 22, -1044525330), d = o(d, v, p, h, t[r + 4], 7, -176418897), h = o(h, d, v, p, t[r + 5],
					12, 1200080426), p = o(p, h, d, v, t[r + 6], 17, -1473231341), v = o(v, p, h, d, t[r + 7], 22, -
					45705983), d = o(d, v, p, h, t[r + 8], 7, 1770035416), h = o(h, d, v, p, t[r + 9], 12, -1958414417),
				p = o(p, h, d, v, t[r + 10], 17, -42063), v = o(v, p, h, d, t[r + 11], 22, -1990404162), d = o(d, v, p,
					h, t[r + 12], 7, 1804603682), h = o(h, d, v, p, t[r + 13], 12, -40341101), p = o(p, h, d, v, t[r +
					14], 17, -1502002290), d = i(d, v = o(v, p, h, d, t[r + 15], 22, 1236535329), p, h, t[r + 1], 5, -
					165796510), h = i(h, d, v, p, t[r + 6], 9, -1069501632), p = i(p, h, d, v, t[r + 11], 14,
				643717713), v = i(v, p, h, d, t[r], 20, -373897302), d = i(d, v, p, h, t[r + 5], 5, -701558691), h = i(
					h, d, v, p, t[r + 10], 9, 38016083), p = i(p, h, d, v, t[r + 15], 14, -660478335), v = i(v, p, h, d,
					t[r + 4], 20, -405537848), d = i(d, v, p, h, t[r + 9], 5, 568446438), h = i(h, d, v, p, t[r + 14],
					9, -1019803690), p = i(p, h, d, v, t[r + 3], 14, -187363961), v = i(v, p, h, d, t[r + 8], 20,
					1163531501), d = i(d, v, p, h, t[r + 13], 5, -1444681467), h = i(h, d, v, p, t[r + 2], 9, -
				51403784), p = i(p, h, d, v, t[r + 7], 14, 1735328473), d = a(d, v = i(v, p, h, d, t[r + 12], 20, -
					1926607734), p, h, t[r + 5], 4, -378558), h = a(h, d, v, p, t[r + 8], 11, -2022574463), p = a(p, h,
					d, v, t[r + 11], 16, 1839030562), v = a(v, p, h, d, t[r + 14], 23, -35309556), d = a(d, v, p, h, t[
					r + 1], 4, -1530992060), h = a(h, d, v, p, t[r + 4], 11, 1272893353), p = a(p, h, d, v, t[r + 7],
					16, -155497632), v = a(v, p, h, d, t[r + 10], 23, -1094730640), d = a(d, v, p, h, t[r + 13], 4,
					681279174), h = a(h, d, v, p, t[r], 11, -358537222), p = a(p, h, d, v, t[r + 3], 16, -722521979),
				v = a(v, p, h, d, t[r + 6], 23, 76029189), d = a(d, v, p, h, t[r + 9], 4, -640364487), h = a(h, d, v, p,
					t[r + 12], 11, -421815835), p = a(p, h, d, v, t[r + 15], 16, 530742520), d = u(d, v = a(v, p, h, d,
					t[r + 2], 23, -995338651), p, h, t[r], 6, -198630844), h = u(h, d, v, p, t[r + 7], 10, 1126891415),
				p = u(p, h, d, v, t[r + 14], 15, -1416354905), v = u(v, p, h, d, t[r + 5], 21, -57434055), d = u(d, v,
					p, h, t[r + 12], 6, 1700485571), h = u(h, d, v, p, t[r + 3], 10, -1894986606), p = u(p, h, d, v, t[
					r + 10], 15, -1051523), v = u(v, p, h, d, t[r + 1], 21, -2054922799), d = u(d, v, p, h, t[r + 8], 6,
					1873313359), h = u(h, d, v, p, t[r + 15], 10, -30611744), p = u(p, h, d, v, t[r + 6], 15, -
					1560198380), v = u(v, p, h, d, t[r + 13], 21, 1309151649), d = u(d, v, p, h, t[r + 4], 6, -
					145523070), h = u(h, d, v, p, t[r + 11], 10, -1120210379), p = u(p, h, d, v, t[r + 2], 15,
					718787259), v = u(v, p, h, d, t[r + 9], 21, -343485551), d = n(d, c), v = n(v, s), p = n(p, l), h =
				n(h, f);
			return [d, v, p, h]
		}

		function s(t) {
			var e, n = "",
				r = 32 * t.length;
			for (e = 0; e < r; e += 8) n += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
			return n
		}

		function l(t) {
			var e, n = [];
			for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) n[e] = 0;
			var r = 8 * t.length;
			for (e = 0; e < r; e += 8) n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
			return n
		}

		function f(t) {
			var e, n, r = "0123456789abcdef",
				o = "";
			for (n = 0; n < t.length; n += 1) e = t.charCodeAt(n), o += r.charAt(e >>> 4 & 15) + r.charAt(15 & e);
			return o
		}

		function d(t) {
			return unescape(encodeURIComponent(t))
		}

		function v(t) {
			return function(t) {
				return s(c(l(t), 8 * t.length))
			}(d(t))
		}

		function p(t, e) {
			return function(t, e) {
				var n, r, o = l(t),
					i = [],
					a = [];
				for (i[15] = a[15] = void 0, o.length > 16 && (o = c(o, 8 * t.length)), n = 0; n < 16; n += 1) i[
					n] = 909522486 ^ o[n], a[n] = 1549556828 ^ o[n];
				return r = c(i.concat(l(e)), 512 + 8 * e.length), s(c(a.concat(r), 640))
			}(d(t), d(e))
		}

		function h(t, e, n) {
			return e ? n ? p(e, t) : function(t, e) {
				return f(p(t, e))
			}(e, t) : n ? v(t) : function(t) {
				return f(v(t))
			}(t)
		}
		t.exports ? t.exports = h : e.md5 = h
	}(he)
}(je);
var Fe = ye(je.exports),
	Be = "function" == typeof btoa,
	Ve = "function" == typeof Buffer;
"function" == typeof TextDecoder && new TextDecoder();
var Ke, Ge = "function" == typeof TextEncoder ? new TextEncoder() : void 0,
	Qe = Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
Ke = {}, Qe.forEach(function(t, e) {
	return Ke[t] = e
});
var Ye = String.fromCharCode.bind(String);
"function" == typeof Uint8Array.from && Uint8Array.from.bind(Uint8Array);
var We = Be ? function(t) {
		return btoa(t)
	} : Ve ? function(t) {
		return Buffer.from(t, "binary").toString("base64")
	} : function(t) {
		for (var e, n, r, o, i = "", a = t.length % 3, u = 0; u < t.length;) {
			if ((n = t.charCodeAt(u++)) > 255 || (r = t.charCodeAt(u++)) > 255 || (o = t.charCodeAt(u++)) > 255)
			throw new TypeError("invalid character found");
			i += Qe[(e = n << 16 | r << 8 | o) >> 18 & 63] + Qe[e >> 12 & 63] + Qe[e >> 6 & 63] + Qe[63 & e]
		}
		return a ? i.slice(0, a - 3) + "===".substring(a) : i
	},
	Je = Ve ? function(t) {
		return Buffer.from(t).toString("base64")
	} : function(t) {
		for (var e = [], n = 0, r = t.length; n < r; n += 4096) e.push(Ye.apply(null, t.subarray(n, n + 4096)));
		return We(e.join(""))
	},
	He = function He(t) {
		if (t.length < 2) return (e = t.charCodeAt(0)) < 128 ? t : e < 2048 ? Ye(192 | e >>> 6) + Ye(128 | 63 & e) : Ye(
			224 | e >>> 12 & 15) + Ye(128 | e >>> 6 & 63) + Ye(128 | 63 & e);
		var e = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320);
		return Ye(240 | e >>> 18 & 7) + Ye(128 | e >>> 12 & 63) + Ye(128 | e >>> 6 & 63) + Ye(128 | 63 & e)
	},
	ze = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
	$e = Ve ? function(t) {
		return Buffer.from(t, "utf8").toString("base64")
	} : Ge ? function(t) {
		return Je(Ge.encode(t))
	} : function(t) {
		return We(function(t) {
			return t.replace(ze, He)
		}(t))
	};
var Xe = Object.defineProperty,
	Ze = Object.getOwnPropertyDescriptor,
	tn = function tn(t, e, n, r) {
		for (var o, i = r > 1 ? void 0 : r ? Ze(e, n) : e, a = t.length - 1; a >= 0; a--)(o = t[a]) && (i = (r ? o(e, n,
			i) : o(i)) || i);
		return r && i && Xe(e, n, i), i
	},
	en = function() {
		function t(e) {
			var n = this;
			f(this, t), this.cgiBatchSize = E.cgiBatchSize, this.reportThreshold = E.reportThreshold, this.reportDelay =
				E.reportDelay, this.triggerExecuteSend = function(t) {
					var e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
						r = [];
					return function() {
						for (var o = arguments.length, i = new Array(o), a = 0; a < o; a++) i[a] = arguments[a];
						return clearTimeout(e), e = setTimeout(function() {
							var e = t.apply(void 0, i);
							r.forEach(function(t) {
								return t(e)
							}), r = []
						}, n), new Promise(function(t) {
							return r.push(t)
						})
					}
				}(function() {
					n.executeSend()
				}, 1e3 * this.reportDelay), this.inspectDelay = E.inspectDelay, this.inspectTimer = void 0, this
				.isNeedContinueSend = !1, this.getBaseInfo = e.getBaseInfo, this.reportLog = e.reportLog, this
				.queueManager = e.queueManager, this.configManager = e.configManager, this.flushSend(), this
				.startInspectTimer()
		}
		return v(t, [{
			key: "batchSend",
			value: function value() {
				var t, e = this.queueManager.getReportableActions(this.reportThreshold);
				if (e.length >= this.reportThreshold) this.executeSend();
				else {
					var n = (null == (t = this.configManager) ? void 0 : t.getRealTimeActionList()) || E
						.realTimeActionList;
					e.some(function(t) {
						return n.indexOf(t.action_type) > -1 && !t.is_retry
					}) ? this.executeSend() : this.triggerExecuteSend()
				}
				this.startInspectTimer()
			}
		}, {
			key: "flushSend",
			value: function value() {
				this.executeSend()
			}
		}, {
			key: "executeSend",
			value: function value() {
				var e = this;
				if (t.currentRequestCount >= t.requestConcurrency) this.isNeedContinueSend = !0;
				else {
					this.isNeedContinueSend = !1;
					var n = (t.requestConcurrency - t.currentRequestCount) * this.cgiBatchSize,
						r = this.queueManager.getReportableActions(n),
						o = this.getBaseInfo();
					if (!o.openid && !o.unionid && (xt.warn("请尽快调用 setOpenId 或 setUnionId 方法设置用户ID！"),
							r = r.filter(function(t) {
								return null == t ? void 0 : t.ad_trace_id
							})), !(r.length <= 0)) {
						n < this.queueManager.getReportableActionsLength() && (this
							.isNeedContinueSend = !0), t.currentRequestCount += Math.ceil(r.length /
							this.cgiBatchSize);
						for (var i = [], a = 0; a < r.length; a += this.cgiBatchSize) {
							var u = this.generateActionReportParams(r.slice(a, a + this.cgiBatchSize));
							i.push(this.report(u))
						}
						Promise.all(i).then(function(t) {
							var n = t.some(function(t) {
								return t >= 0
							});
							e.isNeedContinueSend && n && e.executeSend()
						})["catch"](function(t) {
							xt.error(t), e.reportLog({
								message: "executeSend catch: ".concat(t.message),
								log_type: b.JS_RUN_ERROR,
								err_stack: t.stack
							})
						})
					}
				}
			}
		}, {
			key: "generateActionReportParams",
			value: function value(t) {
				var e = [],
					n = [],
					r = this.getBaseInfo();
				return t.forEach(function(t) {
					n.push(t.action_id);
					var r = Object.assign({}, t);
					delete r.inner_status, e.push(r)
				}), {
					data: {
						info: r,
						actions: e
					},
					actionIdList: n
				}
			}
		}, {
			key: "dealSuccessData",
			value: function value(t, e) {
				[51001, 51003].indexOf(null == t ? void 0 : t.code) > -1 ? this.queueManager
					.updateActionsForReportFail(e) : this.queueManager.removeActions(e), 0 !== (null ==
						t ? void 0 : t.code) && (this.reportLog({
						log_type: b.REQUEST_ERROR,
						code: null == t ? void 0 : t.code,
						message: "trace_id: ".concat(null == t ? void 0 : t.trace_id, "，msg: ")
							.concat(null == t ? void 0 : t.message)
					}), xt.error("上报失败：", t))
			}
		}, {
			key: "dealFailData",
			value: function value(t, e) {
				this.queueManager.updateActionsForReportFail(e), this.reportLog({
					log_type: b.REQUEST_ERROR,
					code: t.code,
					message: t.message
				}), xt.error("上报失败：", t)
			}
		}, {
			key: "report",
			value: function value(e) {
				var n = this,
					r = e.data,
					o = e.actionIdList;
				return this.queueManager.updateActionsForReporting(o), xt.debug && (xt.info("上报行为类型: ",
					"【".concat(r.actions.map(function(t) {
						return t.action_type
					}).join("、"), "】")), xt.info("上报请求参数: ", r)), new Promise(function(e) {
					var i, a, u, c, s, f, d, v, p = Date.now();
					try {
						var h = function(t) {
								var e = "",
									n = null == t ? void 0 : t.appid,
									r = null == t ? void 0 : t.secret_key,
									o = null == t ? void 0 : t.sdk_version,
									i = null == t ? void 0 : t.timestamp;
								if (!(n && r && o && i && 32 === r.length)) return e;
								for (var a = Fe(o + n + i), u = 0; u < 32; u++) e += u % 2 ==
									0 ? r[u] : a[u];
								return e
							}({
								appid: null == (i = null == r ? void 0 : r.info) ? void 0 :
									i.appid,
								secret_key: null == (a = null == r ? void 0 : r.info) ?
									void 0 : a.secret_key,
								sdk_version: null == (u = null == r ? void 0 : r.info) ?
									void 0 : u.sdk_version,
								timestamp: p
							}),
							y = function(t) {
								return arguments.length > 1 && void 0 !== arguments[1] &&
									arguments[1] ? function(t) {
										return t.replace(/=/g, "").replace(/[+\/]/g, function(
										t) {
											return "+" == t ? "-" : "_"
										})
									}($e(t)) : $e(t)
							}(JSON.stringify(r));
						d = {
							"Client-Time": p,
							"Sign-Value": Fe(y + (null == (c = null == r ? void 0 : r
								.info) ? void 0 : c.user_action_set_id) + (null == (
									s = null == r ? void 0 : r.info) ? void 0 : s
								.secret_key) + h),
							"Sign-Version": E.signVersion,
							"content-type": "text/plain;charset=UTF-8"
						}, v = y
					} catch (h) {
						d = {
							"Client-Time": p
						}, v = r, n.reportLog({
							log_type: b.SIGN_ERROR,
							message: "sign error msg: ".concat(null == h ? void 0 : h
								.message),
							err_stack: null == h ? void 0 : h.stack
						}), xt.error(h)
					}
					wx.request({
						url: "https://api.datanexus.qq.com/data-nexus-cgi/miniprogram",
						method: "POST",
						timeout: (null == (f = n.configManager) ? void 0 : f
							.getRequestTimeout()) || E.requestTimeout,
						header: d,
						data: v,
						success: function success(r) {
							var i, a;
							xt.devLog("上报接口返回码:", null == (i = null == r ? void 0 :
								r.data) ? void 0 : i.code);
							var u = (null == (a = null == r ? void 0 : r.header) ?
								void 0 : a["Server-Time"]) || -1;
							if (st.revise(u), t.currentRequestCount -= 1, 200 === (
									null == r ? void 0 : r.statusCode)) return n
								.dealSuccessData(null == r ? void 0 : r.data,
								o), void e((null == r ? void 0 : r.data).code);
							var c = "";
							try {
								c = "object" == l(null == r ? void 0 : r.data) ?
									JSON.stringify(null == r ? void 0 : r.data) :
									null == r ? void 0 : r.data
							} catch (t) {
								xt.error(t)
							}
							var s = {
								code: "number" == typeof(null == r ? void 0 : r
									.statusCode) ? -1 * r.statusCode : -888,
								message: "statusCode: ".concat(null == r ?
										void 0 : r.statusCode, ", data: ")
									.concat(c)
							};
							n.dealFailData(s, o), e(s.code)
						},
						fail: function fail(r) {
							xt.devLog("上报失败:", r), t.currentRequestCount -= 1;
							var i = {
								code: "number" == typeof(null == r ? void 0 : r
									.errno) ? -1 * r.errno : -999,
								message: null == r ? void 0 : r.errMsg
							};
							n.dealFailData(i, o), e(i.code)
						}
					})
				})
			}
		}, {
			key: "startInspectTimer",
			value: function value() {
				var e = this;
				clearTimeout(this.inspectTimer), this.inspectTimer = setTimeout(function() {
					t.currentRequestCount >= t.requestConcurrency && (t.currentRequestCount = t
						.requestConcurrency - 1), e.executeSend(), e.startInspectTimer()
				}, 1e3 * this.inspectDelay)
			}
		}], [{
			key: "setRequestConcurrency",
			value: function value(e) {
				"number" == typeof e ? e < 1 ? xt.error("网络请求最大并发量不能小于1") : e > 10 ? xt.error(
					"网络请求最大并发量不能大于10") : t.requestConcurrency = e : xt.error("网络请求最大并发量需设置为数字")
			}
		}]), t
	}(),
	nn = en;
nn.currentRequestCount = 0, nn.requestConcurrency = E.requestConcurrency, tn([Lt], nn.prototype, "batchSend", 1), tn([
	Lt], nn.prototype, "flushSend", 1), tn([Lt], nn.prototype, "executeSend", 1);
var rn = Wt,
	on = Jt,
	an = Ht,
	un = zt,
	cn = $t,
	sn = ie,
	ln = Xt,
	fn = Zt,
	dn = te,
	vn = ne,
	pn = oe,
	hn = re,
	yn = ee,
	_n = function() {
		function e() {
			f(this, e)
		}
		return v(e, [{
			key: "install",
			value: function value(e, n) {
				var r = function r(n) {
					Qt.subscribe(n, function(n) {
						var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[
							1] : {};
						return function(o) {
							var i = arguments.length > 1 && void 0 !== arguments[1] ?
								arguments[1] : {};
							e.track(n, Object.assign(r || {}, i, t(t({}, wn, !0), Cn,
								o)))
						}
					}(n))
				};
				r(on), r(rn), r(an), r(un), "all" === n && (r(cn), r(sn), r(ln), r(dn), r(fn), r(yn), r(
					vn), r(pn), r(hn))
			}
		}]), e
	}(),
	gn = function() {
		function e() {
			f(this, e), this.special_method_symbol = Symbol("special_method_symbol")
		}
		return v(e, [{
			key: "onPurchase",
			value: function value(t) {
				"number" != typeof t && xt.warn("付费金额需要为数字"), t <= 0 && xt.warn("付费金额需要大于0"), this
					.wrapTrack(j, {
						value: t
					})
			}
		}, {
			key: "onEnterForeground",
			value: function value() {
				this.wrapTrack(D)
			}
		}, {
			key: "onEnterBackground",
			value: function value() {
				this.wrapTrack(U)
			}
		}, {
			key: "onAppStart",
			value: function value() {
				this.wrapTrack(M)
			}
		}, {
			key: "onAppQuit",
			value: function value() {
				this.wrapTrack(F)
			}
		}, {
			key: "onAddToWishlist",
			value: function value() {
				this.wrapTrack(q)
			}
		}, {
			key: "wrapTrack",
			value: function value(e, n) {
				this.track(e, Object.assign(n || {}, t({}, this.special_method_symbol, 1)))
			}
		}]), e
	}(),
	mn = function(t) {
		o(n, gn);
		var e = a(n);

		function n() {
			return f(this, n), e.apply(this, arguments)
		}
		return v(n, [{
			key: "onRegister",
			value: function value() {
				this.wrapTrack(B)
			}
		}, {
			key: "onCreateRole",
			value: function value(t) {
				t && "string" != typeof t && xt.warn("角色名称需要为字符串"), this.wrapTrack(V, t ? {
					name: t
				} : {})
			}
		}, {
			key: "onTutorialFinish",
			value: function value() {
				this.wrapTrack(K)
			}
		}]), n
	}(),
	An = "（如果确认无误，请忽略该提示）",
	Rn = function() {
		var t = [];
		return {
			requestActionList: function requestActionList() {
				try {
					lt({
						conf_name: "data_nexus_common",
						conf_key: "action_types"
					}).then(function(e) {
						yt(e) && (t = e)
					})
				} catch (t) {
					xt.error(t)
				}
			},
			getActionList: function getActionList() {
				return t
			}
		}
	}();

function kn(t, e) {
	try {
		t.is_sdk_auto_track || (function(t) {
			try {
				var e = Rn.getActionList();
				if (!e.includes(t)) {
					var r, o = function(t, e) {
						var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
						if (!r) {
							if (Array.isArray(t) || (r = n(t)) || e && t && "number" == typeof t.length) {
								r && (t = r);
								var o = 0,
									i = function i() {};
								return {
									s: i,
									n: function n() {
										return o >= t.length ? {
											done: !0
										} : {
											done: !1,
											value: t[o++]
										}
									},
									e: function e(t) {
										throw t;
									},
									f: i
								}
							}
							throw new TypeError(
								"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
								);
						}
						var a, u = !0,
							c = !1;
						return {
							s: function s() {
								r = r.call(t)
							},
							n: function n() {
								var t = r.next();
								return u = t.done, t
							},
							e: function e(t) {
								c = !0, a = t
							},
							f: function f() {
								try {
									u || null == r["return"] || r["return"]()
								} finally {
									if (c) throw a;
								}
							}
						}
					}(e);
					try {
						for (o.s(); !(r = o.n()).done;) {
							var i = r.value;
							if (Tn(i, t) <= parseInt((.3 * i.length).toString())) {
								xt.warn("通过SDK上报的".concat(t, "行为名称可能有误，请检查该行为类型是否为腾讯广告提供的标准行为！").concat(An));
								break
							}
						}
					} catch (t) {
						o.e(t)
					} finally {
						o.f()
					}
				}
			} catch (e) {
				xt.error(e)
			}
		}(t.action_type), "minigame" === e ? function(t, e) {
			var n, r, o;
			try {
				["PURCHASE", "ADD_TO_CART"].includes(t.action_type) && t.action_param && It(t.action_param,
					"value") && ("number" != typeof(null == (n = t.action_param) ? void 0 : n.value) ? xt
					.warn("通过SDK上报的".concat(t.action_type, "行为携带的金额参数需要为数字！")) : (null == (r = t
						.action_param) ? void 0 : r.value) <= 0 ? xt.warn("通过SDK上报的".concat(t.action_type,
						"行为携带的金额参数需要大于0！")) : "minigame" === e && (null == (o = t.action_param) ? void 0 : o
						.value) < 100 && xt.warn("通过SDK上报的".concat(t.action_type,
						"行为携带的金额参数可能有误，金额的单位为‘分’，请检查金额是否正确！").concat(An)))
			} catch (t) {
				xt.error(t)
			}
		}(t, e) : "miniprogram" === e && function(t) {
			try {
				var e = null == t ? void 0 : t.action_type,
					n = (null == t ? void 0 : t.action_param) || {};
				"PURCHASE" === e && It(n, "value") && ("number" != typeof(null == n ? void 0 : n.value) ? xt
					.warn("通过SDK上报的".concat(e, "行为携带的金额参数需要为数字！")) : (null == n ? void 0 : n.value) <= 0 &&
					xt.warn("通过SDK上报的".concat(e, "行为携带的金额参数需要大于0！")))
			} catch (e) {
				xt.error(e)
			}
		}(t))
	} catch (t) {
		xt.error(t)
	}
}

function Tn(t, e) {
	try {
		if (0 === t.length) return e.length;
		if (0 === e.length) return t.length;
		for (var n = [], r = 0; r <= e.length; r++) n[r] = [r];
		for (var o = 0; o <= t.length; o++) n[0][o] = o;
		for (var i = 1; i <= e.length; i++)
			for (var a = 1; a <= t.length; a++) e.charAt(i - 1) === t.charAt(a - 1) ? n[i][a] = n[i - 1][a - 1] : n[i][
				a] = Math.min(n[i - 1][a - 1] + 1, n[i][a - 1] + 1, n[i - 1][a] + 1);
		return n[e.length][t.length]
	} catch (n) {
		xt.error(n)
	}
}

function Sn(t) {
	try {
		t && !/^[a-zA-Z0-9_\-]+$/.test(t) && xt.warn("通过SDK上报的openid：".concat(t, "可能有误，请检查openid是否正确！").concat(An))
	} catch (t) {
		xt.error(t)
	}
}
var En = Object.defineProperty,
	bn = Object.getOwnPropertyDescriptor,
	On = function On(t, e, n, r) {
		for (var o, i = r > 1 ? void 0 : r ? bn(e, n) : e, a = t.length - 1; a >= 0; a--)(o = t[a]) && (i = (r ? o(e, n,
			i) : o(i)) || i);
		return r && i && En(e, n, i), i
	},
	In = Symbol("initializedInstance"),
	wn = Symbol("autoTrack"),
	Cn = Symbol("actionTime"),
	xn = function(e) {
		o(r, mn);
		var n = a(r);

		function r(t) {
			var e;
			if (f(this, r), (e = n.call(this)).env = "production", e.sdk_version = "1.5.4", e.sdk_name =
				"@dn-sdk/minigame", e.deviceInfo = {}, e.gameInfo = {}, e.session_id = "", e.log_id = 0, e.inited = !1,
				null == wx || !wx.createCanvas) return xt.error("SDK只可以用在微信小游戏中使用"), u(e);
			var o = Ot();
			if (r[In].length >= o.maxSdkInstance) return xt.error("初始化超过上限"), u(e);
			var i = Et(t),
				a = at();
			if (!0 !== i) return xt.error(i), u(e);
			var s = null == a ? void 0 : a.appId;
			if (s && s !== t.appid) return xt.error("初始化失败，传入的appid与当前小游戏appid不一致"), u(e);
			e.config = t, It(t, "auto_track") || (e.config.auto_track = bt("autoTrack")), e.openid = t.openid, e
				.unionid = t.unionid, e.user_unique_id = t.user_unique_id, e.saveValidOpenidToStorage();
			var l = t.user_action_set_id;
			return r[In].includes(l) ? (xt.error("请勿重复初始化SDK"), u(e)) : (e.reportLog = e.reportLog.bind(c(e)), e
				.getTrackBaseInfo = e.getTrackBaseInfo.bind(c(e)), e.deviceInfo = nt(), e.gameInfo = Nt(), e
				.session_id = mt(), e.queueManage = new Vt({
					userActionSetId: l,
					maxLength: o.maxQueueLength,
					ogEvents: Yt
				}), e.actionReporter = new nn({
					getBaseInfo: e.getTrackBaseInfo,
					reportLog: e.reportLog,
					queueManager: e.queueManage,
					configManager: se
				}), e.inited = !0, r[In].push(l), e.useAutoTrack(), e.doReportOnEnterBackground(), "release" === (
					null == a ? void 0 : a.envVersion) ? (xt.info("初始化成功"), u(e)) : (function(t) {
					var e = t.conf_name,
						n = t.conf_key,
						r = t.sdk_version,
						o = t.default_download_url,
						i = t.fail_handler;
					lt({
						conf_name: e,
						conf_key: n
					}).then(function(t) {
						if (ht(t)) {
							var e = null == t ? void 0 : t.blackVersions,
								n = null == t ? void 0 : t.minVersion,
								a = null == t ? void 0 : t.bestVersion,
								u = null == t ? void 0 : t.downloadUrl,
								c = o;
							return u && /^https/.test(u) && (c = u), yt(e) && (null == e ? void 0 : e
									.indexOf(r)) > -1 ? (null == i || i(), void xt.error(
									"初始化失败！当前SDK版本存在兼容问题，请尽快升级至最新版！下载地址：".concat(c))) : n && St(r, n) <
								0 ? (null == i || i(), void xt.error("初始化失败！当前SDK版本过低，请尽快升级至最新版！下载地址："
									.concat(c))) : (a && St(r, a) < 0 && xt.warn(
									"新版本SDK已上线，强烈建议您升级至最新版，尽早享受新特性！下载地址：".concat(c)), void xt.info(
									"初始化成功"))
						}
						xt.info("初始化成功")
					})["catch"](function() {
						xt.info("初始化成功")
					})
				}({
					conf_name: "mini_game_sdk_common",
					conf_key: "version",
					sdk_version: e.sdk_version,
					default_download_url: "https://sr-home-1257214331.cos.ap-guangzhou.myqcloud.com/sdk/dn-sdk-minigame/dn-sdk-minigame.zip",
					fail_handler: function fail_handler() {
						e.inited = !1
					}
				}), Rn.requestActionList(), Sn(t.openid), u(e)))
		}
		return v(r, [{
			key: "track",
			value: function value(t, e) {
				var n, r, o, i = qe.validateActionType(t),
					a = qe.validateActionParam(e);
				if (i && a) {
					!this.openid && !this.unionid && xt.warn("缺少 openid 或 unionid");
					var u = bt("actionParamMaxLength");
					if (JSON.stringify(e || {}).length > u) return void xt.error("监测到超过".concat(u,
						"的上报日志：").concat(t, " ").concat(e));
					var c = !(null == e || !e[wn]),
						s = this.createAction(t, e || {}, c);
					"release" !== (null == (n = at()) ? void 0 : n.envVersion) && kn(s, "minigame"),
						null == (r = this.queueManage) || r.addAction(s), null == (o = this
							.actionReporter) || o.batchSend()
				}
			}
		}, {
			key: "flush",
			value: function value() {
				var t;
				null == (t = this.actionReporter) || t.flushSend()
			}
		}, {
			key: "setOpenId",
			value: function value(t) {
				var e;
				t && "string" == typeof t ? (this.openid = t, this.gameInfo.ad_trace_id && !tt$1
					.getSync(T) && Qt.publish("START_APP"), this.flush(), this
					.saveValidOpenidToStorage(), "release" !== (null == (e = at()) ? void 0 : e
						.envVersion) && Sn(t)) : xt.error("openid 格式错误")
			}
		}, {
			key: "setUnionId",
			value: function value(t) {
				t && "string" == typeof t ? (this.unionid = t, this.flush()) : xt.error("unionid 格式错误")
			}
		}, {
			key: "setUserUniqueId",
			value: function value(t) {
				t && "string" == typeof t ? this.user_unique_id = t : xt.error("user_unique_id 格式错误")
			}
		}, {
			key: "doReportOnEnterBackground",
			value: function value() {
				var t = this;
				wx.onHide(function() {
					var e, n;
					null == (e = t.actionReporter) || e.flushSend(), null == (n = t
						.queueManage) || n.reportLostNum()
				})
			}
		}, {
			key: "getTrackBaseInfo",
			value: function value() {
				var t = at();
				return Object.assign({}, this.deviceInfo, function(t, e) {
					var n = {};
					return e.forEach(function(e) {
						It(t, e) && (n[e] = t[e])
					}), n
				}(this.config, ["user_action_set_id", "appid", "openid", "secret_key",
					"user_unique_id", "unionid"
				]), {
					local_id: rt(),
					sdk_name: this.sdk_name,
					sdk_version: this.sdk_version,
					openid: this.openid || it(),
					unionid: this.unionid,
					user_unique_id: this.user_unique_id,
					inner_param: {
						app_env_version: t.envVersion,
						app_version: t.version
					}
				})
			}
		}, {
			key: "createAction",
			value: function value(t, e) {
				var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
				null != e && e[wn] && delete e[wn];
				var r = Date.now();
				null != e && e[Cn] && (r = null == e ? void 0 : e[Cn], delete e[Cn]);
				var o = {
					action_id: mt(),
					action_param: e,
					action_time: r,
					action_type: t,
					is_retry: !1,
					is_sdk_auto_track: n,
					retry_count: 0,
					revised_action_time: st.getRevisedcurrentTimeMillis(),
					log_id: ++this.log_id,
					session_id: this.session_id,
					pkg_channel_id: this.gameInfo.pkg_channel_id,
					source_scene: this.gameInfo.source_scene,
					network_type: ot(),
					ad_trace_id: this.gameInfo.ad_trace_id,
					channel: this.getChannelByActionType(t)
				};
				return null != e && e[this.special_method_symbol] && (this.addActionInnerParam(o,
						"is_special_method", !0), delete e[this.special_method_symbol]), se
					.getChannelClaimActionList().indexOf(t) > -1 && this.gameInfo.launch_options && this
					.addActionInnerParam(o, "launch_options", this.gameInfo.launch_options), o
			}
		}, {
			key: "addActionInnerParam",
			value: function value(e, n, r) {
				e.inner_param && ht(e.inner_param) ? e.inner_param[n] = r : e.inner_param = t({}, n, r)
			}
		}, {
			key: "getChannelByActionType",
			value: function value(t) {
				var e = "";
				return se.getChannelClaimActionList().indexOf(t) > -1 ? e = this.gameInfo.channel ||
					"" : se.getNoClaimActionList().indexOf(t) > -1 && (e = X), e
			}
		}, {
			key: "reportLog",
			value: function value(t) {
				var e, n, r = {
					user_action_set_id: null == (e = this.config) ? void 0 : e.user_action_set_id,
					appid: null == (n = this.config) ? void 0 : n.appid,
					session_id: this.session_id
				};
				ct(Object.assign(r, t))
			}
		}, {
			key: "useAutoTrack",
			value: function value() {
				var t;
				if (null != (t = this.config) && t.auto_track) {
					var e = !0,
						n = tt$1.getSync(R);
					(null == n ? void 0 : n.ap) === G ? e = !0 : (null == n ? void 0 : n.ap) === Q && (
						e = !1), "devtools" === nt().wx_platform && (e = !0), new _n().install(this,
						e ? "all" : "lifecycle"), pe(), e && Le(), this.getAutoProxyRemoteConfig()
				}
			}
		}, {
			key: "getAutoProxyRemoteConfig",
			value: function value() {
				var t, e, n = nt();
				n.os && n.os_version && null != (t = this.config) && t.user_action_set_id && function(
				t) {
					return new Promise(function(e) {
						wx.request({
							method: "POST",
							url: "https://api.datanexus.qq.com/data-nexus-config/v1/sdk/minigame/get",
							data: t,
							timeout: E.requestTimeout,
							success: function success(t) {
								ft(t, e, "minigame/get"), vt(t)
							},
							fail: function fail(t) {
								dt(t, "minigame/get")
							}
						})
					})
				}({
					conf_name: "MG",
					conf_param: {
						user_action_set_id: null == (e = this.config) ? void 0 : e
							.user_action_set_id,
						sdk_version: this.sdk_version,
						os_type: (null == n ? void 0 : n.os) || "",
						os_version: wt(n.os_version),
						device_brand: (null == n ? void 0 : n.device_brand) || "",
						weixin_lib_version: (null == n ? void 0 : n.wx_lib_version) || "",
						weixin_version: (null == n ? void 0 : n.wx_version) || ""
					}
				}).then(function(t) {
					ht(t) && tt$1.setSync(R, t)
				})
			}
		}, {
			key: "saveValidOpenidToStorage",
			value: function value() {
				this.openid && function(t) {
					return /^[a-zA-Z0-9_-]{28,30}$/.test(t)
				}(this.openid) && tt$1.setSync(T, this.openid)
			}
		}], [{
			key: "setRequestConcurrency",
			value: function value(t) {
				nn.setRequestConcurrency(t)
			}
		}, {
			key: "setDebug",
			value: function value(t) {
				xt.debug = t
			}
		}]), r
	}(),
	Nn = xn;
Nn[In] = [], On([Lt, Pt], Nn.prototype, "track", 1), On([Lt, Pt], Nn.prototype, "flush", 1), On([Lt], Nn.prototype,
	"setOpenId", 1), On([Lt], Nn.prototype, "setUnionId", 1), On([Lt], Nn.prototype, "setUserUniqueId", 1), On([Lt],
	Nn.prototype, "doReportOnEnterBackground", 1), On([Lt], Nn.prototype, "getTrackBaseInfo", 1), On([Lt], Nn
	.prototype, "useAutoTrack", 1);
var HttpTask = function() {
	function HttpTask(data, serverUrl, tryCount, timeout, debugMode, platFormName, callback) {
		_classCallCheck(this, HttpTask);
		this.data = data;
		this.serverUrl = serverUrl;
		this.callback = callback;
		this.debugMode = debugMode;
		this.platFormName = platFormName;
		this.tryCount = _.isNumber(tryCount) ? tryCount : 1;
		this.permissionTryCount = 6;
		this.timeout = _.isNumber(timeout) ? timeout : 3000;
		this.taClassName = "HttpTask"
	}
	_createClass(HttpTask, [{
		key: "run",
		value: function run() {
			var _this = this,
				_PlatformAPI$request;
			var headers = _.createExtraHeaders();
			headers["content-type"] = "application/json";
			if (this.debugMode === "debug") {
				headers["Turbo-Debug-Mode"] = 1
			}
			var headerKeyName = this.platFormName === "GravityEngine_ali_game" ? "headers" :
				"header";
			var request = PlatformAPI.request((_PlatformAPI$request = {
					url: this.serverUrl,
					method: "POST",
					data: this.data
				}, _defineProperty(_PlatformAPI$request, headerKeyName, headers),
				_defineProperty(_PlatformAPI$request, "success", function success(res) {
					var _res$data;
					if ((res === null || res === void 0 || (_res$data = res.data) ===
							null || _res$data === void 0 ? void 0 : _res$data.code) ===
						0) {
						_this.onSuccess(res)
					} else {
						_this.onFailed(res)
					}
				}), _defineProperty(_PlatformAPI$request, "fail", function fail(res) {
					_this.onFailed(res)
				}), _PlatformAPI$request));
			setTimeout(function() {
				if ((_.isObject(request) || _.isPromise(request)) && _.isFunction(request
						.abort)) {
					try {
						request.abort()
					} catch (e) {}
				}
			}, this.timeout)
		}
	}, {
		key: "onSuccess",
		value: function onSuccess(res) {
			if (res.statusCode === 200) {
				var _res$data2, _res$data3;
				var msgStr = "Data Verified";
				if (res !== null && res !== void 0 && (_res$data2 = res.data) !== null &&
					_res$data2 !== void 0 && (_res$data2 = _res$data2.extra) !== null &&
					_res$data2 !== void 0 && (_res$data2 = _res$data2.errors) !== null &&
					_res$data2 !== void 0 && _res$data2.length) {
					msgStr = res.data.extra.errors
				}
				this.callback({
					code: res === null || res === void 0 || (_res$data3 = res.data) ===
						null || _res$data3 === void 0 ? void 0 : _res$data3.code,
					msg: msgStr
				})
			} else {
				this.callback({
					code: (res === null || res === void 0 ? void 0 : res.statusCode) || -3,
					msg: res.statusCode
				})
			}
		}
	}, {
		key: "onFailed",
		value: function onFailed(res) {
			var _this2 = this;
			if (--this.tryCount > 0) {
				setTimeout(function() {
					_this2.run()
				}, 1000)
			} else {
				var _res$data4, _res$data5;
				this.callback({
					code: -3,
					msg: "".concat(res === null || res === void 0 || (_res$data4 = res
						.data) === null || _res$data4 === void 0 ? void 0 : _res$data4
						.msg, "\uFF1A").concat(res === null || res === void 0 || (
							_res$data5 = res.data) === null || _res$data5 === void 0 ||
						(_res$data5 = _res$data5.extra) === null || _res$data5 ===
						void 0 ? void 0 : _res$data5.error)
				})
			}
		}
	}]);
	return HttpTask
}();
var SenderQueue = function() {
	function SenderQueue() {
		_classCallCheck(this, SenderQueue);
		this.items = [];
		this.isRunning = false;
		this.showDebug = false
	}
	_createClass(SenderQueue, [{
		key: "enqueue",
		value: function enqueue(data, serverUrl, config) {
			var _enqueue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
			var isDebugMode = config.debugMode === "debug";
			var element;
			var that = this;
			element = new HttpTask(JSON.stringify(data), serverUrl, config.maxRetries, config
				.sendTimeout, config.debugMode, config.platFormName,
				function(res) {
					that.isRunning = false;
					if (_.isFunction(config.callback)) {
						config.callback(res)
					}
					that._runNext(isDebugMode);
					if (isDebugMode) {
						logger$1.info("code ".concat(res.code, " and msg is,"), res.msg)
					}
				});
			if (_enqueue === true) {
				this.items.push(element);
				this._runNext(isDebugMode)
			} else {
				element.run()
			}
		}
	}, {
		key: "_dequeue",
		value: function _dequeue() {
			return this.items.shift()
		}
	}, {
		key: "_runNext",
		value: function _runNext(isDebugMode) {
			if (this.items.length > 0 && !this.isRunning) {
				this.isRunning = true;
				if (isDebugMode) {
					this._dequeue().run()
				} else {
					var items = this.items.splice(0, this.items.length);
					var httpTask0 = items[0];
					var data = JSON.parse(httpTask0.data);
					for (var i = 1; i < items.length; i++) {
						var task = items[i];
						var taskData = JSON.parse(task.data);
						data["event_list"] = data["event_list"].concat(taskData["event_list"])
					}
					var flushTime = new Date().getTime();
					data["$flush_time"] = flushTime;
					var element;
					element = new HttpTask(JSON.stringify(data), httpTask0.serverUrl, httpTask0
						.tryCount, httpTask0.timeout, httpTask0 === null || httpTask0 ===
						void 0 ? void 0 : httpTask0.debugMode, httpTask0.platFormName, httpTask0
						.callback);
					element.run()
				}
			}
		}
	}]);
	return SenderQueue
}();
var senderQueue = new SenderQueue();
var DEFAULT_CONFIG = {
	name: "GravityEngine",
	is_plugin: false,
	maxRetries: 3,
	sendTimeout: 5000,
	enablePersistence: true,
	asyncPersistence: false,
	strict: false,
	debugMode: "none"
};
var systemInformation = {
	properties: {
		$lib_version: Config.LIB_VERSION,
		$lib: Config.LIB_STACK,
		$scene: "",
		$today_first_scene: ""
	},
	getSystemInfo: function getSystemInfo(callback) {
		var that = this;
		PlatformAPI.onNetworkStatusChange(function(res) {
			that.properties["$network_type"] = res.networkType
		});
		PlatformAPI.getNetworkType({
			success: function success(res) {
				that.properties["$network_type"] = res.networkType
			},
			complete: function complete() {
				PlatformAPI.getSystemInfo({
					success: function success(res) {
						logger$1.info(JSON.stringify(res, null, 4));
						var data = {
							$manufacturer: res["brand"],
							$brand: res["brand"],
							$model: res["model"],
							$screen_width: Number(res["screenWidth"]),
							$screen_height: Number(res["screenHeight"]),
							$system_language: res.language,
							$os: res.platform,
							$os_version: res.system
						};
						_.extend(that.properties, data);
						_.setMpPlatform(res["mp_platform"])
					},
					complete: function complete() {
						callback()
					}
				})
			}
		})
	}
};
var GravityEnginePersistence = function() {
	function GravityEnginePersistence(config, callback) {
		var _this = this;
		_classCallCheck(this, GravityEnginePersistence);
		this.enabled = config.enablePersistence;
		if (this.enabled) {
			if (config.isChildInstance) {
				this.name = config.persistenceName + "_" + config.name;
				this.nameOld = config.persistenceNameOld + "_" + config.name
			} else {
				this.name = config.persistenceName;
				this.nameOld = config.persistenceNameOld
			}
			if (config.asyncPersistence) {
				this._state = {};
				PlatformAPI.getStorage(this.name, true, function(data) {
					if (_.isEmptyObject(data)) {
						PlatformAPI.getStorage(_this.nameOld, true, function(dataOld) {
							_this._state = _.extend2Layers({}, dataOld, _this._state);
							_this._init(config, callback);
							_this._save()
						})
					} else {
						_this._state = _.extend2Layers({}, data, _this._state);
						_this._init(config, callback);
						_this._save()
					}
				})
			} else {
				this._state = PlatformAPI.getStorage(this.name) || {};
				if (_.isEmptyObject(this._state)) {
					this._state = PlatformAPI.getStorage(this.nameOld) || {}
				}
				this._init(config, callback)
			}
		} else {
			this._state = {};
			this._init(config, callback)
		}
	}
	_createClass(GravityEnginePersistence, [{
		key: "_init",
		value: function _init(config, callback) {
			if (!this.getDistinctId()) {
				this.setDistinctId(_.UUID())
			}
			if (!config.isChildInstance) {
				if (!this.getDeviceId()) {
					this._setDeviceId(_.UUID())
				}
			}
			this.initComplete = true;
			if (typeof callback === "function") {
				callback()
			}
			var configStorage = PlatformAPI.getStorage(this.name);
			var current_first_scene_date = configStorage === null || configStorage === void 0 ?
				void 0 : configStorage.current_first_scene_date;
			var current_first_scene = configStorage === null || configStorage === void 0 ? void 0 :
				configStorage.current_first_scene;
			var today_first_scene_date = new Date().toLocaleDateString();
			if (!current_first_scene || !current_first_scene_date || current_first_scene_date !==
				today_first_scene_date) {
				var _PlatformAPI$getAppOp, _PlatformAPI$getAppOp2;
				var currentScene = String(((_PlatformAPI$getAppOp = PlatformAPI.getAppOptions()) ===
					null || _PlatformAPI$getAppOp === void 0 ? void 0 :
					_PlatformAPI$getAppOp.scene) || ((_PlatformAPI$getAppOp2 = PlatformAPI
						.getAppOptions()) === null || _PlatformAPI$getAppOp2 === void 0 ?
					void 0 : _PlatformAPI$getAppOp2.from));
				systemInformation.properties["$today_first_scene"] = currentScene;
				this._state.current_first_scene = currentScene;
				this._state.current_first_scene_date = today_first_scene_date
			} else {
				systemInformation.properties["$today_first_scene"] = String(configStorage ===
					null || configStorage === void 0 ? void 0 : configStorage
					.current_first_scene)
			}
			this._save()
		}
	}, {
		key: "_save",
		value: function _save() {
			if (this.enabled && this.initComplete) {
				PlatformAPI.setStorage(this.name, JSON.stringify(this._state))
			}
		}
	}, {
		key: "_set",
		value: function _set(name, value) {
			var _this2 = this;
			var obj;
			if (typeof name === "string") {
				obj = {};
				obj[name] = value
			} else if (_typeof(name) === "object") {
				obj = name
			}
			_.each(obj, function(value, key) {
				_this2._state[key] = value
			});
			this._save()
		}
	}, {
		key: "_get",
		value: function _get(name) {
			return this._state[name]
		}
	}, {
		key: "setEventTimer",
		value: function setEventTimer(eventName, timestamp) {
			var timers = this._state.event_timers || {};
			timers[eventName] = timestamp;
			this._set("event_timers", timers)
		}
	}, {
		key: "removeEventTimer",
		value: function removeEventTimer(eventName) {
			var timers = this._state.event_timers || {};
			var timestamp = timers[eventName];
			if (!_.isUndefined(timestamp)) {
				delete this._state.event_timers[eventName];
				this._save()
			}
			return timestamp
		}
	}, {
		key: "getDeviceId",
		value: function getDeviceId() {
			return this._state.device_id
		}
	}, {
		key: "_setDeviceId",
		value: function _setDeviceId(deviceId) {
			if (this.getDeviceId()) {
				logger$1.warn("cannot modify the device id.");
				return
			}
			this._set("device_id", deviceId)
		}
	}, {
		key: "getDistinctId",
		value: function getDistinctId() {
			return this._state.distinct_id
		}
	}, {
		key: "setDistinctId",
		value: function setDistinctId(distinctId) {
			this._set("distinct_id", distinctId)
		}
	}, {
		key: "getAccountId",
		value: function getAccountId() {
			return this._state.account_id
		}
	}, {
		key: "setAccountId",
		value: function setAccountId(accoundId) {
			this._set("account_id", accoundId)
		}
	}, {
		key: "getSuperProperties",
		value: function getSuperProperties() {
			return this._state.props || {}
		}
	}, {
		key: "setSuperProperties",
		value: function setSuperProperties(superProperties, replace) {
			var props = replace ? superProperties : _.extend(this.getSuperProperties(),
				superProperties);
			this._set("props", props)
		}
	}]);
	return GravityEnginePersistence
}();

function getPlatFormName() {
	return PlatformAPI.getConfig().persistenceNameOld
}
var GravityEngineAPI = function() {
	function GravityEngineAPI(config) {
		_classCallCheck(this, GravityEngineAPI);
		config.appId = _.checkAppId((config === null || config === void 0 ? void 0 : config.clientId) || "");
		config.accessToken = config.accessToken;
		if (!config.accessToken) {
			console.warn("GravityAnalytics: accessToken must be required")
		}
		config.autoTrack = {
			appLaunch: true,
			appShow: true,
			appHide: true,
			pageShare: true
		};
		config.serverUrl = "".concat(Config.BASE_URL, "/event/collect/?access_token=").concat(config.accessToken);
		var defaultConfig = _.extend({}, DEFAULT_CONFIG, PlatformAPI.getConfig());
		if (_.isObject(config)) {
			this.config = _.extend(defaultConfig, config)
		} else {
			this.config = defaultConfig
		}
		this._init(this.config)
	}
	_createClass(GravityEngineAPI, [{
		key: "_init",
		value: function _init(config) {
			var _this3 = this,
				_PlatformAPI$getAppOp3, _PlatformAPI$getAppOp4;
			this.name = config.name;
			this.appId = config.clientId;
			this.accessToken = config.accessToken;
			this.platFormName = getPlatFormName();
			if (_.isObject(config.tencentSdkData) && this.platFormName ===
				"GravityEngine_wechat_game") {
				var _config$tencentSdkDat;
				if ((_config$tencentSdkDat = config.tencentSdkData) !== null &&
					_config$tencentSdkDat !== void 0 && _config$tencentSdkDat.enableDebug) {
					Nn.setDebug(true);
					logger$1.tencentSdkLog("setDebug")
				}
				this.sdk = new Nn({
					user_action_set_id: config.tencentSdkData.user_action_set_id,
					secret_key: config.tencentSdkData.secret_key,
					appid: config.tencentSdkData.appid
				})
			}
			var serverUrl = config.serverUrl || config.server_url;
			this.serverUrl = serverUrl;
			this.serverDebugUrl = serverUrl;
			this.configUrl = serverUrl + "/config";
			this.autoTrackProperties = {};
			this._queue = [];
			this.config.syncBatchSize = 100;
			this.config.syncInterval = 60;
			if (config.isChildInstance) {
				this._state = {}
			} else {
				logger$1.enabled = config.debugMode === "debug";
				this.instances = [];
				this._state = {
					getSystemInfo: false,
					initComplete: false
				};
				systemInformation.getSystemInfo(function() {
					_this3._updateState({
						getSystemInfo: true
					})
				});
				PlatformAPI.setGlobal(this, this.name)
			}
			systemInformation.properties.$scene = String(((_PlatformAPI$getAppOp3 = PlatformAPI
					.getAppOptions()) === null || _PlatformAPI$getAppOp3 === void 0 ?
				void 0 : _PlatformAPI$getAppOp3.scene) || ((_PlatformAPI$getAppOp4 =
					PlatformAPI.getAppOptions()) === null || _PlatformAPI$getAppOp4 ===
				void 0 ? void 0 : _PlatformAPI$getAppOp4.from));
			this.store = new GravityEnginePersistence(config, function() {
				if (_this3.config.asyncPersistence && _.isFunction(_this3.config
						.persistenceComplete)) {
					_this3.config.persistenceComplete(_this3)
				}
				_this3._updateState()
			});
			this.enabled = _.isBoolean(this.store._get("ge_enabled")) ? this.store._get(
				"ge_enabled") : true;
			this.isOptOut = _.isBoolean(this.store._get("ge_isOptOut")) ? this.store._get(
				"ge_isOptOut") : false;
			var platFormName = getPlatFormName();
			var isQuickApp = platFormName === "GravityEngine_quick_mp";
			var isLaunchPlatform = isQuickApp || platFormName === "GravityEngine_wechat_game" ||
				platFormName === "GravityEngine_taobao_game" || platFormName ===
				"GravityEngine_tt_game" || platFormName === "GravityEngine_ali_game" || platFormName
				.includes("gravityengine_qg");
			if (isLaunchPlatform) {
				this.track(isQuickApp ? "$AppStart" : "$MPLaunch", {
					$url_query: _.setQuery(this.getQuery())
				})
			}
			if (!config.isChildInstance) {
				this.autoTrack = PlatformAPI.initAutoTrackInstance(this, config)
			}
		}
	}, {
		key: "updateConfig",
		value: function updateConfig(configUrl, appId) {}
	}, {
		key: "initInstance",
		value: function initInstance(name, config) {
			if (this.config.isChildInstance) {
				logger$1.warn("initInstance() cannot be called on child instance");
				return undefined
			}
			if (_.isString(name) && name !== this.name && _.isUndefined(this[name])) {
				var instance = new GravityEngineAPI(_.extend({}, this.config, {
					enablePersistence: false,
					isChildInstance: true,
					name: name
				}, config));
				this[name] = instance;
				this.instances.push(name);
				this[name]._state = this._state;
				return instance
			} else {
				logger$1.warn("initInstance() failed due to the name is invalid: " + name);
				return undefined
			}
		}
	}, {
		key: "lightInstance",
		value: function lightInstance(name) {
			return this[name]
		}
	}, {
		key: "_setAutoTrackProperties",
		value: function _setAutoTrackProperties(props) {
			_.extend(this.autoTrackProperties, props)
		}
	}, {
		key: "setupAndStart",
		value: function setupAndStart(option) {
			var _this4 = this;
			if (option !== null && option !== void 0 && option.clientId) {
				this.config.appId = option.clientId;
				this.appId = option.clientId
			}
			this.openId = (option === null || option === void 0 ? void 0 : option.openId) || this
				.appId;
			if (this.sdk) {
				this.sdk.setOpenId(this.openId);
				logger$1.tencentSdkLog("setOpenId");
				PlatformAPI.getStorage("is_ge_registered", true, function(isInitialized) {
					if (isInitialized === "Y") {
						_this4._setDryRunValue(0).then(function() {
							if (_this4.config.tencentSdkData.enableDryRun) {
								_this4.tryDryRun({
									actionList: ["pay", "tutorial_finish",
										"create_role", "re_active",
										"register"
									]
								})
							} else {
								_this4.tencentSDKRegisterTrack()
							}
						})
					}
				})
			}
			if (this._state.initComplete) return false;
			this._updateState({
				initComplete: true
			})
		}
	}, {
		key: "preInit",
		value: function() {
			var _preInit = _asyncToGenerator(_regeneratorRuntime().mark(function _callee() {
				var cacheData, time, options, query, cache;
				return _regeneratorRuntime().wrap(function _callee$(_context) {
					while (1) switch (_context.prev = _context.next) {
						case 0:
							cacheData = PlatformAPI.getStorage(
								"gravity_pre_cache", false);
							time = cacheData !== null && cacheData !==
								void 0 && cacheData.latest_cache_time ?
								Number(cacheData === null || cacheData ===
									void 0 ? void 0 : cacheData
									.latest_cache_time) : 0;
							if (!(time && Date.now() - time < 24 * 60 * 60 *
									1000)) {
								_context.next = 4;
								break
							}
							return _context.abrupt("return");
						case 4:
							options = PlatformAPI.getAppOptions();
							query = function() {
								if (_.isObject(options === null ||
										options === void 0 ? void 0 :
										options.query)) {
									return options.query
								}
								return {}
							}();
							cache = {
								latest_cache_time: Date.now(),
								gravity_query_cache: query,
								gravity_scene_cache: (options ===
									null || options === void 0 ?
									void 0 : options.scene) || ""
							};
							PlatformAPI.setStorage("gravity_pre_cache", JSON
								.stringify(cache));
						case 8:
						case "end":
							return _context.stop()
					}
				}, _callee)
			}));

			function preInit() {
				return _preInit.apply(this, arguments)
			}
			return preInit
		}()
	}, {
		key: "_getPreCache",
		value: function _getPreCache() {
			var defaultReturnData = {
				cache_query: {},
				cache_scene: ""
			};
			var cacheData = PlatformAPI.getStorage("gravity_pre_cache", false);
			if (!_.isObject(cacheData) || _.isEmptyObject(cacheData)) {
				return defaultReturnData
			}
			var time = cacheData !== null && cacheData !== void 0 && cacheData.latest_cache_time ?
				Number(cacheData === null || cacheData === void 0 ? void 0 : cacheData
					.latest_cache_time) : 0;
			if (time && Date.now() - time > 24 * 60 * 60 * 1000) {
				return defaultReturnData
			}
			var cache_query = function() {
				var val = (cacheData === null || cacheData === void 0 ? void 0 : cacheData
					.gravity_query_cache) || {};
				if (_.isObject(val) && !_.isEmptyObject(val)) {
					return val
				}
				return {}
			}();
			var cache_scene = (cacheData === null || cacheData === void 0 ? void 0 : cacheData
				.gravity_scene_cache) || "";
			return {
				cache_query: cache_query,
				cache_scene: cache_scene
			}
		}
	}, {
		key: "_isReady",
		value: function _isReady() {
			return this._state.getSystemInfo && this._state.initComplete && this.store
				.initComplete && this.config.appId && this.config.accessToken
		}
	}, {
		key: "_updateState",
		value: function _updateState(state) {
			var _this5 = this;
			if (_.isObject(state)) {
				_.extend(this._state, state)
			}
			this._onStateChange();
			_.each(this.instances, function(name) {
				_this5[name]._onStateChange()
			})
		}
	}, {
		key: "_onStateChange",
		value: function _onStateChange() {
			var _this6 = this;
			if (this._isReady() && this._queue && this._queue.length > 0) {
				_.each(this._queue, function(item) {
					_this6[item[0]].apply(_this6, slice.call(item[1]))
				});
				this._queue = []
			}
		}
	}, {
		key: "_hasDisabled",
		value: function _hasDisabled() {
			var hasDisabled = !this.enabled || this.isOptOut;
			if (hasDisabled) {
				logger$1.info("GravityEngine is Pause or Stop!")
			}
			return hasDisabled
		}
	}, {
		key: "_sendRequest",
		value: function _sendRequest(eventData, time, tryBeacon) {
			if (this._hasDisabled()) {
				return
			}
			if (!_.isUndefined(this.config.disableEventList)) {
				if (this.config.disableEventList.includes(eventData.eventName)) {
					logger$1.info("disabled Event : " + eventData.eventName);
					return
				}
			}
			time = _.isDate(time) ? time : new Date();
			var data = {
				event_list: [{
					type: eventData.type,
					time: new Date(time).getTime()
				}]
			};
			data.event_list[0]["event"] = eventData.eventName;
			if (eventData.type === "track") {
				data.event_list[0]["properties"] = this.getSendProperties();
				var startTimestamp = this.store.removeEventTimer(eventData.eventName);
				if (!_.isUndefined(startTimestamp)) {
					var durationMillisecond = new Date().getTime() - startTimestamp;
					var duration = parseFloat((durationMillisecond / 1000).toFixed(3));
					if (duration > 86400) {
						duration = 86400
					} else if (duration < 0) {
						duration = 0
					}
					data.event_list[0]["properties"]["$event_duration"] = duration
				}
			} else {
				data.event_list[0]["properties"] = {}
			}
			if (_.isObject(eventData.properties) && !_.isEmptyObject(eventData.properties)) {
				_.extend(data.event_list[0].properties, eventData.properties)
			}
			_.searchObjDate(data.event_list[0]);
			data["client_id"] = this.appId;
			logger$1.info(JSON.stringify(data, null, 4));
			var serverUrl = this.serverUrl;
			if (_.isBoolean(this.config.enableEncrypt) && this.config.enableEncrypt == true) {
				data.event_list[0] = _.generateEncryptyData(data.event_list[0], undefined)
			}
			if (tryBeacon) {
				var formData = new FormData();
				if (this.config.debugMode === "debug") {
					formData.append("source", "client");
					formData.append("appid", this.appId);
					formData.append("deviceId", this.getDeviceId());
					formData.append("data", JSON.stringify(data.event_list[0]))
				} else {
					var base64Data = _.base64Encode(JSON.stringify(data));
					formData.append("data", base64Data)
				}
				try {
					navigator.sendBeacon(serverUrl, formData)
				} catch (e) {}
				if (_.isFunction(eventData.onComplete)) {
					eventData.onComplete({
						statusCode: 200
					})
				}
			} else {
				senderQueue.enqueue(data, serverUrl, {
					maxRetries: this.config.maxRetries,
					sendTimeout: this.config.sendTimeout,
					callback: eventData.onComplete,
					debugMode: this.config.debugMode,
					platFormName: this.platFormName
				})
			}
		}
	}, {
		key: "_isObjectParams",
		value: function _isObjectParams(obj) {
			return _.isObject(obj) && _.isFunction(obj.onComplete)
		}
	}, {
		key: "track",
		value: function track(eventName, properties, time, onComplete) {
			var _properties;
			if (this._hasDisabled()) {
				return
			}
			if (this._isObjectParams(eventName)) {
				var options = eventName;
				eventName = options.eventName;
				properties = options.properties;
				time = options.time;
				onComplete = options.onComplete
			}
			if (!_.isObject(properties)) {
				properties = {}
			}
			if (!((_properties = properties) !== null && _properties !== void 0 && _properties
					.$trace_id)) {
				properties.$trace_id = _.UUID()
			}
			if (PropertyChecker.event(eventName) && PropertyChecker.properties(properties) || !this
				.config.strict) {
				this._internalTrack(eventName, properties, time, onComplete)
			} else if (_.isFunction(onComplete)) {
				onComplete({
					code: -1,
					msg: "invalid parameters"
				})
			}
		}
	}, {
		key: "_internalTrack",
		value: function _internalTrack(eventName, properties, time, onComplete, tryBeacon) {
			if (this._hasDisabled()) {
				return
			}
			time = _.isDate(time) ? time : new Date();
			if (this._isReady()) {
				this._sendRequest({
					type: "track",
					eventName: eventName,
					properties: properties,
					onComplete: onComplete
				}, time, tryBeacon)
			} else {
				this._queue.push(["_internalTrack", [eventName, properties, time, onComplete]])
			}
		}
	}, {
		key: "userSet",
		value: function userSet(properties, time, onComplete) {
			if (this._hasDisabled()) {
				return
			}
			if (this._isObjectParams(properties)) {
				var options = properties;
				properties = options.properties;
				time = options.time;
				onComplete = options.onComplete
			}
			if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
				time = _.isDate(time) ? time : new Date();
				if (this._isReady()) {
					this._sendRequest({
						type: "profile",
						eventName: "profile_set",
						properties: properties,
						onComplete: onComplete
					}, time)
				} else {
					this._queue.push(["userSet", [properties, time, onComplete]])
				}
			} else {
				logger$1.warn("calling userSet failed due to invalid arguments");
				if (_.isFunction(onComplete)) {
					onComplete({
						code: -1,
						msg: "invalid parameters"
					})
				}
			}
		}
	}, {
		key: "userSetOnce",
		value: function userSetOnce(properties, time, onComplete) {
			if (this._hasDisabled()) {
				return
			}
			if (this._isObjectParams(properties)) {
				var options = properties;
				properties = options.properties;
				time = options.time;
				onComplete = options.onComplete
			}
			if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
				time = _.isDate(time) ? time : new Date();
				if (this._isReady()) {
					this._sendRequest({
						type: "profile",
						eventName: "profile_set_once",
						properties: properties,
						onComplete: onComplete
					}, time)
				} else {
					this._queue.push(["userSetOnce", [properties, time, onComplete]])
				}
			} else {
				logger$1.warn("calling userSetOnce failed due to invalid arguments");
				if (_.isFunction(onComplete)) {
					onComplete({
						code: -1,
						msg: "invalid parameters"
					})
				}
			}
		}
	}, {
		key: "userAdd",
		value: function userAdd(properties, time, onComplete) {
			if (this._hasDisabled()) {
				return
			}
			if (this._isObjectParams(properties)) {
				var options = properties;
				properties = options.properties;
				time = options.time;
				onComplete = options.onComplete
			}
			if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
				time = _.isDate(time) ? time : new Date();
				if (this._isReady()) {
					this._sendRequest({
						type: "profile",
						eventName: "profile_increment",
						properties: properties,
						onComplete: onComplete
					}, time)
				} else {
					this._queue.push(["userAdd", [properties, time, onComplete]])
				}
			} else {
				logger$1.warn("calling userAdd failed due to invalid arguments");
				if (_.isFunction(onComplete)) {
					onComplete({
						code: -1,
						msg: "invalid parameters"
					})
				}
			}
		}
	}, {
		key: "userNumberMax",
		value: function userNumberMax(properties, time, onComplete) {
			if (this._hasDisabled()) {
				return
			}
			if (this._isObjectParams(properties)) {
				var options = properties;
				properties = options.properties;
				time = options.time;
				onComplete = options.onComplete
			}
			for (var key in properties) {
				if (typeof properties[key] !== "number") {
					var msg = "The key ".concat(key, " must be type of number");
					console.warn(msg);
					if (_.isFunction(onComplete)) {
						onComplete({
							code: -1,
							msg: msg
						})
					}
					return
				}
			}
			if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
				time = _.isDate(time) ? time : new Date();
				if (this._isReady()) {
					this._sendRequest({
						type: "profile",
						eventName: "profile_number_max",
						properties: properties,
						onComplete: onComplete
					}, time)
				} else {
					this._queue.push(["userNumberMax", [properties, time, onComplete]])
				}
			} else {
				logger$1.warn("calling userNumberMax failed due to invalid arguments");
				if (_.isFunction(onComplete)) {
					onComplete({
						code: -1,
						msg: "invalid parameters"
					})
				}
			}
		}
	}, {
		key: "userNumberMin",
		value: function userNumberMin(properties, time, onComplete) {
			if (this._hasDisabled()) {
				return
			}
			if (this._isObjectParams(properties)) {
				var options = properties;
				properties = options.properties;
				time = options.time;
				onComplete = options.onComplete
			}
			for (var key in properties) {
				if (typeof properties[key] !== "number") {
					var msg = "The key ".concat(key, " must be type of number");
					console.warn(msg);
					if (_.isFunction(onComplete)) {
						onComplete({
							code: -1,
							msg: msg
						})
					}
					return
				}
			}
			if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
				time = _.isDate(time) ? time : new Date();
				if (this._isReady()) {
					this._sendRequest({
						type: "profile",
						eventName: "profile_number_min",
						properties: properties,
						onComplete: onComplete
					}, time)
				} else {
					this._queue.push(["userNumberMin", [properties, time, onComplete]])
				}
			} else {
				logger$1.warn("calling userNumberMin failed due to invalid arguments");
				if (_.isFunction(onComplete)) {
					onComplete({
						code: -1,
						msg: "invalid parameters"
					})
				}
			}
		}
	}, {
		key: "userDel",
		value: function userDel(time, onComplete) {
			var properties = {};
			if (this._hasDisabled()) {
				return
			}
			if (this._isObjectParams(properties)) {
				var options = properties;
				properties = options.properties;
				time = options.time;
				onComplete = options.onComplete
			}
			if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
				time = _.isDate(time) ? time : new Date();
				if (this._isReady()) {
					this._sendRequest({
						type: "profile",
						eventName: "profile_delete",
						properties: properties,
						onComplete: onComplete
					}, time)
				} else {
					this._queue.push(["userDel", [properties, time, onComplete]])
				}
			} else {
				logger$1.warn("calling userDel failed due to invalid arguments");
				if (_.isFunction(onComplete)) {
					onComplete({
						code: -1,
						msg: "invalid parameters"
					})
				}
			}
		}
	}, {
		key: "userAppend",
		value: function userAppend(properties, time, onComplete) {
			if (this._hasDisabled()) {
				return
			}
			if (this._isObjectParams(properties)) {
				var options = properties;
				properties = options.properties;
				time = options.time;
				onComplete = options.onComplete
			}
			if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
				time = _.isDate(time) ? time : new Date();
				if (this._isReady()) {
					this._sendRequest({
						type: "profile",
						eventName: "profile_append",
						properties: properties,
						onComplete: onComplete
					}, time)
				} else {
					this._queue.push(["userAppend", [properties, time, onComplete]])
				}
			} else {
				logger$1.warn("calling userAppend failed due to invalid arguments");
				if (_.isFunction(onComplete)) {
					onComplete({
						code: -1,
						msg: "invalid parameters"
					})
				}
			}
		}
	}, {
		key: "userUniqAppend",
		value: function userUniqAppend(properties, time, onComplete) {
			if (this._hasDisabled()) {
				return
			}
			if (this._isObjectParams(properties)) {
				var options = properties;
				properties = options.properties;
				time = options.time;
				onComplete = options.onComplete
			}
			if (PropertyChecker.userAppendProperties(properties) || !this.config.strict) {
				time = _.isDate(time) ? time : new Date();
				if (this._isReady()) {
					this._sendRequest({
						type: "profile",
						eventName: "profile_uniq_append",
						properties: properties,
						onComplete: onComplete
					}, time)
				} else {
					this._queue.push(["userUniqAppend", [properties, time, onComplete]])
				}
			} else {
				logger$1.warn("calling userAppend failed due to invalid arguments");
				if (_.isFunction(onComplete)) {
					onComplete({
						code: -1,
						msg: "invalid parameters"
					})
				}
			}
		}
	}, {
		key: "userUnset",
		value: function userUnset(key, time, onComplete) {
			var properties = _defineProperty({}, key, null);
			if (this._hasDisabled()) {
				return
			}
			if (this._isObjectParams(properties)) {
				var options = properties;
				properties = options.properties;
				time = options.time;
				onComplete = options.onComplete
			}
			if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
				time = _.isDate(time) ? time : new Date();
				if (this._isReady()) {
					this._sendRequest({
						type: "profile",
						eventName: "profile_unset",
						properties: properties,
						onComplete: onComplete
					}, time)
				} else {
					this._queue.push(["userUnset", [properties, time, onComplete]])
				}
			} else {
				logger$1.warn("calling userUnset failed due to invalid arguments");
				if (_.isFunction(onComplete)) {
					onComplete({
						code: -1,
						msg: "invalid parameters"
					})
				}
			}
		}
	}, {
		key: "getQuickAppInfo",
		value: function getQuickAppInfo() {
			return new Promise(function(resolve, reject) {
				PlatformAPI.getQuickDevice({
					success: function() {
						var _success = _asyncToGenerator(_regeneratorRuntime()
							.mark(function _callee2(res) {
								var data;
								return _regeneratorRuntime().wrap(
									function _callee2$(_context2) {
										while (1) switch (_context2
											.prev = _context2
											.next) {
											case 0:
												data = {
													os_name: "android",
													android_id: res
														.user,
													imei: res
														.device,
													oaid: res
														.oaid,
													mac: res
														.mac,
													android_version: res
														.system,
													api_version: res
														.osVersionCode,
													rom: res
														.vendorOsName,
													rom_version: res
														.vendorOsVersion,
													phone_brand: res
														.manufacturer,
													phone_model: res
														.model
												};
												return _context2
													.abrupt(
														"return",
														resolve(
															data
															));
											case 2:
											case "end":
												return _context2
													.stop()
										}
									}, _callee2)
							}));

						function success(_x) {
							return _success.apply(this, arguments)
						}
						return success
					}()
				})
			})
		}
	}, {
		key: "getQuickGameInfo",
		value: function getQuickGameInfo() {
			return new Promise(function(resolve) {
				var platform = getPlatFormName();
				PlatformAPI.getQuickDevice({
					platform: platform,
					success: function success(res) {
						return resolve(res)
					}
				})
			})
		}
	}, {
		key: "uploadQuickAppDeviceInfo",
		value: function uploadQuickAppDeviceInfo() {
			var _this7 = this;
			return new Promise(function(resolve, reject) {
				PlatformAPI.getQuickDevice({
					success: function() {
						var _success2 = _asyncToGenerator(_regeneratorRuntime()
							.mark(function _callee3(res) {
								var data, url, result;
								return _regeneratorRuntime().wrap(
									function _callee3$(_context3) {
										while (1) switch (_context3
											.prev = _context3
											.next) {
											case 0:
												data = {
													os_name: "android",
													android_id: res
														.user,
													imei: res
														.device,
													oaid: res
														.oaid,
													mac: res
														.mac,
													android_version: res
														.system,
													api_version: res
														.osVersionCode,
													rom: res
														.vendorOsName,
													rom_version: res
														.vendorOsVersion,
													phone_brand: res
														.manufacturer,
													phone_model: res
														.model
												};
												url = "".concat(
														Config
														.BASE_URL,
														"/user/device_info/?access_token="
														)
													.concat(
														_this7
														.accessToken,
														"&client_id="
														)
													.concat(
														_this7
														.appId);
												_context3.next =
													4;
												return _this7
													.sendNetWork(
														url, {
															data: data
														});
											case 4:
												result =
													_context3
													.sent;
												return _context3
													.abrupt(
														"return",
														result
														.code ===
														0 ?
														resolve(
															result
															) :
														reject(
															result
															));
											case 6:
											case "end":
												return _context3
													.stop()
										}
									}, _callee3)
							}));

						function success(_x2) {
							return _success2.apply(this, arguments)
						}
						return success
					}()
				})
			})
		}
	}, {
		key: "uploadQuickGameDeviceInfo",
		value: function uploadQuickGameDeviceInfo() {
			var _this8 = this;
			return new Promise(function(resolve, reject) {
				var platform = getPlatFormName();
				PlatformAPI.getQuickDevice({
					platform: platform,
					success: function() {
						var _success3 = _asyncToGenerator(_regeneratorRuntime()
							.mark(function _callee4(res) {
								var data, url, result;
								return _regeneratorRuntime().wrap(
									function _callee4$(_context4) {
										while (1) switch (_context4
											.prev = _context4
											.next) {
											case 0:
												data = res;
												url = "".concat(
														Config
														.BASE_URL,
														"/user/device_info/?access_token="
														)
													.concat(
														_this8
														.accessToken,
														"&client_id="
														)
													.concat(
														_this8
														.appId);
												_context4.next =
													4;
												return _this8
													.sendNetWork(
														url, {
															data: data
														});
											case 4:
												result =
													_context4
													.sent;
												return _context4
													.abrupt(
														"return",
														result
														.code ===
														0 ?
														resolve(
															result
															) :
														reject(
															result
															));
											case 6:
											case "end":
												return _context4
													.stop()
										}
									}, _callee4)
							}));

						function success(_x3) {
							return _success3.apply(this, arguments)
						}
						return success
					}()
				})
			})
		}
	}, {
		key: "logoutEvent",
		value: function logoutEvent() {
			this.track("$MPLogout", {})
		}
	}, {
		key: "loginEvent",
		value: function loginEvent() {
			this.track("$MPLogin", {})
		}
	}, {
		key: "registerEvent",
		value: function registerEvent() {
			var platform_name = getPlatFormName();
			if (platform_name === "GravityEngine_quick_mp") {
				this.track("$AppRegister", {});
				return
			}
			this.track("$MPRegister", {})
		}
	}, {
		key: "payEvent",
		value: function payEvent($pay_amount, $pay_type, $order_id, $pay_reason, $pay_method) {
			var _this9 = this;
			if (typeof $pay_amount !== "number") {
				throw new Error("pay_amount must be a number");
			} else if (typeof $pay_type !== "string") {
				throw new Error("pay_type must be a string");
			} else if (typeof $order_id !== "string") {
				throw new Error("order_id must be a string");
			} else if (typeof $pay_reason !== "string") {
				throw new Error("pay_reason must be a string");
			} else if (typeof $pay_method !== "string") {
				throw new Error("pay_method must be a string");
			}
			return new Promise(function(resolve, reject) {
				_this9.track("$PayEvent", {
					$pay_amount: $pay_amount,
					$pay_type: $pay_type,
					$order_id: $order_id,
					$pay_reason: $pay_reason,
					$pay_method: $pay_method
				}, null, function() {
					resolve()
				})
			})
		}
	}, {
		key: "bindTAThirdPlatform",
		value: function bindTAThirdPlatform(taAccountId, taDistinctId) {
			if (!taAccountId && !taDistinctId) {
				throw new Error("taAccountId or taDistinctId must be required");
			} else if (taAccountId && typeof taAccountId !== "string") {
				throw new Error("taAccountId must be a string");
			} else if (taDistinctId && typeof taDistinctId !== "string") {
				throw new Error("taDistinctId must be a string");
			}
			this.track("$BindThirdPlatform", {
				$third_platform_type: "ta",
				$ta_account_id: taAccountId,
				$ta_distinct_id: taDistinctId
			})
		}
	}, {
		key: "adShowEvent",
		value: function adShowEvent($ad_type, $ad_unit_id, otherProperties) {
			var platform = getPlatFormName();
			var supportAdShowEvent = platform === "GravityEngine_wechat" || platform ===
				"GravityEngine_wechat_game" || platform === "GravityEngine_ali_game" || platform
				.startsWith("gravityengine_qg") || platform.startsWith("GravityEngine_quick");
			if (!supportAdShowEvent) {
				return
			}
			if (typeof $ad_type !== "string") {
				throw new Error("ad_type must be a string");
			} else if (typeof $ad_unit_id !== "string") {
				throw new Error("ad_unit_id must be a string");
			}
			if (platform === "GravityEngine_wechat" && !$ad_unit_id.startsWith("adunit-")) {
				throw new Error("您传入的ad_unit_id格式不正确，请检查");
			}
			var params = {
				$ad_type: $ad_type,
				$ad_unit_id: $ad_unit_id,
				$adn_type: "media"
			};
			if (Object.prototype.toString.call(otherProperties) === "[object Object]") {
				Object.assign(params, otherProperties)
			}
			this.track("$AdShow", params)
		}
	}, {
		key: "getQuery",
		value: function getQuery() {
			try {
				var _PlatformAPI$getAppOp5;
				if (PlatformAPI !== null && PlatformAPI !== void 0 && PlatformAPI.getAppOptions && (
						_PlatformAPI$getAppOp5 = PlatformAPI.getAppOptions()) !== null &&
					_PlatformAPI$getAppOp5 !== void 0 && _PlatformAPI$getAppOp5.query) {
					return PlatformAPI.getAppOptions().query || {}
				}
				return {}
			} catch (e) {
				return {}
			}
		}
	}, {
		key: "sendNetWork",
		value: function sendNetWork(url, data) {
			var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "POST";
			var headerKeyName = this.platFormName === "GravityEngine_ali_game" ? "headers" :
				"header";
			return new Promise(function(resolve, reject) {
				var _PlatformAPI$request;
				PlatformAPI.request((_PlatformAPI$request = {
					url: url,
					method: method,
					data: typeof data === "string" ? data : JSON.stringify(data)
				}, _defineProperty(_PlatformAPI$request, headerKeyName, {
					"content-type": "application/json"
				}), _defineProperty(_PlatformAPI$request, "success",
					function success(res) {
						if (res.statusCode === 200 || res.status === 200) {
							resolve(res.data);
							return
						}
						reject(res)
					}), _defineProperty(_PlatformAPI$request, "fail",
					function fail(err) {
						reject(err)
					}), _PlatformAPI$request))
			})
		}
	}, {
		key: "_errorPromise",
		value: function _errorPromise(msg) {
			return Promise.reject(new Error(msg))
		}
	}, {
		key: "initializeWithHistoryUserInfo",
		value: function() {
			var _initializeWithHistoryUserInfo = _asyncToGenerator(_regeneratorRuntime().mark(
				function _callee5() {
					var e, history_info, _args5 = arguments;
					return _regeneratorRuntime().wrap(function _callee5$(_context5) {
						while (1) switch (_context5.prev = _context5.next) {
							case 0:
								e = _args5.length > 0 && _args5[0] !==
									undefined ? _args5[0] : {};
								history_info = _args5.length > 1 ? _args5[1] :
									undefined;
								return _context5.abrupt("return", this
									.initialize(e, history_info));
							case 3:
							case "end":
								return _context5.stop()
						}
					}, _callee5, this)
				}));

			function initializeWithHistoryUserInfo() {
				return _initializeWithHistoryUserInfo.apply(this, arguments)
			}
			return initializeWithHistoryUserInfo
		}()
	}, {
		key: "initialize",
		value: function() {
			var _initialize = _asyncToGenerator(_regeneratorRuntime().mark(function _callee8() {
				var _this10 = this;
				var e, history_info, _args8 = arguments;
				return _regeneratorRuntime().wrap(function _callee8$(_context8) {
					while (1) switch (_context8.prev = _context8.next) {
						case 0:
							e = _args8.length > 0 && _args8[0] !==
								undefined ? _args8[0] : {};
							history_info = _args8.length > 1 ? _args8[1] :
								undefined;
							return _context8.abrupt("return", new Promise(
								function() {
									var _ref = _asyncToGenerator(
										_regeneratorRuntime()
										.mark(function _callee7(
											resolve, reject
											) {
											return _regeneratorRuntime()
												.wrap(
													function _callee7$(
														_context7
														) {
														while (
															1
															)
															switch (
																_context7
																.prev =
																_context7
																.next
																) {
																case 0:
																	try {
																		PlatformAPI
																			.getStorage(
																				"is_ge_registered",
																				true,
																				function() {
																					var _ref2 =
																						_asyncToGenerator(
																							_regeneratorRuntime()
																							.mark(
																								function _callee6(
																									isInitialized
																									) {
																									var warn,
																										query,
																										platFormName,
																										isAliPay,
																										_channel,
																										sync_attribution,
																										data,
																										platform,
																										url,
																										result,
																										properties,
																										date,
																										year,
																										month,
																										day,
																										hours,
																										minutes,
																										seconds,
																										formattedDate,
																										setOnceProperties,
																										$first_scene,
																										$url_query,
																										launchTrackName,
																										trackParams;
																									return _regeneratorRuntime()
																										.wrap(
																											function _callee6$(
																												_context6
																												) {
																												while (
																													1
																													)
																													switch (
																														_context6
																														.prev =
																														_context6
																														.next
																														) {
																														case 0:
																															warn =
																																"";
																															if (!
																																_this10
																																._state
																																.initComplete
																																) {
																																warn =
																																	"initialize must be called after setupAndStart"
																															} else if (
																																!
																																(e !==
																																	null &&
																																	e !==
																																	void 0 &&
																																	e
																																	.name
																																	)
																																) {
																																warn =
																																	"name must be required"
																															} else if (
																																!
																																(e !==
																																	null &&
																																	e !==
																																	void 0 &&
																																	e
																																	.version
																																	) &&
																																(e ===
																																	null ||
																																	e ===
																																	void 0 ?
																																	void 0 :
																																	e
																																	.version
																																	) !==
																																0
																																) {
																																warn =
																																	"version must be required"
																															} else if (
																																!
																																_
																																.isNumber(
																																	e ===
																																	null ||
																																	e ===
																																	void 0 ?
																																	void 0 :
																																	e
																																	.version
																																	) ||
																																typeof(
																																	e ===
																																	null ||
																																	e ===
																																	void 0 ?
																																	void 0 :
																																	e
																																	.version
																																	) !==
																																"number"
																																) {
																																warn =
																																	"version must be type: Number"
																															} else if (
																																history_info !==
																																undefined
																																) {
																																if (Object
																																	.prototype
																																	.toString
																																	.call(
																																		history_info
																																		) !==
																																	"[object Object]"
																																	) {
																																	warn =
																																		"history_info must be type: Object"
																																} else if (
																																	!
																																	(history_info !==
																																		null &&
																																		history_info !==
																																		void 0 &&
																																		history_info
																																		.company
																																		)
																																	) {
																																	warn =
																																		"history_info.company must be required"
																																} else if (
																																	typeof history_info
																																	.company !==
																																	"string"
																																	) {
																																	warn =
																																		"history_info.company must be type: String"
																																} else if (
																																	!
																																	(history_info !==
																																		null &&
																																		history_info !==
																																		void 0 &&
																																		history_info
																																		.create_time
																																		) &&
																																	history_info
																																	.create_time !==
																																	0
																																	) {
																																	warn =
																																		"history_info.create_time must be required"
																																} else if (
																																	!
																																	_
																																	.isNumber(
																																		history_info
																																		.create_time
																																		) ||
																																	typeof history_info
																																	.create_time !==
																																	"number"
																																	) {
																																	warn =
																																		"history_info.create_time must be type: Number"
																																}
																															}
																															if (!
																																warn
																																) {
																																_context6
																																	.next =
																																	4;
																																break
																															}
																															return _context6
																																.abrupt(
																																	"return",
																																	reject(
																																		warn
																																		)
																																	);
																														case 4:
																															query
																																=
																																function() {
																																	var val =
																																		_this10
																																		.getQuery();
																																	if (_
																																		.isObject(
																																			val
																																			) &&
																																		!
																																		_
																																		.isEmptyObject(
																																			val
																																			)
																																		) {
																																		return val
																																	}
																																	var cache =
																																		_this10
																																		._getPreCache();
																																	var cache_query =
																																		cache
																																		.cache_query;
																																	if (_
																																		.isObject(
																																			cache_query
																																			) &&
																																		!
																																		_
																																		.isEmptyObject(
																																			cache_query
																																			)
																																		) {
																																		return _objectSpread2(
																																			_objectSpread2({},
																																				cache_query
																																				), {}, {
																																				gravity_launch_cache: 1
																																			}
																																			)
																																	}
																																	return {}
																																}
																																();
																															platFormName
																																=
																																getPlatFormName();
																															isAliPay
																																=
																																platFormName
																																.includes(
																																	"GravityEngine_ali"
																																	);
																															_channel
																																=
																																(e ===
																																	null ||
																																	e ===
																																	void 0 ?
																																	void 0 :
																																	e
																																	.channel
																																	) ||
																																"base_channel";
																															sync_attribution
																																=
																																(e ===
																																	null ||
																																	e ===
																																	void 0 ?
																																	void 0 :
																																	e
																																	.enable_sync_attribution
																																	) ||
																																false;
																															data = {
																																client_id: _this10
																																	.appId,
																																name: e
																																	.name,
																																channel: isAliPay &&
																																	query !==
																																	null &&
																																	query !==
																																	void 0 &&
																																	query
																																	.channel ?
																																	query
																																	.channel :
																																	_channel,
																																version: e
																																	.version,
																																wx_openid: (
																																		e ===
																																		null ||
																																		e ===
																																		void 0 ?
																																		void 0 :
																																		e
																																		.openid
																																		) ||
																																	(e ===
																																		null ||
																																		e ===
																																		void 0 ?
																																		void 0 :
																																		e
																																		.wx_openid
																																		) ||
																																	_this10
																																	.openId ||
																																	"",
																																wx_unionid: (
																																		e ===
																																		null ||
																																		e ===
																																		void 0 ?
																																		void 0 :
																																		e
																																		.wx_unionid
																																		) ||
																																	"",
																																promoted_object_id: (
																																		e ===
																																		null ||
																																		e ===
																																		void 0 ?
																																		void 0 :
																																		e
																																		.promoted_object_id
																																		) ||
																																	"",
																																need_return_attribution: sync_attribution,
																																ad_data: query
																															};
																															if (
																																history_info) {
																																data.history_info =
																																	history_info
																															}
																															platform
																																=
																																getPlatFormName();
																															if (!
																																(platform ===
																																	"GravityEngine_quick_mp"
																																	)
																																) {
																																_context6
																																	.next =
																																	16;
																																break
																															}
																															_context6
																																.next =
																																15;
																															return _this10
																																.getQuickAppInfo();
																														case 15:
																															data.device_info =
																																_context6
																																.sent;
																														case 16:
																															if (!
																																platform
																																.includes(
																																	"gravityengine_qg"
																																	)
																																) {
																																_context6
																																	.next =
																																	20;
																																break
																															}
																															_context6
																																.next =
																																19;
																															return _this10
																																.getQuickGameInfo();
																														case 19:
																															data.device_info =
																																_context6
																																.sent;
																														case 20:
																															url =
																																""
																																.concat(
																																	Config
																																	.BASE_URL,
																																	"/user/initialize/?access_token="
																																	)
																																.concat(
																																	_this10
																																	.accessToken,
																																	"&client_id="
																																	)
																																.concat(
																																	_this10
																																	.appId
																																	);
																															_context6
																																.next =
																																23;
																															return _this10
																																.sendNetWork(
																																	url,
																																	data
																																	);
																														case 23:
																															result
																																=
																																_context6
																																.sent;
																															if (!
																																(result
																																	.code !==
																																	0
																																	)
																																) {
																																_context6
																																	.next =
																																	26;
																																break
																															}
																															return _context6
																																.abrupt(
																																	"return",
																																	reject(
																																		result
																																		)
																																	);
																														case 26:
																															properties
																																=
																																systemInformation
																																.properties;
																															date =
																																new Date();
																															year =
																																date
																																.getFullYear();
																															month
																																=
																																("0" +
																																	(date
																																		.getMonth() +
																																		1
																																		)
																																	)
																																.slice(
																																	-
																																	2
																																	);
																															day =
																																("0" +
																																	date
																																	.getDate()
																																	)
																																.slice(
																																	-
																																	2
																																	);
																															hours
																																=
																																("0" +
																																	date
																																	.getHours()
																																	)
																																.slice(
																																	-
																																	2
																																	);
																															minutes
																																=
																																("0" +
																																	date
																																	.getMinutes()
																																	)
																																.slice(
																																	-
																																	2
																																	);
																															seconds
																																=
																																("0" +
																																	date
																																	.getSeconds()
																																	)
																																.slice(
																																	-
																																	2
																																	);
																															formattedDate
																																=
																																""
																																.concat(
																																	year,
																																	"-"
																																	)
																																.concat(
																																	month,
																																	"-"
																																	)
																																.concat(
																																	day,
																																	" "
																																	)
																																.concat(
																																	hours,
																																	":"
																																	)
																																.concat(
																																	minutes,
																																	":"
																																	)
																																.concat(
																																	seconds
																																	);
																															if (isInitialized !==
																																"Y"
																																) {
																																setOnceProperties
																																	= {
																																		$channel: _channel,
																																		$manufacturer: properties[
																																			"$manufacturer"
																																			],
																																		$model: properties[
																																			"$model"
																																			],
																																		$brand: properties[
																																			"$brand"
																																			],
																																		$os: properties[
																																			"$os"
																																			],
																																		$first_visit_time: formattedDate
																																	};
																																$first_scene
																																	=
																																	function(
																																		_PlatformAPI$getAppOp6
																																		) {
																																		var val =
																																			(_PlatformAPI$getAppOp6 =
																																				PlatformAPI
																																				.getAppOptions()
																																				) ===
																																			null ||
																																			_PlatformAPI$getAppOp6 ===
																																			void 0 ?
																																			void 0 :
																																			_PlatformAPI$getAppOp6
																																			.scene;
																																		if (
																																			val) {
																																			return String(
																																				val
																																				)
																																		}
																																		var cache =
																																			_this10
																																			._getPreCache();
																																		return cache
																																			.cache_scene ||
																																			""
																																	}
																																	();
																																setOnceProperties
																																	.$first_scene =
																																	$first_scene;
																																if (query !==
																																	null &&
																																	query !==
																																	void 0 &&
																																	query
																																	.gravity_referee_openid
																																	) {
																																	setOnceProperties
																																		.$gravity_referee_openid =
																																		query
																																		.gravity_referee_openid
																																}
																																_this10
																																	.userSetOnce(
																																		setOnceProperties
																																		);
																																$url_query
																																	=
																																	_
																																	.setQuery(
																																		_this10
																																		.getQuery()
																																		);
																																launchTrackName
																																	=
																																	platform ===
																																	"GravityEngine_quick_mp" ?
																																	"$AppStart" :
																																	"$MPLaunch";
																																trackParams
																																	= {
																																		$url_query: $url_query
																																	};
																																_this10
																																	.track(
																																		launchTrackName,
																																		trackParams
																																		);
																																_this10
																																	.track(
																																		"$MPShow",
																																		trackParams
																																		);
																																_this10
																																	.tryRegisterEventDryRun()
																															}
																															try {
																																PlatformAPI
																																	.removeStorage(
																																		"gravity_pre_cache"
																																		)
																															} catch (
																																e
																																) {}
																															PlatformAPI
																																.setStorage(
																																	"is_ge_registered",
																																	JSON
																																	.stringify(
																																		"Y"
																																		)
																																	);
																															return _context6
																																.abrupt(
																																	"return",
																																	resolve(
																																		result
																																		)
																																	);
																														case 39:
																														case "end":
																															return _context6
																																.stop()
																													}
																											},
																											_callee6
																											)
																								}
																								)
																							);
																					return function(
																						_x6
																						) {
																						return _ref2
																							.apply(
																								this,
																								arguments
																								)
																					}
																				}
																				()
																				)
																	} catch (
																		e
																		) {
																		reject
																			(
																				e)
																	}
																case 1:
																case "end":
																	return _context7
																		.stop()
															}
													},
													_callee7
													)
										}));
									return function(_x4, _x5) {
										return _ref.apply(this,
											arguments)
									}
								}()));
						case 3:
						case "end":
							return _context8.stop()
					}
				}, _callee8)
			}));

			function initialize() {
				return _initialize.apply(this, arguments)
			}
			return initialize
		}()
	}, {
		key: "authorizeOpenID",
		value: function authorizeOpenID(id) {
			this.identify(id)
		}
	}, {
		key: "identify",
		value: function identify(id) {
			if (this._hasDisabled()) {
				return
			}
			if (typeof id === "number") {
				id = String(id)
			} else if (typeof id !== "string") {
				return false
			}
			this.store.setDistinctId(id)
		}
	}, {
		key: "getDistinctId",
		value: function getDistinctId() {
			return this.store.getDistinctId()
		}
	}, {
		key: "login",
		value: function login(accoundId) {
			if (this._hasDisabled()) {
				return
			}
			if (typeof accoundId === "number") {
				accoundId = String(accoundId)
			} else if (typeof accoundId !== "string") {
				return false
			}
			this.store.setAccountId(accoundId)
		}
	}, {
		key: "getAccountId",
		value: function getAccountId() {
			return this.store.getAccountId()
		}
	}, {
		key: "logout",
		value: function logout() {
			if (this._hasDisabled()) {
				return
			}
			this.store.setAccountId(null)
		}
	}, {
		key: "setSuperProperties",
		value: function setSuperProperties(obj) {
			if (this._hasDisabled()) {
				return
			}
			if (PropertyChecker.propertiesMust(obj) || !this.config.strict) {
				this.store.setSuperProperties(obj)
			} else {
				logger$1.warn("setSuperProperties parameter must be a valid property value")
			}
		}
	}, {
		key: "clearSuperProperties",
		value: function clearSuperProperties() {
			if (this._hasDisabled()) {
				return
			}
			this.store.setSuperProperties({}, true)
		}
	}, {
		key: "unsetSuperProperty",
		value: function unsetSuperProperty(propertyName) {
			if (this._hasDisabled()) {
				return
			}
			if (_.isString(propertyName)) {
				var superProperties = this.getSuperProperties();
				delete superProperties[propertyName];
				this.store.setSuperProperties(superProperties, true)
			}
		}
	}, {
		key: "getSuperProperties",
		value: function getSuperProperties() {
			return this.store.getSuperProperties()
		}
	}, {
		key: "getSendProperties",
		value: function getSendProperties() {
			try {
				var sendProperties = _.extend({}, systemInformation.properties, this
					.autoTrackProperties, this.store.getSuperProperties(), this
					.dynamicProperties ? this.dynamicProperties() : {});
				for (var key in sendProperties) {
					if (typeof sendProperties[key] === "string") {
						sendProperties[key] = sendProperties[key].substring(0, 8192)
					}
				}
				return sendProperties
			} catch (e) {
				return {}
			}
		}
	}, {
		key: "getPresetProperties",
		value: function getPresetProperties() {
			var properties = systemInformation.properties;
			var presetProperties = {};
			var system_language = properties["$system_language"];
			presetProperties.system_language = _.isUndefined(system_language) ? "" :
			system_language;
			var os = properties["$os"];
			presetProperties.os = _.isUndefined(os) ? "" : os;
			var screenWidth = properties["$screen_width"];
			presetProperties.screenWidth = _.isUndefined(screenWidth) ? 0 : screenWidth;
			var screenHeight = properties["$screen_height"];
			presetProperties.screenHeight = _.isUndefined(screenHeight) ? 0 : screenHeight;
			var networkType = properties["$network_type"];
			presetProperties.networkType = _.isUndefined(networkType) ? "" : networkType;
			var deviceModel = properties["$model"];
			presetProperties.deviceModel = _.isUndefined(deviceModel) ? "" : deviceModel;
			var osVersion = properties["$os_version"];
			presetProperties.osVersion = _.isUndefined(osVersion) ? "" : osVersion;
			presetProperties.deviceId = this.getDeviceId();
			var zoneOffset = 0 - new Date().getTimezoneOffset() / 60.0;
			presetProperties.zoneOffset = zoneOffset;
			var manufacturer = properties["$manufacturer"];
			presetProperties.manufacturer = _.isUndefined(manufacturer) ? "" : manufacturer;
			var brand = properties["$manufacturer"];
			presetProperties.brand = _.isUndefined(brand) ? "" : brand;
			presetProperties.toEventPresetProperties = function() {
				var _PlatformAPI$getAppOp7, _PlatformAPI$getAppOp8;
				return {
					$app_id: this.appId,
					$model: presetProperties.deviceModel,
					$screen_width: presetProperties.screenWidth,
					$screen_height: presetProperties.screenHeight,
					$system_language: presetProperties.system_language,
					$os: presetProperties.os,
					$os_version: presetProperties.osVersion,
					$network_type: presetProperties.networkType,
					$manufacturer: presetProperties.manufacturer,
					$brand: presetProperties.manufacturer,
					$scene: String(((_PlatformAPI$getAppOp7 = PlatformAPI.getAppOptions()) ===
						null || _PlatformAPI$getAppOp7 === void 0 ? void 0 :
						_PlatformAPI$getAppOp7.scene) || ((_PlatformAPI$getAppOp8 =
							PlatformAPI.getAppOptions()) === null ||
						_PlatformAPI$getAppOp8 === void 0 ? void 0 :
						_PlatformAPI$getAppOp8.from))
				}
			};
			return presetProperties
		}
	}, {
		key: "setDynamicSuperProperties",
		value: function setDynamicSuperProperties(dynamicProperties) {
			if (this._hasDisabled()) {
				return
			}
			if (typeof dynamicProperties === "function") {
				if (PropertyChecker.properties(dynamicProperties()) || !this.config.strict) {
					this.dynamicProperties = dynamicProperties
				} else {
					logger$1.warn("A dynamic public property must return a valid property value")
				}
			} else {
				logger$1.warn("setDynamicSuperProperties parameter must be a function type")
			}
		}
	}, {
		key: "timeEvent",
		value: function timeEvent(eventName, time) {
			if (this._hasDisabled()) {
				return
			}
			time = _.isDate(time) ? time : new Date();
			if (this._isReady()) {
				if (PropertyChecker.event(eventName) || !this.config.strict) {
					this.store.setEventTimer(eventName, time.getTime())
				} else {
					logger$1.warn("calling timeEvent failed due to invalid eventName: " + eventName)
				}
			} else {
				this._queue.push(["timeEvent", [eventName, time]])
			}
		}
	}, {
		key: "getDeviceId",
		value: function getDeviceId() {
			return systemInformation.properties["$device_id"]
		}
	}, {
		key: "enableTracking",
		value: function enableTracking(enabled) {
			this.enabled = enabled;
			this.store._set("ta_enabled", enabled)
		}
	}, {
		key: "optOutTracking",
		value: function optOutTracking() {
			this.store.setSuperProperties({}, true);
			this.store.setDistinctId(_.UUID());
			this.store.setAccountId(null);
			this._queue.splice(0, this._queue.length);
			this.isOptOut = true;
			this.store._set("ge_isOptOut", true)
		}
	}, {
		key: "optOutTrackingAndDeleteUser",
		value: function optOutTrackingAndDeleteUser() {
			var time = new Date();
			this._sendRequest({
				type: "user_del"
			}, time);
			this.optOutTracking()
		}
	}, {
		key: "optInTracking",
		value: function optInTracking() {
			this.isOptOut = false;
			this.store._set("ge_isOptOut", false)
		}
	}, {
		key: "setTrackStatus",
		value: function setTrackStatus(status) {
			switch (status) {
				case "PAUSE":
					this.eventSaveOnly = false;
					this.optInTracking();
					this.enableTracking(false);
					break;
				case "STOP":
					this.eventSaveOnly = false;
					this.optOutTracking(true);
					break;
				case "SAVE_ONLY":
				case "NORMAL":
				default:
					this.eventSaveOnly = false;
					this.optInTracking();
					this.enableTracking(true);
					break
			}
		}
	}, {
		key: "getCommonOpenId",
		value: function getCommonOpenId(code, platform) {
			var _this11 = this;
			return new Promise(function() {
				var _ref3 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee9(
					resolve, reject) {
					var _result$data, url, result;
					return _regeneratorRuntime().wrap(function _callee9$(
						_context9) {
						while (1) switch (_context9.prev = _context9
							.next) {
							case 0:
								_context9.prev = 0;
								if (code) {
									_context9.next = 3;
									break
								}
								return _context9.abrupt("return",
									reject("code is required"));
							case 3:
								url =
									"https://backend.gravity-engine.com/event_center/api/v1/base/"
									.concat(platform,
										"/code2Session/?access_token="
										).concat(_this11
										.accessToken);
								_context9.next = 6;
								return _this11.sendNetWork(url, {
									code: code
								});
							case 6:
								result = _context9.sent;
								return _context9.abrupt("return",
									result.code === 0 &&
									result !== null &&
									result !== void 0 && (
										_result$data = result
										.data) !== null &&
									_result$data !== void 0 &&
									_result$data.resp ? resolve(
										result.data.resp) :
									reject(result));
							case 10:
								_context9.prev = 10;
								_context9.t0 = _context9["catch"](
								0);
								return _context9.abrupt("return",
									reject(_context9.t0));
							case 13:
							case "end":
								return _context9.stop()
						}
					}, _callee9, null, [
						[0, 10]
					])
				}));
				return function(_x7, _x8) {
					return _ref3.apply(this, arguments)
				}
			}())
		}
	}, {
		key: "getWechatOpenId",
		value: function getWechatOpenId(code) {
			return this.getCommonOpenId(code, "wx")
		}
	}, {
		key: "getKuaishouOpenId",
		value: function getKuaishouOpenId(code) {
			return this.getCommonOpenId(code, "ks")
		}
	}, {
		key: "getDouyinOpenId",
		value: function getDouyinOpenId(code) {
			return this.getCommonOpenId(code, "dy")
		}
	}, {
		key: "getBilibiliOpenId",
		value: function getBilibiliOpenId(code) {
			return this.getCommonOpenId(code, "bili")
		}
	}, {
		key: "tencentSDKRegisterTrack",
		value: function tencentSDKRegisterTrack() {
			var _this12 = this;
			if (!this.sdk || !this.appId) {
				return
			}
			this.checkUserInfo().then(function(res) {
				var _res$data, _this12$config;
				var action = (res === null || res === void 0 || (_res$data = res.data) ===
					null || _res$data === void 0 ? void 0 : _res$data.action) || "";
				if (action === "register") {
					_this12.sdk.onRegister();
					logger$1.tencentSdkLog("onRegister");
					_this12.setupUserInfo("register")
				} else if (action === "re_active" && typeof((_this12$config = _this12
							.config) === null || _this12$config === void 0 || (
							_this12$config = _this12$config.tencentSdkData) === null ||
						_this12$config === void 0 ? void 0 : _this12$config.silentPeriod
						) === "number") {
					_this12.sdk.track("RE_ACTIVE", {
						backFlowDay: _this12.config.tencentSdkData.silentPeriod
					});
					logger$1.tencentSdkLog("track RE_ACTIVE");
					_this12.setupUserInfo("re_active")
				}
			})
		}
	}, {
		key: "checkUserInfo",
		value: function checkUserInfo() {
			var _this$config, _this13 = this;
			var silentPeriod = ((_this$config = this.config) === null || _this$config === void 0 ||
				(_this$config = _this$config.tencentSdkData) === null || _this$config ===
				void 0 ? void 0 : _this$config.silentPeriod) || 7;
			return new Promise(function() {
				var _ref4 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee10(
					resolve, reject) {
					var url, result;
					return _regeneratorRuntime().wrap(function _callee10$(
						_context10) {
						while (1) switch (_context10.prev = _context10
							.next) {
							case 0:
								url =
									"https://backend.gravity-engine.com/event_center/api/v1/event/tencent_sdk/?access_token="
									.concat(_this13.accessToken,
										"&client_id=").concat(
										_this13.appId,
										"&backFlowDay=").concat(
										silentPeriod);
								_context10.next = 3;
								return _this13.sendNetWork(url, {},
									"get");
							case 3:
								result = _context10.sent;
								return _context10.abrupt("return",
									result.code === 0 ? resolve(
										result) : reject(result)
									);
							case 5:
							case "end":
								return _context10.stop()
						}
					}, _callee10)
				}));
				return function(_x9, _x10) {
					return _ref4.apply(this, arguments)
				}
			}())
		}
	}, {
		key: "setupUserInfo",
		value: function setupUserInfo(action) {
			var _this14 = this;
			return new Promise(function() {
				var _ref5 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee11(
					resolve, reject) {
					var url, result;
					return _regeneratorRuntime().wrap(function _callee11$(
						_context11) {
						while (1) switch (_context11.prev = _context11
							.next) {
							case 0:
								if (action) {
									_context11.next = 2;
									break
								}
								return _context11.abrupt("return",
									reject("action is required")
									);
							case 2:
								url =
									"https://backend.gravity-engine.com/event_center/api/v1/event/tencent_sdk/?access_token="
									.concat(_this14.accessToken,
										"&client_id=").concat(
										_this14.appId);
								_context11.next = 5;
								return _this14.sendNetWork(url, {
									postback_list: [{
										action: action
									}]
								}, "post");
							case 5:
								result = _context11.sent;
								return _context11.abrupt("return",
									result.code === 0 ? resolve(
										result) : reject(result)
									);
							case 7:
							case "end":
								return _context11.stop()
						}
					}, _callee11)
				}));
				return function(_x11, _x12) {
					return _ref5.apply(this, arguments)
				}
			}())
		}
	}, {
		key: "queryDryRunInfo",
		value: function queryDryRunInfo(traceId) {
			var _this15 = this;
			return new Promise(function() {
				var _ref6 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee12(
					resolve, reject) {
					var traceParams, url, result;
					return _regeneratorRuntime().wrap(function _callee12$(
						_context12) {
						while (1) switch (_context12.prev = _context12
							.next) {
							case 0:
								traceParams = "".concat(traceId ?
									"&trace_id=".concat(
									traceId) : "");
								url =
									"https://backend.gravity-engine.com/event_center/api/v1/event/postback_info/?access_token="
									.concat(_this15.accessToken,
										"&client_id=").concat(
										_this15.appId).concat(
										traceParams);
								_context12.next = 4;
								return _this15.sendNetWork(url, {},
									"get");
							case 4:
								result = _context12.sent;
								return _context12.abrupt("return",
									result.code === 0 ? resolve(
										result) : reject(result)
									);
							case 6:
							case "end":
								return _context12.stop()
						}
					}, _callee12)
				}));
				return function(_x13, _x14) {
					return _ref6.apply(this, arguments)
				}
			}())
		}
	}, {
		key: "sendDryRunResult",
		value: function sendDryRunResult(traceId, action) {
			var _this16 = this;
			return new Promise(function() {
				var _ref7 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee13(
					resolve, reject) {
					var url, result;
					return _regeneratorRuntime().wrap(function _callee13$(
						_context13) {
						while (1) switch (_context13.prev = _context13
							.next) {
							case 0:
								if (traceId) {
									_context13.next = 2;
									break
								}
								return _context13.abrupt("return",
									reject(
										"traceId is required"));
							case 2:
								if (action) {
									_context13.next = 4;
									break
								}
								return _context13.abrupt("return",
									reject("action is required")
									);
							case 4:
								url =
									"https://backend.gravity-engine.com/event_center/api/v1/event/postback_info/?access_token="
									.concat(_this16.accessToken,
										"&client_id=").concat(
										_this16.appId);
								_context13.next = 7;
								return _this16.sendNetWork(url, {
									postback_list: [{
										trace_id: traceId,
										action: action
									}]
								}, "post");
							case 7:
								result = _context13.sent;
								return _context13.abrupt("return",
									result.code === 0 ? resolve(
										result) : reject(result)
									);
							case 9:
							case "end":
								return _context13.stop()
						}
					}, _callee13)
				}));
				return function(_x15, _x16) {
					return _ref7.apply(this, arguments)
				}
			}())
		}
	}, {
		key: "payEventToTencent",
		value: function payEventToTencent($pay_amount) {
			if (this.sdk) {
				this.sdk.onPurchase($pay_amount);
				logger$1.tencentSdkLog("onPurchase")
			}
		}
	}, {
		key: "getDryRunPostBackInfo",
		value: function() {
			var _getDryRunPostBackInfo = _asyncToGenerator(_regeneratorRuntime().mark(
				function _callee14(traceId) {
					var catchResult, _data$postback_list, res, data, retry;
					return _regeneratorRuntime().wrap(function _callee14$(_context14) {
						while (1) switch (_context14.prev = _context14.next) {
							case 0:
								catchResult = {
									click_company: "",
									postback_list: [],
									retry: 0
								};
								_context14.prev = 1;
								_context14.next = 4;
								return this.queryDryRunInfo(traceId);
							case 4:
								res = _context14.sent;
								data = (res === null || res === void 0 ?
									void 0 : res.data) || {};
								if (!(data !== null && data !== void 0 && (
											_data$postback_list = data
											.postback_list) !== null &&
										_data$postback_list !== void 0 &&
										_data$postback_list.length)) {
									_context14.next = 9;
									break
								}
								retry = Number(data === null || data ===
										void 0 ? void 0 : data.retry) ||
									catchResult.retry;
								return _context14.abrupt("return", {
									postback_list: data.postback_list,
									click_company: (data === null ||
											data === void 0 ? void 0 :
											data.click_company) ||
										catchResult.click_company,
									retry: retry >= 0 ? retry :
										catchResult.retry
								});
							case 9:
								return _context14.abrupt("return", catchResult);
							case 12:
								_context14.prev = 12;
								_context14.t0 = _context14["catch"](1);
								return _context14.abrupt("return", catchResult);
							case 15:
							case "end":
								return _context14.stop()
						}
					}, _callee14, this, [
						[1, 12]
					])
				}));

			function getDryRunPostBackInfo(_x17) {
				return _getDryRunPostBackInfo.apply(this, arguments)
			}
			return getDryRunPostBackInfo
		}()
	}, {
		key: "_getIsDryRun",
		value: function _getIsDryRun() {
			var _this17 = this;
			return new Promise(function() {
				var _ref8 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee15(
					resolve) {
					var url, _result$data2, result, isOpen;
					return _regeneratorRuntime().wrap(function _callee15$(
						_context15) {
						while (1) switch (_context15.prev = _context15
							.next) {
							case 0:
								url =
									"https://backend.gravity-engine.com/event_center/api/v1/base/appconf/?access_token="
									.concat(_this17.accessToken,
										"&conf_type=dryrun_mode");
								_context15.prev = 1;
								_context15.next = 4;
								return _this17.sendNetWork(url, {},
									"get");
							case 4:
								result = _context15.sent;
								isOpen = (result === null ||
									result === void 0 || (
										_result$data2 = result
										.data) === null ||
									_result$data2 === void 0 ||
									(_result$data2 =
										_result$data2
										.dryrun_mode) ===
									null || _result$data2 ===
									void 0 ? void 0 :
									_result$data2.tencent) > 0;
								resolve(result.code === 0 &&
								isOpen);
								_context15.next = 12;
								break;
							case 9:
								_context15.prev = 9;
								_context15.t0 = _context15["catch"](
									1);
								resolve(false);
							case 12:
							case "end":
								return _context15.stop()
						}
					}, _callee15, null, [
						[1, 9]
					])
				}));
				return function(_x18) {
					return _ref8.apply(this, arguments)
				}
			}())
		}
	}, {
		key: "_setDryRunValue",
		value: function() {
			var _setDryRunValue2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee16(
				sleepTime) {
				var flag;
				return _regeneratorRuntime().wrap(function _callee16$(_context16) {
					while (1) switch (_context16.prev = _context16.next) {
						case 0:
							if (!(!this.sdk || Reflect.has(this.config
									.tencentSdkData, "enableDryRun"))) {
								_context16.next = 2;
								break
							}
							return _context16.abrupt("return");
						case 2:
							_context16.next = 4;
							return _.sleep(sleepTime);
						case 4:
							if (!Reflect.has(this.config.tencentSdkData,
									"enableDryRun")) {
								_context16.next = 6;
								break
							}
							return _context16.abrupt("return");
						case 6:
							_context16.next = 8;
							return this._getIsDryRun();
						case 8:
							flag = _context16.sent;
							this.config.tencentSdkData.enableDryRun = flag;
						case 10:
						case "end":
							return _context16.stop()
					}
				}, _callee16, this)
			}));

			function _setDryRunValue(_x19) {
				return _setDryRunValue2.apply(this, arguments)
			}
			return _setDryRunValue
		}()
	}, {
		key: "tryDryRun",
		value: function() {
			var _tryDryRun = _asyncToGenerator(_regeneratorRuntime().mark(function _callee17(
			_ref9) {
				var actionList, backInfo, postback_list, maxTryCount, click_company,
					currentTryCount, sleepTime, retryBackInfo, _iterator, _step, item,
					sendPostBackList, url;
				return _regeneratorRuntime().wrap(function _callee17$(_context17) {
					while (1) switch (_context17.prev = _context17.next) {
						case 0:
							actionList = _ref9.actionList;
							if (!(actionList.length === 0)) {
								_context17.next = 3;
								break
							}
							return _context17.abrupt("return");
						case 3:
							_context17.next = 5;
							return _.sleep(1000);
						case 5:
							_context17.next = 7;
							return this.getDryRunPostBackInfo("");
						case 7:
							backInfo = _context17.sent;
							postback_list = backInfo.postback_list;
							maxTryCount = backInfo.retry;
							click_company = backInfo.click_company;
							currentTryCount = 0;
						case 12:
							if (!(postback_list.length === 0 &&
									currentTryCount < maxTryCount)) {
								_context17.next = 24;
								break
							}
							sleepTime = currentTryCount * 1000 + 2000;
							_context17.next = 16;
							return _.sleep(sleepTime);
						case 16:
							_context17.next = 18;
							return this.getDryRunPostBackInfo("");
						case 18:
							retryBackInfo = _context17.sent;
							postback_list = retryBackInfo.postback_list;
							click_company = retryBackInfo.click_company;
							currentTryCount++;
							_context17.next = 12;
							break;
						case 24:
							if (!(click_company !== "tencent" || !
									postback_list.length)) {
								_context17.next = 26;
								break
							}
							return _context17.abrupt("return");
						case 26:
							_iterator = _createForOfIteratorHelper(
								postback_list);
							try {
								for (_iterator.s(); !(_step = _iterator.n())
									.done;) {
									item = _step.value;
									if (item.action === "pay" && actionList
										.includes("pay")) {
										this.sdk.onPurchase(item
											.postback_value);
										logger$1.tencentSdkLog("onPurchase")
									} else if (item.action ===
										"tutorial_finish" && actionList
										.includes("tutorial_finish")) {
										this.onTutorialFinishEvent()
									} else if (item.action ===
										"create_role" && actionList
										.includes("create_role")) {
										this.onCreateRoleEvent(item
											.role_name)
									} else if (item.action ===
										"re_active" && actionList.includes(
											"re_active")) {
										this.sdk.track("RE_ACTIVE", {
											backFlowDay: item
												.re_active_day
										});
										logger$1.tencentSdkLog(
											"track RE_ACTIVE")
									} else if (item.action === "register" &&
										actionList.includes("register")) {
										this.sdk.onRegister();
										logger$1.tencentSdkLog("onRegister")
									}
								}
							} catch (err) {
								_iterator.e(err)
							} finally {
								_iterator.f()
							}
							sendPostBackList = postback_list.filter(
								function(item) {
									return actionList.includes(item
										.action)
								});
							url =
								"https://backend.gravity-engine.com/event_center/api/v1/event/postback_info/?access_token="
								.concat(this.accessToken, "&client_id=")
								.concat(this.appId);
							this.sendNetWork(url, {
								postback_list: sendPostBackList.map(
									function(item) {
										return {
											trace_id: item
												.trace_id,
											action: item.action
										}
									})
							}, "post");
						case 31:
						case "end":
							return _context17.stop()
					}
				}, _callee17, this)
			}));

			function tryDryRun(_x20) {
				return _tryDryRun.apply(this, arguments)
			}
			return tryDryRun
		}()
	}, {
		key: "tryPayEventDryRun",
		value: function() {
			var _tryPayEventDryRun = _asyncToGenerator(_regeneratorRuntime().mark(
				function _callee18($pay_amount) {
					return _regeneratorRuntime().wrap(function _callee18$(_context18) {
						while (1) switch (_context18.prev = _context18.next) {
							case 0:
								if (this.sdk) {
									_context18.next = 2;
									break
								}
								return _context18.abrupt("return");
							case 2:
								_context18.next = 4;
								return this._setDryRunValue(200);
							case 4:
								if (this.config.tencentSdkData.enableDryRun) {
									this.tryDryRun({
										actionList: ["pay"]
									})
								} else {
									this.sdk.onPurchase($pay_amount);
									logger$1.tencentSdkLog("onPurchase")
								}
							case 5:
							case "end":
								return _context18.stop()
						}
					}, _callee18, this)
				}));

			function tryPayEventDryRun(_x21) {
				return _tryPayEventDryRun.apply(this, arguments)
			}
			return tryPayEventDryRun
		}()
	}, {
		key: "tryTutorialFinishEventDryRun",
		value: function() {
			var _tryTutorialFinishEventDryRun = _asyncToGenerator(_regeneratorRuntime().mark(
				function _callee19() {
					return _regeneratorRuntime().wrap(function _callee19$(_context19) {
						while (1) switch (_context19.prev = _context19.next) {
							case 0:
								if (this.sdk) {
									_context19.next = 2;
									break
								}
								return _context19.abrupt("return");
							case 2:
								_context19.next = 4;
								return this._setDryRunValue(200);
							case 4:
								if (this.config.tencentSdkData.enableDryRun) {
									this.tryDryRun({
										actionList: ["tutorial_finish"]
									})
								} else {
									this.onTutorialFinishEvent()
								}
							case 5:
							case "end":
								return _context19.stop()
						}
					}, _callee19, this)
				}));

			function tryTutorialFinishEventDryRun() {
				return _tryTutorialFinishEventDryRun.apply(this, arguments)
			}
			return tryTutorialFinishEventDryRun
		}()
	}, {
		key: "tryCreateRoleEventDryRun",
		value: function() {
			var _tryCreateRoleEventDryRun = _asyncToGenerator(_regeneratorRuntime().mark(
				function _callee20(role_name) {
					return _regeneratorRuntime().wrap(function _callee20$(_context20) {
						while (1) switch (_context20.prev = _context20.next) {
							case 0:
								if (this.sdk) {
									_context20.next = 2;
									break
								}
								return _context20.abrupt("return");
							case 2:
								_context20.next = 4;
								return this._setDryRunValue(200);
							case 4:
								if (this.config.tencentSdkData.enableDryRun) {
									this.tryDryRun({
										actionList: ["create_role"]
									})
								} else {
									this.onCreateRoleEvent(role_name)
								}
							case 5:
							case "end":
								return _context20.stop()
						}
					}, _callee20, this)
				}));

			function tryCreateRoleEventDryRun(_x22) {
				return _tryCreateRoleEventDryRun.apply(this, arguments)
			}
			return tryCreateRoleEventDryRun
		}()
	}, {
		key: "tryRegisterEventDryRun",
		value: function() {
			var _tryRegisterEventDryRun = _asyncToGenerator(_regeneratorRuntime().mark(
				function _callee21() {
					return _regeneratorRuntime().wrap(function _callee21$(_context21) {
						while (1) switch (_context21.prev = _context21.next) {
							case 0:
								if (this.sdk) {
									_context21.next = 2;
									break
								}
								return _context21.abrupt("return");
							case 2:
								_context21.next = 4;
								return this._setDryRunValue(200);
							case 4:
								if (this.config.tencentSdkData.enableDryRun) {
									this.tryDryRun({
										actionList: ["register"]
									})
								} else {
									this.tencentSDKRegisterTrack()
								}
							case 5:
							case "end":
								return _context21.stop()
						}
					}, _callee21, this)
				}));

			function tryRegisterEventDryRun() {
				return _tryRegisterEventDryRun.apply(this, arguments)
			}
			return tryRegisterEventDryRun
		}()
	}, {
		key: "onUpdateLevelEvent",
		value: function onUpdateLevelEvent(userLevel) {
			if (this.sdk) {
				this.sdk.track("UPDATE_LEVEL", {
					level: userLevel
				});
				logger$1.tencentSdkLog("track UPDATE_LEVEL")
			}
			this.track("$UpdateLevel", {
				$user_level: userLevel
			})
		}
	}, {
		key: "onRegisterEvent",
		value: function onRegisterEvent() {
			if (this.sdk) {
				this.sdk.onRegister();
				logger$1.tencentSdkLog("onRegister")
			}
			this.registerEvent()
		}
	}, {
		key: "onCreateRoleEvent",
		value: function onCreateRoleEvent(role_name) {
			if (this.sdk) {
				this.sdk.onCreateRole(role_name);
				logger$1.tencentSdkLog("onCreateRole")
			}
			this.track("$CreateRole", {
				$role_name: role_name
			})
		}
	}, {
		key: "onTutorialFinishEvent",
		value: function onTutorialFinishEvent() {
			if (this.sdk) {
				this.sdk.onTutorialFinish();
				logger$1.tencentSdkLog("onTutorialFinish")
			}
			this.track("$TutorialFinish", {})
		}
	}, {
		key: "onViewMallContentEvent",
		value: function onViewMallContentEvent() {
			if (this.sdk) {
				this.sdk.track("VIEW_CONTENT", {
					item: "Mall"
				});
				logger$1.tencentSdkLog("track VIEW_CONTENT Mall")
			}
			this.track("$ViewMallContent", {})
		}
	}, {
		key: "onViewActivityContentEvent",
		value: function onViewActivityContentEvent() {
			if (this.sdk) {
				this.sdk.track("VIEW_CONTENT", {
					item: "Activity"
				});
				logger$1.tencentSdkLog("track VIEW_CONTENT Activity")
			}
			this.track("$ViewActivityContent", {})
		}
	}, {
		key: "onAddToWishListEvent",
		value: function onAddToWishListEvent() {
			var wishType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] :
				"default";
			if (this.sdk) {
				this.sdk.track("ADD_TO_WISHLIST", {
					type: wishType
				});
				logger$1.tencentSdkLog("track ADD_TO_WISHLIST")
			}
			this.track("$MPAddFavorites", {
				$url_path: ""
			})
		}
	}, {
		key: "onShareEvent",
		value: function onShareEvent(shareType) {
			if (this.sdk) {
				this.sdk.track("SHARE", {
					target: shareType
				});
				logger$1.tencentSdkLog("track SHARE")
			}
			this.track("$MPShare", {
				$share_depth: 1,
				$share_method: "转发消息卡片",
				$share_target: shareType
			})
		}
	}]);
	return GravityEngineAPI
}();
var DEFAULT_CONFIG$1 = {
	name: "gravityengine",
	enableLog: true,
	enableNative: false
};
var GravityAnalyticsAPI = function() {
	function GravityAnalyticsAPI(config) {
		_classCallCheck(this, GravityAnalyticsAPI);
		config.appId = _.checkAppId(config.clientId);
		config.accessToken = config.accessToken;
		if (!config.accessToken) {
			console.warn("GravityAnalytics: accessToken must be required")
		}
		config.serverUrl = "".concat(Config.BASE_URL, "/event/collect/?access_token=").concat(config.accessToken);
		var defaultConfig = _.extend({}, DEFAULT_CONFIG$1, PlatformAPI.getConfig());
		if (_.isObject(config)) {
			this.config = _.extend(defaultConfig, config)
		} else {
			this.config = defaultConfig
		}
		this._init(this.config)
	}
	_createClass(GravityAnalyticsAPI, [{
		key: "_isNativePlatform",
		value: function _isNativePlatform() {
			return true
		}
	}, {
		key: "_isIOS",
		value: function _isIOS() {
			if (_.isUndefined(this.isiOSPlat)) {
				var iOSApiClass = plus.ios.importClass("GravityGameEngineApi");
				if (iOSApiClass) {
					this.isiOSPlat = true
				} else {
					this.isiOSPlat = false
				}
			}
			return this.isiOSPlat
		}
	}, {
		key: "_isAndroid",
		value: function _isAndroid() {
			if (_.isUndefined(this.isAndroidPlat)) {
				var androidApiClass = plus.android.importClass(
					"cn.gravity.engine.GravityEngineUniAppAPI");
				if (androidApiClass) {
					this.isAndroidPlat = true
				} else {
					this.isAndroidPlat = false
				}
			}
			return this.isAndroidPlat
		}
	}, {
		key: "_init",
		value: function _init(config) {
			this.name = config.name;
			this.appId = config.appId || config.appid;
			if (this._isNativePlatform()) {
				this.initInstanceForNative()
			} else {
				this.geJs = new GravityEngineAPI(config)
			}
		}
	}, {
		key: "setupAndStart",
		value: function setupAndStart(option) {
			if (this._isNativePlatform()) {
				this.startGravityEngineForNative();
				return
			}
			this.geJs.setupAndStart(option)
		}
	}, {
		key: "startGravityEngineForNative",
		value: function startGravityEngineForNative() {
			var mode = 0;
			if (this.config.debugMode === "debug") {
				mode = 1
			}
			var secretKey = {};
			if (_.isObject(this.config.secretKey)) {
				secretKey.publicKey = this.config.secretKey.publicKey;
				secretKey.version = this.config.secretKey.version;
				secretKey.symmetricEncryption = "AES";
				secretKey.asymmetricEncryption = "RSA"
			}
			var tConfig = {
				accessToken: this.config.accessToken,
				mode: mode,
				enableEncrypt: this.config.enableEncrypt,
				secretKey: secretKey,
				timeZone: this.config.timeZone
			};
			var autoTrack = [];
			if (_.isObject(this.config.autoTrack)) {
				if (this.config.autoTrack.appInstall) {
					autoTrack.push("appInstall")
				}
				if (this.config.autoTrack.appShow) {
					autoTrack.push("appStart")
				}
				if (this.config.autoTrack.appHide) {
					autoTrack.push("appEnd")
				}
				if (this.config.autoTrack.appCrash) {
					autoTrack.push("appCrash")
				}
			}
			var str = {
				appId: this.appId,
				autoTrack: autoTrack
			};
			if (this._isAndroid()) {
				this.androidApi.setCustomerLibInfo(Config.LIB_NAME, Config.LIB_VERSION);
				this.androidApi.enableTrackLog(this.config.enableLog);
				this.androidApi.setupAndStart(JSON.stringify(tConfig));
				this.androidApi.enableAutoTrack(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.setCustomerLibInfolibVersion(Config.LIB_NAME, Config.LIB_VERSION);
				this.iosApi.enableTrackLog(this.config.enableLog);
				this.iosApi.sharedInstance(JSON.stringify(tConfig));
				this.iosApi.enableAutoTrack(JSON.stringify(str))
			}
		}
	}, {
		key: "initInstance",
		value: function initInstance(name, config) {
			if (this._isNativePlatform()) {
				if (!_.isUndefined(config)) {
					this[name] = new GravityAnalyticsAPI(config)
				} else {
					this[name] = new GravityAnalyticsAPI(this.config)
				}
				this[name].setupAndStart();
				return this[name]
			}
			this[name] = this.geJs.initInstance(name, config);
			return this[name]
		}
	}, {
		key: "lightInstance",
		value: function lightInstance(name) {
			return this[name]
		}
	}, {
		key: "initInstanceForNative",
		value: function initInstanceForNative() {
			if (this._isAndroid()) {
				var androidApiClass = plus.android.importClass(
					"cn.gravity.engine.GravityEngineUniAppAPI");
				this.androidApi = new androidApiClass()
			} else if (this._isIOS()) {
				var iOSApiClass = plus.ios.importClass("GravityGameEngineApi");
				this.iosApi = new iOSApiClass()
			}
		}
	}, {
		key: "calibrateTime",
		value: function calibrateTime(timeStampMillis) {
			if (this._isAndroid()) {
				this.androidApi.calibrateTime(timeStampMillis)
			} else if (this._isIOS()) {
				this.iosApi.calibrateTime(timeStampMillis)
			}
		}
	}, {
		key: "calibrateTimeWithNtp",
		value: function calibrateTimeWithNtp(ntpServer) {
			if (this._isAndroid()) {
				this.androidApi.calibrateTimeWithNtp(ntpServer)
			} else if (this._isIOS()) {
				this.iosApi.calibrateTimeWithNtp(ntpServer)
			}
		}
	}, {
		key: "track",
		value: function track(eventName, properties, time, onComplete) {
			if (this._isNativePlatform()) {
				this.trackForNative(eventName, properties, time);
				return
			}
			this.geJs.track(eventName, properties, time, onComplete)
		}
	}, {
		key: "trackForNative",
		value: function trackForNative(eventName, properties, time) {
			var timeStamp = _.isDate(time) ? time.getTime() : "";
			if (_.isUndefined(properties)) properties = {};
			properties = _.extend(properties, this.dynamicProperties ? this.dynamicProperties() :
				{});
			properties = _.encodeDates(properties);
			var str = {
				appId: this.appId,
				eventName: eventName,
				properties: properties,
				time: timeStamp
			};
			if (this._isAndroid()) {
				this.androidApi.track(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.track(JSON.stringify(str))
			}
		}
	}, {
		key: "initialize",
		value: function initialize() {
			var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			if (this._isNativePlatform()) {
				this.initializeForNative(e);
				return
			}
			return this.geJs.initialize(e)
		}
	}, {
		key: "initializeForNative",
		value: function initializeForNative(e) {
			var access_token = this.config.accessToken;
			var channel = (e === null || e === void 0 ? void 0 : e.channel) || "";
			var needReturnAttribution = (e === null || e === void 0 ? void 0 : e
				.enable_sync_attribution) || false;
			if (this._isAndroid()) {
				this.androidApi.initialize(access_token, channel, needReturnAttribution)
			} else if (this._isIOS()) {
				this.iosApi.initialize(JSON.stringify(e), appId)
			}
		}
	}, {
		key: "registerEvent",
		value: function registerEvent() {
			if (this._isNativePlatform()) {
				this.trackForNative("$AppRegister", {});
				return
			}
			return this.geJs.registerEvent()
		}
	}, {
		key: "loginEvent",
		value: function loginEvent() {
			if (this._isNativePlatform()) {
				return
			}
			return this.geJs.loginEvent()
		}
	}, {
		key: "logoutEvent",
		value: function logoutEvent() {
			if (this._isNativePlatform()) {
				return
			}
			return this.geJs.logoutEvent()
		}
	}, {
		key: "payEvent",
		value: function payEvent($pay_amount, $pay_type, $order_id, $pay_reason, $pay_method) {
			if (this._isNativePlatform()) {
				if (typeof $pay_amount !== "number") {
					throw new Error("pay_amount must be a number");
				} else if (typeof $pay_type !== "string") {
					throw new Error("pay_type must be a string");
				} else if (typeof $order_id !== "string") {
					throw new Error("order_id must be a string");
				} else if (typeof $pay_reason !== "string") {
					throw new Error("pay_reason must be a string");
				} else if (typeof $pay_method !== "string") {
					throw new Error("pay_method must be a string");
				}
				var eventName = "$PayEvent";
				var properties = {
					$pay_amount: $pay_amount,
					$pay_type: $pay_type,
					$order_id: $order_id,
					$pay_reason: $pay_reason,
					$pay_method: $pay_method
				};
				this.trackForNative(eventName, properties);
				return
			}
			return this.geJs.payEvent($pay_amount, $pay_type, $order_id, $pay_reason, $pay_method)
		}
	}, {
		key: "bindTAThirdPlatform",
		value: function bindTAThirdPlatform(taAccountId, taDistinctId) {
			if (this._isNativePlatform()) {
				if (!taAccountId && !taDistinctId) {
					throw new Error("taAccountId or taDistinctId must be required");
				} else if (taAccountId && typeof taAccountId !== "string") {
					throw new Error("taAccountId must be a string");
				} else if (taDistinctId && typeof taDistinctId !== "string") {
					throw new Error("taDistinctId must be a string");
				}
				var eventName = "$BindThirdPlatform";
				var properties = {
					$third_platform_type: "ta",
					$ta_account_id: taAccountId,
					$ta_distinct_id: taDistinctId
				};
				this.trackForNative(eventName, properties);
				return
			}
			return this.geJs.bindTAThirdPlatform(taAccountId, taDistinctId)
		}
	}, {
		key: "adShowEvent",
		value: function adShowEvent($ad_type, $ad_unit_id, otherProperties) {
			if (this._isNativePlatform()) {
				if (typeof $ad_type !== "string") {
					throw new Error("ad_type must be a string");
				} else if (typeof $ad_unit_id !== "string") {
					throw new Error("ad_unit_id must be a string");
				}
				var eventName = "$AdShow";
				var properties = {
					$ad_type: $ad_type,
					$ad_unit_id: $ad_unit_id
				};
				if (Object.prototype.toString.call(otherProperties) === "[object Object]") {
					Object.assign(properties, otherProperties)
				}
				this.trackForNative(eventName, properties);
				return
			}
			return this.geJs.adShowEvent($ad_type, $ad_unit_id, otherProperties)
		}
	}, {
		key: "userSet",
		value: function userSet(properties, time, onComplete) {
			if (this._isNativePlatform()) {
				this.userSetForNative(properties, time);
				return
			}
			this.geJs.userSet(properties, time, onComplete)
		}
	}, {
		key: "userSetForNative",
		value: function userSetForNative(properties, time) {
			var timeStamp = _.isDate(time) ? time.getTime() : "";
			properties = _.encodeDates(properties);
			var str = {
				appId: this.appId,
				properties: properties,
				time: timeStamp
			};
			if (this._isAndroid()) {
				this.androidApi.userSet(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.userSet(JSON.stringify(str))
			}
		}
	}, {
		key: "userSetOnce",
		value: function userSetOnce(properties, time, onComplete) {
			if (this._isNativePlatform()) {
				this.userSetOnceForNative(properties, time);
				return
			}
			this.geJs.userSetOnce(properties, time, onComplete)
		}
	}, {
		key: "userSetOnceForNative",
		value: function userSetOnceForNative(properties, time) {
			var timeStamp = _.isDate(time) ? time.getTime() : "";
			properties = _.encodeDates(properties);
			var str = {
				appId: this.appId,
				properties: properties,
				time: timeStamp
			};
			if (this._isAndroid()) {
				this.androidApi.userSetOnce(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.userSetOnce(JSON.stringify(str))
			}
		}
	}, {
		key: "userUnset",
		value: function userUnset(property, time, onComplete) {
			if (this._isNativePlatform()) {
				this.userUnsetForNative(property, time);
				return
			}
			this.geJs.userUnset(property, time, onComplete)
		}
	}, {
		key: "userUnsetForNative",
		value: function userUnsetForNative(property, time) {
			var timeStamp = _.isDate(time) ? time.getTime() : "";
			var str = {
				appId: this.appId,
				properties: [property],
				time: timeStamp
			};
			if (this._isAndroid()) {
				this.androidApi.userUnset(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.userUnset(JSON.stringify(str))
			}
		}
	}, {
		key: "userDel",
		value: function userDel(time, onComplete) {
			if (this._isNativePlatform()) {
				this.userDelForNative(time);
				return
			}
			this.geJs.userDel(time, onComplete)
		}
	}, {
		key: "userDelForNative",
		value: function userDelForNative(time) {
			var timeStamp = _.isDate(time) ? time.getTime() : "";
			var str = {
				appId: this.appId,
				time: timeStamp
			};
			if (this._isAndroid()) {
				this.androidApi.userDel(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.userDel(JSON.stringify(str))
			}
		}
	}, {
		key: "userAdd",
		value: function userAdd(properties, time, onComplete) {
			if (this._isNativePlatform()) {
				this.userAddForNative(properties, time);
				return
			}
			this.geJs.userAdd(properties, time, onComplete)
		}
	}, {
		key: "userAddForNative",
		value: function userAddForNative(properties, time) {
			var timeStamp = _.isDate(time) ? time.getTime() : "";
			properties = _.encodeDates(properties);
			var str = {
				appId: this.appId,
				properties: properties,
				time: timeStamp
			};
			if (this._isAndroid()) {
				this.androidApi.userAdd(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.userAdd(JSON.stringify(str))
			}
		}
	}, {
		key: "userAppend",
		value: function userAppend(properties, time, onComplete) {
			if (this._isNativePlatform()) {
				this.userAppendForNative(properties, time);
				return
			}
			this.geJs.userAppend(properties, time, onComplete)
		}
	}, {
		key: "userAppendForNative",
		value: function userAppendForNative(properties, time) {
			var timeStamp = _.isDate(time) ? time.getTime() : "";
			properties = _.encodeDates(properties);
			var str = {
				appId: this.appId,
				properties: properties,
				time: timeStamp
			};
			if (this._isAndroid()) {
				this.androidApi.userAppend(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.userAppend(JSON.stringify(str))
			}
		}
	}, {
		key: "userUniqAppend",
		value: function userUniqAppend(properties, time, onComplete) {
			if (this._isNativePlatform()) {
				this.userUniqAppendForNative(properties, time);
				return
			}
			this.geJs.userUniqAppend(properties, time, onComplete)
		}
	}, {
		key: "userUniqAppendForNative",
		value: function userUniqAppendForNative(properties, time) {
			var timeStamp = _.isDate(time) ? time.getTime() : "";
			properties = _.encodeDates(properties);
			var str = {
				appId: this.appId,
				properties: properties,
				time: timeStamp
			};
			if (this._isAndroid()) {
				this.androidApi.userUniqAppend(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.userUniqAppend(JSON.stringify(str))
			}
		}
	}, {
		key: "userNumberMax",
		value: function userNumberMax(properties, time, onComplete) {
			if (this._isNativePlatform()) {
				this.userNumberMaxForNative(properties, time);
				return
			}
			this.geJs.userNumberMax(properties, time, onComplete)
		}
	}, {
		key: "userNumberMaxForNative",
		value: function userNumberMaxForNative(properties, time) {
			var timeStamp = _.isDate(time) ? time.getTime() : "";
			properties = _.encodeDates(properties);
			var str = {
				appId: this.appId,
				properties: properties,
				time: timeStamp
			};
			if (this._isAndroid()) {
				this.androidApi.userNumberMax(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.userNumberMax(JSON.stringify(str))
			}
		}
	}, {
		key: "userNumberMin",
		value: function userNumberMin(properties, time, onComplete) {
			if (this._isNativePlatform()) {
				this.userNumberMinForNative(properties, time);
				return
			}
			this.geJs.userNumberMin(properties, time, onComplete)
		}
	}, {
		key: "userNumberMinForNative",
		value: function userNumberMinForNative(properties, time) {
			var timeStamp = _.isDate(time) ? time.getTime() : "";
			properties = _.encodeDates(properties);
			var str = {
				appId: this.appId,
				properties: properties,
				time: timeStamp
			};
			if (this._isAndroid()) {
				this.androidApi.userNumberMin(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.userNumberMin(JSON.stringify(str))
			}
		}
	}, {
		key: "flush",
		value: function flush() {
			if (this._isNativePlatform()) {
				this.flushForNative();
				return
			}
			this.geJs.flush()
		}
	}, {
		key: "flushForNative",
		value: function flushForNative() {
			var str = {
				appId: this.appId
			};
			if (this._isAndroid()) {
				this.androidApi.flush(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.flush(JSON.stringify(str))
			}
		}
	}, {
		key: "authorizeOpenID",
		value: function authorizeOpenID(id) {
			this.identify(id)
		}
	}, {
		key: "identify",
		value: function identify(id) {
			if (this._isNativePlatform()) {
				this.identifyForNative(id);
				return
			}
			this.geJs.identify(id)
		}
	}, {
		key: "identifyForNative",
		value: function identifyForNative(distinctId) {
			var str = {
				appId: this.appId,
				distinctId: distinctId
			};
			if (this._isAndroid()) {
				this.androidApi.identify(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.identify(JSON.stringify(str))
			}
		}
	}, {
		key: "getDistinctId",
		value: function getDistinctId() {
			if (this._isNativePlatform());
			return this.geJs.getDistinctId()
		}
	}, {
		key: "getDistinctIdForNative",
		value: function getDistinctIdForNative() {
			var str = {
				appId: this.appId
			};
			if (this._isAndroid()) {
				return this.androidApi.getDistinctId(JSON.stringify(str))
			} else if (this._isIOS()) {
				return this.iosApi.getDistinctId(JSON.stringify(str))
			}
		}
	}, {
		key: "login",
		value: function login(accoundId) {
			if (this._isNativePlatform()) {
				return
			}
			this.geJs.login(accoundId)
		}
	}, {
		key: "loginForNative",
		value: function loginForNative(accoundId) {
			var str = {
				appId: this.appId,
				loginId: accoundId
			};
			if (this._isAndroid()) {
				this.androidApi.login(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.login(JSON.stringify(str))
			}
		}
	}, {
		key: "getAccountId",
		value: function getAccountId() {
			if (this._isNativePlatform());
			return this.geJs.getAccountId()
		}
	}, {
		key: "getAccountIdForNative",
		value: function getAccountIdForNative() {
			return ""
		}
	}, {
		key: "logout",
		value: function logout() {
			if (this._isNativePlatform()) {
				return
			}
			this.geJs.logout()
		}
	}, {
		key: "logoutForNative",
		value: function logoutForNative() {
			var str = {
				appId: this.appId
			};
			if (this._isAndroid()) {
				this.androidApi.logout(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.logout(JSON.stringify(str))
			}
		}
	}, {
		key: "setSuperProperties",
		value: function setSuperProperties(obj) {
			if (this._isNativePlatform()) {
				this.setSuperPropertiesForNative(obj);
				return
			}
			this.geJs.setSuperProperties(obj)
		}
	}, {
		key: "setSuperPropertiesForNative",
		value: function setSuperPropertiesForNative(properties) {
			properties = _.encodeDates(properties);
			var str = {
				appId: this.appId,
				properties: properties
			};
			if (this._isAndroid()) {
				this.androidApi.setSuperProperties(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.setSuperProperties(JSON.stringify(str))
			}
		}
	}, {
		key: "clearSuperProperties",
		value: function clearSuperProperties() {
			if (this._isNativePlatform()) {
				this.clearSuperPropertiesForNative();
				return
			}
			this.geJs.clearSuperProperties()
		}
	}, {
		key: "clearSuperPropertiesForNative",
		value: function clearSuperPropertiesForNative() {
			var str = {
				appId: this.appId
			};
			if (this._isAndroid()) {
				this.androidApi.clearSuperProperties(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.clearSuperProperties(JSON.stringify(str))
			}
		}
	}, {
		key: "unsetSuperProperty",
		value: function unsetSuperProperty(propertyName) {
			if (this._isNativePlatform()) {
				this.unsetSuperPropertyForNative(propertyName);
				return
			}
			this.geJs.unsetSuperProperty(propertyName)
		}
	}, {
		key: "unsetSuperPropertyForNative",
		value: function unsetSuperPropertyForNative(propertyName) {
			var str = {
				appId: this.appId,
				property: propertyName
			};
			if (this._isAndroid()) {
				this.androidApi.unsetSuperProperty(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.unsetSuperProperty(JSON.stringify(str))
			}
		}
	}, {
		key: "getSuperProperties",
		value: function getSuperProperties() {
			if (this._isNativePlatform()) {
				return this.getSuperPropertiesForNative()
			}
			return this.geJs.getSuperProperties()
		}
	}, {
		key: "getSuperPropertiesForNative",
		value: function getSuperPropertiesForNative() {
			var str = {
				appId: this.appId
			};
			if (this._isAndroid()) {
				return this.androidApi.getSuperProperties(JSON.stringify(str))
			} else if (this._isIOS()) {
				return this.iosApi.getSuperProperties(JSON.stringify(str))
			}
		}
	}, {
		key: "getPresetProperties",
		value: function getPresetProperties() {
			if (this._isNativePlatform()) {
				var properties = JSON.parse(this.getPresetPropertiesForNative());
				var presetProperties = {};
				var os = properties["$os"];
				presetProperties.os = _.isUndefined(os) ? "" : os;
				var screenWidth = properties["$screen_width"];
				presetProperties.screenWidth = _.isUndefined(screenWidth) ? 0 : screenWidth;
				var screenHeight = properties["$screen_height"];
				presetProperties.screenHeight = _.isUndefined(screenHeight) ? 0 : screenHeight;
				var networkType = properties["$network_type"];
				presetProperties.networkType = _.isUndefined(networkType) ? "" : networkType;
				var deviceModel = properties["$device_model"];
				presetProperties.deviceModel = _.isUndefined(deviceModel) ? "" : deviceModel;
				var osVersion = properties["$os_version"];
				presetProperties.osVersion = _.isUndefined(osVersion) ? "" : osVersion;
				presetProperties.deviceId = this.getDeviceId();
				var zoneOffset = properties["$zone_offset"];
				presetProperties.zoneOffset = _.isUndefined(zoneOffset) ? "" : zoneOffset;
				var manufacturer = properties["$manufacturer"];
				presetProperties.manufacturer = _.isUndefined(manufacturer) ? "" : manufacturer;
				presetProperties.toEventPresetProperties = function() {
					return {
						$device_model: presetProperties.deviceModel,
						$device_id: presetProperties.deviceId,
						$screen_width: presetProperties.screenWidth,
						$screen_height: presetProperties.screenHeight,
						$os: presetProperties.os,
						$os_version: presetProperties.osVersion,
						$network_type: presetProperties.networkType,
						$zone_offset: zoneOffset,
						$manufacturer: presetProperties.manufacturer,
						$brand: presetProperties.manufacturer
					}
				};
				return presetProperties
			}
			return this.geJs.getPresetProperties()
		}
	}, {
		key: "getPresetPropertiesForNative",
		value: function getPresetPropertiesForNative() {
			var str = {
				appId: this.appId
			};
			if (this._isAndroid()) {
				return this.androidApi.getPresetProperties(JSON.stringify(str))
			} else if (this._isIOS()) {
				return this.iosApi.getPresetProperties(JSON.stringify(str))
			}
		}
	}, {
		key: "setDynamicSuperProperties",
		value: function setDynamicSuperProperties(dynamicProperties) {
			if (this._isNativePlatform()) {
				if (typeof dynamicProperties === "function") {
					this.dynamicProperties = dynamicProperties
				} else {
					logger.warn("setDynamicSuperProperties parameter must be a function type")
				}
				return
			}
			this.geJs.setDynamicSuperProperties(dynamicProperties)
		}
	}, {
		key: "timeEvent",
		value: function timeEvent(eventName, time) {
			if (this._isNativePlatform()) {
				this.timeEventForNative(eventName);
				return
			}
			this.geJs.timeEvent(eventName, time)
		}
	}, {
		key: "timeEventForNative",
		value: function timeEventForNative(eventName) {
			var str = {
				appId: this.appId,
				eventName: eventName
			};
			if (this._isAndroid()) {
				this.androidApi.timeEvent(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.timeEvent(JSON.stringify(str))
			}
		}
	}, {
		key: "getDeviceId",
		value: function getDeviceId() {
			if (this._isNativePlatform()) {
				return this.getDeviceIdForNative()
			}
			return this.geJs.getDeviceId()
		}
	}, {
		key: "getDeviceIdForNative",
		value: function getDeviceIdForNative() {
			var str = {
				appId: this.appId
			};
			if (this._isAndroid()) {
				return this.androidApi.getDeviceId(JSON.stringify(str))
			} else if (this._isIOS()) {
				return this.iosApi.getDeviceId(JSON.stringify(str))
			}
		}
	}, {
		key: "setTrackStatus",
		value: function setTrackStatus(status) {
			if (this._isNativePlatform()) {
				this.setTrackStatusForNative(status);
				return
			}
			this.geJs.setTrackStatus(status)
		}
	}, {
		key: "setTrackStatusForNative",
		value: function setTrackStatusForNative(status) {
			var sta = "normal";
			switch (status) {
				case "PAUSE":
					sta = "pause";
					break;
				case "STOP":
					sta = "stop";
					break;
				case "SAVE_ONLY":
					sta = "saveOnly";
					break;
				case "NORMAL":
				default:
					sta = "normal";
					break
			}
			var str = {
				appId: this.appId,
				status: sta
			};
			if (this._isAndroid()) {
				this.androidApi.setTrackStatus(JSON.stringify(str))
			} else if (this._isIOS()) {
				this.iosApi.setTrackStatus(JSON.stringify(str))
			}
		}
	}, {
		key: "getWechatOpenId",
		value: function getWechatOpenId() {
			return this.geJs.getWechatOpenId()
		}
	}, {
		key: "getKuaishouOpenId",
		value: function getKuaishouOpenId() {
			return this.geJs.getKuaishouOpenId()
		}
	}, {
		key: "getDouyinOpenId",
		value: function getDouyinOpenId() {
			return this.geJs.getDouyinOpenId()
		}
	}, {
		key: "getBilibiliOpenId",
		value: function getBilibiliOpenId() {
			return this.geJs.getBilibiliOpenId()
		}
	}, {
		key: "tencentSDKRegisterTrack",
		value: function tencentSDKRegisterTrack() {
			return this.geJs.tencentSDKRegisterTrack()
		}
	}, {
		key: "checkUserInfo",
		value: function checkUserInfo() {
			return this.geJs.checkUserInfo()
		}
	}, {
		key: "setupUserInfo",
		value: function setupUserInfo() {
			return this.geJs.setupUserInfo()
		}
	}, {
		key: "queryDryRunInfo",
		value: function queryDryRunInfo(traceId) {
			return this.geJs.queryDryRunInfo(traceId)
		}
	}, {
		key: "sendDryRunResult",
		value: function sendDryRunResult(traceId, action) {
			return this.geJs.sendDryRunResult(traceId, action)
		}
	}, {
		key: "payEventToTencent",
		value: function payEventToTencent($pay_amount) {
			this.geJs.payEventToTencent($pay_amount)
		}
	}, {
		key: "tryPayEventDryRun",
		value: function tryPayEventDryRun($pay_amount) {
			this.geJs.tryPayEventDryRun($pay_amount)
		}
	}, {
		key: "tryTutorialFinishEventDryRun",
		value: function tryTutorialFinishEventDryRun() {
			this.geJs.tryTutorialFinishEventDryRun()
		}
	}, {
		key: "tryRegisterEventDryRun",
		value: function tryRegisterEventDryRun() {
			this.geJs.tryRegisterEventDryRun()
		}
	}, {
		key: "tryCreateRoleEventDryRun",
		value: function tryCreateRoleEventDryRun(role_name) {
			this.geJs.tryCreateRoleEventDryRun(role_name)
		}
	}, {
		key: "onUpdateLevelEvent",
		value: function onUpdateLevelEvent(userLevel, userPower) {
			return this.geJs.onUpdateLevelEvent(userLevel, userPower)
		}
	}, {
		key: "onRegisterEvent",
		value: function onRegisterEvent() {
			this.geJs.onRegisterEvent()
		}
	}, {
		key: "onCreateRoleEvent",
		value: function onCreateRoleEvent() {
			this.geJs.onCreateRoleEvent()
		}
	}, {
		key: "onTutorialFinishEvent",
		value: function onTutorialFinishEvent() {
			this.geJs.onTutorialFinishEvent()
		}
	}, {
		key: "onViewMallContentEvent",
		value: function onViewMallContentEvent() {
			this.geJs.onViewMallContentEvent()
		}
	}, {
		key: "onViewActivityContentEvent",
		value: function onViewActivityContentEvent() {
			this.geJs.onViewActivityContentEvent()
		}
	}, {
		key: "onAddToWishListEvent",
		value: function onAddToWishListEvent(wishType) {
			this.geJs.onAddToWishListEvent(wishType)
		}
	}, {
		key: "onShareEvent",
		value: function onShareEvent(shareType) {
			this.geJs.onShareEvent(shareType)
		}
	}, {
		key: "preInit",
		value: function preInit() {
			this.geJs.preInit()
		}
	}]);
	return GravityAnalyticsAPI
}();
export default GravityAnalyticsAPI;