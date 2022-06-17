import { useParams } from "react-router-dom";
import { getInvoice } from "./data";

export default function Invoice() {
    let para=useParams();
    let invoice = getInvoice(parseInt(para.invoiceId, 10));
    let InvoiceId=para.invoiceId;
    // return <h2>Invoice # {InvoiceId}</h2>;
    return (
        <main style={{ padding: "1rem" }}>
          <h2>Total Due: {invoice.amount}</h2>
          <p>
            {invoice.name}: {invoice.number}
          </p>
          <p>Due Date: {invoice.due}</p>
        </main>
      );
  }