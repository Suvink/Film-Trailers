// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// const idWise = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   async function getDataAbout() {
//     try {
//       setLoading(true);
//       const r = await Axios.get(`http://localhost:8000`).then((r) => {
//         setData(r.data);
//       });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return <div>idWise</div>;
// };

// export default idWise;
