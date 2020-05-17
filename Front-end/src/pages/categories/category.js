import React, { useState, useEffect } from 'react';
import Nav from '../../components/navbar/nav';

import axios from '../../services/api';
import { Button, Modal, Container, Table, Form, Input, FormGroup,Label } from "reactstrap";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';


export default function Categories() {

  useEffect(() => {
    handleAllCategories();
  }, []);

  const MySwal = withReactContent(Swal)
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [modal, setModal] = useState(false);


  const handleAllCategories = async () => {

    await axios.get('/category', {
    }).then((response) => {

      setCategories(response.data)
    }).catch((error) => {

      console.log(error);
    });

  }

  const handleSubmit = async () => {

    if (!name) {
      MySwal.fire({
        icon: 'error',
        title: 'Ocorreu um erro :(',
        text: 'Preencha os campos vazios!'
      })

      return name;  
    }

    await axios.post('/store/category', {
      name:name,
    }).then((response) => {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Cadastrado com sucesso :)'
      })

      setModal(false);
      setCategories([...categories,response.data]);
      setName('');
      handleAllCategories();

    }).catch((err) => {
      console.log(err);
     
    });

  }

  const handleMapAll = categories.map((getAll) => {
    return (
      <tr key={getAll.id}>
        <td>{getAll.id}</td>
        <td>{getAll.name}</td>
      </tr>
    )
  });

  return (
    <>
      <Nav />
      <Container>
        <hr />
        <Button color="primary"
          type="button"
          className="mb-3"
          onClick={() => setModal(true)}
        >
          New Category
        </Button>
        <Modal
          className="modal-dialog"
          isOpen={modal}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Categorias
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setModal(false)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form>
                <Label>Nome</Label>
                <FormGroup>
                  <Input
                    className="form-control"
                    id="text"
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                  />
                </FormGroup>
            </Form>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => setModal(false)}
            >
              fechar
            </Button>
            <Button color="success" type="submit"  onClick={handleSubmit} >
              Salvar
            </Button>
          </div>
        </Modal>

        <Table className="align-items-center mt-2" hover responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nome</th>
            </tr>
          </thead>
          <tbody>
            {handleMapAll}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
