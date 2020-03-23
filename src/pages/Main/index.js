/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, SubmitButton, List, Input, Empty } from './styles';
import Container from '../../components/Container';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    empty: true,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories), empty: false });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    const { newRepo, repositories } = this.state;

    try {
      repositories.forEach(f => {
        if (f.name === newRepo) throw new Error('Repositório duplicado');
      });
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        error: false,
        empty: false,
      });
    } catch (err) {
      toast.error('Repositorio do GitHub Não Encontrado, verifique a URL');
      this.setState({ loading: false, error: true });
    }
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  render() {
    const { newRepo, loading, repositories, error, empty } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
            error={error}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        {empty ? (
          <Empty>
            <p>
              Para Adicionar um repositorio digite:
              usuarioGitHub/nomeDoRepositorio e clique em detalhes para
              localizar sua lista de Issues
            </p>
          </Empty>
        ) : (
          <List>
            {repositories.map(repository => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  {' '}
                  Detalhes
                </Link>
              </li>
            ))}
          </List>
        )}
      </Container>
    );
  }
}
