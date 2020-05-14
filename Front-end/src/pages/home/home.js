import React from 'react';

import Nav from '../../components/navbar/nav';
import {Container} from "reactstrap";

export default function home() {
  return (
    <>
        <Nav/>
        <Container>
            <h1>Página Inicial</h1>
        </Container>
    </>
  );
}
