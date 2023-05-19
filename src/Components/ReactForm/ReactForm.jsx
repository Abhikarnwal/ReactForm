import React, { useEffect, useState } from "react";
import Table from "./Table";
import "./ReactForm.css";

const initialState = {
  id: 0,
  name: "",
  age: "",
  address: "",
  departments: "",
  salary: "",
  maritialStatus: "",
  profilepic: null,
  previewUrl: "",
};

function ReactForm() {
  let [state, setState] = useState(initialState);
  let [data, setData] = useState([]);
  let [filterData, setfilterData] = useState("");

  useEffect(() => {
    return () => {
      if (state.previewUrl) {
        URL.revokeObjectURL(state.previewUrl);
      }
    };
  }, [state.previewUrl]);

  const handleFormSubmit = (event) => {
    let { name, value, checked, type, files } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    const file = type === "file" ? files[0] : null;

    setState((prev) => ({
      ...prev,
      [name]: inputValue,
      profilepic: file,
      previewUrl: file ? URL.createObjectURL(file) : "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRecord = { ...state, id: data.length + 1 };

    setData((prevData) => [...prevData, newRecord]);
    setState(initialState);
  };

  const handleFilterData = (event) => {
    console.log(event.target.value);
    setfilterData(event.target.value);
  };

  const handleDeleteData = (id) => {
    const updatedata = data.filter((item) => {
      return item.id !== id;
    });
    setData(updatedata);
  };

  return (
    <div>
      <h1>Form</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label>
          Name :
          <br />{" "}
          <input
            type="text"
            name="name"
            placeholder="Please Enter Your Name"
            onChange={handleFormSubmit}
            value={state.name}
          />
        </label>

        <label>
          Age :
          <br />
          <input
            type="number"
            name="age"
            placeholder="Please Enter Your Number"
            onChange={handleFormSubmit}
            value={state.age}
          />
        </label>

        <label>
          Address :
          <br />
          <input
            type="text"
            name="address"
            placeholder="Please Enter Your Address"
            onChange={handleFormSubmit}
            value={state.address}
          />
        </label>
        <label>
          Department :
          <br />
          <select
            name="departments"
            onChange={handleFormSubmit}
            value={state.departments}
          >
            <option value="">Select Department</option>
            <option value="HR">HR </option>
            <option value="IT"> IT & Operations </option>
            <option value="Sales">Sales</option>
          </select>
        </label>

        <label>
          Salary :
          <br />
          <input
            type="number"
            name="salary"
            placeholder="Please Enter Your Salary"
            onChange={handleFormSubmit}
            value={state.salary}
          />
        </label>
        <label>
          Maritial Status :
          <input
            type="checkbox"
            name="maritialStatus"
            checked={state.maritialStatus}
            style={{ fontSize: "20px" }}
            onChange={handleFormSubmit}
          />
        </label>
        <br />

        <label>
          Profile Photo :
          <br />
          <input type="file" name="profilepic" onChange={handleFormSubmit} />
          {state.previewUrl && (
            <img
              src={state.previewUrl}
              alt="profilepic"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </label>
        <br />
        <input type="submit" value="submit" />
      </form>

      <h2>Employee Data</h2>

      <label>
        Filter by Department : &nbsp;
        <select
          value={filterData}
          onChange={handleFilterData}
          style={{ marginBottom: "30px" }}
        >
          <option value="">Show All</option>
          <option value="HR">HR</option>
          <option value="IT">IT & Operations</option>
          <option value="Sales">Sales</option>
        </select>
      </label>

      <Table data={data} filterData={filterData} onDelete={handleDeleteData} />
    </div>
  );
}

export default ReactForm;
