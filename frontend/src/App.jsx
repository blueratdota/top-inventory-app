import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav className="bg-orange-500">
        <Link to={"/items"}>
          <div>all items</div>
        </Link>
        <Link to={"/categories"}>
          <div>all categories</div>
        </Link>
        <div>new item</div>
        <div>new category</div>
        <div>danger zone</div>
      </nav>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
