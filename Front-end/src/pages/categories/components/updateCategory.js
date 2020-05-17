import React, { useState, useEffect } from 'react';

import { Button, Modal, Form, FormGroup, Input, Label } from "reactstrap";

import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import axios from '../../../services/api';

export default function UpdateCategories({ getCategories, handleDelete, handleAllCategories }) {

    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setName(getCategories.name);

    }, []);

    const handleUpdate = async () => {

        await axios.put(`/update/category/${getCategories.id}`, {
            name: name
        })

        setModal(false);
        handleAllCategories();
    }

    return (
        <>
            <tr>
                <td>{getCategories.id}</td>
                <td>{getCategories.name}</td>
                <td>
                    <Button color="danger" onClick={() => handleDelete(getCategories.id)}> <AiFillDelete /> </Button>
                    <Button color="info" onClick={() => setModal(true)} > <AiTwotoneEdit /> </Button>
                </td>
            </tr>

            <Modal
                className="modal-dialog"
                isOpen={modal}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Editar Categorias
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
                    <Button color="success" type="submit" onClick={handleUpdate} >
                        Atualizar
                    </Button>
                </div>
            </Modal>
        </>
    );
}
