import React, { Component } from 'react';
import { FaGithubAlt, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.newRepo);
  }

  handleInputChange = e => {
    this.setState({newRepo: e.target.value})
  }

  render() {
    const {newRepo} = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositótios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
              type="text"
              placeholder="Adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
              />

          <SubmitButton>
            <FaPlus color="#FFF" size={14} />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
