import { useState } from "react";
import NepaliDate from "nepali-date";
import BillDisplay from "./BillDisplay";

const BillForm = () => {
  const [clientName, setClientName] = useState("");
  const [clientVatNumber, setClientVatNumber] = useState("");
  const [companyVatNumber, setCompanyVatNumber] = useState("619736299");
  const [companyName, setCompanyName] = useState("Chhito Charge Pvt. Ltd.");
  const [items, setItems] = useState([{ name: "", price: "", duration: "" }]);
  const [invoiceDateAD, setInvoiceDateAD] = useState("");
  const [invoiceDateBS, setInvoiceDateBS] = useState("");

  const durationOptions = [
    { value: "1d", label: "1 day", price: 100 },
    { value: "3d", label: "3 days", price: 250 },
    { value: "1m", label: "1 month", price: 500 },
    { value: "3m", label: "3 months", price: 1200 },
    { value: "6m", label: "6 months", price: 2000 },
    { value: "9m", label: "9 months", price: 2700 },
    { value: "1y", label: "1 year", price: 3200 },
  ];

  const handleDurationChange = (index, value) => {
    const selectedOption = durationOptions.find(
      (option) => option.value === value
    );
    const newItems = items.map((item, i) =>
      i === index
        ? {
            ...item,
            duration: selectedOption.label,
            price: selectedOption.price,
          }
        : item
    );
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(newItems);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setInvoiceDateAD(selectedDate);

    try {
      const nepaliDate = new NepaliDate(new Date(selectedDate));
      setInvoiceDateBS(nepaliDate.format("YYYY-MM-DD"));
    } catch (error) {
      console.error("Error converting to Nepali Date:", error);
    }
  };

  const addItem = () => {
    setItems([...items, { name: "", price: "", duration: "" }]);
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-md ">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-center">
          Advertisement Invoice
        </h2>

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
            <label className="block text-gray-700">Conmpany Name</label>
            <input
              type="text"
              value={companyName}
              //   onChange={(e) => setClientVatNumber(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-gray-600"
              placeholder="Enter Client VAT Number"
            />
          </div>

          <div className="mb-4 w-full">
            <label className="block text-gray-700">Conmpany VAT Number</label>
            <input
              type="text"
              value={companyVatNumber}
              //   onChange={(e) => setClientVatNumber(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md text-gray-600"
              placeholder="Enter Client VAT Number"
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="mb-4 w-full">
            <label className="block text-gray-700">Invoice Date (AD)</label>
            <input
              type="date"
              value={invoiceDateAD}
              onChange={handleDateChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4 w-full">
            <label className="block text-gray-700">Invoice Date (BS)</label>
            <input
              type="text"
              value={invoiceDateBS}
              readOnly
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Subscriptions</h3>
          {items.map((item, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <div className="mb-4 w-full">
                <label className="block text-gray-700">Duration</label>
                <select
                  value={item.duration}
                  onChange={(e) => handleDurationChange(index, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled selected hidden>
                    Select Duration
                  </option>
                  <option>{item.duration}</option>
                  {durationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 w-full">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  className="p-2 border border-gray-300 rounded-md"
                  readOnly
                />
              </div>
            </div>
          ))}
          <button
            className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
            onClick={addItem}
          >
            Add Item
          </button>
        </div> */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Subscriptions</h3>
          {items.map((item, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <div className="mb-4 w-full">
                <label className="block text-gray-700">Duration</label>
                <input
                  type="text"
                  placeholder="Item Duration"
                  value={item.duration}
                  onChange={(e) =>
                    handleItemChange(index, "duration", e.target.value)
                  }
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4 w-full">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
          <button
            className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>

        <BillDisplay
          clientName={clientName}
          clientVatNumber={clientVatNumber}
          companyName={companyName}
          companyVatNumber={companyVatNumber}
          invoiceDateAD={invoiceDateAD}
          invoiceDateBS={invoiceDateBS}
          items={items}
        />
      </div>
    </div>
  );
};

export default BillForm;
