import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import PaginationComp from "../containers/pagination";
import Loader from "../containers/loader";
import ModalComp from "../containers/modal/modal";
import DataTable from "../containers/table/Table";

const Dashboard = () => {
  const [jsonData, setJsonData] = useState<any>([]);
  const [deleted, setDeleted] = useState(false);
  const [checkedId, setCheckedId] = useState<any>([]);
  const [enableDeleteAll, setEnableDeleteAll] = useState<boolean>(false);
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState("");
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  //Modal
  const [show, setShow] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>([]);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((response) => {
        setJsonData(response.data);
        setFiltered(response.data);
        setLoading(false);
      })
      .catch(() => {
        alert(
          "Check your internet connection or refresh the page for retrieving the data"
        );
      });
  }, []);

  const deleteFunction = (id: number) => {
    setDeleted(!deleted);
    const getUsers = jsonData;
    const filterUser = getUsers.filter((list: any) => list.id !== id);
    setJsonData(filterUser);
  };

  jsonData.sort(function (a: any, b: any) {
    //Function for Sort Name wise
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const handleCheck = (event: any) => {
    if (event.target.checked === true) {
      setCheckedId((prev: any) => [...prev, event.target.checked]);
    }
  };

  const handleDeleteSelected = (e: any) => {
    const getUsers = jsonData;
    const stringArray = checkedId;
    const filteredUser = getUsers.filter((e: any) => {
      return stringArray.indexOf(e.id) < 0;
    });
    setJsonData(filteredUser);
  };

  useEffect(() => {
    //For Search
    const nameResults = filtered.filter((res: any) =>
      res.name.toLowerCase().includes(result.toLowerCase())
    );
    const emailResults = filtered.filter((res: any) =>
      res.email.toLowerCase().includes(result.toLowerCase())
    );
    const roleResults = filtered.filter((res: any) =>
      res.role.toLowerCase().includes(result.toLowerCase())
    );
    if (nameResults.length > 0) {
      setJsonData([...nameResults]);
    } else {
      if (emailResults.length > 0) {
        setJsonData([...emailResults]);
      } else {
        setJsonData([...roleResults]);
      }
    }
  }, [result]);

  const handleSearch = (e: any) => {
    setResult(e.target.value);
  };

  const editFunction = (data: any) => {
    setShow(!show);
    setSelectedUser(data);
  };

  const selectAllCheckbox = (e: any) => {
    if (e.target.checked) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  };

  const handleUpdatedUser = (e: any) => {
    const newState = jsonData.map((obj: { id: number }) => {
      if (obj.id === selectedUser?.id) {
        return selectedUser;
      }
      return obj;
    });
    setJsonData(newState);
    setShow(false);
    e.preventDefault();
  };

  //Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = jsonData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(jsonData.length / recordsPerPage);
  return (
    <>
      {isLoading ? (
        <div className="spin-loader">
          <Loader />
        </div>
      ) : (
        <Container>
          <Form>
            <Form.Group className="mb-3 mt-3">
              <Form.Control
                type="search"
                placeholder="Search by name, email or role"
                onChange={(e) => {
                  handleSearch(e);
                }}
              />
            </Form.Group>
          </Form>
          {checkedId || checkedAll ? (
            <Button
              className="btn btn-danger mb-3"
              onClick={(e) => {
                handleDeleteSelected(e);
              }}>
              Delete Selected
            </Button>
          ) : (
            ""
          )}
          <DataTable
            editFunction={editFunction}
            deleteFunction={deleteFunction}
            handleCheck={handleCheck}
            currentRecords={currentRecords}
            selectAllCheckbox={selectAllCheckbox}
          />
          <PaginationComp
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <ModalComp
            show={show}
            setShow={setShow}
            handleUpdatedUser={handleUpdatedUser}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </Container>
      )}
    </>
  );
};

export default Dashboard;
