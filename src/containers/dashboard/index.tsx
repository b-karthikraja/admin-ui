import { useEffect, useState } from 'react'
import { Button, Container, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import editIcon from '../../assets/images/edit.png'
import deleteIcon from '../../assets/images/delete.png'
import axios from 'axios';
import header from '../../data/header.json'
import PaginationComp from '../pagination';
import Loader from '../loader';
import EditRowModal from '../editRowModal';

const Dashboard = () => {
  const [jsonData, setJsonData] = useState<any>([]);
  const [deleted, setDeleted] = useState(false)
  const [checkedId, setCheckedId] = useState<any>([])
  const [enableDeleteAll, setEnableDeleteAll] = useState<boolean>(false)
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [inputVal, setInputVal] = useState('')
  const [checkedAll, setCheckedAll] = useState<boolean>(false)
  const [singleData, setSingleData] = useState([])

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(true);

  const [isEditUser, setIsEditUser] = useState(false)

  const [users, setUsers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>([])

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').then((response) => {
      setJsonData(response.data)
      setFiltered(response.data)
      setLoading(false);
    })
      .catch(() => {
        alert('Check your internet connection & refresh the page for retrieving the data')
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
    } else if (emailResults.length > 0) {
      setJsonData([...emailResults])
    } else {
      setJsonData([...roleResults])
    }
  }, [result])

  const handleSearch = (e: any) => {
    setResult(e.target.value);
  }

  const editFunction = (data: any) => {
    setSingleData(data)
    setShow(!show)
    setSelectedUser(data)
  }

  const selectAllCheckbox = (e: any) => {
    if (e.target.checked) {
      setCheckedAll(true)
    } else {
      setCheckedAll(false)
    }
  }

  const handleUpdatedUser = () => {
    if (selectedUser?.id === (jsonData[selectedUser?.id])?.id) {
      jsonData[selectedUser.id] = selectedUser;
      setJsonData(jsonData)
    }
    setShow(false)
  }

  useEffect(() => {
    handleUpdatedUser()
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = jsonData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(jsonData.length / recordsPerPage)

  return (
    <>
      {
        loading ? <div className='spin-loader'><Loader /> </div> :
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
                {currentRecords.length > 0 ? currentRecords.map((data: any) => {
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
                          ><img src={editIcon} alt="editIcon" onClick={() => editFunction(data)} />
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
                }
                )
                  : <tr className='text-center'>
                    <td colSpan={5}>No Details Found!</td></tr>}
              </tbody>
            </Table>
            <PaginationComp totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage} />

            <EditRowModal handleShow={handleShow} show={show}
              handleClose={handleClose} setShow={setShow} handleUpdatedUser={handleUpdatedUser} setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
            />
          </Container>
      }
    </>
  )
}

export default Dashboard