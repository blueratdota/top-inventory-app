import { useState, useEffect } from "react";
import { Select, SelectField } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSWRConfig } from "swr";

const NewItem = ({}) => {
  const [itemName, setItemName] = useState();
  const [itemCategory, setItemCateogory] = useState();
  const [itemQty, setItemQty] = useState();
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

  const context = useOutletContext();
  const categories = context.categories;
  const setCategories = context.setCategories;
  const isLoading = context.isLoading;
  const items = context.items;
  const setItems = context.setItems;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (itemName && itemCategory && itemQty) {
      try {
        setIsPosting(true);
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
        mutate("http://localhost:3000/items");
        navigate("/items");
      } catch (error) {}
    } else {
      alert("Please complete input fields");
    }
    setIsPosting(false);
  };

  return (
    <div>
      {isPosting ? (
        <div>Creating item...</div>
      ) : (
        <form
          action="POST"
          onSubmit={onSubmitForm}
          className="flex flex-col gap-2 py-5 mx-2"
        >
          <input
            className="p-2"
            required
            type="text"
            placeholder="Item name"
            onChange={(e) => {
              setItemName(e.target.value);
            }}
          />
          <Select
            className="bg-white p-2"
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
            className="p-2"
            required
            type="number"
            placeholder="Item qty"
            onChange={(e) => {
              setItemQty(e.target.value);
            }}
          />
          <button
            type="submit"
            className="py-2 mt-5 mx-auto w-80 rounded-lg bg-orange-500 text-white"
          >
            Add Item
          </button>
        </form>
      )}
    </div>
  );
};

export default NewItem;
