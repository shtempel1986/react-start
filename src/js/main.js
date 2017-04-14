/**
 * Created by Павел on 10.04.2017.
 */
class Header extends React.Component {
    render() {
        return React.createElement(
            "h2",
            { id: "my-heading", className: "pretty", htmlFor: "me" },
            React.createElement(
                "span",
                null,
                React.createElement(
                    "em",
                    null,
                    "Hell"
                ),
                "o"
            ),
            " world"
        );
    }
}

class Question extends React.Component {
    render() {
        return React.createElement(
            "span",
            null,
            this.props.question,
            " "
        );
    }
}

class Component extends React.Component {

    render() {
        return React.createElement(
            "span",
            null,
            "My name is ",
            this.props.name
        );
    }
}

function LogMixin(ComposedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this._log = this._log.bind(this);
            name = "logMixin";
        }

        _log(methodName, args) {
            console.log(`${this.name}::${methodName}`, args);
        }

        componentWillUpdate() {
            this._log("componentWillUpdate", arguments);
        }

        componentDidUpdate() {
            this._log("componentDidUpdate", arguments);
        }

        componentWillMount() {
            this._log("componentWillMount", arguments);
        }

        componentDidMount() {
            this._log("componentDidMount", arguments);
        }

        render() {
            return React.createElement(ComposedComponent, this.props);
        }
    };
}
class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.name = "Counter";
    }

    shouldComponentUpdate(nextProps, nextState_ignore) {
        return nextProps.number !== this.props.number;
    }

    render() {
        console.log(`${this.name}:: render()`);
        return React.createElement(
            "span",
            null,
            this.props.number
        );
    }
}

class TextAreaCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.value
        };
        this._textChange = this._textChange.bind(this);
    }

    _textChange(event) {
        this.setState({ text: event.target.value });
    }

    render() {
        let counter = null;
        if (this.state.text.length > 0) {
            counter = this.state.text.length;
        }
        return React.createElement(
            "div",
            null,
            React.createElement("textarea", { name: "area", id: "", cols: "30", rows: "10",
                value: this.state.text,
                onChange: this._textChange }),
            React.createElement(
                "h3",
                null,
                React.createElement(Counter, { number: counter })
            )
        );
    }
}

Counter.propTypes = {
    number: PropTypes.number.isRequired
};

Component.propTypes = {
    name: PropTypes.string.isRequired
};

Component.defaultProps = {
    name: "Nameless"
};

let myComponent = ReactDOM.render(
//  <div>
//    <Question question="What is your name? "/>
//  <Component name="Walter"/>
React.createElement(TextAreaCounter, { value: "David" })
// </div>
, document.getElementById("root"));
if (myComponent.props.value === "David") myComponent.setState({ text: "Hello, David, from outer space" });else console.log(myComponent.state, myComponent.props);