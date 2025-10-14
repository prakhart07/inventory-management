import { supabase } from "../ServerApi/Dbconnection";

/* ======================
   Get All Bills
====================== */
export async function getBill() {
  const { data, error } = await supabase.from("Bills").select("*");
  if (error) {
    console.error("Get Bill Error:", error.message, error.details, error.hint);
    return { status: 500, data: [], error: error.message };
  }
  return { status: 200, data };
}

/* ======================
   Add New Bill
====================== */
export async function addBill(newBill) {
  // bill_id numeric; unique
  newBill.bill_id = Date.now();
  const { data, error } = await supabase.from("Bills").insert([newBill]);
  if (error) {
    console.error("Add Bill Error:", error.message, error.details, error.hint);
    return { status: 500, data: null, error: error.message };
  }
  return { status: 200, data };
}

/* ======================
   Edit Bill
====================== */
export async function updateBill(billId, updatedData) {
  const { data, error } = await supabase
    .from("Bills")
    .update(updatedData)
    .eq("bill_id", billId);
  if (error) {
    console.error("Update Bill Error:", error.message, error.details, error.hint);
    return { status: 500, data: null, error: error.message };
  }
  return { status: 200, data };
}

/* ======================
   Delete Bill
====================== */
export async function deleteBill(billId) {
  const { data, error } = await supabase
    .from("Bills")
    .delete()
    .eq("bill_id", billId);
  if (error) {
    console.error("Delete Bill Error:", error.message, error.details, error.hint);
    return { status: 500, data: null, error: error.message };
  }
  return { status: 200, data };
}
