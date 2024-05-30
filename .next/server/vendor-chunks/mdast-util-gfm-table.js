"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-gfm-table";
exports.ids = ["vendor-chunks/mdast-util-gfm-table"];
exports.modules = {

/***/ "(ssr)/./node_modules/mdast-util-gfm-table/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/mdast-util-gfm-table/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gfmTableFromMarkdown: () => (/* binding */ gfmTableFromMarkdown),\n/* harmony export */   gfmTableToMarkdown: () => (/* binding */ gfmTableToMarkdown)\n/* harmony export */ });\n/* harmony import */ var devlop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! devlop */ \"(ssr)/./node_modules/devlop/lib/development.js\");\n/* harmony import */ var markdown_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! markdown-table */ \"(ssr)/./node_modules/markdown-table/index.js\");\n/* harmony import */ var mdast_util_to_markdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mdast-util-to-markdown */ \"(ssr)/./node_modules/mdast-util-to-markdown/lib/handle/index.js\");\n/**\n * @typedef {import('mdast').InlineCode} InlineCode\n * @typedef {import('mdast').Table} Table\n * @typedef {import('mdast').TableCell} TableCell\n * @typedef {import('mdast').TableRow} TableRow\n *\n * @typedef {import('markdown-table').Options} MarkdownTableOptions\n *\n * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext\n * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension\n * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle\n *\n * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension\n * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle\n * @typedef {import('mdast-util-to-markdown').State} State\n * @typedef {import('mdast-util-to-markdown').Info} Info\n */\n\n/**\n * @typedef Options\n *   Configuration.\n * @property {boolean | null | undefined} [tableCellPadding=true]\n *   Whether to add a space of padding between delimiters and cells (default:\n *   `true`).\n * @property {boolean | null | undefined} [tablePipeAlign=true]\n *   Whether to align the delimiters (default: `true`).\n * @property {MarkdownTableOptions['stringLength'] | null | undefined} [stringLength]\n *   Function to detect the length of table cell content, used when aligning\n *   the delimiters between cells (optional).\n */\n\n\n\n\n\n/**\n * Create an extension for `mdast-util-from-markdown` to enable GFM tables in\n * markdown.\n *\n * @returns {FromMarkdownExtension}\n *   Extension for `mdast-util-from-markdown` to enable GFM tables.\n */\nfunction gfmTableFromMarkdown() {\n  return {\n    enter: {\n      table: enterTable,\n      tableData: enterCell,\n      tableHeader: enterCell,\n      tableRow: enterRow\n    },\n    exit: {\n      codeText: exitCodeText,\n      table: exitTable,\n      tableData: exit,\n      tableHeader: exit,\n      tableRow: exit\n    }\n  }\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterTable(token) {\n  const align = token._align\n  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(align, 'expected `_align` on table')\n  this.enter(\n    {\n      type: 'table',\n      align: align.map(function (d) {\n        return d === 'none' ? null : d\n      }),\n      children: []\n    },\n    token\n  )\n  this.data.inTable = true\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exitTable(token) {\n  this.exit(token)\n  this.data.inTable = undefined\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterRow(token) {\n  this.enter({type: 'tableRow', children: []}, token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exit(token) {\n  this.exit(token)\n}\n\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction enterCell(token) {\n  this.enter({type: 'tableCell', children: []}, token)\n}\n\n// Overwrite the default code text data handler to unescape escaped pipes when\n// they are in tables.\n/**\n * @this {CompileContext}\n * @type {FromMarkdownHandle}\n */\nfunction exitCodeText(token) {\n  let value = this.resume()\n\n  if (this.data.inTable) {\n    value = value.replace(/\\\\([\\\\|])/g, replace)\n  }\n\n  const node = this.stack[this.stack.length - 1]\n  ;(0,devlop__WEBPACK_IMPORTED_MODULE_0__.ok)(node.type === 'inlineCode')\n  node.value = value\n  this.exit(token)\n}\n\n/**\n * @param {string} $0\n * @param {string} $1\n * @returns {string}\n */\nfunction replace($0, $1) {\n  // Pipes work, backslashes don’t (but can’t escape pipes).\n  return $1 === '|' ? $1 : $0\n}\n\n/**\n * Create an extension for `mdast-util-to-markdown` to enable GFM tables in\n * markdown.\n *\n * @param {Options | null | undefined} [options]\n *   Configuration.\n * @returns {ToMarkdownExtension}\n *   Extension for `mdast-util-to-markdown` to enable GFM tables.\n */\nfunction gfmTableToMarkdown(options) {\n  const settings = options || {}\n  const padding = settings.tableCellPadding\n  const alignDelimiters = settings.tablePipeAlign\n  const stringLength = settings.stringLength\n  const around = padding ? ' ' : '|'\n\n  return {\n    unsafe: [\n      {character: '\\r', inConstruct: 'tableCell'},\n      {character: '\\n', inConstruct: 'tableCell'},\n      // A pipe, when followed by a tab or space (padding), or a dash or colon\n      // (unpadded delimiter row), could result in a table.\n      {atBreak: true, character: '|', after: '[\\t :-]'},\n      // A pipe in a cell must be encoded.\n      {character: '|', inConstruct: 'tableCell'},\n      // A colon must be followed by a dash, in which case it could start a\n      // delimiter row.\n      {atBreak: true, character: ':', after: '-'},\n      // A delimiter row can also start with a dash, when followed by more\n      // dashes, a colon, or a pipe.\n      // This is a stricter version than the built in check for lists, thematic\n      // breaks, and setex heading underlines though:\n      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>\n      {atBreak: true, character: '-', after: '[:|-]'}\n    ],\n    handlers: {\n      inlineCode: inlineCodeWithTable,\n      table: handleTable,\n      tableCell: handleTableCell,\n      tableRow: handleTableRow\n    }\n  }\n\n  /**\n   * @type {ToMarkdownHandle}\n   * @param {Table} node\n   */\n  function handleTable(node, _, state, info) {\n    return serializeData(handleTableAsData(node, state, info), node.align)\n  }\n\n  /**\n   * This function isn’t really used normally, because we handle rows at the\n   * table level.\n   * But, if someone passes in a table row, this ensures we make somewhat sense.\n   *\n   * @type {ToMarkdownHandle}\n   * @param {TableRow} node\n   */\n  function handleTableRow(node, _, state, info) {\n    const row = handleTableRowAsData(node, state, info)\n    const value = serializeData([row])\n    // `markdown-table` will always add an align row\n    return value.slice(0, value.indexOf('\\n'))\n  }\n\n  /**\n   * @type {ToMarkdownHandle}\n   * @param {TableCell} node\n   */\n  function handleTableCell(node, _, state, info) {\n    const exit = state.enter('tableCell')\n    const subexit = state.enter('phrasing')\n    const value = state.containerPhrasing(node, {\n      ...info,\n      before: around,\n      after: around\n    })\n    subexit()\n    exit()\n    return value\n  }\n\n  /**\n   * @param {Array<Array<string>>} matrix\n   * @param {Array<string | null | undefined> | null | undefined} [align]\n   */\n  function serializeData(matrix, align) {\n    return (0,markdown_table__WEBPACK_IMPORTED_MODULE_1__.markdownTable)(matrix, {\n      align,\n      // @ts-expect-error: `markdown-table` types should support `null`.\n      alignDelimiters,\n      // @ts-expect-error: `markdown-table` types should support `null`.\n      padding,\n      // @ts-expect-error: `markdown-table` types should support `null`.\n      stringLength\n    })\n  }\n\n  /**\n   * @param {Table} node\n   * @param {State} state\n   * @param {Info} info\n   */\n  function handleTableAsData(node, state, info) {\n    const children = node.children\n    let index = -1\n    /** @type {Array<Array<string>>} */\n    const result = []\n    const subexit = state.enter('table')\n\n    while (++index < children.length) {\n      result[index] = handleTableRowAsData(children[index], state, info)\n    }\n\n    subexit()\n\n    return result\n  }\n\n  /**\n   * @param {TableRow} node\n   * @param {State} state\n   * @param {Info} info\n   */\n  function handleTableRowAsData(node, state, info) {\n    const children = node.children\n    let index = -1\n    /** @type {Array<string>} */\n    const result = []\n    const subexit = state.enter('tableRow')\n\n    while (++index < children.length) {\n      // Note: the positional info as used here is incorrect.\n      // Making it correct would be impossible due to aligning cells?\n      // And it would need copy/pasting `markdown-table` into this project.\n      result[index] = handleTableCell(children[index], node, state, info)\n    }\n\n    subexit()\n\n    return result\n  }\n\n  /**\n   * @type {ToMarkdownHandle}\n   * @param {InlineCode} node\n   */\n  function inlineCodeWithTable(node, parent, state) {\n    let value = mdast_util_to_markdown__WEBPACK_IMPORTED_MODULE_2__.handle.inlineCode(node, parent, state)\n\n    if (state.stack.includes('tableCell')) {\n      value = value.replace(/\\|/g, '\\\\$&')\n    }\n\n    return value\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1nZm0tdGFibGUvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxhQUFhLDRCQUE0QjtBQUN6QyxhQUFhLHVCQUF1QjtBQUNwQyxhQUFhLDJCQUEyQjtBQUN4QyxhQUFhLDBCQUEwQjtBQUN2QztBQUNBLGFBQWEsa0NBQWtDO0FBQy9DO0FBQ0EsYUFBYSxtREFBbUQ7QUFDaEUsYUFBYSw4Q0FBOEM7QUFDM0QsYUFBYSwyQ0FBMkM7QUFDeEQ7QUFDQSxhQUFhLDBDQUEwQztBQUN2RCxhQUFhLHlDQUF5QztBQUN0RCxhQUFhLHdDQUF3QztBQUNyRCxhQUFhLHVDQUF1QztBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0EsY0FBYyw0QkFBNEI7QUFDMUM7QUFDQSxjQUFjLHlEQUF5RDtBQUN2RTtBQUNBO0FBQ0E7O0FBRW1DO0FBQ1M7QUFDVTs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBTTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQSxjQUFjLCtCQUErQjtBQUM3Qzs7QUFFQTtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQSxjQUFjLGdDQUFnQztBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLDJDQUFNO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNEJBQTRCO0FBQ3ZDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU8sMENBQTBDO0FBQ2pELE9BQU8sMENBQTBDO0FBQ2pEO0FBQ0E7QUFDQSxPQUFPLGdEQUFnRDtBQUN2RDtBQUNBLE9BQU8seUNBQXlDO0FBQ2hEO0FBQ0E7QUFDQSxPQUFPLDBDQUEwQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1osYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaLGFBQWEsV0FBVztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxzQkFBc0I7QUFDbkMsYUFBYSxxREFBcUQ7QUFDbEU7QUFDQTtBQUNBLFdBQVcsNkRBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0EsZ0JBQWdCLDBEQUFlOztBQUUvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1ib2FyZC8uL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLWdmbS10YWJsZS9saWIvaW5kZXguanM/YzUxYyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuSW5saW5lQ29kZX0gSW5saW5lQ29kZVxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5UYWJsZX0gVGFibGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuVGFibGVDZWxsfSBUYWJsZUNlbGxcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuVGFibGVSb3d9IFRhYmxlUm93XG4gKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWFya2Rvd24tdGFibGUnKS5PcHRpb25zfSBNYXJrZG93blRhYmxlT3B0aW9uc1xuICpcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtZnJvbS1tYXJrZG93bicpLkNvbXBpbGVDb250ZXh0fSBDb21waWxlQ29udGV4dFxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duJykuRXh0ZW5zaW9ufSBGcm9tTWFya2Rvd25FeHRlbnNpb25cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtZnJvbS1tYXJrZG93bicpLkhhbmRsZX0gRnJvbU1hcmtkb3duSGFuZGxlXG4gKlxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QtdXRpbC10by1tYXJrZG93bicpLk9wdGlvbnN9IFRvTWFya2Rvd25FeHRlbnNpb25cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtdG8tbWFya2Rvd24nKS5IYW5kbGV9IFRvTWFya2Rvd25IYW5kbGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtdG8tbWFya2Rvd24nKS5TdGF0ZX0gU3RhdGVcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0LXV0aWwtdG8tbWFya2Rvd24nKS5JbmZvfSBJbmZvXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiBPcHRpb25zXG4gKiAgIENvbmZpZ3VyYXRpb24uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkfSBbdGFibGVDZWxsUGFkZGluZz10cnVlXVxuICogICBXaGV0aGVyIHRvIGFkZCBhIHNwYWNlIG9mIHBhZGRpbmcgYmV0d2VlbiBkZWxpbWl0ZXJzIGFuZCBjZWxscyAoZGVmYXVsdDpcbiAqICAgYHRydWVgKS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFt0YWJsZVBpcGVBbGlnbj10cnVlXVxuICogICBXaGV0aGVyIHRvIGFsaWduIHRoZSBkZWxpbWl0ZXJzIChkZWZhdWx0OiBgdHJ1ZWApLlxuICogQHByb3BlcnR5IHtNYXJrZG93blRhYmxlT3B0aW9uc1snc3RyaW5nTGVuZ3RoJ10gfCBudWxsIHwgdW5kZWZpbmVkfSBbc3RyaW5nTGVuZ3RoXVxuICogICBGdW5jdGlvbiB0byBkZXRlY3QgdGhlIGxlbmd0aCBvZiB0YWJsZSBjZWxsIGNvbnRlbnQsIHVzZWQgd2hlbiBhbGlnbmluZ1xuICogICB0aGUgZGVsaW1pdGVycyBiZXR3ZWVuIGNlbGxzIChvcHRpb25hbCkuXG4gKi9cblxuaW1wb3J0IHtvayBhcyBhc3NlcnR9IGZyb20gJ2RldmxvcCdcbmltcG9ydCB7bWFya2Rvd25UYWJsZX0gZnJvbSAnbWFya2Rvd24tdGFibGUnXG5pbXBvcnQge2RlZmF1bHRIYW5kbGVyc30gZnJvbSAnbWRhc3QtdXRpbC10by1tYXJrZG93bidcblxuLyoqXG4gKiBDcmVhdGUgYW4gZXh0ZW5zaW9uIGZvciBgbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIHRhYmxlcyBpblxuICogbWFya2Rvd24uXG4gKlxuICogQHJldHVybnMge0Zyb21NYXJrZG93bkV4dGVuc2lvbn1cbiAqICAgRXh0ZW5zaW9uIGZvciBgbWRhc3QtdXRpbC1mcm9tLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIHRhYmxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdmbVRhYmxlRnJvbU1hcmtkb3duKCkge1xuICByZXR1cm4ge1xuICAgIGVudGVyOiB7XG4gICAgICB0YWJsZTogZW50ZXJUYWJsZSxcbiAgICAgIHRhYmxlRGF0YTogZW50ZXJDZWxsLFxuICAgICAgdGFibGVIZWFkZXI6IGVudGVyQ2VsbCxcbiAgICAgIHRhYmxlUm93OiBlbnRlclJvd1xuICAgIH0sXG4gICAgZXhpdDoge1xuICAgICAgY29kZVRleHQ6IGV4aXRDb2RlVGV4dCxcbiAgICAgIHRhYmxlOiBleGl0VGFibGUsXG4gICAgICB0YWJsZURhdGE6IGV4aXQsXG4gICAgICB0YWJsZUhlYWRlcjogZXhpdCxcbiAgICAgIHRhYmxlUm93OiBleGl0XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQHRoaXMge0NvbXBpbGVDb250ZXh0fVxuICogQHR5cGUge0Zyb21NYXJrZG93bkhhbmRsZX1cbiAqL1xuZnVuY3Rpb24gZW50ZXJUYWJsZSh0b2tlbikge1xuICBjb25zdCBhbGlnbiA9IHRva2VuLl9hbGlnblxuICBhc3NlcnQoYWxpZ24sICdleHBlY3RlZCBgX2FsaWduYCBvbiB0YWJsZScpXG4gIHRoaXMuZW50ZXIoXG4gICAge1xuICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgIGFsaWduOiBhbGlnbi5tYXAoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQgPT09ICdub25lJyA/IG51bGwgOiBkXG4gICAgICB9KSxcbiAgICAgIGNoaWxkcmVuOiBbXVxuICAgIH0sXG4gICAgdG9rZW5cbiAgKVxuICB0aGlzLmRhdGEuaW5UYWJsZSA9IHRydWVcbn1cblxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duSGFuZGxlfVxuICovXG5mdW5jdGlvbiBleGl0VGFibGUodG9rZW4pIHtcbiAgdGhpcy5leGl0KHRva2VuKVxuICB0aGlzLmRhdGEuaW5UYWJsZSA9IHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEB0aGlzIHtDb21waWxlQ29udGV4dH1cbiAqIEB0eXBlIHtGcm9tTWFya2Rvd25IYW5kbGV9XG4gKi9cbmZ1bmN0aW9uIGVudGVyUm93KHRva2VuKSB7XG4gIHRoaXMuZW50ZXIoe3R5cGU6ICd0YWJsZVJvdycsIGNoaWxkcmVuOiBbXX0sIHRva2VuKVxufVxuXG4vKipcbiAqIEB0aGlzIHtDb21waWxlQ29udGV4dH1cbiAqIEB0eXBlIHtGcm9tTWFya2Rvd25IYW5kbGV9XG4gKi9cbmZ1bmN0aW9uIGV4aXQodG9rZW4pIHtcbiAgdGhpcy5leGl0KHRva2VuKVxufVxuXG4vKipcbiAqIEB0aGlzIHtDb21waWxlQ29udGV4dH1cbiAqIEB0eXBlIHtGcm9tTWFya2Rvd25IYW5kbGV9XG4gKi9cbmZ1bmN0aW9uIGVudGVyQ2VsbCh0b2tlbikge1xuICB0aGlzLmVudGVyKHt0eXBlOiAndGFibGVDZWxsJywgY2hpbGRyZW46IFtdfSwgdG9rZW4pXG59XG5cbi8vIE92ZXJ3cml0ZSB0aGUgZGVmYXVsdCBjb2RlIHRleHQgZGF0YSBoYW5kbGVyIHRvIHVuZXNjYXBlIGVzY2FwZWQgcGlwZXMgd2hlblxuLy8gdGhleSBhcmUgaW4gdGFibGVzLlxuLyoqXG4gKiBAdGhpcyB7Q29tcGlsZUNvbnRleHR9XG4gKiBAdHlwZSB7RnJvbU1hcmtkb3duSGFuZGxlfVxuICovXG5mdW5jdGlvbiBleGl0Q29kZVRleHQodG9rZW4pIHtcbiAgbGV0IHZhbHVlID0gdGhpcy5yZXN1bWUoKVxuXG4gIGlmICh0aGlzLmRhdGEuaW5UYWJsZSkge1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxcXChbXFxcXHxdKS9nLCByZXBsYWNlKVxuICB9XG5cbiAgY29uc3Qgbm9kZSA9IHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSAxXVxuICBhc3NlcnQobm9kZS50eXBlID09PSAnaW5saW5lQ29kZScpXG4gIG5vZGUudmFsdWUgPSB2YWx1ZVxuICB0aGlzLmV4aXQodG9rZW4pXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9ICQwXG4gKiBAcGFyYW0ge3N0cmluZ30gJDFcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHJlcGxhY2UoJDAsICQxKSB7XG4gIC8vIFBpcGVzIHdvcmssIGJhY2tzbGFzaGVzIGRvbuKAmXQgKGJ1dCBjYW7igJl0IGVzY2FwZSBwaXBlcykuXG4gIHJldHVybiAkMSA9PT0gJ3wnID8gJDEgOiAkMFxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBleHRlbnNpb24gZm9yIGBtZGFzdC11dGlsLXRvLW1hcmtkb3duYCB0byBlbmFibGUgR0ZNIHRhYmxlcyBpblxuICogbWFya2Rvd24uXG4gKlxuICogQHBhcmFtIHtPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZH0gW29wdGlvbnNdXG4gKiAgIENvbmZpZ3VyYXRpb24uXG4gKiBAcmV0dXJucyB7VG9NYXJrZG93bkV4dGVuc2lvbn1cbiAqICAgRXh0ZW5zaW9uIGZvciBgbWRhc3QtdXRpbC10by1tYXJrZG93bmAgdG8gZW5hYmxlIEdGTSB0YWJsZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZm1UYWJsZVRvTWFya2Rvd24ob3B0aW9ucykge1xuICBjb25zdCBzZXR0aW5ncyA9IG9wdGlvbnMgfHwge31cbiAgY29uc3QgcGFkZGluZyA9IHNldHRpbmdzLnRhYmxlQ2VsbFBhZGRpbmdcbiAgY29uc3QgYWxpZ25EZWxpbWl0ZXJzID0gc2V0dGluZ3MudGFibGVQaXBlQWxpZ25cbiAgY29uc3Qgc3RyaW5nTGVuZ3RoID0gc2V0dGluZ3Muc3RyaW5nTGVuZ3RoXG4gIGNvbnN0IGFyb3VuZCA9IHBhZGRpbmcgPyAnICcgOiAnfCdcblxuICByZXR1cm4ge1xuICAgIHVuc2FmZTogW1xuICAgICAge2NoYXJhY3RlcjogJ1xccicsIGluQ29uc3RydWN0OiAndGFibGVDZWxsJ30sXG4gICAgICB7Y2hhcmFjdGVyOiAnXFxuJywgaW5Db25zdHJ1Y3Q6ICd0YWJsZUNlbGwnfSxcbiAgICAgIC8vIEEgcGlwZSwgd2hlbiBmb2xsb3dlZCBieSBhIHRhYiBvciBzcGFjZSAocGFkZGluZyksIG9yIGEgZGFzaCBvciBjb2xvblxuICAgICAgLy8gKHVucGFkZGVkIGRlbGltaXRlciByb3cpLCBjb3VsZCByZXN1bHQgaW4gYSB0YWJsZS5cbiAgICAgIHthdEJyZWFrOiB0cnVlLCBjaGFyYWN0ZXI6ICd8JywgYWZ0ZXI6ICdbXFx0IDotXSd9LFxuICAgICAgLy8gQSBwaXBlIGluIGEgY2VsbCBtdXN0IGJlIGVuY29kZWQuXG4gICAgICB7Y2hhcmFjdGVyOiAnfCcsIGluQ29uc3RydWN0OiAndGFibGVDZWxsJ30sXG4gICAgICAvLyBBIGNvbG9uIG11c3QgYmUgZm9sbG93ZWQgYnkgYSBkYXNoLCBpbiB3aGljaCBjYXNlIGl0IGNvdWxkIHN0YXJ0IGFcbiAgICAgIC8vIGRlbGltaXRlciByb3cuXG4gICAgICB7YXRCcmVhazogdHJ1ZSwgY2hhcmFjdGVyOiAnOicsIGFmdGVyOiAnLSd9LFxuICAgICAgLy8gQSBkZWxpbWl0ZXIgcm93IGNhbiBhbHNvIHN0YXJ0IHdpdGggYSBkYXNoLCB3aGVuIGZvbGxvd2VkIGJ5IG1vcmVcbiAgICAgIC8vIGRhc2hlcywgYSBjb2xvbiwgb3IgYSBwaXBlLlxuICAgICAgLy8gVGhpcyBpcyBhIHN0cmljdGVyIHZlcnNpb24gdGhhbiB0aGUgYnVpbHQgaW4gY2hlY2sgZm9yIGxpc3RzLCB0aGVtYXRpY1xuICAgICAgLy8gYnJlYWtzLCBhbmQgc2V0ZXggaGVhZGluZyB1bmRlcmxpbmVzIHRob3VnaDpcbiAgICAgIC8vIDxodHRwczovL2dpdGh1Yi5jb20vc3ludGF4LXRyZWUvbWRhc3QtdXRpbC10by1tYXJrZG93bi9ibG9iLzUxYTIwMzgvbGliL3Vuc2FmZS5qcyNMNTc+XG4gICAgICB7YXRCcmVhazogdHJ1ZSwgY2hhcmFjdGVyOiAnLScsIGFmdGVyOiAnWzp8LV0nfVxuICAgIF0sXG4gICAgaGFuZGxlcnM6IHtcbiAgICAgIGlubGluZUNvZGU6IGlubGluZUNvZGVXaXRoVGFibGUsXG4gICAgICB0YWJsZTogaGFuZGxlVGFibGUsXG4gICAgICB0YWJsZUNlbGw6IGhhbmRsZVRhYmxlQ2VsbCxcbiAgICAgIHRhYmxlUm93OiBoYW5kbGVUYWJsZVJvd1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7VG9NYXJrZG93bkhhbmRsZX1cbiAgICogQHBhcmFtIHtUYWJsZX0gbm9kZVxuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlVGFibGUobm9kZSwgXywgc3RhdGUsIGluZm8pIHtcbiAgICByZXR1cm4gc2VyaWFsaXplRGF0YShoYW5kbGVUYWJsZUFzRGF0YShub2RlLCBzdGF0ZSwgaW5mbyksIG5vZGUuYWxpZ24pXG4gIH1cblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBpc27igJl0IHJlYWxseSB1c2VkIG5vcm1hbGx5LCBiZWNhdXNlIHdlIGhhbmRsZSByb3dzIGF0IHRoZVxuICAgKiB0YWJsZSBsZXZlbC5cbiAgICogQnV0LCBpZiBzb21lb25lIHBhc3NlcyBpbiBhIHRhYmxlIHJvdywgdGhpcyBlbnN1cmVzIHdlIG1ha2Ugc29tZXdoYXQgc2Vuc2UuXG4gICAqXG4gICAqIEB0eXBlIHtUb01hcmtkb3duSGFuZGxlfVxuICAgKiBAcGFyYW0ge1RhYmxlUm93fSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVUYWJsZVJvdyhub2RlLCBfLCBzdGF0ZSwgaW5mbykge1xuICAgIGNvbnN0IHJvdyA9IGhhbmRsZVRhYmxlUm93QXNEYXRhKG5vZGUsIHN0YXRlLCBpbmZvKVxuICAgIGNvbnN0IHZhbHVlID0gc2VyaWFsaXplRGF0YShbcm93XSlcbiAgICAvLyBgbWFya2Rvd24tdGFibGVgIHdpbGwgYWx3YXlzIGFkZCBhbiBhbGlnbiByb3dcbiAgICByZXR1cm4gdmFsdWUuc2xpY2UoMCwgdmFsdWUuaW5kZXhPZignXFxuJykpXG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge1RvTWFya2Rvd25IYW5kbGV9XG4gICAqIEBwYXJhbSB7VGFibGVDZWxsfSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVUYWJsZUNlbGwobm9kZSwgXywgc3RhdGUsIGluZm8pIHtcbiAgICBjb25zdCBleGl0ID0gc3RhdGUuZW50ZXIoJ3RhYmxlQ2VsbCcpXG4gICAgY29uc3Qgc3ViZXhpdCA9IHN0YXRlLmVudGVyKCdwaHJhc2luZycpXG4gICAgY29uc3QgdmFsdWUgPSBzdGF0ZS5jb250YWluZXJQaHJhc2luZyhub2RlLCB7XG4gICAgICAuLi5pbmZvLFxuICAgICAgYmVmb3JlOiBhcm91bmQsXG4gICAgICBhZnRlcjogYXJvdW5kXG4gICAgfSlcbiAgICBzdWJleGl0KClcbiAgICBleGl0KClcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0FycmF5PEFycmF5PHN0cmluZz4+fSBtYXRyaXhcbiAgICogQHBhcmFtIHtBcnJheTxzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkPiB8IG51bGwgfCB1bmRlZmluZWR9IFthbGlnbl1cbiAgICovXG4gIGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGEobWF0cml4LCBhbGlnbikge1xuICAgIHJldHVybiBtYXJrZG93blRhYmxlKG1hdHJpeCwge1xuICAgICAgYWxpZ24sXG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yOiBgbWFya2Rvd24tdGFibGVgIHR5cGVzIHNob3VsZCBzdXBwb3J0IGBudWxsYC5cbiAgICAgIGFsaWduRGVsaW1pdGVycyxcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3I6IGBtYXJrZG93bi10YWJsZWAgdHlwZXMgc2hvdWxkIHN1cHBvcnQgYG51bGxgLlxuICAgICAgcGFkZGluZyxcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3I6IGBtYXJrZG93bi10YWJsZWAgdHlwZXMgc2hvdWxkIHN1cHBvcnQgYG51bGxgLlxuICAgICAgc3RyaW5nTGVuZ3RoXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1RhYmxlfSBub2RlXG4gICAqIEBwYXJhbSB7U3RhdGV9IHN0YXRlXG4gICAqIEBwYXJhbSB7SW5mb30gaW5mb1xuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlVGFibGVBc0RhdGEobm9kZSwgc3RhdGUsIGluZm8pIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW5cbiAgICBsZXQgaW5kZXggPSAtMVxuICAgIC8qKiBAdHlwZSB7QXJyYXk8QXJyYXk8c3RyaW5nPj59ICovXG4gICAgY29uc3QgcmVzdWx0ID0gW11cbiAgICBjb25zdCBzdWJleGl0ID0gc3RhdGUuZW50ZXIoJ3RhYmxlJylcblxuICAgIHdoaWxlICgrK2luZGV4IDwgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gaGFuZGxlVGFibGVSb3dBc0RhdGEoY2hpbGRyZW5baW5kZXhdLCBzdGF0ZSwgaW5mbylcbiAgICB9XG5cbiAgICBzdWJleGl0KClcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1RhYmxlUm93fSBub2RlXG4gICAqIEBwYXJhbSB7U3RhdGV9IHN0YXRlXG4gICAqIEBwYXJhbSB7SW5mb30gaW5mb1xuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlVGFibGVSb3dBc0RhdGEobm9kZSwgc3RhdGUsIGluZm8pIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW5cbiAgICBsZXQgaW5kZXggPSAtMVxuICAgIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgICBjb25zdCByZXN1bHQgPSBbXVxuICAgIGNvbnN0IHN1YmV4aXQgPSBzdGF0ZS5lbnRlcigndGFibGVSb3cnKVxuXG4gICAgd2hpbGUgKCsraW5kZXggPCBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIC8vIE5vdGU6IHRoZSBwb3NpdGlvbmFsIGluZm8gYXMgdXNlZCBoZXJlIGlzIGluY29ycmVjdC5cbiAgICAgIC8vIE1ha2luZyBpdCBjb3JyZWN0IHdvdWxkIGJlIGltcG9zc2libGUgZHVlIHRvIGFsaWduaW5nIGNlbGxzP1xuICAgICAgLy8gQW5kIGl0IHdvdWxkIG5lZWQgY29weS9wYXN0aW5nIGBtYXJrZG93bi10YWJsZWAgaW50byB0aGlzIHByb2plY3QuXG4gICAgICByZXN1bHRbaW5kZXhdID0gaGFuZGxlVGFibGVDZWxsKGNoaWxkcmVuW2luZGV4XSwgbm9kZSwgc3RhdGUsIGluZm8pXG4gICAgfVxuXG4gICAgc3ViZXhpdCgpXG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge1RvTWFya2Rvd25IYW5kbGV9XG4gICAqIEBwYXJhbSB7SW5saW5lQ29kZX0gbm9kZVxuICAgKi9cbiAgZnVuY3Rpb24gaW5saW5lQ29kZVdpdGhUYWJsZShub2RlLCBwYXJlbnQsIHN0YXRlKSB7XG4gICAgbGV0IHZhbHVlID0gZGVmYXVsdEhhbmRsZXJzLmlubGluZUNvZGUobm9kZSwgcGFyZW50LCBzdGF0ZSlcblxuICAgIGlmIChzdGF0ZS5zdGFjay5pbmNsdWRlcygndGFibGVDZWxsJykpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFx8L2csICdcXFxcJCYnKVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mdast-util-gfm-table/lib/index.js\n");

/***/ })

};
;