import { ChangeEvent, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import PaginationComp from "../containers/pagination";
import Loader from "../components/loader";
import ModalComp from "../containers/modal/modal";
import DataTable from "../containers/table/Table";
import { IMasterData } from "../types";

const Dashboard = () => {
  const [jsonData, setJsonData] = useState<IMasterData[]>([]);
  const [deleted, setDeleted] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  //Modal
  const [show, setShow] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>([]);
  const [selected, setSelected] = useState<IMasterData[]>([]);

  jsonData.sort(function (a: IMasterData, b: IMasterData) {
    //Function for Sort Name wise
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  //Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = jsonData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(jsonData.length / recordsPerPage);

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

  const deleteFunction = (id: string | number) => {
    setDeleted(!deleted);
    const getUsers = jsonData;
    const filterUser = getUsers.filter((list: IMasterData) => list.id !== id);
    setJsonData(filterUser);
    setSelected(selected.filter((row: IMasterData) => row.id !== id));
  };

  //For Search
  useEffect(() => {
    const nameResults = filtered.filter((res: IMasterData) =>
      res.name.toLowerCase().includes(result.toLowerCase())
    );
    const emailResults = filtered.filter((res: IMasterData) =>
      res.email.toLowerCase().includes(result.toLowerCase())
    );
    const roleResults = filtered.filter((res: IMasterData) =>
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
  }, [result, filtered]);

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResult(e.target.value);
  };

  const editFunction = (data: IMasterData) => {
    setShow(!show);
    setSelectedUser(data);
  };

  const handleUpdatedUser = (e: any) => {
    const newState = jsonData.map((obj) => {
      if (obj.id === selectedUser?.id) {
        return selectedUser;
      }
      return obj;
    });
    setJsonData(newState);
    setShow(false);
    e.preventDefault();
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    if (event.target.name === "select-all") {
      if (event.target.checked) {
        setSelected(currentRecords);
      } else {
        setSelected([]);
      }
    } else {
      if (event.target.checked) {
        setSelected([...selected, data]);
      } else {
        setSelected(selected.filter((row: any) => row !== data));
      }
    }
  };

  const handleDeleteSelected = () => {
    if (selected.length === jsonData.length) {
      setJsonData([]);
    } else {
      setJsonData(jsonData.filter((row: any) => !selected.includes(row)));
    }
    setSelected([]);
  };
  const isAllSelected = selected.length === currentRecords.length;

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
          {selected.length > 0 && (
            <Button
              className="btn btn-danger mb-3"
              onClick={handleDeleteSelected}>
              Delete Selected ({selected.length})
            </Button>
          )}
          <DataTable
            editFunction={editFunction}
            deleteFunction={deleteFunction}
            currentRecords={currentRecords}
            isAllSelected={isAllSelected}
            selected={selected}
            handleCheckboxChange={handleCheckboxChange}
            jsonData={jsonData}
          />
          {jsonData.length ? (
            <PaginationComp
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            <></>
          )}
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
