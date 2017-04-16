'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Павел on 16.04.2017.
 */
var Excel = function (_React$Component) {
    _inherits(Excel, _React$Component);

    function Excel(props) {
        _classCallCheck(this, Excel);

        var _this = _possibleConstructorReturn(this, (Excel.__proto__ || Object.getPrototypeOf(Excel)).call(this, props));

        _this.displayName = "Excel";
        _this.state = {
            data: _this.props.initialData,
            sortBy: null,
            descending: false,
            search: false
        };
        _this._preSearchData = null;
        _this._log = [];
        _this._sort = _this._sort.bind(_this);
        _this._showEditor = _this._showEditor.bind(_this);
        // this._toggleSearch = this._toggleSearch.bind(this);
        _this._save = _this._save.bind(_this);
        _this._search = _this._search.bind(_this);
        _this._logSetState = _this._logSetState.bind(_this);
        return _this;
    }

    _createClass(Excel, [{
        key: '_sort',
        value: function _sort(e) {
            var column = e.target.cellIndex;
            var data = Array.from(this.state.data);
            var descending = this.state.sortBy === column && !this.state.descending;
            data.sort(function (a, b) {
                return descending ? a[column] < b[column] ? 1 : -1 : a[column] > b[column] ? 1 : -1;
            });
            this._logSetState({
                data: data,
                sortBy: column,
                descending: descending,
                edit: null
            });
        }
    }, {
        key: '_showEditor',
        value: function _showEditor(e) {
            this._logSetState({
                edit: {
                    row: parseInt(e.target.dataset.row, 10),
                    cell: e.target.cellIndex
                }
            });
        }
    }, {
        key: '_save',
        value: function _save(e) {
            e.preventDefault();
            var input = e.target.firstChild,
                data = Array.from(this.state.data);
            data[this.state.edit.row][this.state.edit.cell] = input.value;
            this._logSetState({
                edit: null,
                data: data
            });
        }
    }, {
        key: '_renderTable',
        value: function _renderTable() {
            var _this2 = this;

            return React.createElement(
                'table',
                null,
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        this.props.headers.map(function (title, id) {
                            if (_this2.state.sortBy === id) title += _this2.state.descending ? ' \u2191' : ' \u2193';
                            return React.createElement(
                                'th',
                                { key: id, onClick: _this2._sort },
                                title
                            );
                        })
                    )
                ),
                React.createElement(
                    'tbody',
                    { onDoubleClick: this._showEditor },
                    this._renderSearch(),
                    this.state.data.map(function (row, rowId) {
                        return React.createElement(
                            'tr',
                            { key: rowId },
                            row.map(function (cell, id) {
                                var content = cell,
                                    edit = _this2.state.edit;
                                if (edit && edit.row === rowId && edit.cell === id) {
                                    content = React.createElement(
                                        'form',
                                        { onSubmit: _this2._save },
                                        React.createElement('input', { type: 'text', defaultValue: content })
                                    );
                                }
                                return React.createElement(
                                    'td',
                                    { key: id, 'data-row': rowId },
                                    content
                                );
                            })
                        );
                    })
                )
            );
        }
    }, {
        key: '_renderToolbar',
        value: function _renderToolbar() {
            return React.createElement(
                'div',
                { className: 'toolbar' },
                React.createElement(
                    'button',
                    { onClick: this._toggleSearch.bind(this) },
                    'Search'
                ),
                React.createElement(
                    'a',
                    { href: 'data.json', onClick: this._download.bind(this, "json") },
                    'Export JSON'
                ),
                React.createElement(
                    'a',
                    { href: 'data.csv', onClick: this._download.bind(this, "csv") },
                    'Export CSV'
                )
            );
        }
    }, {
        key: '_download',
        value: function _download(format, ev) {
            var contents = format === "json" ? JSON.stringify(this.state.data) : this.state.data.reduce(function (result, row) {
                return result + row.reduce(function (rowResult, cell, idx) {
                    return rowResult + '"' + cell.replace(/"/g, '""') + '"' + (idx < row.length - 1 ? "," : "");
                }, "") + "\n";
            }, ""),
                URL = window.URL || window.webkitURL,
                blob = new Blob([contents], { type: 'text/' + format });
            ev.target.href = URL.createObjectURL(blob);
            ev.target.download = 'data.' + format;
        }
    }, {
        key: '_renderSearch',
        value: function _renderSearch() {
            if (!this.state.search) {
                return false;
            }
            return React.createElement(
                'tr',
                { onChange: this._search },
                this.props.headers.map(function (_ignore, id) {
                    return React.createElement(
                        'td',
                        { key: id },
                        React.createElement('input', { type: 'text', 'data-id': id })
                    );
                })
            );
        }
    }, {
        key: '_toggleSearch',
        value: function _toggleSearch() {
            if (this.state.search) {
                this._logSetState({
                    data: this._preSearchData,
                    search: false
                });
                this._preSearchData = null;
            } else {
                this._preSearchData = this.state.data;
                this._logSetState({
                    search: true
                });
            }
        }
    }, {
        key: '_search',
        value: function _search(e) {
            var needle = e.target.value.toLowerCase(),
                id = e.target.dataset.id,
                searchData = void 0;
            if (!needle) {
                this._logSetState({
                    data: this._preSearchData
                });
            }
            searchData = this._preSearchData.filter(function (row) {
                return row[id].toString().toLowerCase().indexOf(needle) > -1;
            });
            this._logSetState({
                data: searchData
            });
        }
    }, {
        key: '_logSetState',
        value: function _logSetState(newState) {
            this._log.push(JSON.parse(JSON.stringify(this._log.length === 0 ? this.state : newState)));
            this.setState(newState);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.onkeydown = function (e) {
                if (e.shiftKey && e.altKey && e.keyCode === 82) {
                    this._replay();
                }
            }.bind(this);
        }
    }, {
        key: '_replay',
        value: function _replay() {
            if (this._log.length === 0) {
                console.warn("No state ro replay yet");
                return;
            }
            var idx = -1,
                interval = setInterval(function () {
                idx++;
                if (idx === this._log.length - 1) {
                    clearInterval(interval);
                }
                this.setState(this._log[idx]);
            }.bind(this), 1000);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this._renderToolbar(),
                this._renderTable()
            );
        }
    }]);

    return Excel;
}(React.Component);

exports.default = Excel;

Excel.PropTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};