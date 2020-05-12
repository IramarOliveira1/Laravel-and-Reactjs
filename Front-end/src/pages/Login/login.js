import React, { useState } from 'react';
import { Row, Container, FormGroup, Form, Input, Col, Button } from "reactstrap";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import logo from '../../assets/imagens/logo-inicial.png';
import axios from '../../services/api';
import '../../assets/css/style.css';

function Login() {

  const MySwal = withReactContent(Swal)
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState(123456789);

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

    const response = await axios.post('auth/login',{
      email:email,
      password:password
    });

    MySwal.close();

    if (response.data.error !== undefined && response.data.error === true) {
      MySwal.fire({
        icon: 'error',
        title: "Ocorreu um erro :(",
        text: response.data.messege,
      })
    } else {
      localStorage.setItem('jwt-token', response.data.access_token);
      history.push('/home');
    }

  }

  return (
    <>
      <div className="box-principal">
        <Col className="box-col-img col-md-6 mt-5">
          <img width="500" height="500" src={logo} />
        </Col>
        <Col className="col-md-6 box-col-principal">
          <Form className="box-form m-auto agora" onSubmit={handleSubmit}>
            <Col className="col-md-12 mt-9">
              <h3 className="mb-5">Sotero Systems <i className="ni ni-atom "></i> </h3>
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
            <Col className="col-md-12">
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
            <Col>
              <Button color="primary" className="col-md-12" type="submit"> Entrar </Button>
            </Col>
          </Form>
        </Col>
      </div>
    </>
  );
}

export default Login;
