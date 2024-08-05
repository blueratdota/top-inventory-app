import { useState, useEffect } from "react";

const AllItems = ({}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/");
      const dbData = await response.json();
      if (!ignore) {
        setItems(dbData);
      }
      console.log(messages);
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <div>
      {items.map((item) => {
        return <div>{item.item_name}</div>;
      })}
    </div>
    // try to do it in a table style
  );
};

export default AllItems;
