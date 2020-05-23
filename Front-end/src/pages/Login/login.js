import React, { useState, useEffect } from 'react';
import { Container, FormGroup, Form, Input, Col, Button } from "reactstrap";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { FaBeer } from 'react-icons/fa';
import styled from 'styled-components';

import axios from '../../services/api';

export default function Login() {

  const MySwal = withReactContent(Swal)
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState(123456789);

  useEffect(() => {
    if (localStorage.getItem("jwt-token")) {
      history.push("/home");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    MySwal.fire({
      icon: "info",
      title: "Aguarde",
      text: "Validando dados...",
      allowEscapeKey: false,
      allowOutsideClick: false,
    });

    MySwal.showLoading()

    const response = await axios.post('auth/login', {
      email: email,
      password: password
    });

    MySwal.close();

    if (response.data.error !== undefined && response.data.error === true) {
      MySwal.fire({
        icon: 'error',
        title: "Ocorreu um erro :(",
        text: response.data.message,
      })
    } else {
      localStorage.setItem('jwt-token', response.data.access_token);
      history.push('/home');
    }

  }

  return (
    <>
      <Body>
        <Container>
          <Form onSubmit={handleSubmit} className="pt-9">
            <Col className="col-md-6 m-auto">
              <h3 className="mb-5">Sotero Systems <FaBeer /> </h3>
              <FormGroup>
                <Input
                  className="form-control-alternative"
                  id="email"
                  placeholder="name@example.com"
                  type="email" required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col className="col-md-6 m-auto">
              <FormGroup>
                <Input
                  className="form-control-alternative"
                  id="password"
                  placeholder="************"
                  type="password" required
                  value={password}
                  onChange={event => setPassWord(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col className="m-auto col-md-6">
              <Button color="primary" className="w-100" type="submit"> Entrar </Button>
            </Col>
          </Form>
        </Container>
      </Body>
    </>
  );
}

const Body = styled.div`
  background-image: url('https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  height: 100vh;
`;