import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewCategory = ({}) => {
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const dbData = await response.json();
      if (!ignore) {
        setAllCategory(dbData);
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const match = allCategory
      .map((entry) => {
        return entry.category.toLowerCase();
      })
      .includes(category.toLowerCase());
    console.log(match);
    if (category && !match) {
      try {
        const body = {
          category
        };
        const response = await fetch("http://localhost:3000/new-category", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        navigate("/categories");
      } catch (error) {}
    } else {
      if (match) return alert("Category already exist");
      alert("Please complete input fields");
    }
  };
  return (
    <div>
      <form action="POST" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Input new category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default NewCategory;
