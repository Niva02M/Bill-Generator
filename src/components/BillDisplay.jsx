import html2pdf from "html2pdf.js";

const BillDisplay = ({
  clientName,
  clientVatNumber,
  companyName,
  companyVatNumber,
  invoiceDateAD,
  invoiceDateBS,
  items,
}) => {
  const calculateTotal = () => {
    const total = items.reduce(
      (acc, item) => acc + parseFloat(item.price || 0),
      0
    );
    const vat = total * 0.13;
    return { total, vat, net: total + vat };
  };

  const { total, vat, net } = calculateTotal();

  const handleGeneratePdf = () => {
    const element = document.getElementById("bill");
    html2pdf().from(element).save("bill.pdf");
  };

  return (
    <>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleGeneratePdf}
      >
        Download PDF
      </button>
      <div
        id="bill"
        className="m-20 p-4 border border-gray-400 rounded-md bg-gray-50 text-sm"
      >
        <div className="text-center mb-6">
          <p className="font-bold">{companyName}</p>
          <p>Thamel, Kathmandu, Nepal</p>
          <p className="inline-flex gap-1">
            <span className="font-bold">VAT No:</span> {companyVatNumber}
          </p>
        </div>

        <div className="mb-4">
          <p>
            <strong>Client Name:</strong> {clientName}
          </p>
          <p>
            <strong>Client VAT Number:</strong> {clientVatNumber}
          </p>
          <p>
            <strong>Invoice Date (AD):</strong> {invoiceDateAD || "N/A"}
          </p>
          <p>
            <strong>Invoice Date (BS):</strong> {invoiceDateBS || "N/A"}
          </p>
        </div>

        <table className="w-full mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left">Particulars</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>Subscription - ({item.duration})</td>
                <td className="text-right">Rs. {item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t pt-2">
          <p className="text-right">Total: Rs. {total.toFixed(2)}</p>
          <p className="text-right">VAT (13%): Rs. {vat.toFixed(2)}</p>
          <p className="text-right font-bold">
            Net Total: Rs. {net.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
};

export default BillDisplay;
