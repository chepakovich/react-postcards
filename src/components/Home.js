import React, { Component } from 'react'
import SelectAddress from './SelectAddress'
import base64 from 'base-64'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      query: '',
      addresses: [],
      addressTo: '',
      addressFrom: '',
      submitted: false,
    };
  }

  fetchAddresses = (query) => {
    const type = 'addresses'
    let headers = new Headers();
    const apiKey = 'test_8ddaad35dc02260ae8a4e6e33d9f3ade7ae:'
    headers.append('Authorization', 'Basic ' + base64.encode(apiKey))
    const url = `https://api.lob.com/v1/search?q=${query}&types=${type}`
    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(resp => resp.json())
      .then(json => {
        this.setState({ addresses: json.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChangeDescription = (event) => {
    this.setState({ description: event.target.value })
  }

  handleChangeTo = (event) => {
    const query = event.target.value
    if (query.length > 3) {
      this.fetchAddresses(query)
      this.setState({ query })
    } else {
      this.setState({ query, addresses: '' })
    }
  }

  handleSelect = (addressId) => {
    this.setState({ addressTo: addressId })
  }

  reset = (cat) => {
    if (cat === 'to') {
      this.setState({ addressTo: '' })
    }
    else if (cat === 'from') {
      this.setState({ addressFrom: '' })
    }
  }

  handleChangeFrom = (event) => {
    this.setState({ addressFrom: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true })
  }

  render() {
    const { description, query, addresses, addressTo, addressFrom, submitted } = this.state
    let notReadyToSubmit = true
    if (description && (query || addressTo) && addressFrom) {
      notReadyToSubmit = false
    }
    return (
      !submitted ?
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Description:</label>
            <input type="text" value={description} onChange={this.handleChangeDescription} />
          </div>
          <div className="form-group">
            <label>To:</label>
            {!addressTo ?
              <input type="text" required value={query} onChange={this.handleChangeTo} />
              : null}
            {addresses.length > 0 ?
              <SelectAddress addresses={addresses} addressId={addressTo} handleSelect={this.handleSelect} reset={this.reset} cat={'to'} />
              : null
            }
          </div>
          <div className="form-group">
            <label>From:</label>
            <input type="text" value={addressFrom} onChange={this.handleChangeFrom} />
          </div>
          <div className="form-group">
            <input type="text" required value="https://s3-us-west-2.amazonaws.com/lob-assets/4x6_pc_front_ex.pdf" />
          </div>
          <div className="form-group">
            <input type="text" required value="https://s3-us-west-2.amazonaws.com/lob-assets/4x6_pc_back_ex.pdf" />
          </div>
          <input className="btn" type="submit" disabled={notReadyToSubmit} value="Submit" />
        </form>
        : <p>The form has been submitted</p>
    )
  }
}

export default Home
