"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/stringify-entities";
exports.ids = ["vendor-chunks/stringify-entities"];
exports.modules = {

/***/ "(ssr)/./node_modules/stringify-entities/lib/constant/dangerous.js":
/*!*******************************************************************!*\
  !*** ./node_modules/stringify-entities/lib/constant/dangerous.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dangerous: () => (/* binding */ dangerous)\n/* harmony export */ });\n/**\n * List of legacy (that don’t need a trailing `;`) named references which could,\n * depending on what follows them, turn into a different meaning\n *\n * @type {Array<string>}\n */\nconst dangerous = [\n  'cent',\n  'copy',\n  'divide',\n  'gt',\n  'lt',\n  'not',\n  'para',\n  'times'\n]\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi9jb25zdGFudC9kYW5nZXJvdXMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NoYWRjbi1ib2FyZC8uL25vZGVfbW9kdWxlcy9zdHJpbmdpZnktZW50aXRpZXMvbGliL2NvbnN0YW50L2Rhbmdlcm91cy5qcz80NWI5Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTGlzdCBvZiBsZWdhY3kgKHRoYXQgZG9u4oCZdCBuZWVkIGEgdHJhaWxpbmcgYDtgKSBuYW1lZCByZWZlcmVuY2VzIHdoaWNoIGNvdWxkLFxuICogZGVwZW5kaW5nIG9uIHdoYXQgZm9sbG93cyB0aGVtLCB0dXJuIGludG8gYSBkaWZmZXJlbnQgbWVhbmluZ1xuICpcbiAqIEB0eXBlIHtBcnJheTxzdHJpbmc+fVxuICovXG5leHBvcnQgY29uc3QgZGFuZ2Vyb3VzID0gW1xuICAnY2VudCcsXG4gICdjb3B5JyxcbiAgJ2RpdmlkZScsXG4gICdndCcsXG4gICdsdCcsXG4gICdub3QnLFxuICAncGFyYScsXG4gICd0aW1lcydcbl1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/stringify-entities/lib/constant/dangerous.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/stringify-entities/lib/core.js":
