import React, { useState } from "react";
import "./ReactForm.css";
import TableItem from "./TableItem";

function Table({ data, filterData, onDelete }) {
  let [sort, setSort] = useState();
  let [currentPage, setCurrentPage] = useState(1);

  const recordperpage = 5;

  const handleDelete = (id) => {
    onDelete(id);
    console.log(id);
  };

  const filteredData = filterData
    ? data.filter((item) => item.departments === filterData)
    : data;

  const handleSortChange = (event) => {
    setSort(event.target.value);
    console.log(event.target.value);
  };

  const sortedData = sort
    ? filteredData.sort((a, b) => {
        if (sort === "asc") {
          return a.salary - b.salary;
        } else {
          return b.salary - a.salary;
        }
      })
    : filteredData;

  const indexOfLastRecord = currentPage * recordperpage;

  const indexofFirstRecord = indexOfLastRecord - recordperpage;

  const currentRecords = sortedData.slice(
    indexofFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(sortedData.length / recordperpage);

  const handlepageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table">
      <label>
        {" "}
        Sort Based on Salary : &nbsp;
        <select value={sort} onChange={handleSortChange}>
          <option value="">Show All</option>
          <option value="asc">Low to High</option>
          <option value="des">High to Low</option>
        </select>
      </label>

      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Profile Pic</th>
            <th>Age</th>
            <th>Address</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Maritial Status</th>
            <th>Delete Record</th>
          </tr>
        </thead>

        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((item, index) => (
              <TableItem key={index} item={item} onDelete={handleDelete} />
            ))
          ) : (
            <tr>
              <td colSpan="8">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <br />
      <div className="pagination">
        {Array
        .from({ length: totalPages },(_, index) => index + 1)
        .map((pagenumber) => {
            return (
              <button
                key={pagenumber}
                onClick={() => {
                  handlepageChange(pagenumber);
                }}
                className={pagenumber === currentPage ? "active" : ""}
              >
                {pagenumber}
              </button>
            );
          }
        )}
      </div>
      <br />
      <br />
    </div>
  );
}

export default Table;
