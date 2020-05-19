import React, { useState, useEffect } from 'react';
import Nav from '../../components/navbar/nav';

import axios from '../../services/api';
import { Button, Modal, Container, Table, Form, Input, FormGroup, Label } from "reactstrap";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import ListCategory from './components/updateCategory';

export default function Categories() {

  useEffect(() => {
    handleAllCategories();
  }, []);

  const MySwal = withReactContent(Swal)
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [modal, setModal] = useState(false);


  const handleAllCategories = async () => {

    await axios.get('/category').then((response) => {
      setCategories(response.data)
    }).catch((error) => {
      console.log(error);

    });
  }

  const handleSubmit = async () => {

    if (!name) {
      MySwal.fire({
        icon: 'info',
        title: 'Preencha os campos vazios!',
      })
      return name;
    }

    await axios.post('/store/category', {
      name: name,
    }).then((response) => {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
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
      setCategories([...categories, response.data]);
      setName('');
      handleAllCategories();

    }).catch((err) => {
      console.log(err);
    });

  }

  const handleDelete = async (id) => {

    Swal.fire({
      title: 'Atenção',
      text: "Este registro será definitivamente excluído. Deseja continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#449D44',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar item!',
      cancelButtonText: 'Não, quero cancelar!'
    }).then((result) => {
      if (result.value) {
        axios.delete(`/delete/category/${id}`).then(() => {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Categoria excluida com sucesso :)'
          })
          handleAllCategories();
        }).catch((err) => {
          console.log(err);
          MySwal.fire({
            icon: 'warning',
            title: "Atenção",
            text: 'Categoria não pode ser deletada porque está sendo usada no produto!',
          })

        });
      }
    });

  }

  const handleMapAll = categories.map((getCategories) => {
    return (
      <ListCategory
        getCategories={getCategories}
        key={getCategories.id}
        handleDelete={handleDelete}
        handleAllCategories={handleAllCategories}
      />
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
          Nova Categoria
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
                  id="nome"
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
            <Button color="success" type="submit" onClick={handleSubmit} >
              Salvar
            </Button>
          </div>
        </Modal>

        <Table className="align-items-center mt-2" hover responsive>
          <thead className="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nome</th>
              <th scope="col">Ações</th>
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
