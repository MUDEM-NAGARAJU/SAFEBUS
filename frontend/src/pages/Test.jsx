import { useEffect } from "react";
import API from "../api/axios";

export default function Test() {

  useEffect(() => {
    API.get("buses/")
      .then((res) => {
        console.log("SUCCESS:", res.data);
      })
      .catch((err) => {
        console.log("ERROR:", err.response?.data || err.message);
      });
  }, []);

  return (
    <div>
      <h2>Testing API Connection...</h2>
      <p>Open console to see result</p>
    </div>
  );
}
