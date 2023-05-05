import React from "react";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import editIcon from "../../assets/images/edit.png";
import deleteIcon from "../../assets/images/delete.png";
import header from "../../data/header.json";

const DataTable = ({ ...props }) => {
  const {
    editFunction,
    deleteFunction,
    currentRecords,
    isAllSelected,
    selected,
    handleCheckboxChange,
    jsonData,
  } = props;
  return (
    <Table bordered hover className="text-center">
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              name="select-all"
              checked={isAllSelected && selected.length > 0 ? true : false}
              onChange={handleCheckboxChange}
            />
          </th>
          {header.map((list) => (
            <th key={list.id}>{list.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {jsonData.length > 0 ? (
          currentRecords.map((data: any) => {
            return (
              <tr
                key={data.id}
                style={{
                  background: selected.includes(data) ? "#a6a6a669" : "#fff",
                }}>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="select"
                    checked={selected.includes(data)}
                    onChange={(event) => handleCheckboxChange(event, data)}
                  />
                </td>
                <td>{data.name}</td>
                <td
                  className="td-email"
                  onClick={() =>
                    (window.location.href = `mailto:${data.email}`)
                  }>
                  {data.email}
                </td>
                <td className="td-role">{data.role}</td>
                <td>
                  <div className="icons-size">
                    <img
                      src={editIcon}
                      alt="editIcon"
                      onClick={() => editFunction(data)}
                    />
                    <img
                      src={deleteIcon}
                      onClick={() => deleteFunction(data.id)}
                      alt="deleteIcon"
                    />
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr className="text-center">
            <td colSpan={5}>No Details Found!</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default DataTable;