/*!*****************************************************!*\
  !*** ./node_modules/stringify-entities/lib/core.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   core: () => (/* binding */ core)\n/* harmony export */ });\n/**\n * @typedef CoreOptions\n * @property {ReadonlyArray<string>} [subset=[]]\n *   Whether to only escape the given subset of characters.\n * @property {boolean} [escapeOnly=false]\n *   Whether to only escape possibly dangerous characters.\n *   Those characters are `\"`, `&`, `'`, `<`, `>`, and `` ` ``.\n *\n * @typedef FormatOptions\n * @property {(code: number, next: number, options: CoreWithFormatOptions) => string} format\n *   Format strategy.\n *\n * @typedef {CoreOptions & FormatOptions & import('./util/format-smart.js').FormatSmartOptions} CoreWithFormatOptions\n */\n\nconst defaultSubsetRegex = /[\"&'<>`]/g\nconst surrogatePairsRegex = /[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]/g\nconst controlCharactersRegex =\n  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape\n  /[\\x01-\\t\\v\\f\\x0E-\\x1F\\x7F\\x81\\x8D\\x8F\\x90\\x9D\\xA0-\\uFFFF]/g\nconst regexEscapeRegex = /[|\\\\{}()[\\]^$+*?.]/g\n\n/** @type {WeakMap<ReadonlyArray<string>, RegExp>} */\nconst subsetToRegexCache = new WeakMap()\n\n/**\n * Encode certain characters in `value`.\n *\n * @param {string} value\n * @param {CoreWithFormatOptions} options\n * @returns {string}\n */\nfunction core(value, options) {\n  value = value.replace(\n    options.subset\n      ? charactersToExpressionCached(options.subset)\n      : defaultSubsetRegex,\n    basic\n  )\n\n  if (options.subset || options.escapeOnly) {\n    return value\n  }\n\n  return (\n    value\n      // Surrogate pairs.\n      .replace(surrogatePairsRegex, surrogate)\n      // BMP control characters (C0 except for LF, CR, SP; DEL; and some more\n      // non-ASCII ones).\n      .replace(controlCharactersRegex, basic)\n  )\n\n  /**\n   * @param {string} pair\n   * @param {number} index\n   * @param {string} all\n   */\n  function surrogate(pair, index, all) {\n    return options.format(\n      (pair.charCodeAt(0) - 0xd800) * 0x400 +\n        pair.charCodeAt(1) -\n        0xdc00 +\n        0x10000,\n      all.charCodeAt(index + 2),\n      options\n    )\n  }\n\n  /**\n   * @param {string} character\n   * @param {number} index\n   * @param {string} all\n   */\n  function basic(character, index, all) {\n    return options.format(\n      character.charCodeAt(0),\n      all.charCodeAt(index + 1),\n      options\n    )\n  }\n}\n\n/**\n * A wrapper function that caches the result of `charactersToExpression` with a WeakMap.\n * This can improve performance when tooling calls `charactersToExpression` repeatedly\n * with the same subset.\n *\n * @param {ReadonlyArray<string>} subset\n * @returns {RegExp}\n */\nfunction charactersToExpressionCached(subset) {\n  let cached = subsetToRegexCache.get(subset)\n\n  if (!cached) {\n    cached = charactersToExpression(subset)\n    subsetToRegexCache.set(subset, cached)\n  }\n\n  return cached\n}\n\n/**\n * @param {ReadonlyArray<string>} subset\n * @returns {RegExp}\n */\nfunction charactersToExpression(subset) {\n  /** @type {Array<string>} */\n  const groups = []\n  let index = -1\n\n  while (++index < subset.length) {\n    groups.push(subset[index].replace(regexEscapeRegex, '\\\\$&'))\n  }\n\n  return new RegExp('(?:' + groups.join('|') + ')', 'g')\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi9jb3JlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0EsY0FBYyx1QkFBdUI7QUFDckM7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHdFQUF3RTtBQUN0RjtBQUNBO0FBQ0EsYUFBYSxtRkFBbUY7QUFDaEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQzs7QUFFaEMsV0FBVyx3Q0FBd0M7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsdUJBQXVCO0FBQ2xDLGFBQWE7QUFDYjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxLQUFLO0FBQ2hFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsdUJBQXVCO0FBQ2xDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFdBQVcsdUJBQXVCO0FBQ2xDLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaGFkY24tYm9hcmQvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi9jb3JlLmpzP2FlNDQiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiBDb3JlT3B0aW9uc1xuICogQHByb3BlcnR5IHtSZWFkb25seUFycmF5PHN0cmluZz59IFtzdWJzZXQ9W11dXG4gKiAgIFdoZXRoZXIgdG8gb25seSBlc2NhcGUgdGhlIGdpdmVuIHN1YnNldCBvZiBjaGFyYWN0ZXJzLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbZXNjYXBlT25seT1mYWxzZV1cbiAqICAgV2hldGhlciB0byBvbmx5IGVzY2FwZSBwb3NzaWJseSBkYW5nZXJvdXMgY2hhcmFjdGVycy5cbiAqICAgVGhvc2UgY2hhcmFjdGVycyBhcmUgYFwiYCwgYCZgLCBgJ2AsIGA8YCwgYD5gLCBhbmQgYGAgYCBgYC5cbiAqXG4gKiBAdHlwZWRlZiBGb3JtYXRPcHRpb25zXG4gKiBAcHJvcGVydHkgeyhjb2RlOiBudW1iZXIsIG5leHQ6IG51bWJlciwgb3B0aW9uczogQ29yZVdpdGhGb3JtYXRPcHRpb25zKSA9PiBzdHJpbmd9IGZvcm1hdFxuICogICBGb3JtYXQgc3RyYXRlZ3kuXG4gKlxuICogQHR5cGVkZWYge0NvcmVPcHRpb25zICYgRm9ybWF0T3B0aW9ucyAmIGltcG9ydCgnLi91dGlsL2Zvcm1hdC1zbWFydC5qcycpLkZvcm1hdFNtYXJ0T3B0aW9uc30gQ29yZVdpdGhGb3JtYXRPcHRpb25zXG4gKi9cblxuY29uc3QgZGVmYXVsdFN1YnNldFJlZ2V4ID0gL1tcIiYnPD5gXS9nXG5jb25zdCBzdXJyb2dhdGVQYWlyc1JlZ2V4ID0gL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vZ1xuY29uc3QgY29udHJvbENoYXJhY3RlcnNSZWdleCA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4LCB1bmljb3JuL25vLWhleC1lc2NhcGVcbiAgL1tcXHgwMS1cXHRcXHZcXGZcXHgwRS1cXHgxRlxceDdGXFx4ODFcXHg4RFxceDhGXFx4OTBcXHg5RFxceEEwLVxcdUZGRkZdL2dcbmNvbnN0IHJlZ2V4RXNjYXBlUmVnZXggPSAvW3xcXFxce30oKVtcXF1eJCsqPy5dL2dcblxuLyoqIEB0eXBlIHtXZWFrTWFwPFJlYWRvbmx5QXJyYXk8c3RyaW5nPiwgUmVnRXhwPn0gKi9cbmNvbnN0IHN1YnNldFRvUmVnZXhDYWNoZSA9IG5ldyBXZWFrTWFwKClcblxuLyoqXG4gKiBFbmNvZGUgY2VydGFpbiBjaGFyYWN0ZXJzIGluIGB2YWx1ZWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge0NvcmVXaXRoRm9ybWF0T3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcmUodmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFxuICAgIG9wdGlvbnMuc3Vic2V0XG4gICAgICA/IGNoYXJhY3RlcnNUb0V4cHJlc3Npb25DYWNoZWQob3B0aW9ucy5zdWJzZXQpXG4gICAgICA6IGRlZmF1bHRTdWJzZXRSZWdleCxcbiAgICBiYXNpY1xuICApXG5cbiAgaWYgKG9wdGlvbnMuc3Vic2V0IHx8IG9wdGlvbnMuZXNjYXBlT25seSkge1xuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICB2YWx1ZVxuICAgICAgLy8gU3Vycm9nYXRlIHBhaXJzLlxuICAgICAgLnJlcGxhY2Uoc3Vycm9nYXRlUGFpcnNSZWdleCwgc3Vycm9nYXRlKVxuICAgICAgLy8gQk1QIGNvbnRyb2wgY2hhcmFjdGVycyAoQzAgZXhjZXB0IGZvciBMRiwgQ1IsIFNQOyBERUw7IGFuZCBzb21lIG1vcmVcbiAgICAgIC8vIG5vbi1BU0NJSSBvbmVzKS5cbiAgICAgIC5yZXBsYWNlKGNvbnRyb2xDaGFyYWN0ZXJzUmVnZXgsIGJhc2ljKVxuICApXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYWlyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYWxsXG4gICAqL1xuICBmdW5jdGlvbiBzdXJyb2dhdGUocGFpciwgaW5kZXgsIGFsbCkge1xuICAgIHJldHVybiBvcHRpb25zLmZvcm1hdChcbiAgICAgIChwYWlyLmNoYXJDb2RlQXQoMCkgLSAweGQ4MDApICogMHg0MDAgK1xuICAgICAgICBwYWlyLmNoYXJDb2RlQXQoMSkgLVxuICAgICAgICAweGRjMDAgK1xuICAgICAgICAweDEwMDAwLFxuICAgICAgYWxsLmNoYXJDb2RlQXQoaW5kZXggKyAyKSxcbiAgICAgIG9wdGlvbnNcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYXJhY3RlclxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFsbFxuICAgKi9cbiAgZnVuY3Rpb24gYmFzaWMoY2hhcmFjdGVyLCBpbmRleCwgYWxsKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuZm9ybWF0KFxuICAgICAgY2hhcmFjdGVyLmNoYXJDb2RlQXQoMCksXG4gICAgICBhbGwuY2hhckNvZGVBdChpbmRleCArIDEpLFxuICAgICAgb3B0aW9uc1xuICAgIClcbiAgfVxufVxuXG4vKipcbiAqIEEgd3JhcHBlciBmdW5jdGlvbiB0aGF0IGNhY2hlcyB0aGUgcmVzdWx0IG9mIGBjaGFyYWN0ZXJzVG9FeHByZXNzaW9uYCB3aXRoIGEgV2Vha01hcC5cbiAqIFRoaXMgY2FuIGltcHJvdmUgcGVyZm9ybWFuY2Ugd2hlbiB0b29saW5nIGNhbGxzIGBjaGFyYWN0ZXJzVG9FeHByZXNzaW9uYCByZXBlYXRlZGx5XG4gKiB3aXRoIHRoZSBzYW1lIHN1YnNldC5cbiAqXG4gKiBAcGFyYW0ge1JlYWRvbmx5QXJyYXk8c3RyaW5nPn0gc3Vic2V0XG4gKiBAcmV0dXJucyB7UmVnRXhwfVxuICovXG5mdW5jdGlvbiBjaGFyYWN0ZXJzVG9FeHByZXNzaW9uQ2FjaGVkKHN1YnNldCkge1xuICBsZXQgY2FjaGVkID0gc3Vic2V0VG9SZWdleENhY2hlLmdldChzdWJzZXQpXG5cbiAgaWYgKCFjYWNoZWQpIHtcbiAgICBjYWNoZWQgPSBjaGFyYWN0ZXJzVG9FeHByZXNzaW9uKHN1YnNldClcbiAgICBzdWJzZXRUb1JlZ2V4Q2FjaGUuc2V0KHN1YnNldCwgY2FjaGVkKVxuICB9XG5cbiAgcmV0dXJuIGNhY2hlZFxufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVhZG9ubHlBcnJheTxzdHJpbmc+fSBzdWJzZXRcbiAqIEByZXR1cm5zIHtSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIGNoYXJhY3RlcnNUb0V4cHJlc3Npb24oc3Vic2V0KSB7XG4gIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgY29uc3QgZ3JvdXBzID0gW11cbiAgbGV0IGluZGV4ID0gLTFcblxuICB3aGlsZSAoKytpbmRleCA8IHN1YnNldC5sZW5ndGgpIHtcbiAgICBncm91cHMucHVzaChzdWJzZXRbaW5kZXhdLnJlcGxhY2UocmVnZXhFc2NhcGVSZWdleCwgJ1xcXFwkJicpKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoJyg/OicgKyBncm91cHMuam9pbignfCcpICsgJyknLCAnZycpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/stringify-entities/lib/core.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/stringify-entities/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/stringify-entities/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   stringifyEntities: () => (/* binding */ stringifyEntities),\n/* harmony export */   stringifyEntitiesLight: () => (/* binding */ stringifyEntitiesLight)\n/* harmony export */ });\n/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ \"(ssr)/./node_modules/stringify-entities/lib/core.js\");\n/* harmony import */ var _util_format_smart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/format-smart.js */ \"(ssr)/./node_modules/stringify-entities/lib/util/format-smart.js\");\n/* harmony import */ var _util_format_basic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/format-basic.js */ \"(ssr)/./node_modules/stringify-entities/lib/util/format-basic.js\");\n/**\n * @typedef {import('./core.js').CoreOptions & import('./util/format-smart.js').FormatSmartOptions} Options\n * @typedef {import('./core.js').CoreOptions} LightOptions\n */\n\n\n\n\n\n/**\n * Encode special characters in `value`.\n *\n * @param {string} value\n *   Value to encode.\n * @param {Options} [options]\n *   Configuration.\n * @returns {string}\n *   Encoded value.\n */\nfunction stringifyEntities(value, options) {\n  return (0,_core_js__WEBPACK_IMPORTED_MODULE_0__.core)(value, Object.assign({format: _util_format_smart_js__WEBPACK_IMPORTED_MODULE_1__.formatSmart}, options))\n}\n\n/**\n * Encode special characters in `value` as hexadecimals.\n *\n * @param {string} value\n *   Value to encode.\n * @param {LightOptions} [options]\n *   Configuration.\n * @returns {string}\n *   Encoded value.\n */\nfunction stringifyEntitiesLight(value, options) {\n  return (0,_core_js__WEBPACK_IMPORTED_MODULE_0__.core)(value, Object.assign({format: _util_format_basic_js__WEBPACK_IMPORTED_MODULE_2__.formatBasic}, options))\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsYUFBYSx1RkFBdUY7QUFDcEcsYUFBYSxpQ0FBaUM7QUFDOUM7O0FBRThCO0FBQ29CO0FBQ0E7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ087QUFDUCxTQUFTLDhDQUFJLHVCQUF1QixRQUFRLDhEQUFXLENBQUM7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQLFNBQVMsOENBQUksdUJBQXVCLFFBQVEsOERBQVcsQ0FBQztBQUN4RCIsInNvdXJjZXMiOlsid2VicGFjazovL3NoYWRjbi1ib2FyZC8uL25vZGVfbW9kdWxlcy9zdHJpbmdpZnktZW50aXRpZXMvbGliL2luZGV4LmpzPzM2MzgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL2NvcmUuanMnKS5Db3JlT3B0aW9ucyAmIGltcG9ydCgnLi91dGlsL2Zvcm1hdC1zbWFydC5qcycpLkZvcm1hdFNtYXJ0T3B0aW9uc30gT3B0aW9uc1xuICogQHR5cGVkZWYge2ltcG9ydCgnLi9jb3JlLmpzJykuQ29yZU9wdGlvbnN9IExpZ2h0T3B0aW9uc1xuICovXG5cbmltcG9ydCB7Y29yZX0gZnJvbSAnLi9jb3JlLmpzJ1xuaW1wb3J0IHtmb3JtYXRTbWFydH0gZnJvbSAnLi91dGlsL2Zvcm1hdC1zbWFydC5qcydcbmltcG9ydCB7Zm9ybWF0QmFzaWN9IGZyb20gJy4vdXRpbC9mb3JtYXQtYmFzaWMuanMnXG5cbi8qKlxuICogRW5jb2RlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBgdmFsdWVgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogICBWYWx1ZSB0byBlbmNvZGUuXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXVxuICogICBDb25maWd1cmF0aW9uLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgRW5jb2RlZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUVudGl0aWVzKHZhbHVlLCBvcHRpb25zKSB7XG4gIHJldHVybiBjb3JlKHZhbHVlLCBPYmplY3QuYXNzaWduKHtmb3JtYXQ6IGZvcm1hdFNtYXJ0fSwgb3B0aW9ucykpXG59XG5cbi8qKlxuICogRW5jb2RlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBgdmFsdWVgIGFzIGhleGFkZWNpbWFscy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqICAgVmFsdWUgdG8gZW5jb2RlLlxuICogQHBhcmFtIHtMaWdodE9wdGlvbnN9IFtvcHRpb25zXVxuICogICBDb25maWd1cmF0aW9uLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgRW5jb2RlZCB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUVudGl0aWVzTGlnaHQodmFsdWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGNvcmUodmFsdWUsIE9iamVjdC5hc3NpZ24oe2Zvcm1hdDogZm9ybWF0QmFzaWN9LCBvcHRpb25zKSlcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/stringify-entities/lib/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/stringify-entities/lib/util/format-basic.js":
/*!******************************************************************!*\
  !*** ./node_modules/stringify-entities/lib/util/format-basic.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatBasic: () => (/* binding */ formatBasic)\n/* harmony export */ });\n/**\n * The smallest way to encode a character.\n *\n * @param {number} code\n * @returns {string}\n */\nfunction formatBasic(code) {\n  return '&#x' + code.toString(16).toUpperCase() + ';'\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi91dGlsL2Zvcm1hdC1iYXNpYy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNPO0FBQ1AscURBQXFEO0FBQ3JEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hhZGNuLWJvYXJkLy4vbm9kZV9tb2R1bGVzL3N0cmluZ2lmeS1lbnRpdGllcy9saWIvdXRpbC9mb3JtYXQtYmFzaWMuanM/ZWVlZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBzbWFsbGVzdCB3YXkgdG8gZW5jb2RlIGEgY2hhcmFjdGVyLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0QmFzaWMoY29kZSkge1xuICByZXR1cm4gJyYjeCcgKyBjb2RlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgJzsnXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/stringify-entities/lib/util/format-basic.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/stringify-entities/lib/util/format-smart.js":
/*!******************************************************************!*\
  !*** ./node_modules/stringify-entities/lib/util/format-smart.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatSmart: () => (/* binding */ formatSmart)\n/* harmony export */ });\n/* harmony import */ var _to_hexadecimal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-hexadecimal.js */ \"(ssr)/./node_modules/stringify-entities/lib/util/to-hexadecimal.js\");\n/* harmony import */ var _to_decimal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./to-decimal.js */ \"(ssr)/./node_modules/stringify-entities/lib/util/to-decimal.js\");\n/* harmony import */ var _to_named_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./to-named.js */ \"(ssr)/./node_modules/stringify-entities/lib/util/to-named.js\");\n/**\n * @typedef FormatSmartOptions\n * @property {boolean} [useNamedReferences=false]\n *   Prefer named character references (`&amp;`) where possible.\n * @property {boolean} [useShortestReferences=false]\n *   Prefer the shortest possible reference, if that results in less bytes.\n *   **Note**: `useNamedReferences` can be omitted when using `useShortestReferences`.\n * @property {boolean} [omitOptionalSemicolons=false]\n *   Whether to omit semicolons when possible.\n *   **Note**: This creates what HTML calls “parse errors” but is otherwise still valid HTML — don’t use this except when building a minifier.\n *   Omitting semicolons is possible for certain named and numeric references in some cases.\n * @property {boolean} [attribute=false]\n *   Create character references which don’t fail in attributes.\n *   **Note**: `attribute` only applies when operating dangerously with\n *   `omitOptionalSemicolons: true`.\n */\n\n\n\n\n\n/**\n * Configurable ways to encode a character yielding pretty or small results.\n *\n * @param {number} code\n * @param {number} next\n * @param {FormatSmartOptions} options\n * @returns {string}\n */\nfunction formatSmart(code, next, options) {\n  let numeric = (0,_to_hexadecimal_js__WEBPACK_IMPORTED_MODULE_0__.toHexadecimal)(code, next, options.omitOptionalSemicolons)\n  /** @type {string|undefined} */\n  let named\n\n  if (options.useNamedReferences || options.useShortestReferences) {\n    named = (0,_to_named_js__WEBPACK_IMPORTED_MODULE_1__.toNamed)(\n      code,\n      next,\n      options.omitOptionalSemicolons,\n      options.attribute\n    )\n  }\n\n  // Use the shortest numeric reference when requested.\n  // A simple algorithm would use decimal for all code points under 100, as\n  // those are shorter than hexadecimal:\n  //\n  // * `&#99;` vs `&#x63;` (decimal shorter)\n  // * `&#100;` vs `&#x64;` (equal)\n  //\n  // However, because we take `next` into consideration when `omit` is used,\n  // And it would be possible that decimals are shorter on bigger values as\n  // well if `next` is hexadecimal but not decimal, we instead compare both.\n  if (\n    (options.useShortestReferences || !named) &&\n    options.useShortestReferences\n  ) {\n    const decimal = (0,_to_decimal_js__WEBPACK_IMPORTED_MODULE_2__.toDecimal)(code, next, options.omitOptionalSemicolons)\n\n    if (decimal.length < numeric.length) {\n      numeric = decimal\n    }\n  }\n\n  return named &&\n    (!options.useShortestReferences || named.length < numeric.length)\n    ? named\n    : numeric\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi91dGlsL2Zvcm1hdC1zbWFydC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2Qiw4Q0FBOEM7QUFDOUMsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVpRDtBQUNSO0FBQ0o7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxvQkFBb0I7QUFDL0IsYUFBYTtBQUNiO0FBQ087QUFDUCxnQkFBZ0IsaUVBQWE7QUFDN0IsYUFBYSxrQkFBa0I7QUFDL0I7O0FBRUE7QUFDQSxZQUFZLHFEQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QixjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5REFBUzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NoYWRjbi1ib2FyZC8uL25vZGVfbW9kdWxlcy9zdHJpbmdpZnktZW50aXRpZXMvbGliL3V0aWwvZm9ybWF0LXNtYXJ0LmpzP2Q0MTUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiBGb3JtYXRTbWFydE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VzZU5hbWVkUmVmZXJlbmNlcz1mYWxzZV1cbiAqICAgUHJlZmVyIG5hbWVkIGNoYXJhY3RlciByZWZlcmVuY2VzIChgJmFtcDtgKSB3aGVyZSBwb3NzaWJsZS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VzZVNob3J0ZXN0UmVmZXJlbmNlcz1mYWxzZV1cbiAqICAgUHJlZmVyIHRoZSBzaG9ydGVzdCBwb3NzaWJsZSByZWZlcmVuY2UsIGlmIHRoYXQgcmVzdWx0cyBpbiBsZXNzIGJ5dGVzLlxuICogICAqKk5vdGUqKjogYHVzZU5hbWVkUmVmZXJlbmNlc2AgY2FuIGJlIG9taXR0ZWQgd2hlbiB1c2luZyBgdXNlU2hvcnRlc3RSZWZlcmVuY2VzYC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW29taXRPcHRpb25hbFNlbWljb2xvbnM9ZmFsc2VdXG4gKiAgIFdoZXRoZXIgdG8gb21pdCBzZW1pY29sb25zIHdoZW4gcG9zc2libGUuXG4gKiAgICoqTm90ZSoqOiBUaGlzIGNyZWF0ZXMgd2hhdCBIVE1MIGNhbGxzIOKAnHBhcnNlIGVycm9yc+KAnSBidXQgaXMgb3RoZXJ3aXNlIHN0aWxsIHZhbGlkIEhUTUwg4oCUIGRvbuKAmXQgdXNlIHRoaXMgZXhjZXB0IHdoZW4gYnVpbGRpbmcgYSBtaW5pZmllci5cbiAqICAgT21pdHRpbmcgc2VtaWNvbG9ucyBpcyBwb3NzaWJsZSBmb3IgY2VydGFpbiBuYW1lZCBhbmQgbnVtZXJpYyByZWZlcmVuY2VzIGluIHNvbWUgY2FzZXMuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFthdHRyaWJ1dGU9ZmFsc2VdXG4gKiAgIENyZWF0ZSBjaGFyYWN0ZXIgcmVmZXJlbmNlcyB3aGljaCBkb27igJl0IGZhaWwgaW4gYXR0cmlidXRlcy5cbiAqICAgKipOb3RlKio6IGBhdHRyaWJ1dGVgIG9ubHkgYXBwbGllcyB3aGVuIG9wZXJhdGluZyBkYW5nZXJvdXNseSB3aXRoXG4gKiAgIGBvbWl0T3B0aW9uYWxTZW1pY29sb25zOiB0cnVlYC5cbiAqL1xuXG5pbXBvcnQge3RvSGV4YWRlY2ltYWx9IGZyb20gJy4vdG8taGV4YWRlY2ltYWwuanMnXG5pbXBvcnQge3RvRGVjaW1hbH0gZnJvbSAnLi90by1kZWNpbWFsLmpzJ1xuaW1wb3J0IHt0b05hbWVkfSBmcm9tICcuL3RvLW5hbWVkLmpzJ1xuXG4vKipcbiAqIENvbmZpZ3VyYWJsZSB3YXlzIHRvIGVuY29kZSBhIGNoYXJhY3RlciB5aWVsZGluZyBwcmV0dHkgb3Igc21hbGwgcmVzdWx0cy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZVxuICogQHBhcmFtIHtudW1iZXJ9IG5leHRcbiAqIEBwYXJhbSB7Rm9ybWF0U21hcnRPcHRpb25zfSBvcHRpb25zXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0U21hcnQoY29kZSwgbmV4dCwgb3B0aW9ucykge1xuICBsZXQgbnVtZXJpYyA9IHRvSGV4YWRlY2ltYWwoY29kZSwgbmV4dCwgb3B0aW9ucy5vbWl0T3B0aW9uYWxTZW1pY29sb25zKVxuICAvKiogQHR5cGUge3N0cmluZ3x1bmRlZmluZWR9ICovXG4gIGxldCBuYW1lZFxuXG4gIGlmIChvcHRpb25zLnVzZU5hbWVkUmVmZXJlbmNlcyB8fCBvcHRpb25zLnVzZVNob3J0ZXN0UmVmZXJlbmNlcykge1xuICAgIG5hbWVkID0gdG9OYW1lZChcbiAgICAgIGNvZGUsXG4gICAgICBuZXh0LFxuICAgICAgb3B0aW9ucy5vbWl0T3B0aW9uYWxTZW1pY29sb25zLFxuICAgICAgb3B0aW9ucy5hdHRyaWJ1dGVcbiAgICApXG4gIH1cblxuICAvLyBVc2UgdGhlIHNob3J0ZXN0IG51bWVyaWMgcmVmZXJlbmNlIHdoZW4gcmVxdWVzdGVkLlxuICAvLyBBIHNpbXBsZSBhbGdvcml0aG0gd291bGQgdXNlIGRlY2ltYWwgZm9yIGFsbCBjb2RlIHBvaW50cyB1bmRlciAxMDAsIGFzXG4gIC8vIHRob3NlIGFyZSBzaG9ydGVyIHRoYW4gaGV4YWRlY2ltYWw6XG4gIC8vXG4gIC8vICogYCYjOTk7YCB2cyBgJiN4NjM7YCAoZGVjaW1hbCBzaG9ydGVyKVxuICAvLyAqIGAmIzEwMDtgIHZzIGAmI3g2NDtgIChlcXVhbClcbiAgLy9cbiAgLy8gSG93ZXZlciwgYmVjYXVzZSB3ZSB0YWtlIGBuZXh0YCBpbnRvIGNvbnNpZGVyYXRpb24gd2hlbiBgb21pdGAgaXMgdXNlZCxcbiAgLy8gQW5kIGl0IHdvdWxkIGJlIHBvc3NpYmxlIHRoYXQgZGVjaW1hbHMgYXJlIHNob3J0ZXIgb24gYmlnZ2VyIHZhbHVlcyBhc1xuICAvLyB3ZWxsIGlmIGBuZXh0YCBpcyBoZXhhZGVjaW1hbCBidXQgbm90IGRlY2ltYWwsIHdlIGluc3RlYWQgY29tcGFyZSBib3RoLlxuICBpZiAoXG4gICAgKG9wdGlvbnMudXNlU2hvcnRlc3RSZWZlcmVuY2VzIHx8ICFuYW1lZCkgJiZcbiAgICBvcHRpb25zLnVzZVNob3J0ZXN0UmVmZXJlbmNlc1xuICApIHtcbiAgICBjb25zdCBkZWNpbWFsID0gdG9EZWNpbWFsKGNvZGUsIG5leHQsIG9wdGlvbnMub21pdE9wdGlvbmFsU2VtaWNvbG9ucylcblxuICAgIGlmIChkZWNpbWFsLmxlbmd0aCA8IG51bWVyaWMubGVuZ3RoKSB7XG4gICAgICBudW1lcmljID0gZGVjaW1hbFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lZCAmJlxuICAgICghb3B0aW9ucy51c2VTaG9ydGVzdFJlZmVyZW5jZXMgfHwgbmFtZWQubGVuZ3RoIDwgbnVtZXJpYy5sZW5ndGgpXG4gICAgPyBuYW1lZFxuICAgIDogbnVtZXJpY1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/stringify-entities/lib/util/format-smart.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/stringify-entities/lib/util/to-decimal.js":
