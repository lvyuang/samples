import React, { ChangeEvent } from 'react'

class Input extends React.Component<{
  resetRef?: (fn: () => void) => void
}> {
  state = {
    value: ''
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value
    })
  }

  reset = () => {
    this.setState({
      value: ''
    })
  }

  componentDidMount () {
    this.props.resetRef && this.props.resetRef(this.reset)
  }

  render () {
    const { value } = this.state;
    return <input
      value={value}
      onChange={this.handleChange}
    />
  }
}

export default Input
