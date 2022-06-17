import { NavLinkm, Link } from "react-router-dom";
import {getInvoices} from './data'
import { Outlet } from "react-router-dom";

// export default function Invoices() {
//     return (
//       <main style={{ padding: "1rem 0" }}>
//         <h2>Invoices</h2>
//         <Link to="/">Home</Link>
//       </main>
//     );
//   }


export default function Invoices() {
    let invoices = getInvoices();
    return (
      <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 2px",
            padding: "1rem",
          }}
        >
          {invoices.map((invoice) => (
            <Link
              style={{ display: "block", margin: "1rem 0" }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </Link>
          ))}
          <Outlet/>
        </nav>
        <Outlet/>
      </div>
    );
  }