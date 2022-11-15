import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import editIcon from '../../assets/images/edit.png'
import deleteIcon from '../../assets/images/delete.png'
import axios from 'axios';

const Dashboard = () => {
  const [APIData, setAPIData] = useState([]);
  const [deleted, setDeleted] = useState(false)
  const [checkedId, setCheckedId] = useState<any>([])
  const [enableDeleteAll, setEnableDeleteAll] = useState<boolean>(false)

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').then((response) => {
      setAPIData(response.data)
    })
  }, [])

  const deleteFunction = (id: number) => {
    setDeleted(!deleted)
    const getUsers = APIData
    const filterUser = getUsers.filter((list: any) => list.id !== id);
    setAPIData(filterUser)
  }

  APIData.sort(function (a: any, b: any) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const handleCheck = (e: any) => {
    setEnableDeleteAll(!enableDeleteAll)
    console.log(e.target.checked, 'e')
    const eventIdCapture = e.target.value;
    if (e.target.checked === true) {
      setCheckedId((prev: any) => [...prev, eventIdCapture])
    }
  }

  const handleDeleteSelected = () => {
    let stringArray = checkedId
    let numberArray = stringArray.map(Number);
    const getUsers = APIData;
    const filterUser = getUsers.filter((list: any) => list.id !== numberArray);
    setAPIData(filterUser)
  }

  useEffect(() => {
    handleDeleteSelected()
  }, [checkedId])
  return (
    <>
      <Container>
        <Form>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Control type="search" placeholder='Search by name, email or role' />
          </Form.Group>
        </Form>
        {/* {enableDeleteAll && */}
        <Button className='btn btn-danger mb-3' onClick={handleDeleteSelected}>Delete Selected</Button>
        {/* } */}
        <Table striped bordered hover className='text-center'>
          <thead>
            <tr>
              <th><Form.Check /></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {APIData.map((data: any) =>
            (
              <tr key={data.id}>
                <td><Form.Check value={data.id} onChange={(e) => handleCheck(e)} /></td>
                <td>{data.name}</td>
                <td onClick={() => window.location.href = `mailto:${data.email}`}>{data.email}</td>
                <td className='td-role'>{data.role}</td>
                <td>
                  <div className='icons-size'>
                    <img src={editIcon} alt="editIcon" />
                    <img src={deleteIcon} onClick={() => deleteFunction(data.id)} alt="deleteIcon" />
                  </div>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default Dashboard