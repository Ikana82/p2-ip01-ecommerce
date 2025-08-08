import { useSelector } from "react-redux";
import DetailProduct from "../components/DetailProduct";

export default function AboutPage() {
  const count = useSelector((state) => state.count.value);
  return (
    <>
      <div>About page side</div>
      <div>Count {count}</div>
    </>
  );
}
