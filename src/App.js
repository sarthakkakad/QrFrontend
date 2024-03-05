import React from "react";
import HtmlScanner from "./features/Common/HtmlScanner";
import Navbar from "./features/Common/Navbar";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ParticipationTable from "./features/Common/ParticipationTable";
import EntryTable from "./features/Common/EntryTable";
import LoginPage from "./features/Common/Login";
import Protected from "./features/Common/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <LoginPage />
      </div>
    ),
  },
  {
    path: "scanner",
    element: (
      <Protected>
        <Navbar />
        <HtmlScanner />
      </Protected>
    ),
  },
  {
    path: "entries",
    element: (
      <Protected>
        <Navbar />
        <EntryTable />
      </Protected>
    ),
  },
  {
    path: "records",
    element: (
      <Protected>
        <Navbar />
        <ParticipationTable />
      </Protected>
    ),
  },
]);

function App() {
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 4000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
  };

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AlertProvider>
  );
}

export default App;
