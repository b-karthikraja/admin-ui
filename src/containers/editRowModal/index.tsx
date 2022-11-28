import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { IEditRow } from '../../types';

const EditRowModal = ({ show, handleClose, singleData, setSingleData, setShow,
  handleUpdatedUser, setSelectedUser, selectedUser }: any) => {

  const [userDetails, setUserDetails] = useState<any>({
    id: "",
    name: "",
    email: "",
    role: ""
  })

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Record</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdatedUser}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                autoFocus
                value={selectedUser.name}
                name='name'
                onChange={(e) => setSelectedUser({ ...userDetails, name: e.target.value })}

              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"
                name='email'
                placeholder="Enter your Email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...userDetails, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlRadioarea"
            >
              <Form.Label>Role</Form.Label>
              <Form.Check className='text-capitalize' checked name='radio' type="radio" label={selectedUser.role}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditRowModal