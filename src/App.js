import "./App.css";
import { HotTable } from "@handsontable/react";
import { HyperFormula } from "hyperformula";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import { useState } from "react";

// register Handsontable's modules
registerAllModules();

const DEPARTMENTS = [
  "Sales",
  "Engineering",
  "Product",
  "Marketing",
  "Accounts",
];

const DepartmentConfig = {
  editor: "select",
  selectOptions: DEPARTMENTS,
}

const STATISTICS = [
  ["Sum ($)", "Average ($)", "Max ($)"],
  [
    "=SUM(ledger!C:ledger!C)",
    "=AVERAGE(ledger!C:ledger!C)",
    "=MAX(ledger!C:ledger!C)",
  ],
];

const AmountConfig = {
  type: "numeric",
  numericFormat: {
    pattern: "$0,0.00",
    culture: "en-US",
  },
};

function App() {
  const [data, setData] = useState([
    ["Setting up the ledger", "Engineering", 400],
  ]);

  const hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: "internal-use-in-handsontable",
  });

  return (
    <div style={{ padding: "10px 20px" }}>
      <h1>Ledger with Handsontable</h1>
      <hr />
      <h2>Ledger</h2>
      <HotTable
        data={data}
        columns={[
          {},
          DepartmentConfig,
          AmountConfig,
        ]}
        formulas={{
          engine: hyperformulaInstance,
          sheetName: "ledger",
        }}
        rowHeaders={false}
        colHeaders={["Note", "Department", "Amount ($)"]}
        height="auto"
        licenseKey="non-commercial-and-evaluation"
      />
      <button
        style={{ marginTop: 10 }}
        onClick={() => setData((prevData) => [...prevData, ["", "", ""]])}
      >
        Add row
      </button>
      <h2>Statistics</h2>
      <HotTable
        data={STATISTICS}
        height="auto"
        formulas={{
          engine: hyperformulaInstance,
          sheetName: "statistics",
        }}
        columns={[AmountConfig, AmountConfig, AmountConfig]}
        licenseKey="non-commercial-and-evaluation"
      />
    </div>
  );
}

export default App;
