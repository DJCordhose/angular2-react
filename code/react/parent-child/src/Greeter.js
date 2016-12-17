import React from 'react';

export default class Greeter extends React.Component {
    render() {
        return (
            <div>
                <input ref="in"
                       onChange={this.updateModel.bind(this)}
                       value={this.state.greeting} />
                <p>{this.state.greeting}, World</p>
                <button
                    onClick={this.reset.bind(this)}>
                    Clear
                </button>
                <button
                    onClick={this.send.bind(this)}>
                    Send
                </button>
            </div>);
    }
    constructor(props) {
        super(props);
        this.state = {greeting: this.props.greeting};
    }

    send() {
        this.props.onSend(this.state.greeting);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({greeting: nextProps.greeting});
    }

    reset() {
        this.setState({greeting: ""});
        this.refs.in.focus();
    }
    updateModel(event) {
        this.setState({greeting: event.target.value});
    }
}