/*!****************************************************************!*\
  !*** ./node_modules/stringify-entities/lib/util/to-decimal.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toDecimal: () => (/* binding */ toDecimal)\n/* harmony export */ });\nconst decimalRegex = /\\d/\n\n/**\n * Configurable ways to encode characters as decimal references.\n *\n * @param {number} code\n * @param {number} next\n * @param {boolean|undefined} omit\n * @returns {string}\n */\nfunction toDecimal(code, next, omit) {\n  const value = '&#' + String(code)\n  return omit && next && !decimalRegex.test(String.fromCharCode(next))\n    ? value\n    : value + ';'\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi91dGlsL3RvLWRlY2ltYWwuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYTtBQUNiO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaGFkY24tYm9hcmQvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi91dGlsL3RvLWRlY2ltYWwuanM/NDgxYiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWNpbWFsUmVnZXggPSAvXFxkL1xuXG4vKipcbiAqIENvbmZpZ3VyYWJsZSB3YXlzIHRvIGVuY29kZSBjaGFyYWN0ZXJzIGFzIGRlY2ltYWwgcmVmZXJlbmNlcy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZVxuICogQHBhcmFtIHtudW1iZXJ9IG5leHRcbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IG9taXRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0RlY2ltYWwoY29kZSwgbmV4dCwgb21pdCkge1xuICBjb25zdCB2YWx1ZSA9ICcmIycgKyBTdHJpbmcoY29kZSlcbiAgcmV0dXJuIG9taXQgJiYgbmV4dCAmJiAhZGVjaW1hbFJlZ2V4LnRlc3QoU3RyaW5nLmZyb21DaGFyQ29kZShuZXh0KSlcbiAgICA/IHZhbHVlXG4gICAgOiB2YWx1ZSArICc7J1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/stringify-entities/lib/util/to-decimal.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/stringify-entities/lib/util/to-hexadecimal.js":
/*!********************************************************************!*\
  !*** ./node_modules/stringify-entities/lib/util/to-hexadecimal.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toHexadecimal: () => (/* binding */ toHexadecimal)\n/* harmony export */ });\nconst hexadecimalRegex = /[\\dA-Fa-f]/\n\n/**\n * Configurable ways to encode characters as hexadecimal references.\n *\n * @param {number} code\n * @param {number} next\n * @param {boolean|undefined} omit\n * @returns {string}\n */\nfunction toHexadecimal(code, next, omit) {\n  const value = '&#x' + code.toString(16).toUpperCase()\n  return omit && next && !hexadecimalRegex.test(String.fromCharCode(next))\n    ? value\n    : value + ';'\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi91dGlsL3RvLWhleGFkZWNpbWFsLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWE7QUFDYjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hhZGNuLWJvYXJkLy4vbm9kZV9tb2R1bGVzL3N0cmluZ2lmeS1lbnRpdGllcy9saWIvdXRpbC90by1oZXhhZGVjaW1hbC5qcz83YjQ1Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGhleGFkZWNpbWFsUmVnZXggPSAvW1xcZEEtRmEtZl0vXG5cbi8qKlxuICogQ29uZmlndXJhYmxlIHdheXMgdG8gZW5jb2RlIGNoYXJhY3RlcnMgYXMgaGV4YWRlY2ltYWwgcmVmZXJlbmNlcy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZVxuICogQHBhcmFtIHtudW1iZXJ9IG5leHRcbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IG9taXRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0hleGFkZWNpbWFsKGNvZGUsIG5leHQsIG9taXQpIHtcbiAgY29uc3QgdmFsdWUgPSAnJiN4JyArIGNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKClcbiAgcmV0dXJuIG9taXQgJiYgbmV4dCAmJiAhaGV4YWRlY2ltYWxSZWdleC50ZXN0KFN0cmluZy5mcm9tQ2hhckNvZGUobmV4dCkpXG4gICAgPyB2YWx1ZVxuICAgIDogdmFsdWUgKyAnOydcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/stringify-entities/lib/util/to-hexadecimal.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/stringify-entities/lib/util/to-named.js":
/*!**************************************************************!*\
  !*** ./node_modules/stringify-entities/lib/util/to-named.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toNamed: () => (/* binding */ toNamed)\n/* harmony export */ });\n/* harmony import */ var character_entities_legacy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! character-entities-legacy */ \"(ssr)/./node_modules/character-entities-legacy/index.js\");\n/* harmony import */ var character_entities_html4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! character-entities-html4 */ \"(ssr)/./node_modules/character-entities-html4/index.js\");\n/* harmony import */ var _constant_dangerous_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constant/dangerous.js */ \"(ssr)/./node_modules/stringify-entities/lib/constant/dangerous.js\");\n\n\n\n\nconst own = {}.hasOwnProperty\n\n/**\n * `characterEntitiesHtml4` but inverted.\n *\n * @type {Record<string, string>}\n */\nconst characters = {}\n\n/** @type {string} */\nlet key\n\nfor (key in character_entities_html4__WEBPACK_IMPORTED_MODULE_0__.characterEntitiesHtml4) {\n  if (own.call(character_entities_html4__WEBPACK_IMPORTED_MODULE_0__.characterEntitiesHtml4, key)) {\n    characters[character_entities_html4__WEBPACK_IMPORTED_MODULE_0__.characterEntitiesHtml4[key]] = key\n  }\n}\n\nconst notAlphanumericRegex = /[^\\dA-Za-z]/\n\n/**\n * Configurable ways to encode characters as named references.\n *\n * @param {number} code\n * @param {number} next\n * @param {boolean|undefined} omit\n * @param {boolean|undefined} attribute\n * @returns {string}\n */\nfunction toNamed(code, next, omit, attribute) {\n  const character = String.fromCharCode(code)\n\n  if (own.call(characters, character)) {\n    const name = characters[character]\n    const value = '&' + name\n\n    if (\n      omit &&\n      character_entities_legacy__WEBPACK_IMPORTED_MODULE_1__.characterEntitiesLegacy.includes(name) &&\n      !_constant_dangerous_js__WEBPACK_IMPORTED_MODULE_2__.dangerous.includes(name) &&\n      (!attribute ||\n        (next &&\n          next !== 61 /* `=` */ &&\n          notAlphanumericRegex.test(String.fromCharCode(next))))\n    ) {\n      return value\n    }\n\n    return value + ';'\n  }\n\n  return ''\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi91dGlsL3RvLW5hbWVkLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBaUU7QUFDRjtBQUNiOztBQUVsRCxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLFdBQVcsUUFBUTtBQUNuQjs7QUFFQSxZQUFZLDRFQUFzQjtBQUNsQyxlQUFlLDRFQUFzQjtBQUNyQyxlQUFlLDRFQUFzQjtBQUNyQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyxtQkFBbUI7QUFDOUIsYUFBYTtBQUNiO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sOEVBQXVCO0FBQzdCLE9BQU8sNkRBQVM7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaGFkY24tYm9hcmQvLi9ub2RlX21vZHVsZXMvc3RyaW5naWZ5LWVudGl0aWVzL2xpYi91dGlsL3RvLW5hbWVkLmpzPzRlNDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjaGFyYWN0ZXJFbnRpdGllc0xlZ2FjeX0gZnJvbSAnY2hhcmFjdGVyLWVudGl0aWVzLWxlZ2FjeSdcbmltcG9ydCB7Y2hhcmFjdGVyRW50aXRpZXNIdG1sNH0gZnJvbSAnY2hhcmFjdGVyLWVudGl0aWVzLWh0bWw0J1xuaW1wb3J0IHtkYW5nZXJvdXN9IGZyb20gJy4uL2NvbnN0YW50L2Rhbmdlcm91cy5qcydcblxuY29uc3Qgb3duID0ge30uaGFzT3duUHJvcGVydHlcblxuLyoqXG4gKiBgY2hhcmFjdGVyRW50aXRpZXNIdG1sNGAgYnV0IGludmVydGVkLlxuICpcbiAqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fVxuICovXG5jb25zdCBjaGFyYWN0ZXJzID0ge31cblxuLyoqIEB0eXBlIHtzdHJpbmd9ICovXG5sZXQga2V5XG5cbmZvciAoa2V5IGluIGNoYXJhY3RlckVudGl0aWVzSHRtbDQpIHtcbiAgaWYgKG93bi5jYWxsKGNoYXJhY3RlckVudGl0aWVzSHRtbDQsIGtleSkpIHtcbiAgICBjaGFyYWN0ZXJzW2NoYXJhY3RlckVudGl0aWVzSHRtbDRba2V5XV0gPSBrZXlcbiAgfVxufVxuXG5jb25zdCBub3RBbHBoYW51bWVyaWNSZWdleCA9IC9bXlxcZEEtWmEtel0vXG5cbi8qKlxuICogQ29uZmlndXJhYmxlIHdheXMgdG8gZW5jb2RlIGNoYXJhY3RlcnMgYXMgbmFtZWQgcmVmZXJlbmNlcy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZVxuICogQHBhcmFtIHtudW1iZXJ9IG5leHRcbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IG9taXRcbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IGF0dHJpYnV0ZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvTmFtZWQoY29kZSwgbmV4dCwgb21pdCwgYXR0cmlidXRlKSB7XG4gIGNvbnN0IGNoYXJhY3RlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSlcblxuICBpZiAob3duLmNhbGwoY2hhcmFjdGVycywgY2hhcmFjdGVyKSkge1xuICAgIGNvbnN0IG5hbWUgPSBjaGFyYWN0ZXJzW2NoYXJhY3Rlcl1cbiAgICBjb25zdCB2YWx1ZSA9ICcmJyArIG5hbWVcblxuICAgIGlmIChcbiAgICAgIG9taXQgJiZcbiAgICAgIGNoYXJhY3RlckVudGl0aWVzTGVnYWN5LmluY2x1ZGVzKG5hbWUpICYmXG4gICAgICAhZGFuZ2Vyb3VzLmluY2x1ZGVzKG5hbWUpICYmXG4gICAgICAoIWF0dHJpYnV0ZSB8fFxuICAgICAgICAobmV4dCAmJlxuICAgICAgICAgIG5leHQgIT09IDYxIC8qIGA9YCAqLyAmJlxuICAgICAgICAgIG5vdEFscGhhbnVtZXJpY1JlZ2V4LnRlc3QoU3RyaW5nLmZyb21DaGFyQ29kZShuZXh0KSkpKVxuICAgICkge1xuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlICsgJzsnXG4gIH1cblxuICByZXR1cm4gJydcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/stringify-entities/lib/util/to-named.js\n");

/***/ })

};
;