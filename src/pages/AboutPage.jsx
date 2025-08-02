import { useSelector } from "react-redux";

export default function AboutPage() {
  const count = useSelector((state) => state.count.value);
  return (
    <>
      <div>About page side</div>
      <div>Count {count}</div>
    </>
  );
}
