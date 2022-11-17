import { useEffect, useState } from 'react'
import { Button, Container, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import editIcon from '../../assets/images/edit.png'
import deleteIcon from '../../assets/images/delete.png'
import checkedIcon from '../../assets/images/checked.png'
import cancelIcon from '../../assets/images/cancel.png'
import axios from 'axios';

const Dashboard = () => {
  const [APIData, setAPIData] = useState([]);
  const [deleted, setDeleted] = useState(false)
  const [checkedId, setCheckedId] = useState<any>([])
  const [enableDeleteAll, setEnableDeleteAll] = useState<boolean>(false)
  const [filtered, setFilterd] = useState([]);
  const [result, setResult] = useState("");
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').then((response) => {
      setAPIData(response.data)
      setFilterd(response.data)
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
    const eventIdCapture = e.target.value;

    if (eventIdCapture > 0) {
      setEnableDeleteAll(!enableDeleteAll)
    }
    if (e.target.checked === true) {
      setCheckedId((prev: any) => [...prev, eventIdCapture])
    }
  }

  const handleDeleteSelected = () => {
    const stringArray = checkedId
    const numberArray = stringArray.map(Number);
    const getUsers = APIData;
    // setAPIData(filteredUser)
  }

  useEffect(() => {
    const results = filtered.filter((res: any) => res.name.toLowerCase().includes(result));
    setAPIData(results)
  }, [result])

  const handleSearch = (e: any) => {
    setResult(e.target.value);
  }

  const editFunction = (id: number) => {
    setEdit(!isEdit)
  }

  const escapeFromEdit = (e: any) => {
    if (e.key === 'Escape') {
      setEdit(!isEdit)
    }
  }

  return (
    <>
      <Container>
        <Form>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Control type="search" placeholder='Search by name, email or role' onChange={(e) => { handleSearch(e) }} />
          </Form.Group>
        </Form>
        {enableDeleteAll ?
          <Button className='btn btn-danger mb-3' onClick={handleDeleteSelected}>Delete Selected</Button>
          : <></>}
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
            {APIData.length > 0 ? APIData.map((data: any) => {
              if (!isEdit) {
                return (
                  <tr key={data.id}>
                    <td><Form.Check value={data.id} onChange={(e) => handleCheck(e)} /></td>
                    <td>{data.name}</td>
                    <td className='td-email' onClick={() => window.location.href = `mailto:${data.email}`}>{data.email}</td>
                    <td className='td-role'>{data.role}</td>
                    <td>
                      <div className='icons-size'>
                        <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip id="button-tooltip-2">Edit</Tooltip>}
                        >
                          <img src={editIcon} onClick={() => editFunction(data.id)} alt="editIcon" />
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
                        >
                          <img src={deleteIcon} onClick={() => deleteFunction(data.id)} alt="deleteIcon" />
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                )
              } else if (isEdit) {
                return (
                  <tr key={data.id}>
                    <td><Form.Check value={data.id} onChange={(e) => handleCheck(e)} /></td>
                    <td>
                      <input type="text" value={data.name} onKeyUp={(e) => escapeFromEdit(e)} />
                    </td>
                    <td>
                      <input type="text" value={data.email} onKeyUp={(e) => escapeFromEdit(e)} /></td>
                    <td>
                      <select id="role" name="role">
                        <option>{data.role}</option>
                      </select>
                    </td>
                    <td>
                      <div className='icons-size'>
                        <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip id="button-tooltip-2">Save</Tooltip>}
                        ><img src={checkedIcon} onClick={() => editFunction(data.id)} alt="checkedIcon" /></OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
                        ><img src={deleteIcon} onClick={() => deleteFunction(data.id)} alt="deleteIcon" /></OverlayTrigger>
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip id="button-tooltip-2">Cancel</Tooltip>}
                        ><img src={cancelIcon} alt="cancelIcon" className='ms-2' onClick={() => { setEdit(!isEdit) }} /></OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                )
              }
            }
            )
              : <tr className='text-center'>
                <td colSpan={5}>No Details Found!</td></tr>}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default Dashboard