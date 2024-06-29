"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/rehype-autolink-headings";
exports.ids = ["vendor-chunks/rehype-autolink-headings"];
exports.modules = {

/***/ "(ssr)/./node_modules/rehype-autolink-headings/lib/index.js":
/*!************************************************************!*\
  !*** ./node_modules/rehype-autolink-headings/lib/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rehypeAutolinkHeadings)\n/* harmony export */ });\n/* harmony import */ var _ungap_structured_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ungap/structured-clone */ \"(ssr)/./node_modules/@ungap/structured-clone/esm/index.js\");\n/* harmony import */ var hast_util_heading_rank__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hast-util-heading-rank */ \"(ssr)/./node_modules/hast-util-heading-rank/lib/index.js\");\n/* harmony import */ var hast_util_is_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hast-util-is-element */ \"(ssr)/./node_modules/hast-util-is-element/lib/index.js\");\n/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! unist-util-visit */ \"(ssr)/./node_modules/unist-util-visit/lib/index.js\");\n/* harmony import */ var unist_util_visit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! unist-util-visit */ \"(ssr)/./node_modules/unist-util-visit-parents/lib/index.js\");\n/**\n * @typedef {import('hast').Element} Element\n * @typedef {import('hast').ElementContent} ElementContent\n * @typedef {import('hast').Properties} Properties\n * @typedef {import('hast').Root} Root\n *\n * @typedef {import('hast-util-is-element').Test} Test\n */\n\n/**\n * @typedef {'after' | 'append' | 'before' | 'prepend' | 'wrap'} Behavior\n *   Behavior.\n *\n * @callback Build\n *   Generate content.\n * @param {Readonly<Element>} element\n *   Current heading.\n * @returns {Array<ElementContent> | ElementContent}\n *   Content.\n *\n * @callback BuildProperties\n *   Generate properties.\n * @param {Readonly<Element>} element\n *   Current heading.\n * @returns {Properties}\n *   Properties.\n *\n * @typedef Options\n *   Configuration.\n * @property {Behavior | null | undefined} [behavior='prepend']\n *   How to create links (default: `'prepend'`).\n * @property {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build | null | undefined} [content]\n *   Content to insert in the link (default: if `'wrap'` then `undefined`,\n *   otherwise `<span class=\"icon icon-link\"></span>`);\n *   if `behavior` is `'wrap'` and `Build` is passed, its result replaces the\n *   existing content, otherwise the content is added after existing content.\n * @property {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build | null | undefined} [group]\n *   Content to wrap the heading and link with, if `behavior` is `'after'` or\n *   `'before'` (optional).\n * @property {Readonly<Properties> | BuildProperties | null | undefined} [headingProperties]\n *   Extra properties to set on the heading (optional).\n * @property {Readonly<Properties> | BuildProperties | null | undefined} [properties]\n *   Extra properties to set on the link when injecting (default:\n *   `{ariaHidden: true, tabIndex: -1}` if `'append'` or `'prepend'`, otherwise\n *   `undefined`).\n * @property {Test | null | undefined} [test]\n *   Extra test for which headings are linked (optional).\n */\n\n/**\n * @template T\n *   Kind.\n * @typedef {(\n *   T extends Record<any, any>\n *     ? {-readonly [k in keyof T]: Cloneable<T[k]>}\n *     : T\n * )} Cloneable\n *   Deep clone.\n *\n *   See: <https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1237#issuecomment-1345515448>\n */\n\n\n\n\n\n\n/** @type {Element} */\nconst contentDefaults = {\n  type: 'element',\n  tagName: 'span',\n  properties: {className: ['icon', 'icon-link']},\n  children: []\n}\n\n/** @type {Options} */\nconst emptyOptions = {}\n\n/**\n * Add links from headings back to themselves.\n *\n * ###### Notes\n *\n * This plugin only applies to headings with `id`s.\n * Use `rehype-slug` to generate `id`s for headings that don’t have them.\n *\n * Several behaviors are supported:\n *\n * *   `'prepend'` (default) — inject link before the heading text\n * *   `'append'` — inject link after the heading text\n * *   `'wrap'` — wrap the whole heading text with the link\n * *   `'before'` — insert link before the heading\n * *   `'after'` — insert link after the heading\n *\n * @param {Readonly<Options> | null | undefined} [options]\n *   Configuration (optional).\n * @returns\n *   Transform.\n */\nfunction rehypeAutolinkHeadings(options) {\n  const settings = options || emptyOptions\n  let properties = settings.properties\n  const headingOroperties = settings.headingProperties\n  const behavior = settings.behavior || 'prepend'\n  const content = settings.content\n  const group = settings.group\n  const is = (0,hast_util_is_element__WEBPACK_IMPORTED_MODULE_1__.convertElement)(settings.test)\n\n  /** @type {import('unist-util-visit').Visitor<Element>} */\n  let method\n\n  if (behavior === 'after' || behavior === 'before') {\n    method = around\n  } else if (behavior === 'wrap') {\n    method = wrap\n  } else {\n    method = inject\n\n    if (!properties) {\n      properties = {ariaHidden: 'true', tabIndex: -1}\n    }\n  }\n\n  /**\n   * Transform.\n   *\n   * @param {Root} tree\n   *   Tree.\n   * @returns {undefined}\n   *   Nothing.\n   */\n  return function (tree) {\n    (0,unist_util_visit__WEBPACK_IMPORTED_MODULE_2__.visit)(tree, 'element', function (node, index, parent) {\n      if ((0,hast_util_heading_rank__WEBPACK_IMPORTED_MODULE_3__.headingRank)(node) && node.properties.id && is(node, index, parent)) {\n        Object.assign(node.properties, toProperties(headingOroperties, node))\n        return method(node, index, parent)\n      }\n    })\n  }\n\n  /** @type {import('unist-util-visit').Visitor<Element>} */\n  function inject(node) {\n    const children = toChildren(content || contentDefaults, node)\n    node.children[behavior === 'prepend' ? 'unshift' : 'push'](\n      create(node, toProperties(properties, node), children)\n    )\n\n    return [unist_util_visit__WEBPACK_IMPORTED_MODULE_4__.SKIP]\n  }\n\n  /** @type {import('unist-util-visit').Visitor<Element>} */\n  function around(node, index, parent) {\n    /* c8 ignore next -- uncommon */\n    if (typeof index !== 'number' || !parent) return\n\n    const children = toChildren(content || contentDefaults, node)\n    const link = create(node, toProperties(properties, node), children)\n    let nodes = behavior === 'before' ? [link, node] : [node, link]\n\n    if (group) {\n      const grouping = toNode(group, node)\n\n      if (grouping && !Array.isArray(grouping) && grouping.type === 'element') {\n        grouping.children = nodes\n        nodes = [grouping]\n      }\n    }\n\n    parent.children.splice(index, 1, ...nodes)\n\n    return [unist_util_visit__WEBPACK_IMPORTED_MODULE_4__.SKIP, index + nodes.length]\n  }\n\n  /** @type {import('unist-util-visit').Visitor<Element>} */\n  function wrap(node) {\n    /** @type {Array<ElementContent>} */\n    let before = node.children\n    /** @type {Array<ElementContent> | ElementContent} */\n    let after = []\n\n    if (typeof content === 'function') {\n      before = []\n      after = content(node)\n    } else if (content) {\n      after = clone(content)\n    }\n\n    node.children = [\n      create(\n        node,\n        toProperties(properties, node),\n        Array.isArray(after) ? [...before, ...after] : [...before, after]\n      )\n    ]\n\n    return [unist_util_visit__WEBPACK_IMPORTED_MODULE_4__.SKIP]\n  }\n}\n\n/**\n * Deep clone.\n *\n * @template T\n *   Kind.\n * @param {T} thing\n *   Thing to clone.\n * @returns {Cloneable<T>}\n *   Cloned thing.\n */\nfunction clone(thing) {\n  // Cast because it’s mutable now.\n  return /** @type {Cloneable<T>} */ ((0,_ungap_structured_clone__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(thing))\n}\n\n/**\n * Create an `a`.\n *\n * @param {Readonly<Element>} node\n *   Related heading.\n * @param {Properties | undefined} properties\n *   Properties to set on the link.\n * @param {Array<ElementContent>} children\n *   Content.\n * @returns {Element}\n *   Link.\n */\nfunction create(node, properties, children) {\n  return {\n    type: 'element',\n    tagName: 'a',\n    properties: {...properties, href: '#' + node.properties.id},\n    children\n  }\n}\n\n/**\n * Turn into children.\n *\n * @param {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build} value\n *   Content.\n * @param {Readonly<Element>} node\n *   Related heading.\n * @returns {Array<ElementContent>}\n *   Children.\n */\nfunction toChildren(value, node) {\n  const result = toNode(value, node)\n  return Array.isArray(result) ? result : [result]\n}\n\n/**\n * Turn into a node.\n *\n * @param {Readonly<ElementContent> | ReadonlyArray<ElementContent> | Build} value\n *   Content.\n * @param {Readonly<Element>} node\n *   Related heading.\n * @returns {Array<ElementContent> | ElementContent}\n *   Node.\n */\nfunction toNode(value, node) {\n  if (typeof value === 'function') return value(node)\n  return clone(value)\n}\n\n/**\n * Turn into properties.\n *\n * @param {Readonly<Properties> | BuildProperties | null | undefined} value\n *   Properties.\n * @param {Readonly<Element>} node\n *   Related heading.\n * @returns {Properties}\n *   Properties.\n */\nfunction toProperties(value, node) {\n  if (typeof value === 'function') return value(node)\n  return value ? clone(value) : {}\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVoeXBlLWF1dG9saW5rLWhlYWRpbmdzL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsK0JBQStCO0FBQzVDLGFBQWEsMkJBQTJCO0FBQ3hDLGFBQWEscUJBQXFCO0FBQ2xDO0FBQ0EsYUFBYSxxQ0FBcUM7QUFDbEQ7O0FBRUE7QUFDQSxhQUFhLG9EQUFvRDtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZCQUE2QjtBQUMzQztBQUNBLGNBQWMscUZBQXFGO0FBQ25HO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxxRkFBcUY7QUFDbkc7QUFDQTtBQUNBLGNBQWMsMkRBQTJEO0FBQ3pFO0FBQ0EsY0FBYywyREFBMkQ7QUFDekU7QUFDQSxPQUFPLCtCQUErQjtBQUN0QztBQUNBLGNBQWMseUJBQXlCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVxRDtBQUNIO0FBQ0M7QUFDUDs7QUFFNUMsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUNBQWlDO0FBQ2hEO0FBQ0E7O0FBRUEsV0FBVyxTQUFTO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxzQ0FBc0M7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsb0VBQWM7O0FBRTNCLGFBQWEsNkNBQTZDO0FBQzFEOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1REFBSztBQUNULFVBQVUsbUVBQVc7QUFDckI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLGFBQWEsNkNBQTZDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxrREFBSTtBQUNoQjs7QUFFQSxhQUFhLDZDQUE2QztBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxZQUFZLGtEQUFJO0FBQ2hCOztBQUVBLGFBQWEsNkNBQTZDO0FBQzFEO0FBQ0EsZUFBZSx1QkFBdUI7QUFDdEM7QUFDQSxlQUFlLHdDQUF3QztBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLGtEQUFJO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGNBQWMsSUFBSSxtRUFBZTtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QjtBQUNBLFdBQVcsd0JBQXdCO0FBQ25DO0FBQ0EsV0FBVyx1QkFBdUI7QUFDbEM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhDQUE4QztBQUMvRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxrRUFBa0U7QUFDN0U7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxrRUFBa0U7QUFDN0U7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVywyREFBMkQ7QUFDdEU7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaGFkY24tYm9hcmQvLi9ub2RlX21vZHVsZXMvcmVoeXBlLWF1dG9saW5rLWhlYWRpbmdzL2xpYi9pbmRleC5qcz9lMzc3Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLkVsZW1lbnR9IEVsZW1lbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5FbGVtZW50Q29udGVudH0gRWxlbWVudENvbnRlbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5Qcm9wZXJ0aWVzfSBQcm9wZXJ0aWVzXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuUm9vdH0gUm9vdFxuICpcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QtdXRpbC1pcy1lbGVtZW50JykuVGVzdH0gVGVzdFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYgeydhZnRlcicgfCAnYXBwZW5kJyB8ICdiZWZvcmUnIHwgJ3ByZXBlbmQnIHwgJ3dyYXAnfSBCZWhhdmlvclxuICogICBCZWhhdmlvci5cbiAqXG4gKiBAY2FsbGJhY2sgQnVpbGRcbiAqICAgR2VuZXJhdGUgY29udGVudC5cbiAqIEBwYXJhbSB7UmVhZG9ubHk8RWxlbWVudD59IGVsZW1lbnRcbiAqICAgQ3VycmVudCBoZWFkaW5nLlxuICogQHJldHVybnMge0FycmF5PEVsZW1lbnRDb250ZW50PiB8IEVsZW1lbnRDb250ZW50fVxuICogICBDb250ZW50LlxuICpcbiAqIEBjYWxsYmFjayBCdWlsZFByb3BlcnRpZXNcbiAqICAgR2VuZXJhdGUgcHJvcGVydGllcy5cbiAqIEBwYXJhbSB7UmVhZG9ubHk8RWxlbWVudD59IGVsZW1lbnRcbiAqICAgQ3VycmVudCBoZWFkaW5nLlxuICogQHJldHVybnMge1Byb3BlcnRpZXN9XG4gKiAgIFByb3BlcnRpZXMuXG4gKlxuICogQHR5cGVkZWYgT3B0aW9uc1xuICogICBDb25maWd1cmF0aW9uLlxuICogQHByb3BlcnR5IHtCZWhhdmlvciB8IG51bGwgfCB1bmRlZmluZWR9IFtiZWhhdmlvcj0ncHJlcGVuZCddXG4gKiAgIEhvdyB0byBjcmVhdGUgbGlua3MgKGRlZmF1bHQ6IGAncHJlcGVuZCdgKS5cbiAqIEBwcm9wZXJ0eSB7UmVhZG9ubHk8RWxlbWVudENvbnRlbnQ+IHwgUmVhZG9ubHlBcnJheTxFbGVtZW50Q29udGVudD4gfCBCdWlsZCB8IG51bGwgfCB1bmRlZmluZWR9IFtjb250ZW50XVxuICogICBDb250ZW50IHRvIGluc2VydCBpbiB0aGUgbGluayAoZGVmYXVsdDogaWYgYCd3cmFwJ2AgdGhlbiBgdW5kZWZpbmVkYCxcbiAqICAgb3RoZXJ3aXNlIGA8c3BhbiBjbGFzcz1cImljb24gaWNvbi1saW5rXCI+PC9zcGFuPmApO1xuICogICBpZiBgYmVoYXZpb3JgIGlzIGAnd3JhcCdgIGFuZCBgQnVpbGRgIGlzIHBhc3NlZCwgaXRzIHJlc3VsdCByZXBsYWNlcyB0aGVcbiAqICAgZXhpc3RpbmcgY29udGVudCwgb3RoZXJ3aXNlIHRoZSBjb250ZW50IGlzIGFkZGVkIGFmdGVyIGV4aXN0aW5nIGNvbnRlbnQuXG4gKiBAcHJvcGVydHkge1JlYWRvbmx5PEVsZW1lbnRDb250ZW50PiB8IFJlYWRvbmx5QXJyYXk8RWxlbWVudENvbnRlbnQ+IHwgQnVpbGQgfCBudWxsIHwgdW5kZWZpbmVkfSBbZ3JvdXBdXG4gKiAgIENvbnRlbnQgdG8gd3JhcCB0aGUgaGVhZGluZyBhbmQgbGluayB3aXRoLCBpZiBgYmVoYXZpb3JgIGlzIGAnYWZ0ZXInYCBvclxuICogICBgJ2JlZm9yZSdgIChvcHRpb25hbCkuXG4gKiBAcHJvcGVydHkge1JlYWRvbmx5PFByb3BlcnRpZXM+IHwgQnVpbGRQcm9wZXJ0aWVzIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2hlYWRpbmdQcm9wZXJ0aWVzXVxuICogICBFeHRyYSBwcm9wZXJ0aWVzIHRvIHNldCBvbiB0aGUgaGVhZGluZyAob3B0aW9uYWwpLlxuICogQHByb3BlcnR5IHtSZWFkb25seTxQcm9wZXJ0aWVzPiB8IEJ1aWxkUHJvcGVydGllcyB8IG51bGwgfCB1bmRlZmluZWR9IFtwcm9wZXJ0aWVzXVxuICogICBFeHRyYSBwcm9wZXJ0aWVzIHRvIHNldCBvbiB0aGUgbGluayB3aGVuIGluamVjdGluZyAoZGVmYXVsdDpcbiAqICAgYHthcmlhSGlkZGVuOiB0cnVlLCB0YWJJbmRleDogLTF9YCBpZiBgJ2FwcGVuZCdgIG9yIGAncHJlcGVuZCdgLCBvdGhlcndpc2VcbiAqICAgYHVuZGVmaW5lZGApLlxuICogQHByb3BlcnR5IHtUZXN0IHwgbnVsbCB8IHVuZGVmaW5lZH0gW3Rlc3RdXG4gKiAgIEV4dHJhIHRlc3QgZm9yIHdoaWNoIGhlYWRpbmdzIGFyZSBsaW5rZWQgKG9wdGlvbmFsKS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKiAgIEtpbmQuXG4gKiBAdHlwZWRlZiB7KFxuICogICBUIGV4dGVuZHMgUmVjb3JkPGFueSwgYW55PlxuICogICAgID8gey1yZWFkb25seSBbayBpbiBrZXlvZiBUXTogQ2xvbmVhYmxlPFRba10+fVxuICogICAgIDogVFxuICogKX0gQ2xvbmVhYmxlXG4gKiAgIERlZXAgY2xvbmUuXG4gKlxuICogICBTZWU6IDxodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQtRE9NLWxpYi1nZW5lcmF0b3IvaXNzdWVzLzEyMzcjaXNzdWVjb21tZW50LTEzNDU1MTU0NDg+XG4gKi9cblxuaW1wb3J0IHN0cnVjdHVyZWRDbG9uZSBmcm9tICdAdW5nYXAvc3RydWN0dXJlZC1jbG9uZSdcbmltcG9ydCB7aGVhZGluZ1Jhbmt9IGZyb20gJ2hhc3QtdXRpbC1oZWFkaW5nLXJhbmsnXG5pbXBvcnQge2NvbnZlcnRFbGVtZW50fSBmcm9tICdoYXN0LXV0aWwtaXMtZWxlbWVudCdcbmltcG9ydCB7U0tJUCwgdmlzaXR9IGZyb20gJ3VuaXN0LXV0aWwtdmlzaXQnXG5cbi8qKiBAdHlwZSB7RWxlbWVudH0gKi9cbmNvbnN0IGNvbnRlbnREZWZhdWx0cyA9IHtcbiAgdHlwZTogJ2VsZW1lbnQnLFxuICB0YWdOYW1lOiAnc3BhbicsXG4gIHByb3BlcnRpZXM6IHtjbGFzc05hbWU6IFsnaWNvbicsICdpY29uLWxpbmsnXX0sXG4gIGNoaWxkcmVuOiBbXVxufVxuXG4vKiogQHR5cGUge09wdGlvbnN9ICovXG5jb25zdCBlbXB0eU9wdGlvbnMgPSB7fVxuXG4vKipcbiAqIEFkZCBsaW5rcyBmcm9tIGhlYWRpbmdzIGJhY2sgdG8gdGhlbXNlbHZlcy5cbiAqXG4gKiAjIyMjIyMgTm90ZXNcbiAqXG4gKiBUaGlzIHBsdWdpbiBvbmx5IGFwcGxpZXMgdG8gaGVhZGluZ3Mgd2l0aCBgaWRgcy5cbiAqIFVzZSBgcmVoeXBlLXNsdWdgIHRvIGdlbmVyYXRlIGBpZGBzIGZvciBoZWFkaW5ncyB0aGF0IGRvbuKAmXQgaGF2ZSB0aGVtLlxuICpcbiAqIFNldmVyYWwgYmVoYXZpb3JzIGFyZSBzdXBwb3J0ZWQ6XG4gKlxuICogKiAgIGAncHJlcGVuZCdgIChkZWZhdWx0KSDigJQgaW5qZWN0IGxpbmsgYmVmb3JlIHRoZSBoZWFkaW5nIHRleHRcbiAqICogICBgJ2FwcGVuZCdgIOKAlCBpbmplY3QgbGluayBhZnRlciB0aGUgaGVhZGluZyB0ZXh0XG4gKiAqICAgYCd3cmFwJ2Ag4oCUIHdyYXAgdGhlIHdob2xlIGhlYWRpbmcgdGV4dCB3aXRoIHRoZSBsaW5rXG4gKiAqICAgYCdiZWZvcmUnYCDigJQgaW5zZXJ0IGxpbmsgYmVmb3JlIHRoZSBoZWFkaW5nXG4gKiAqICAgYCdhZnRlcidgIOKAlCBpbnNlcnQgbGluayBhZnRlciB0aGUgaGVhZGluZ1xuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHk8T3B0aW9ucz4gfCBudWxsIHwgdW5kZWZpbmVkfSBbb3B0aW9uc11cbiAqICAgQ29uZmlndXJhdGlvbiAob3B0aW9uYWwpLlxuICogQHJldHVybnNcbiAqICAgVHJhbnNmb3JtLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWh5cGVBdXRvbGlua0hlYWRpbmdzKG9wdGlvbnMpIHtcbiAgY29uc3Qgc2V0dGluZ3MgPSBvcHRpb25zIHx8IGVtcHR5T3B0aW9uc1xuICBsZXQgcHJvcGVydGllcyA9IHNldHRpbmdzLnByb3BlcnRpZXNcbiAgY29uc3QgaGVhZGluZ09yb3BlcnRpZXMgPSBzZXR0aW5ncy5oZWFkaW5nUHJvcGVydGllc1xuICBjb25zdCBiZWhhdmlvciA9IHNldHRpbmdzLmJlaGF2aW9yIHx8ICdwcmVwZW5kJ1xuICBjb25zdCBjb250ZW50ID0gc2V0dGluZ3MuY29udGVudFxuICBjb25zdCBncm91cCA9IHNldHRpbmdzLmdyb3VwXG4gIGNvbnN0IGlzID0gY29udmVydEVsZW1lbnQoc2V0dGluZ3MudGVzdClcblxuICAvKiogQHR5cGUge2ltcG9ydCgndW5pc3QtdXRpbC12aXNpdCcpLlZpc2l0b3I8RWxlbWVudD59ICovXG4gIGxldCBtZXRob2RcblxuICBpZiAoYmVoYXZpb3IgPT09ICdhZnRlcicgfHwgYmVoYXZpb3IgPT09ICdiZWZvcmUnKSB7XG4gICAgbWV0aG9kID0gYXJvdW5kXG4gIH0gZWxzZSBpZiAoYmVoYXZpb3IgPT09ICd3cmFwJykge1xuICAgIG1ldGhvZCA9IHdyYXBcbiAgfSBlbHNlIHtcbiAgICBtZXRob2QgPSBpbmplY3RcblxuICAgIGlmICghcHJvcGVydGllcykge1xuICAgICAgcHJvcGVydGllcyA9IHthcmlhSGlkZGVuOiAndHJ1ZScsIHRhYkluZGV4OiAtMX1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtLlxuICAgKlxuICAgKiBAcGFyYW0ge1Jvb3R9IHRyZWVcbiAgICogICBUcmVlLlxuICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgKiAgIE5vdGhpbmcuXG4gICAqL1xuICByZXR1cm4gZnVuY3Rpb24gKHRyZWUpIHtcbiAgICB2aXNpdCh0cmVlLCAnZWxlbWVudCcsIGZ1bmN0aW9uIChub2RlLCBpbmRleCwgcGFyZW50KSB7XG4gICAgICBpZiAoaGVhZGluZ1Jhbmsobm9kZSkgJiYgbm9kZS5wcm9wZXJ0aWVzLmlkICYmIGlzKG5vZGUsIGluZGV4LCBwYXJlbnQpKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24obm9kZS5wcm9wZXJ0aWVzLCB0b1Byb3BlcnRpZXMoaGVhZGluZ09yb3BlcnRpZXMsIG5vZGUpKVxuICAgICAgICByZXR1cm4gbWV0aG9kKG5vZGUsIGluZGV4LCBwYXJlbnQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKiBAdHlwZSB7aW1wb3J0KCd1bmlzdC11dGlsLXZpc2l0JykuVmlzaXRvcjxFbGVtZW50Pn0gKi9cbiAgZnVuY3Rpb24gaW5qZWN0KG5vZGUpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IHRvQ2hpbGRyZW4oY29udGVudCB8fCBjb250ZW50RGVmYXVsdHMsIG5vZGUpXG4gICAgbm9kZS5jaGlsZHJlbltiZWhhdmlvciA9PT0gJ3ByZXBlbmQnID8gJ3Vuc2hpZnQnIDogJ3B1c2gnXShcbiAgICAgIGNyZWF0ZShub2RlLCB0b1Byb3BlcnRpZXMocHJvcGVydGllcywgbm9kZSksIGNoaWxkcmVuKVxuICAgIClcblxuICAgIHJldHVybiBbU0tJUF1cbiAgfVxuXG4gIC8qKiBAdHlwZSB7aW1wb3J0KCd1bmlzdC11dGlsLXZpc2l0JykuVmlzaXRvcjxFbGVtZW50Pn0gKi9cbiAgZnVuY3Rpb24gYXJvdW5kKG5vZGUsIGluZGV4LCBwYXJlbnQpIHtcbiAgICAvKiBjOCBpZ25vcmUgbmV4dCAtLSB1bmNvbW1vbiAqL1xuICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInIHx8ICFwYXJlbnQpIHJldHVyblxuXG4gICAgY29uc3QgY2hpbGRyZW4gPSB0b0NoaWxkcmVuKGNvbnRlbnQgfHwgY29udGVudERlZmF1bHRzLCBub2RlKVxuICAgIGNvbnN0IGxpbmsgPSBjcmVhdGUobm9kZSwgdG9Qcm9wZXJ0aWVzKHByb3BlcnRpZXMsIG5vZGUpLCBjaGlsZHJlbilcbiAgICBsZXQgbm9kZXMgPSBiZWhhdmlvciA9PT0gJ2JlZm9yZScgPyBbbGluaywgbm9kZV0gOiBbbm9kZSwgbGlua11cblxuICAgIGlmIChncm91cCkge1xuICAgICAgY29uc3QgZ3JvdXBpbmcgPSB0b05vZGUoZ3JvdXAsIG5vZGUpXG5cbiAgICAgIGlmIChncm91cGluZyAmJiAhQXJyYXkuaXNBcnJheShncm91cGluZykgJiYgZ3JvdXBpbmcudHlwZSA9PT0gJ2VsZW1lbnQnKSB7XG4gICAgICAgIGdyb3VwaW5nLmNoaWxkcmVuID0gbm9kZXNcbiAgICAgICAgbm9kZXMgPSBbZ3JvdXBpbmddXG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSwgLi4ubm9kZXMpXG5cbiAgICByZXR1cm4gW1NLSVAsIGluZGV4ICsgbm9kZXMubGVuZ3RoXVxuICB9XG5cbiAgLyoqIEB0eXBlIHtpbXBvcnQoJ3VuaXN0LXV0aWwtdmlzaXQnKS5WaXNpdG9yPEVsZW1lbnQ+fSAqL1xuICBmdW5jdGlvbiB3cmFwKG5vZGUpIHtcbiAgICAvKiogQHR5cGUge0FycmF5PEVsZW1lbnRDb250ZW50Pn0gKi9cbiAgICBsZXQgYmVmb3JlID0gbm9kZS5jaGlsZHJlblxuICAgIC8qKiBAdHlwZSB7QXJyYXk8RWxlbWVudENvbnRlbnQ+IHwgRWxlbWVudENvbnRlbnR9ICovXG4gICAgbGV0IGFmdGVyID0gW11cblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYmVmb3JlID0gW11cbiAgICAgIGFmdGVyID0gY29udGVudChub2RlKVxuICAgIH0gZWxzZSBpZiAoY29udGVudCkge1xuICAgICAgYWZ0ZXIgPSBjbG9uZShjb250ZW50KVxuICAgIH1cblxuICAgIG5vZGUuY2hpbGRyZW4gPSBbXG4gICAgICBjcmVhdGUoXG4gICAgICAgIG5vZGUsXG4gICAgICAgIHRvUHJvcGVydGllcyhwcm9wZXJ0aWVzLCBub2RlKSxcbiAgICAgICAgQXJyYXkuaXNBcnJheShhZnRlcikgPyBbLi4uYmVmb3JlLCAuLi5hZnRlcl0gOiBbLi4uYmVmb3JlLCBhZnRlcl1cbiAgICAgIClcbiAgICBdXG5cbiAgICByZXR1cm4gW1NLSVBdXG4gIH1cbn1cblxuLyoqXG4gKiBEZWVwIGNsb25lLlxuICpcbiAqIEB0ZW1wbGF0ZSBUXG4gKiAgIEtpbmQuXG4gKiBAcGFyYW0ge1R9IHRoaW5nXG4gKiAgIFRoaW5nIHRvIGNsb25lLlxuICogQHJldHVybnMge0Nsb25lYWJsZTxUPn1cbiAqICAgQ2xvbmVkIHRoaW5nLlxuICovXG5mdW5jdGlvbiBjbG9uZSh0aGluZykge1xuICAvLyBDYXN0IGJlY2F1c2UgaXTigJlzIG11dGFibGUgbm93LlxuICByZXR1cm4gLyoqIEB0eXBlIHtDbG9uZWFibGU8VD59ICovIChzdHJ1Y3R1cmVkQ2xvbmUodGhpbmcpKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBgYWAuXG4gKlxuICogQHBhcmFtIHtSZWFkb25seTxFbGVtZW50Pn0gbm9kZVxuICogICBSZWxhdGVkIGhlYWRpbmcuXG4gKiBAcGFyYW0ge1Byb3BlcnRpZXMgfCB1bmRlZmluZWR9IHByb3BlcnRpZXNcbiAqICAgUHJvcGVydGllcyB0byBzZXQgb24gdGhlIGxpbmsuXG4gKiBAcGFyYW0ge0FycmF5PEVsZW1lbnRDb250ZW50Pn0gY2hpbGRyZW5cbiAqICAgQ29udGVudC5cbiAqIEByZXR1cm5zIHtFbGVtZW50fVxuICogICBMaW5rLlxuICovXG5mdW5jdGlvbiBjcmVhdGUobm9kZSwgcHJvcGVydGllcywgY2hpbGRyZW4pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnZWxlbWVudCcsXG4gICAgdGFnTmFtZTogJ2EnLFxuICAgIHByb3BlcnRpZXM6IHsuLi5wcm9wZXJ0aWVzLCBocmVmOiAnIycgKyBub2RlLnByb3BlcnRpZXMuaWR9LFxuICAgIGNoaWxkcmVuXG4gIH1cbn1cblxuLyoqXG4gKiBUdXJuIGludG8gY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHtSZWFkb25seTxFbGVtZW50Q29udGVudD4gfCBSZWFkb25seUFycmF5PEVsZW1lbnRDb250ZW50PiB8IEJ1aWxkfSB2YWx1ZVxuICogICBDb250ZW50LlxuICogQHBhcmFtIHtSZWFkb25seTxFbGVtZW50Pn0gbm9kZVxuICogICBSZWxhdGVkIGhlYWRpbmcuXG4gKiBAcmV0dXJucyB7QXJyYXk8RWxlbWVudENvbnRlbnQ+fVxuICogICBDaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gdG9DaGlsZHJlbih2YWx1ZSwgbm9kZSkge1xuICBjb25zdCByZXN1bHQgPSB0b05vZGUodmFsdWUsIG5vZGUpXG4gIHJldHVybiBBcnJheS5pc0FycmF5KHJlc3VsdCkgPyByZXN1bHQgOiBbcmVzdWx0XVxufVxuXG4vKipcbiAqIFR1cm4gaW50byBhIG5vZGUuXG4gKlxuICogQHBhcmFtIHtSZWFkb25seTxFbGVtZW50Q29udGVudD4gfCBSZWFkb25seUFycmF5PEVsZW1lbnRDb250ZW50PiB8IEJ1aWxkfSB2YWx1ZVxuICogICBDb250ZW50LlxuICogQHBhcmFtIHtSZWFkb25seTxFbGVtZW50Pn0gbm9kZVxuICogICBSZWxhdGVkIGhlYWRpbmcuXG4gKiBAcmV0dXJucyB7QXJyYXk8RWxlbWVudENvbnRlbnQ+IHwgRWxlbWVudENvbnRlbnR9XG4gKiAgIE5vZGUuXG4gKi9cbmZ1bmN0aW9uIHRvTm9kZSh2YWx1ZSwgbm9kZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWUobm9kZSlcbiAgcmV0dXJuIGNsb25lKHZhbHVlKVxufVxuXG4vKipcbiAqIFR1cm4gaW50byBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7UmVhZG9ubHk8UHJvcGVydGllcz4gfCBCdWlsZFByb3BlcnRpZXMgfCBudWxsIHwgdW5kZWZpbmVkfSB2YWx1ZVxuICogICBQcm9wZXJ0aWVzLlxuICogQHBhcmFtIHtSZWFkb25seTxFbGVtZW50Pn0gbm9kZVxuICogICBSZWxhdGVkIGhlYWRpbmcuXG4gKiBAcmV0dXJucyB7UHJvcGVydGllc31cbiAqICAgUHJvcGVydGllcy5cbiAqL1xuZnVuY3Rpb24gdG9Qcm9wZXJ0aWVzKHZhbHVlLCBub2RlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHJldHVybiB2YWx1ZShub2RlKVxuICByZXR1cm4gdmFsdWUgPyBjbG9uZSh2YWx1ZSkgOiB7fVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/rehype-autolink-headings/lib/index.js\n");

/***/ })

};
;