import React from 'react';
import Greeter from './Greeter';

export default class HelloMessage extends React.Component {
    render() {
        return <Greeter greeting={this.state.greeting} onSend={(greeting) => this.sent(greeting)}/>;
    }
    constructor(props) {
        super(props);
        this.state = {greeting: this.props.greeting};
    }

    sent(greeting) {
        console.log(`Sent: ${greeting}`);
        this.setState({greeting: `${greeting}, and you!`});
    }
}
