"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-gfm-autolink-literal";
exports.ids = ["vendor-chunks/mdast-util-gfm-autolink-literal"];
exports.modules = {

/***/ "(ssr)/./node_modules/mdast-util-gfm-autolink-literal/lib/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/mdast-util-gfm-autolink-literal/lib/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gfmAutolinkLiteralFromMarkdown: () => (/* binding */ gfmAutolinkLiteralFromMarkdown),\n/* harmony export */   gfmAutolinkLiteralToMarkdown: () => (/* binding */ gfmAutolinkLiteralToMarkdown)\n/* harmony export */ });\n/* harmony import */ var ccount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ccount */ \"(ssr)/./node_modules/ccount/index.js\");\n/* harmony import */ var devlop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! devlop */ \"(ssr)/./node_modules/devlop/lib/development.js\");\n/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! micromark-util-character */ \"(ssr)/./node_modules/micromark-util-character/dev/index.js\");\n/* harmony import */ var mdast_util_find_and_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mdast-util-find-and-replace */ \"(ssr)/./node_modules/mdast-util-find-and-replace/lib/index.js\");\n/**\n * @typedef {import('mdast').Link} Link\n * @typedef {import('mdast').PhrasingContent} PhrasingContent\n *\n * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext\n * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension\n * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle\n * @typedef {import('mdast-util-from-markdown').Transform} FromMarkdownTransform\n *\n * @typedef {import('mdast-util-to-markdown').ConstructName} ConstructName\n * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension\n *\n * @typedef {import('mdast-util-find-and-replace').RegExpMatchObject} RegExpMatchObject\n * @typedef {import('mdast-util-find-and-replace').ReplaceFunction} ReplaceFunction\n */\n\n\n\n\n\n\n/** @type {ConstructName} */\nconst inConstruct = 'phrasing'\n/** @type {Array<ConstructName>} */\nconst notInConstruct = ['autolink', 'link', 'image', 'label']\n\n/**\n * Create an extension for `mdast-util-from-markdown` to enable GFM autolink\n * literals in markdown.\n *\n * @returns {FromMarkdownExtension}\n *   Extension for `mdast-util-to-markdown` to enable GFM autolink literals.\n */\nfunction gfmAutolinkLiteralFromMarkdown() {\n  return {\n    transforms: [transformGfmAutolinkLiterals],\n    enter: {\n      literalAutolink: enterLiteralAutolink,\n      literalAutolinkEmail: enterLiteralAutolinkValue,\n      literalAutolinkHttp: enterLiteralAutolinkValue,\n      literalAutolinkWww: enterLiteralAutolinkValue\n    },\n    exit: {\n      literalAutolink: exitLiteralAutolink,\n      literalAutolinkEmail: exitLiteralAutolinkEmail,\n      literalAutolinkHttp: exitLiteralAutolinkHttp,\n      literalAutolinkWww: exitLiteralAutolinkWww\n    }\n  }\n}\n\n/**\n * Create an extension for `mdast-util-to-markdown` to enable GFM autolink\n * literals in markdown.\n *\n * @returns {ToMarkdownExtension}\n *   Extension for `mdast-util-to-markdown` to enable GFM autolink literals.\n */\nfunction gfmAutolinkLiteralToMarkdown() {\n  return {\n    unsafe: [\n      {\n        character: '@',\n        before: '[+\\\\-.\\\\w]',\n        after: '[\\\\-.\\\\w]',\n        inConstruct,\n        notInConstruct\n      },\n      {\n        character: '.',\n        before: '[Ww]',\n        after: '[\\\\-.\\\\w]',\n        inConstruct,\n        notInConstruct\n      },\n      {\n        character: ':',\n        before: '[ps]',\n        after: '\\\\/',\n        inConstruct,\n        notInConstruct\n      }\n    ]\n  }\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterLiteralAutolink(token) {\n  this.enter({type: 'link', title: null, url: '', children: []}, token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterLiteralAutolinkValue(token) {\n  this.config.enter.autolinkProtocol.call(this, token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exitLiteralAutolinkHttp(token) {\n  this.config.exit.autolinkProtocol.call(this, token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exitLiteralAutolinkWww(token) {\n  this.config.exit.data.call(this, token)\n  const node = this.stack[this.stack.length - 1]\n  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(node.type === 'link')\n  node.url = 'http://' + this.sliceSerialize(token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exitLiteralAutolinkEmail(token) {\n  this.config.exit.autolinkEmail.call(this, token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exitLiteralAutolink(token) {\n  this.exit(token)\n}\n\n/** @type {FromMarkdownTransform} */\nfunction transformGfmAutolinkLiterals(tree) {\n  (0,mdast_util_find_and_replace__WEBPACK_IMPORTED_MODULE_1__.findAndReplace)(\n    tree,\n    [\n      [/(https?:\\/\\/|www(?=\\.))([-.\\w]+)([^ \\t\\r\\n]*)/gi, findUrl],\n      [/([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)/g, findEmail]\n    ],\n    {ignore: ['link', 'linkReference']}\n  )\n}\n\n/**\n * @type {ReplaceFunction}\n * @param {string} _\n * @param {string} protocol\n * @param {string} domain\n * @param {string} path\n * @param {RegExpMatchObject} match\n * @returns {Array<PhrasingContent> | Link | false}\n */\n// eslint-disable-next-line max-params\nfunction findUrl(_, protocol, domain, path, match) {\n  let prefix = ''\n\n  // Not an expected previous character.\n  if (!previous(match)) {\n    return false\n  }\n\n  // Treat `www` as part of the domain.\n  if (/^w/i.test(protocol)) {\n    domain = protocol + domain\n    protocol = ''\n    prefix = 'http://'\n  }\n\n  if (!isCorrectDomain(domain)) {\n    return false\n  }\n\n  const parts = splitUrl(domain + path)\n\n  if (!parts[0]) return false\n\n  /** @type {Link} */\n  const result = {\n    type: 'link',\n    title: null,\n    url: prefix + protocol + parts[0],\n    children: [{type: 'text', value: protocol + parts[0]}]\n  }\n\n  if (parts[1]) {\n    return [result, {type: 'text', value: parts[1]}]\n  }\n\n  return result\n}\n\n/**\n * @type {ReplaceFunction}\n * @param {string} _\n * @param {string} atext\n * @param {string} label\n * @param {RegExpMatchObject} match\n * @returns {Link | false}\n */\nfunction findEmail(_, atext, label, match) {\n  if (\n    // Not an expected previous character.\n    !previous(match, true) ||\n    // Label ends in not allowed character.\n    /[-\\d_]$/.test(label)\n  ) {\n    return false\n  }\n\n  return {\n    type: 'link',\n    title: null,\n    url: 'mailto:' + atext + '@' + label,\n    children: [{type: 'text', value: atext + '@' + label}]\n  }\n}\n\n/**\n * @param {string} domain\n * @returns {boolean}\n */\nfunction isCorrectDomain(domain) {\n  const parts = domain.split('.')\n\n  if (\n    parts.length < 2 ||\n    (parts[parts.length - 1] &&\n      (/_/.test(parts[parts.length - 1]) ||\n        !/[a-zA-Z\\d]/.test(parts[parts.length - 1]))) ||\n    (parts[parts.length - 2] &&\n      (/_/.test(parts[parts.length - 2]) ||\n        !/[a-zA-Z\\d]/.test(parts[parts.length - 2])))\n  ) {\n    return false\n  }\n\n  return true\n}\n\n/**\n * @param {string} url\n * @returns {[string, string | undefined]}\n */\nfunction splitUrl(url) {\n  const trailExec = /[!\"&'),.:;<>?\\]}]+$/.exec(url)\n\n  if (!trailExec) {\n    return [url, undefined]\n  }\n\n  url = url.slice(0, trailExec.index)\n\n  let trail = trailExec[0]\n  let closingParenIndex = trail.indexOf(')')\n  const openingParens = (0,ccount__WEBPACK_IMPORTED_MODULE_2__.ccount)(url, '(')\n  let closingParens = (0,ccount__WEBPACK_IMPORTED_MODULE_2__.ccount)(url, ')')\n\n  while (closingParenIndex !== -1 && openingParens > closingParens) {\n    url += trail.slice(0, closingParenIndex + 1)\n    trail = trail.slice(closingParenIndex + 1)\n    closingParenIndex = trail.indexOf(')')\n    closingParens++\n  }\n\n  return [url, trail]\n}\n\n/**\n * @param {RegExpMatchObject} match\n * @param {boolean | null | undefined} [email=false]\n * @returns {boolean}\n */\nfunction previous(match, email) {\n  const code = match.input.charCodeAt(match.index - 1)\n\n  return (\n    (match.index === 0 ||\n      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.unicodeWhitespace)(code) ||\n      (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_3__.unicodePunctuation)(code)) &&\n    (!email || code !== 47)\n  )\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1nZm0tYXV0b2xpbmstbGl0ZXJhbC9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLGlDQUFpQztBQUM5QztBQUNBLGFBQWEsbURBQW1EO0FBQ2hFLGFBQWEsOENBQThDO0FBQzNELGFBQWEsMkNBQTJDO0FBQ3hELGFBQWEsOENBQThDO0FBQzNEO0FBQ0EsYUFBYSxnREFBZ0Q7QUFDN0QsYUFBYSwwQ0FBMEM7QUFDdkQ7QUFDQSxhQUFhLHlEQUF5RDtBQUN0RSxhQUFhLHVEQUF1RDtBQUNwRTs7QUFFNkI7QUFDTTtBQUMyQztBQUNwQjs7QUFFMUQsV0FBVyxlQUFlO0FBQzFCO0FBQ0EsV0FBVyxzQkFBc0I7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBLGNBQWMsaURBQWlEO0FBQy9EOztBQUVBO0FBQ0EsVUFBVTtBQUNWLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBTTtBQUNSO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLHVCQUF1QjtBQUNsQztBQUNBLEVBQUUsMkVBQWM7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLG1CQUFtQjtBQUM5QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IseUNBQXlDO0FBQ3pEOztBQUVBO0FBQ0EscUJBQXFCLDhCQUE4QjtBQUNuRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix5Q0FBeUM7QUFDekQ7QUFDQTs7QUFFQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBLCtCQUErQixNQUFNOztBQUVyQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHdCQUF3Qiw4Q0FBTTtBQUM5QixzQkFBc0IsOENBQU07O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUIsV0FBVyw0QkFBNEI7QUFDdkMsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSwyRUFBaUI7QUFDdkIsTUFBTSw0RUFBa0I7QUFDeEI7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1ib2FyZC8uL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLWdmbS1hdXRvbGluay1saXRlcmFsL2xpYi9pbmRleC5qcz9lMDBlIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5MaW5rfSBMaW5rXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlBocmFzaW5nQ29udGVudH0gUGhyYXNpbmdDb250ZW50XG4gKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duJykuQ29tcGlsZUNvbnRleHR9IENvbXBpbGVDb250ZXh0XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLWZyb20tbWFya2Rvd24nKS5FeHRlbnNpb259IEZyb21NYXJrZG93bkV4dGVuc2lvblxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duJykuSGFuZGxlfSBGcm9tTWFya2Rvd25IYW5kbGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtZnJvbS1tYXJrZG93bicpLlRyYW5zZm9ybX0gRnJvbU1hcmtkb3duVHJhbnNmb3JtXG4gKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC10by1tYXJrZG93bicpLkNvbnN0cnVjdE5hbWV9IENvbnN0cnVjdE5hbWVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtdG8tbWFya2Rvd24nKS5PcHRpb25zfSBUb01hcmtkb3duRXh0ZW5zaW9uXG4gKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC1maW5kLWFuZC1yZXBsYWNlJykuUmVnRXhwTWF0Y2hPYmplY3R9IFJlZ0V4cE1hdGNoT2JqZWN0XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdC11dGlsLWZpbmQtYW5kLXJlcGxhY2UnKS5SZXBsYWNlRnVuY3Rpb259IFJlcGxhY2VGdW5jdGlvblxuICovXG5cbmltcG9ydCB7Y2NvdW50fSBmcm9tICdjY291bnQnXG5pbXBvcnQge29rIGFzIGFzc2VydH0gZnJvbSAnZGV2bG9wJ1xuaW1wb3J0IHt1bmljb2RlUHVuY3R1YXRpb24sIHVuaWNvZGVXaGl0ZXNwYWNlfSBmcm9tICdtaWNyb21hcmstdXRpbC1jaGFyYWN0ZXInXG5pbXBvcnQge2ZpbmRBbmRSZXBsYWNlfSBmcm9tICdtZGFzdC11dGlsLWZpbmQtYW5kLXJlcGxhY2UnXG5cbi8qKiBAdHlwZSB7Q29uc3RydWN0TmFtZX0gKi9cbmNvbnN0IGluQ29uc3RydWN0ID0gJ3BocmFzaW5nJ1xuLyoqIEB0eXBlIHtBcnJheTxDb25zdHJ1Y3ROYW1lPn0gKi9cbmNvbnN0IG5vdEluQ29uc3RydWN0ID0gWydhdXRvbGluaycsICdsaW5rJywgJ2ltYWdlJywgJ2xhYmVsJ11cblxuLyoqXG4gKiBDcmVhdGUgYW4gZXh0ZW5zaW9uIGZvciBgbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIGF1dG9saW5rXG4gKiBsaXRlcmFscyBpbiBtYXJrZG93bi5cbiAqXG4gKiBAcmV0dXJucyB7RnJvbU1hcmtkb3duRXh0ZW5zaW9ufVxuICogICBFeHRlbnNpb24gZm9yIGBtZGFzdC11dGlsLXRvLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIGF1dG9saW5rIGxpdGVyYWxzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2ZtQXV0b2xpbmtMaXRlcmFsRnJvbU1hcmtkb3duKCkge1xuICByZXR1cm4ge1xuICAgIHRyYW5zZm9ybXM6IFt0cmFuc2Zvcm1HZm1BdXRvbGlua0xpdGVyYWxzXSxcbiAgICBlbnRlcjoge1xuICAgICAgbGl0ZXJhbEF1dG9saW5rOiBlbnRlckxpdGVyYWxBdXRvbGluayxcbiAgICAgIGxpdGVyYWxBdXRvbGlua0VtYWlsOiBlbnRlckxpdGVyYWxBdXRvbGlua1ZhbHVlLFxuICAgICAgbGl0ZXJhbEF1dG9saW5rSHR0cDogZW50ZXJMaXRlcmFsQXV0b2xpbmtWYWx1ZSxcbiAgICAgIGxpdGVyYWxBdXRvbGlua1d3dzogZW50ZXJMaXRlcmFsQXV0b2xpbmtWYWx1ZVxuICAgIH0sXG4gICAgZXhpdDoge1xuICAgICAgbGl0ZXJhbEF1dG9saW5rOiBleGl0TGl0ZXJhbEF1dG9saW5rLFxuICAgICAgbGl0ZXJhbEF1dG9saW5rRW1haWw6IGV4aXRMaXRlcmFsQXV0b2xpbmtFbWFpbCxcbiAgICAgIGxpdGVyYWxBdXRvbGlua0h0dHA6IGV4aXRMaXRlcmFsQXV0b2xpbmtIdHRwLFxuICAgICAgbGl0ZXJhbEF1dG9saW5rV3d3OiBleGl0TGl0ZXJhbEF1dG9saW5rV3d3XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGV4dGVuc2lvbiBmb3IgYG1kYXN0LXV0aWwtdG8tbWFya2Rvd25gIHRvIGVuYWJsZSBHRk0gYXV0b2xpbmtcbiAqIGxpdGVyYWxzIGluIG1hcmtkb3duLlxuICpcbiAqIEByZXR1cm5zIHtUb01hcmtkb3duRXh0ZW5zaW9ufVxuICogICBFeHRlbnNpb24gZm9yIGBtZGFzdC11dGlsLXRvLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIGF1dG9saW5rIGxpdGVyYWxzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2ZtQXV0b2xpbmtMaXRlcmFsVG9NYXJrZG93bigpIHtcbiAgcmV0dXJuIHtcbiAgICB1bnNhZmU6IFtcbiAgICAgIHtcbiAgICAgICAgY2hhcmFjdGVyOiAnQCcsXG4gICAgICAgIGJlZm9yZTogJ1srXFxcXC0uXFxcXHddJyxcbiAgICAgICAgYWZ0ZXI6ICdbXFxcXC0uXFxcXHddJyxcbiAgICAgICAgaW5Db25zdHJ1Y3QsXG4gICAgICAgIG5vdEluQ29uc3RydWN0XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjaGFyYWN0ZXI6ICcuJyxcbiAgICAgICAgYmVmb3JlOiAnW1d3XScsXG4gICAgICAgIGFmdGVyOiAnW1xcXFwtLlxcXFx3XScsXG4gICAgICAgIGluQ29uc3RydWN0LFxuICAgICAgICBub3RJbkNvbnN0cnVjdFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY2hhcmFjdGVyOiAnOicsXG4gICAgICAgIGJlZm9yZTogJ1twc10nLFxuICAgICAgICBhZnRlcjogJ1xcXFwvJyxcbiAgICAgICAgaW5Db25zdHJ1Y3QsXG4gICAgICAgIG5vdEluQ29uc3RydWN0XG4gICAgICB9XG4gICAgXVxuICB9XG59XG5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZW50ZXJMaXRlcmFsQXV0b2xpbmsodG9rZW4pIHtcbiAgdGhpcy5lbnRlcih7dHlwZTogJ2xpbmsnLCB0aXRsZTogbnVsbCwgdXJsOiAnJywgY2hpbGRyZW46IFtdfSwgdG9rZW4pXG59XG5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZW50ZXJMaXRlcmFsQXV0b2xpbmtWYWx1ZSh0b2tlbikge1xuICB0aGlzLmNvbmZpZy5lbnRlci5hdXRvbGlua1Byb3RvY29sLmNhbGwodGhpcywgdG9rZW4pXG59XG5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZXhpdExpdGVyYWxBdXRvbGlua0h0dHAodG9rZW4pIHtcbiAgdGhpcy5jb25maWcuZXhpdC5hdXRvbGlua1Byb3RvY29sLmNhbGwodGhpcywgdG9rZW4pXG59XG5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZXhpdExpdGVyYWxBdXRvbGlua1d3dyh0b2tlbikge1xuICB0aGlzLmNvbmZpZy5leGl0LmRhdGEuY2FsbCh0aGlzLCB0b2tlbilcbiAgY29uc3Qgbm9kZSA9IHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSAxXVxuICBhc3NlcnQobm9kZS50eXBlID09PSAnbGluaycpXG4gIG5vZGUudXJsID0gJ2h0dHA6Ly8nICsgdGhpcy5zbGljZVNlcmlhbGl6ZSh0b2tlbilcbn1cblxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duSGFuZGxlfVxuICovXG5mdW5jdGlvbiBleGl0TGl0ZXJhbEF1dG9saW5rRW1haWwodG9rZW4pIHtcbiAgdGhpcy5jb25maWcuZXhpdC5hdXRvbGlua0VtYWlsLmNhbGwodGhpcywgdG9rZW4pXG59XG5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZXhpdExpdGVyYWxBdXRvbGluayh0b2tlbikge1xuICB0aGlzLmV4aXQodG9rZW4pXG59XG5cbi8qKiBAdHlwZSB7RnJvbU1hcmtkb3duVHJhbnNmb3JtfSAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtR2ZtQXV0b2xpbmtMaXRlcmFscyh0cmVlKSB7XG4gIGZpbmRBbmRSZXBsYWNlKFxuICAgIHRyZWUsXG4gICAgW1xuICAgICAgWy8oaHR0cHM/OlxcL1xcL3x3d3coPz1cXC4pKShbLS5cXHddKykoW14gXFx0XFxyXFxuXSopL2dpLCBmaW5kVXJsXSxcbiAgICAgIFsvKFstLlxcdytdKylAKFstXFx3XSsoPzpcXC5bLVxcd10rKSspL2csIGZpbmRFbWFpbF1cbiAgICBdLFxuICAgIHtpZ25vcmU6IFsnbGluaycsICdsaW5rUmVmZXJlbmNlJ119XG4gIClcbn1cblxuLyoqXG4gKiBAdHlwZSB7UmVwbGFjZUZ1bmN0aW9ufVxuICogQHBhcmFtIHtzdHJpbmd9IF9cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm90b2NvbFxuICogQHBhcmFtIHtzdHJpbmd9IGRvbWFpblxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSB7UmVnRXhwTWF0Y2hPYmplY3R9IG1hdGNoXG4gKiBAcmV0dXJucyB7QXJyYXk8UGhyYXNpbmdDb250ZW50PiB8IExpbmsgfCBmYWxzZX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcbmZ1bmN0aW9uIGZpbmRVcmwoXywgcHJvdG9jb2wsIGRvbWFpbiwgcGF0aCwgbWF0Y2gpIHtcbiAgbGV0IHByZWZpeCA9ICcnXG5cbiAgLy8gTm90IGFuIGV4cGVjdGVkIHByZXZpb3VzIGNoYXJhY3Rlci5cbiAgaWYgKCFwcmV2aW91cyhtYXRjaCkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIFRyZWF0IGB3d3dgIGFzIHBhcnQgb2YgdGhlIGRvbWFpbi5cbiAgaWYgKC9edy9pLnRlc3QocHJvdG9jb2wpKSB7XG4gICAgZG9tYWluID0gcHJvdG9jb2wgKyBkb21haW5cbiAgICBwcm90b2NvbCA9ICcnXG4gICAgcHJlZml4ID0gJ2h0dHA6Ly8nXG4gIH1cblxuICBpZiAoIWlzQ29ycmVjdERvbWFpbihkb21haW4pKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBwYXJ0cyA9IHNwbGl0VXJsKGRvbWFpbiArIHBhdGgpXG5cbiAgaWYgKCFwYXJ0c1swXSkgcmV0dXJuIGZhbHNlXG5cbiAgLyoqIEB0eXBlIHtMaW5rfSAqL1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgdHlwZTogJ2xpbmsnLFxuICAgIHRpdGxlOiBudWxsLFxuICAgIHVybDogcHJlZml4ICsgcHJvdG9jb2wgKyBwYXJ0c1swXSxcbiAgICBjaGlsZHJlbjogW3t0eXBlOiAndGV4dCcsIHZhbHVlOiBwcm90b2NvbCArIHBhcnRzWzBdfV1cbiAgfVxuXG4gIGlmIChwYXJ0c1sxXSkge1xuICAgIHJldHVybiBbcmVzdWx0LCB7dHlwZTogJ3RleHQnLCB2YWx1ZTogcGFydHNbMV19XVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEB0eXBlIHtSZXBsYWNlRnVuY3Rpb259XG4gKiBAcGFyYW0ge3N0cmluZ30gX1xuICogQHBhcmFtIHtzdHJpbmd9IGF0ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxcbiAqIEBwYXJhbSB7UmVnRXhwTWF0Y2hPYmplY3R9IG1hdGNoXG4gKiBAcmV0dXJucyB7TGluayB8IGZhbHNlfVxuICovXG5mdW5jdGlvbiBmaW5kRW1haWwoXywgYXRleHQsIGxhYmVsLCBtYXRjaCkge1xuICBpZiAoXG4gICAgLy8gTm90IGFuIGV4cGVjdGVkIHByZXZpb3VzIGNoYXJhY3Rlci5cbiAgICAhcHJldmlvdXMobWF0Y2gsIHRydWUpIHx8XG4gICAgLy8gTGFiZWwgZW5kcyBpbiBub3QgYWxsb3dlZCBjaGFyYWN0ZXIuXG4gICAgL1stXFxkX10kLy50ZXN0KGxhYmVsKVxuICApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogJ2xpbmsnLFxuICAgIHRpdGxlOiBudWxsLFxuICAgIHVybDogJ21haWx0bzonICsgYXRleHQgKyAnQCcgKyBsYWJlbCxcbiAgICBjaGlsZHJlbjogW3t0eXBlOiAndGV4dCcsIHZhbHVlOiBhdGV4dCArICdAJyArIGxhYmVsfV1cbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBkb21haW5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0NvcnJlY3REb21haW4oZG9tYWluKSB7XG4gIGNvbnN0IHBhcnRzID0gZG9tYWluLnNwbGl0KCcuJylcblxuICBpZiAoXG4gICAgcGFydHMubGVuZ3RoIDwgMiB8fFxuICAgIChwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSAmJlxuICAgICAgKC9fLy50ZXN0KHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdKSB8fFxuICAgICAgICAhL1thLXpBLVpcXGRdLy50ZXN0KHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdKSkpIHx8XG4gICAgKHBhcnRzW3BhcnRzLmxlbmd0aCAtIDJdICYmXG4gICAgICAoL18vLnRlc3QocGFydHNbcGFydHMubGVuZ3RoIC0gMl0pIHx8XG4gICAgICAgICEvW2EtekEtWlxcZF0vLnRlc3QocGFydHNbcGFydHMubGVuZ3RoIC0gMl0pKSlcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtbc3RyaW5nLCBzdHJpbmcgfCB1bmRlZmluZWRdfVxuICovXG5mdW5jdGlvbiBzcGxpdFVybCh1cmwpIHtcbiAgY29uc3QgdHJhaWxFeGVjID0gL1shXCImJyksLjo7PD4/XFxdfV0rJC8uZXhlYyh1cmwpXG5cbiAgaWYgKCF0cmFpbEV4ZWMpIHtcbiAgICByZXR1cm4gW3VybCwgdW5kZWZpbmVkXVxuICB9XG5cbiAgdXJsID0gdXJsLnNsaWNlKDAsIHRyYWlsRXhlYy5pbmRleClcblxuICBsZXQgdHJhaWwgPSB0cmFpbEV4ZWNbMF1cbiAgbGV0IGNsb3NpbmdQYXJlbkluZGV4ID0gdHJhaWwuaW5kZXhPZignKScpXG4gIGNvbnN0IG9wZW5pbmdQYXJlbnMgPSBjY291bnQodXJsLCAnKCcpXG4gIGxldCBjbG9zaW5nUGFyZW5zID0gY2NvdW50KHVybCwgJyknKVxuXG4gIHdoaWxlIChjbG9zaW5nUGFyZW5JbmRleCAhPT0gLTEgJiYgb3BlbmluZ1BhcmVucyA+IGNsb3NpbmdQYXJlbnMpIHtcbiAgICB1cmwgKz0gdHJhaWwuc2xpY2UoMCwgY2xvc2luZ1BhcmVuSW5kZXggKyAxKVxuICAgIHRyYWlsID0gdHJhaWwuc2xpY2UoY2xvc2luZ1BhcmVuSW5kZXggKyAxKVxuICAgIGNsb3NpbmdQYXJlbkluZGV4ID0gdHJhaWwuaW5kZXhPZignKScpXG4gICAgY2xvc2luZ1BhcmVucysrXG4gIH1cblxuICByZXR1cm4gW3VybCwgdHJhaWxdXG59XG5cbi8qKlxuICogQHBhcmFtIHtSZWdFeHBNYXRjaE9iamVjdH0gbWF0Y2hcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFtlbWFpbD1mYWxzZV1cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBwcmV2aW91cyhtYXRjaCwgZW1haWwpIHtcbiAgY29uc3QgY29kZSA9IG1hdGNoLmlucHV0LmNoYXJDb2RlQXQobWF0Y2guaW5kZXggLSAxKVxuXG4gIHJldHVybiAoXG4gICAgKG1hdGNoLmluZGV4ID09PSAwIHx8XG4gICAgICB1bmljb2RlV2hpdGVzcGFjZShjb2RlKSB8fFxuICAgICAgdW5pY29kZVB1bmN0dWF0aW9uKGNvZGUpKSAmJlxuICAgICghZW1haWwgfHwgY29kZSAhPT0gNDcpXG4gIClcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mdast-util-gfm-autolink-literal/lib/index.js\n");

/***/ })

};
;