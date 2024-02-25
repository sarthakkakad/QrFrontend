import React from 'react';
import HtmlScanner from './features/Common/HtmlScanner';
import Navbar from './features/Common/Navbar';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar/>
      <HtmlScanner/>
      </div>
    ),
  },
  {
    path: "entries",
    element: <div>Entries</div>,
  },
  {
    path: "records",
    element: <div>records</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
