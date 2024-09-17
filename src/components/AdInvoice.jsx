import { useState } from "react";
import html2pdf from "html2pdf.js";

const AdInvoice = () => {
  const [clientName, setClientName] = useState("");
  const [clientVatNumber, setClientVatNumber] = useState("");
  const [companyVatNumber, setCompanyVatNumber] = useState("619736299");
  const [companyName, setCompanyName] = useState("Chhito Charge Pvt. Ltd.");
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [transactionDate, setTransactionDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");

  const handleGeneratePdf = () => {
    const element = document.getElementById("bill");
    html2pdf().from(element).save("bill.pdf");
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(newItems);
  };

  const calculateTotal = () => {
    const total = items.reduce(
      (acc, item) => acc + parseFloat(item.price || 0) * (item.quantity || 1),
      0
    );
    const vat = total * 0.13;
    return { total, vat, net: total + vat };
  };

  const { total, vat, net } = calculateTotal();

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Advertisement Bill
      </h2>

      <div className="mb-4 text-sm">
        <p>
          <strong>Company:</strong> {companyName}
        </p>
        <p>
          <strong>VAT No:</strong> {companyVatNumber}
        </p>
      </div>

      <div className="flex flex-row gap-4">
        <div className="mb-4 w-full">
          <label className="block text-gray-700">Client Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter Client Name"
          />
        </div>

        <div className="mb-4 w-full">
          <label className="block text-gray-700">Client VAT Number</label>
          <input
            type="text"
            value={clientVatNumber}
            onChange={(e) => setClientVatNumber(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter Client VAT Number"
          />
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="mb-4 w-full">
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md text-gray-600"
            placeholder="Enter Company Name"
          />
        </div>

        <div className="mb-4 w-full">
          <label className="block text-gray-700">Company VAT Number</label>
          <input
            type="text"
            value={companyVatNumber}
            onChange={(e) => setCompanyVatNumber(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md text-gray-600"
            placeholder="Enter Company VAT Number"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Transaction Date</label>
        <input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Invoice Date Input */}
      <div className="mb-4">
        <label className="block text-gray-700">Invoice Date</label>
        <input
          type="date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Items</h3>
        {items.map((item, index) => (
          <div key={index} className="flex space-x-4 mb-2">
            
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              className="w-24 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              className="w-24 p-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}
        <button
          className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
          onClick={addItem}
        >
          Add Item
        </button>
      </div>

      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleGeneratePdf}
      >
        Download PDF
      </button>

      <div
        id="bill"
        className="m-8 p-8 border border-gray-400 rounded-md bg-white text-sm"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <div className="text-center mb-6">
          <p className="font-bold text-lg">{companyName}</p>
          <p>Kathmandu, Nepal</p>
          <p>VAT No: {companyVatNumber}</p>
          <p>Advertisement Invoice</p>
        </div>

        <div className="mb-4">
          <p>
            <strong>Client Name:</strong> {clientName}
          </p>
          <p>
            <strong>Client VAT Number:</strong> {clientVatNumber}
          </p>
          <p>
            <strong>Transaction Date:</strong> {transactionDate || "N/A"}
          </p>
          <p>
            <strong>Invoice Date:</strong> {invoiceDate || "N/A"}
          </p>
        </div>

        <table className="w-full mb-4 border-t border-b border-gray-300">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Particulars</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Price</th>

              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">Rs. {item.price}</td>

                <td className="text-right py-2">
                  Rs.{" "}
                  {(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(
                    2
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-4 text-right">
          <p>
            <strong>Gross Amount: Rs.</strong> {total.toFixed(2)}
          </p>
          <p>
            <strong>VAT 13%: Rs.</strong> {vat.toFixed(2)}
          </p>
          <p>
            <strong>Net Amount: Rs. </strong> {net.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdInvoice;
