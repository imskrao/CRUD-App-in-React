import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      title: 'The Crud App',
      data: [
        {
          name: 'Santosh Rao',
          address: 'Saket, New Delhi',
          id: 1
        },
        {
          name: 'Kanika Singh',
          address: 'CP, New Delhi',
          id: 2
        }
      ],
      name: '',
      address: '',
      editInfo: ''
    }
  }

  formHandler = (event) => {
    event.preventDefault();

    if(this.state.editInfo) {
      let data = this.state.data.filter((item) => item.id !== this.state.editInfo);

      data.unshift({name: this.state.name, address: this.state.address, id: this.state.editInfo});

      this.setState({
        data
      })
    } else {
        let newData = {
        name: this.state.name,
        address: this.state.address,
        id: this.state.data.length + 1
      }

      this.setState({
        data: [...this.state.data, newData]
      })
    }



    // this.refs.crudForm.reset();
    this.setState({
      name: '',
      address: ''
    })

  }

  changeHandler = (event, type) => {
    if(type === 'text') {
      this.setState({
        name: event.target.value
      })
    } else {
      this.setState({
        address: event.target.value
      })
    }

    // console.log(this.state.name);
    // console.log(this.state.address);
  }

  editItem = (current_id) => {
    // console.log(current_id);

    let data = this.state.data.filter((item) => item.id === current_id)
    // console.log(data);
    this.setState({
      editInfo: current_id,
      name: data[0].name,
      address: data[0].address
    })

  }

  deleteItem = (current_id) => {
    let data = this.state.data.filter((item) => item.id !== current_id);

    this.setState({
      data
    })
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <form onSubmit={this.formHandler} ref="crudForm">
          <input type="text" placeholder="Your Name" value={this.state.name} onChange={(event) => this.changeHandler(event,'text')} />
          <input type="text" placeholder="Your Address" value={this.state.address} onChange={(event) => this.changeHandler(event,'address')} />
          <button type="submit">Submit</button>
        </form>
        <pre>
          {this.state.data.map((item, i) => {
            return (
              <div key={i}>
                <span>{i + 1}</span> - <span>{item.name}</span> - <span>{item.address}</span>
                <button onClick={() => this.editItem(item.id)}>Edit</button>
                <button onClick={() => this.deleteItem(item.id)}>Delete</button>
              </div>
            )
          })}
        </pre>
      </div>
    );
  }

}

export default App;
