import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalComp = ({ ...props }) => {
  const { show, setShow, handleUpdatedUser, selectedUser, setSelectedUser } =
    props;
  const handleClose = () => setShow(false);
  console.log(selectedUser, "sdfelc");

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Record</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => handleUpdatedUser(e)}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              autoFocus
              value={selectedUser.name}
              name="name"
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  email: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlRadioarea">
            <Form.Label>Role</Form.Label>
            <Form.Check
              className="text-capitalize"
              name="role"
              type="radio"
              label="Member"
              value="member"
              checked={selectedUser.role === "member"}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
            />
            <Form.Check
              className="text-capitalize"
              name="role"
              type="radio"
              label="Admin"
              value="admin"
              checked={selectedUser.role === "admin"}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
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
  );
};

export default ModalComp;
