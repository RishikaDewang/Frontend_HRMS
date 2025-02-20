import React, { useEffect, useState } from "react";
import axios from "axios";
const Payroll = () => {
  const [employees, setEmployees] = useState([]);
  const [manualInputs, setManualInputs] = useState({});
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const fetchPayrollData = async () => {
    setFetching(true);
    try {
      const response = await axios.get("https://hrms-backend-josj.onrender.com/api/payroll/getPayroll", {
        params: { month, year },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching payroll data:", error);
      alert("Failed to fetch payroll data.");
    }
    setFetching(false);
  };
  useEffect(() => {
    fetchPayrollData();
  }, [month, year]);
  const handleInputChange = (employeeId, field, value) => {
    setManualInputs((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [field]: Number(value),
      },
    }));
  };
  const calculateNetSalary = (employee) => {
    const inputData = manualInputs[employee.employeeId] || {};
    const grossSalary = employee.grossSalary || 0;
    const payPerDay = grossSalary / 25; // Keep old logic
    const totalLeaves = inputData.totalLeaves ?? employee.totalLeaves ?? 0;
    const halfDayLeaves = inputData.halfDayLeaves ?? employee.halfDayLeaves ?? 0;
    const paidLeaves = employee.paidLeaves || 0;
    let unpaidLeaves = Math.max(totalLeaves - paidLeaves, 0);
    let halfDayDeduction = 0;
    // Half-day deduction condition
    if (!(totalLeaves === 0 && halfDayLeaves <= 2)) {
        halfDayDeduction = halfDayLeaves * (payPerDay / 2);
    }
    const leaveDeduction = unpaidLeaves * payPerDay + halfDayDeduction;
    const professionalTax = employee.professionalTax || 0;
    const incomeTax = employee.incomeTax || 0;
    const bonus = inputData.bonus ?? employee.bonus ?? 0;
    const adjustments = inputData.adjustments ?? employee.adjustments ?? 0;
    return grossSalary - (leaveDeduction + professionalTax + incomeTax) + (bonus + adjustments);
};
  const handleSubmit = async () => {
    setSaving(true);
    try {
      const updatedEmployees = employees.map((employee) => {
        const inputData = manualInputs[employee.employeeId] || {};
        return {
          ...employee,
          bonus: inputData.bonus ?? employee.bonus,
          adjustments: inputData.adjustments ?? employee.adjustments,
          totalLeaves: inputData.totalLeaves ?? employee.totalLeaves,
          halfDayLeaves: inputData.halfDayLeaves ?? employee.halfDayLeaves,
          // Add any other fields that you want to override
        };
      });
      console.log('employees',updatedEmployees)
      await axios.post("https://hrms-backend-josj.onrender.com/api/payroll/calculatePayrollBatch", updatedEmployees);
      alert("Payroll saved successfully!");
      setManualInputs({});
      fetchPayrollData();
    } catch (error) {
      console.error("Error saving payroll:", error);
      alert("Failed to save payroll.");
    }
    setSaving(false);
  };
  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto", backgroundColor: "#F9F9F9", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontSize: "32px", fontFamily: "'Roboto', sans-serif" }}>Payroll Management</h2>
      {/* Month & Year Selection */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "1px solid #007BFF",
            fontSize: "16px",
            backgroundColor: "#fff",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(2025, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "1px solid #007BFF",
            fontSize: "16px",
            backgroundColor: "#fff",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {[2023, 2024, 2025, 2026].map((yr) => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
        <button
          onClick={fetchPayrollData}
          disabled={fetching}
          style={{
            padding: "12px 20px",
            background: "linear-gradient(145deg, #007BFF, #0056B3)",
            color: "#fff",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: fetching ? "not-allowed" : "pointer",
            border: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {fetching ? "Loading..." : "Fetch Payroll"}
        </button>
      </div>
      {/* Payroll Table */}
      {fetching ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>Loading payroll data...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <thead style={{ backgroundColor: "#007BFF", color: "white", textAlign: "center", borderRadius: "10px 10px 0 0" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gross Salary</th>
              <th>Total Leaves</th>
              <th>Half Days</th>
              <th>Bonus</th>
              <th>Adjustments</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId} style={{ textAlign: "center", backgroundColor: "#fff", borderBottom: "1px solid #ddd", borderRadius: "8px" }}>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>₹{employee.grossSalary}</td>
                <td>
  <input
    type="number"
    value={manualInputs[employee.employeeId]?.totalLeaves ?? employee.totalLeaves ?? 0}
    onChange={(e) => {
      let value = parseInt(e.target.value, 10) || 0; // Ensure integer
      if (value < 0) value = 0; // Prevent negative values
      if (value > 25) value = 25; // Prevent values greater than 25
      handleInputChange(employee.employeeId, "totalLeaves", value);
    }}
    min="0"
    max="25"
    disabled={!employee.isEditable}
    style={{
      padding: "8px",
      borderRadius: "8px",
      width: "90px",
      backgroundColor: employee.isEditable ? "#fff" : "#F5F5F5",
      border: "1px solid #ddd",
      transition: "all 0.3s ease",
    }}
  />
</td>
                <td>
                  <input
                    type="number"
                    value={manualInputs[employee.employeeId]?.halfDayLeaves ?? employee.halfDayLeaves ?? 0}
                    onChange={(e) => handleInputChange(employee.employeeId, "halfDayLeaves", e.target.value)}
                    disabled={!employee.isEditable}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "90px",
                      backgroundColor: employee.isEditable ? "#fff" : "#F5F5F5",
                      border: "1px solid #ddd",
                      transition: "all 0.3s ease",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={manualInputs[employee.employeeId]?.bonus ?? employee.bonus ?? 0}
                    onChange={(e) => handleInputChange(employee.employeeId, "bonus", e.target.value)}
                    disabled={!employee.isEditable}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "90px",
                      backgroundColor: employee.isEditable ? "#fff" : "#F5F5F5",
                      border: "1px solid #ddd",
                      transition: "all 0.3s ease",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={manualInputs[employee.employeeId]?.adjustments ?? employee.adjustments ?? 0}
                    onChange={(e) => handleInputChange(employee.employeeId, "adjustments", e.target.value)}
                    disabled={!employee.isEditable}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      width: "90px",
                      backgroundColor: employee.isEditable ? "#fff" : "#F5F5F5",
                      border: "1px solid #ddd",
                      transition: "all 0.3s ease",
                    }}
                  />
                </td>
                <td style={{ fontWeight: "bold", color: "#28A745" }}>₹{calculateNetSalary(employee).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={saving}
        style={{
          padding: "14px",
          background: "linear-gradient(145deg, #28A745, #218838)",
          color: "#fff",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: saving ? "not-allowed" : "pointer",
          border: "none",
          marginTop: "30px",
          display: "block",
          width: "100%",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {saving ? "Saving..." : "Save Payroll"}
      </button>
    </div>
  );
};
export default Payroll;