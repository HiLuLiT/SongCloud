import React from 'react';


export default class Greeting extends React.Component {

  constructor() {
    super();
    this.state = {
      counter: 0,
      isVisible: true,
      people: [
        {
          name: 'John Doe',
          kills: 0
        },
        {
          name: 'Peter Pan',
          kills: 0
        }
      ]
    }
  }

  handleClick() {
    let count = this.state.counter + 1;

    const newPeople = this.state.people.map((person) => {
      return Object.assign({}, person, {kills: count});
      });

    this.setState({
      counter: count,
      people: newPeople
    });
  }

  toggleVisible() {
    let newVisible = !this.state.isVisible;

    this.setState({
      isVisible: newVisible
    });
  }

  createPeople() {
    return (
      <ul>
        { this.state.people.map((value, index) => {
          return <li key={index}>{value.name + ' ' + value.kills}</li>
        }) }
      </ul>
    );
  }


  render() {
    let counterElm = this.state.isVisible ? <h2> Counter: {this.state.counter} </h2> : null;

    return (
      <div>
        <h2>Hey! My name is {this.props.name} and my age is {this.props.age}</h2>
        <button onClick={ () => this.handleClick() }> Click Me</button>
        <button onClick={ () => this.toggleVisible() }>Toggle View</button>
        { counterElm }
        { this.createPeople() }
      </div>
    );
  }
}
