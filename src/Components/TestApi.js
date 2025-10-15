import React, { useState, useEffect } from "react";
import { getBill, addBill, updateBill, deleteBill } from "../ServerApi/BillApi";
import DataTable from "react-data-table-component";
import { addProject, getProject } from "../ServerApi/API";

function TestApi() {
  const [apiData, setApiData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormData, setAddFormData] = useState({ project_id: "", date_of_print: "", price: "", item: "" });
  const [getData , setGetData] =useState ([])
  const [projectAddForm, setprojectAddForm] = useState(false)
  const [addData ,setaddData ] =useState ({ project_name:"",project_location:"",project_type:"",duration:"", plot_size:""})
   
  useEffect(() => {
    fetchBills();
    handelProject();
  }, []);

  const fetchBills = async () => {
    const res = await getBill();
    if (res.status === 200) setApiData(res.data);
  };


const  handelProject = async () => {
  const  res = await getProject();
  console.log(res);
  
  if(res.status === 200) setGetData(res.data);

}

  // Inline edit
  const handleInlineEdit = (field, value, rowId) => {
    setApiData(prev =>
      prev.map(row => (row.bill_id === rowId ? { ...row, [field]: value } : row))
    );
  };

  const handleSaveEdit = async (row) => {
    await updateBill(row.bill_id, {
      project_id: parseInt(row.project_id),
      date_of_print: row.date_of_print,
      price: parseFloat(row.price),
      item: row.item,
    });
    setEditRowId(null);
    fetchBills();
  };

  const handleDelete = async (bill_id) => {
    await deleteBill(bill_id);
    fetchBills();
  };

  // Add Bill via Modal Form
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const { project_id,date_of_print,price,item} = addFormData;
    if (!project_id || !date_of_print || !price || !item) return;
    await addBill({
      project_id: parseInt(project_id),
      date_of_print,
      price: parseFloat(price),
      item,
    });
    setAddFormData({ project_id: "", date_of_print: "", price: "", item: ""});
    setAddFormData(false);
    fetchBills();
  };


  const handelAddProject =async (e) => {
    e.preventDefault();
    console.log("addproject",addData);
    
     const { project_name,project_location,project_type,duration, plot_size } = addData;
    if ( !project_name || !project_location || !project_type || !duration || !plot_size  ) return;
    await addProject(addData);
    setaddData({  project_name:"",project_location:"",project_type:"",duration:"", plot_size:"" });
    setaddData(false);
    handelProject();
  };

  

  const columns = [
    {
      name: "🏗️ Project Id",
      selector: row => row.project_id,
      cell: row =>
        editRowId === row.bill_id ? (
          <input
            type="number"
            value={row.project_id}
            onChange={e => handleInlineEdit("project_id", e.target.value, row.bill_id)}
            style={{ width: "100%" }}
          />
        ) : (
          row.project_id
        ),
    },
   

    {
      name: "📏 Date of Print",
      selector: row => row.date_of_print,
      cell: row =>
        editRowId === row.bill_id ? (
          <input
            type="date"
            value={row.date_of_print}
            onChange={e => handleInlineEdit("date_of_print", e.target.value, row.bill_id)}
            style={{ width: "100%" }}
          />
        ) : (
          row.date_of_print
        ),
    },
    {
      name: "🆔 Price",
      selector: row => row.price,
      cell: row =>
        editRowId === row.bill_id ? (
          <input
            type="number"
            value={row.price}
            onChange={e => handleInlineEdit("price", e.target.value, row.bill_id)}
            style={{ width: "100%" }}
          />
        ) : (
          row.price
        ),
    },
    {
      name: "📂 Item",
      selector: row => row.item,
      cell: row =>
        editRowId === row.bill_id ? (
          <input
            type="text"
            value={row.item}
            onChange={e => handleInlineEdit("item", e.target.value, row.bill_id)}
            style={{ width: "100%" }}
          />
        ) : (
          row.item
        ),
    },
    { name: "📄 Bill Id", selector: row => row.bill_id },
    {
      name: "⚙️ Actions",
      cell: row => (
        <>
          {editRowId === row.bill_id ? (
            <button
              onClick={() => handleSaveEdit(row)}
              style={{
                marginRight: 5,
                background: "#28a745",
                color: "#fff",
                border: "none",
                padding: "5px 8px",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              💾 Save
            </button>
          ) : (
            <button
              onClick={() => setEditRowId(row.bill_id)}
              style={{
                marginRight: 5,
                background: "#ffc107",
                border: "none",
                padding: "5px 8px",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              ✏️ Edit
            </button>
          )}
          <button
            onClick={() => handleDelete(row.bill_id)}
            style={{
              background: "#dc3545",
              color: "#fff",
              border: "none",
              padding: "5px 8px",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            🗑️ Delete
          </button>
        </>
      ),
    },
  ];
  const columns2 = [
    {
      name: "🏗️ Project Id",
      selector: row => row.project_id,
      // cell: row =>
      //   editRowId === row.bill_id ? (
      //     <input
      //       type="number"
      //       value={row.project_id}
      //       onChange={e => handleInlineEdit("project_id", e.target.value, row.bill_id)}
      //       style={{ width: "100%" }}
      //     />
      //   ) : (
      //     row.project_id
      //   ),
    },
   

    {
      name: "📏 project_name",
      selector: row => row.project_name,
      // cell: row =>
      //   editRowId === row.bill_id ? (
      //     <input
      //       type="date"
      //       value={row.date_of_print}
      //       onChange={e => handleInlineEdit("date_of_print", e.target.value, row.bill_id)}
      //       style={{ width: "100%" }}
      //     />
      //   ) : (
      //     row.date_of_print
      //   ),
    },
    {
      name: "🆔 project_location",
      selector: row => row.project_location,
      // cell: row =>
      //   editRowId === row.bill_id ? (
      //     <input
      //       type="number"
      //       value={row.price}
      //       onChange={e => handleInlineEdit("price", e.target.value, row.bill_id)}
      //       style={{ width: "100%" }}
      //     />
      //   ) : (
      //     row.price
      //   ),
    },
    {
      name: "📂 start_date",
      selector: row => row.start_date,
      // cell: row =>
      //   editRowId === row.bill_id ? (
      //     <input
      //       type="text"
      //       value={row.item}
      //       onChange={e => handleInlineEdit("item", e.target.value, row.bill_id)}
      //       style={{ width: "100%" }}
      //     />
      //   ) : (
      //     row.item
      //   ),
        
    },
     {
      name: "📂 project_type",
      selector: row => row.project_type,
      // cell: row =>
      //   editRowId === row.bill_id ? (
      //     <input
      //       type="text"
      //       value={row.item}
      //       onChange={e => handleInlineEdit("item", e.target.value, row.bill_id)}
      //       style={{ width: "100%" }}
      //     />
      //   ) : (
      //     row.item
      //   ),
        
    },
     {
      name: "📂 duration",
      selector: row => row.duration,
      // cell: row =>
      //   editRowId === row.bill_id ? (
      //     <input
      //       type="text"
      //       value={row.item}
      //       onChange={e => handleInlineEdit("item", e.target.value, row.bill_id)}
      //       style={{ width: "100%" }}
      //     />
      //   ) : (
      //     row.item
      //   ),
        
    },
    { name: "📄 plot_size", selector: row => row.plot_size },
    {
      name: "⚙️ Actions",
      cell: row => (
        <>
          {editRowId === row.bill_id ? (
            <button
              onClick={() => handleSaveEdit(row)}
              style={{
                marginRight: 5,
                background: "#28a745",
                color: "#fff",
                border: "none",
                padding: "5px 8px",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              💾 Save
            </button>
          ) : (
            <button
              onClick={() => setEditRowId(row.bill_id)}
              style={{
                marginRight: 5,
                background: "#ffc107",
                border: "none",
                padding: "5px 8px",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              ✏️ Edit
            </button>
          )}
          <button
            onClick={() => handleDelete(row.bill_id)}
            style={{
              background: "#dc3545",
              color: "#fff",
              border: "none",
              padding: "5px 8px",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            🗑️ Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Bills Table</h2>
      <div style={{ marginBottom: 10, display: "flex", gap: 10 }}>
        <button
          onClick={fetchBills}
          style={{ padding: "5px 10px" }}
        >
          📦 Get Data
        </button>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            padding: "5px 10px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: 5,
          }}
        >
          ➕ Add Bill
        </button>
         <button
          onClick={() => setprojectAddForm(true)}
          style={{
            padding: "5px 10px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: 5,
          }}
        >
          ➕ Add 
        </button>
      </div>

      {/* Add Bill Form Modal */}
      {showAddForm && (
        <form
          onSubmit={handleAddSubmit}
          style={{
            marginBottom: 20,
            padding: 15,
            border: "1px solid #ccc",
            borderRadius: 8,
            maxWidth: 500,
          }}
        >
          <h3>Add New Bill</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              type="number"
              placeholder="Project Id"
              value={addFormData.project_id}
              onChange={e => setAddFormData({ ...addFormData, project_id: e.target.value })}
              required
            />
            <input
              type="date"
              value={addFormData.date_of_print}
              onChange={e => setAddFormData({ ...addFormData, date_of_print: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={addFormData.price}
              onChange={e => setAddFormData({ ...addFormData, price: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Item"
              value={addFormData.item}
              onChange={e => setAddFormData({ ...addFormData, item: e.target.value })}
              required
            />
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                type="submit"
                style={{
                  background: "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                ➕ Add 
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                style={{
                  background: "#6c757d",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                ✖ Cancel
              </button>
            </div>
          </div>
        </form>
      )}
      {/* Add project Form Modal */}
     {projectAddForm && (
        <form
          onSubmit={handleAddSubmit}
          style={{
            marginBottom: 20,
            padding: 15,
            border: "1px solid #ccc",
            borderRadius: 8,
            maxWidth: 500,
          }}
        >
          <h3>Add New project</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            
            <input
              type="project name"

              value={addData.project_name}
              onChange={e => setaddData({ ...addData, project_name: e.target.value })}
              required
            />
            <input
              type="string"
              placeholder="location"
              value={addFormData.project_location}
              onChange={e => setaddData({ ...addData, project_location: e.target.value })}
              required
            />
            <input
              type="date"
              placeholder="start_date"
              value={addFormData.start_date}
              onChange={e => setaddData({ ...addData, start_date: e.target.value })}
              required
            />
             <input
              type="string"
              placeholder="plot_size"
              value={addFormData.plot_size}
              onChange={e => setaddData({ ...addData, plot_size: e.target.value })}
              required
            />
             <input
              type="string"
              placeholder="project_type"
              value={addFormData.project_type}
              onChange={e => setaddData({ ...addData, project_type: e.target.value })}
              required
            />
             <input
              type="string"
              placeholder="duration"
              value={addFormData.duration}
              onChange={e => setaddData({ ...addData, duration: e.target.value })}
              required
            />
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button
                type="submit"
                onClick={handelAddProject}
                style={{
                  background: "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setprojectAddForm(false)}
                style={{
                  background: "#6c757d",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                ✖ Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <DataTable
        columns={columns}
        data={apiData}
        pagination
        high
        lightOnHover
      />
      
      <DataTable
        columns={columns2}
        data={getData}
        pagination
        highlightOnHover
      />
    </div>
  );
}

export default TestApi;
