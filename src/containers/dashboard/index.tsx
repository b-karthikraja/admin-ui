import { useEffect, useState } from 'react'
import { Button, Container, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import editIcon from '../../assets/images/edit.png'
import deleteIcon from '../../assets/images/delete.png'
import checkedIcon from '../../assets/images/checked.png'
import cancelIcon from '../../assets/images/cancel.png'
import axios from 'axios';
import header from '../../data/header.json'
import PaginationComp from '../pagination';

const Dashboard = () => {
  const [jsonData, setJsonData] = useState<any>([]);
  const [deleted, setDeleted] = useState(false)
  const [checkedId, setCheckedId] = useState<any>([])
  const [enableDeleteAll, setEnableDeleteAll] = useState<boolean>(false)
  const [filtered, setFilterd] = useState([]);
  const [result, setResult] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [inputVal, setInputVal] = useState('')
  const [checkedAll, setCheckedAll] = useState<boolean>(false)


  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').then((response) => {
      setJsonData(response.data)
      setFilterd(response.data)
    })
  }, [])

  const deleteFunction = (id: number) => {
    setDeleted(!deleted)
    const getUsers = jsonData
    const filterUser = getUsers.filter((list: any) => list.id !== id);
    setJsonData(filterUser)
  }

  jsonData.sort(function (a: any, b: any) {
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
      setEnableDeleteAll(true)
    }
    if (e.target.checked === true) {
      setCheckedId((prev: any) => [...prev, eventIdCapture])
    }
  }

  const handleDeleteSelected = () => {
    const getUsers = jsonData;
    const stringArray = checkedId
    const filteredUser = getUsers.filter((e: any) => {
      return stringArray.indexOf(e.id) < 0;
    });
    setJsonData(filteredUser)
  }

  useEffect(() => {
    const nameResults = filtered.filter((res: any) => res.name.toLowerCase().includes(result.toLowerCase()));
    const emailResults = filtered.filter((res: any) => res.email.toLowerCase().includes(result.toLowerCase()));
    const roleResults = filtered.filter((res: any) => res.role.toLowerCase().includes(result.toLowerCase()));
    if (nameResults.length > 0) {
      setJsonData([...nameResults])
    }
    if (emailResults.length > 0) {
      setJsonData([...emailResults])
    } else {
      setJsonData([...roleResults])
    }
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

  const selectAllCheckbox = (e: any) => {
    if (e.target.checked) {
      setCheckedAll(true)
    } else {
      setCheckedAll(false)
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
        {enableDeleteAll || checkedAll ?
          <Button className='btn btn-danger mb-3' onClick={handleDeleteSelected}>Delete Selected</Button>
          : <></>}
        <Table striped bordered hover className='text-center'>
          <thead>
            <tr>
              <th><Form.Check onChange={(e) => selectAllCheckbox(e)} /></th>
              {header.map((list) => (
                <th key={list.id}>{list.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jsonData.length > 0 ? jsonData.map((data: any) => {
              if (!isEdit) {
                return (
                  <tr key={data.id}>
                    <td>
                      {checkedAll ? <Form.Check value={data.id} onChange={(e) => handleCheck(e)} checked={checkedAll} />
                        : <Form.Check value={data.id} onChange={(e) => handleCheck(e)} />}
                    </td>
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
                      <input type="text" value={data.name} onChange={(e) => setInputVal(e.target.value)} onKeyUp={(e) => escapeFromEdit(e)} />
                    </td>
                    <td>
                      <input type="text" value={data.email} onChange={(e) => setInputVal(e.target.value)} onKeyUp={(e) => escapeFromEdit(e)} /></td>
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
        <PaginationComp />
      </Container>
    </>
  )
}

export default Dashboard