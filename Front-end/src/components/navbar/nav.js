import React from 'react';
import { Link, useHistory } from "react-router-dom";

import {UncontrolledCollapse,Navbar,NavItem,NavLink, Nav, Container, Row, Col} from "reactstrap";

import axios from '../../services/api';
import '../../assets/css/style.css';
import logoSotero from '../../assets/images/logo-sotero.png';

export default function NavBar() {

  let history = useHistory();

  const handleLogout = async () => {

    const getToken = localStorage.getItem('jwt-token');
    
    await axios.post('auth/logout', {
      token : getToken
    }).then((response) => {
      console.log(response.data.messege);
      
      localStorage.removeItem('jwt-token');
      history.push('/login');
   
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
      <>
       <Navbar
          className="navbar-horizontal navbar-dark bg-primary "
          expand="lg"
        >
          <Container>
          <Link to="/home">
                  <img
                    alt="..."
                    src={logoSotero}
                  />
            </Link>
            <button
              aria-controls="navbar-primary"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-primary"
              data-toggle="collapse"
              id="navbar-primary"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-primary">
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src="http://hostserveres.com/uploads/settings/15671091409758.png"
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      aria-controls="navbar-primary"
                      aria-expanded={false}
                      aria-label="Toggle navigation"
                      className="navbar-toggler"
                      data-target="#navbar-primary"
                      data-toggle="collapse"
                      id="navbar-primary"
                      type="button"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-lg-auto" navbar>
                <NavItem>
                  <Link to="/home" className="nav-link">
                      Home
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/produtos" className="nav-link">
                      Produtos
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/categorias" className="nav-link">
                      Categorias
                  </Link>
                </NavItem>
                <NavItem>
                  <NavLink onClick={handleLogout} href="#">
                    Sair
                  </NavLink>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
   </>
  );
}
