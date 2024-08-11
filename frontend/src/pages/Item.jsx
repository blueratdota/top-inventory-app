import { useParams } from "react-router-dom";
const Item = () => {
  const { id } = useParams();
  return <div>this item is for {id} page</div>;
};
export default Item;
