"use strict";

var _Excel = require("./components/Excel");

var _Excel2 = _interopRequireDefault(_Excel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Павел on 16.04.2017.
 */
var data = [[1, 2, 3, 4, 12453, 2], [3, 45, 5, 63, 3, 5]],
    headers = [1, 2, 34, 5, 6, 7];


ReactDOM.render(React.createElement(_Excel2.default, { initialData: data, headers: headers }), document.getElementById("app"));