import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSWRConfig } from "swr";

const NewCategory = ({}) => {
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();

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
        setIsPosting(true);
        const body = {
          category
        };
        const response = await fetch("http://localhost:3000/new-category", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        mutate("http://localhost:3000/categories");
        navigate("/categories");
      } catch (error) {}
    } else {
      if (match) return alert("Category already exist");
      alert("Please complete input fields");
    }
    setIsPosting(false);
  };
  return (
    <div>
      {isPosting ? (
        <div>Creating category...</div>
      ) : (
        <form
          action="POST"
          onSubmit={onSubmitForm}
          className="flex flex-col gap-2 py-5 mx-2"
        >
          <input
            className="p-2"
            type="text"
            placeholder="Input new category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <button
            type="submit"
            className="py-2 mt-5 mx-auto w-80 rounded-lg bg-orange-500 text-white"
          >
            Add Category
          </button>
        </form>
      )}
    </div>
  );
};

export default NewCategory;
