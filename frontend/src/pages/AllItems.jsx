import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const AllItems = ({}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/");
      const dbData = await response.json();
      if (!ignore) {
        setItems(dbData);
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="grid grid-cols-3 gap-5 py-5 max-w-[720px] mx-auto">
        {items.map((item) => {
          return (
            <div key={item.id} className="border">
              <div>Name: {item.item_name}</div>
              <div>Category: {item.item_category}</div>
              <div>Quantity: {item.item_qty}</div>
            </div>
          );
        })}
        <div className="border">
          {" "}
          <Link to={"/items/new-item"}>Add Item</Link>
        </div>
      </div>
    );
  }
};

export default AllItems;
