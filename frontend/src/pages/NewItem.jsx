import { useState, useEffect } from "react";
import { Select, SelectField } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
const NewItem = ({}) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState();
  const [itemCategory, setItemCateogory] = useState();
  const [itemQty, setItemQty] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const dbData = await response.json();
      if (!ignore) {
        setCategories(dbData);
        setIsLoading(false);
      }
      console.log(dbData);
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);
  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (itemName && itemCategory && itemQty) {
      try {
        const itemId = uuidv4();
        const body = {
          itemId,
          itemName,
          itemCategory,
          itemQty
        };
        const response = await fetch("http://localhost:3000/new-item", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        navigate("/items");
      } catch (error) {}
    } else {
      alert("Please complete input fields");
    }
  };

  return (
    <div>
      <form action="POST" onSubmit={onSubmitForm}>
        <input
          required
          type="text"
          placeholder="Item name"
          onChange={(e) => {
            setItemName(e.target.value);
          }}
        />
        <Select
          placeholder="Item category"
          isRequired={true}
          icon={false}
          onChange={(e) => {
            setItemCateogory(e.target.value);
          }}
        >
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            );
          })}
        </Select>
        <input
          required
          type="number"
          placeholder="Item qty"
          onChange={(e) => {
            setItemQty(e.target.value);
          }}
        />
        <button type="submit">add item</button>
      </form>
    </div>
  );
};

export default NewItem;
