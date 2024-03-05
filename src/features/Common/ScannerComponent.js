// import React, { useState } from "react";
// import { QrReader } from "react-qr-reader";
// import "./ScannerComponent.css";

// const ScannerComponent = (props) => {
//   const [data, setData] = useState("No result");
//   const [view, setView] = useState(true);

//   const handleResult = async (result, error) => {
//     try {
//       if (!!result) {
//         setData(result?.text);
//         setView(false);

//         // Make a fetch request to localhost:8080/done
//         const response = await fetch("http://localhost:9080/done", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ data: result.text }),
//         });

//         if (response.ok) {
//           const responseData = await response.json();
//           console.log("Post request successful:", responseData);
//         } else {
//           console.error("Post request failed:", response.status);
//         }
//       }
//     } catch (videoError) {
//       console.error("Error playing video:", videoError);
//     }
//   };

//   const handleRetry = () => {
//     setView(true);
//     setData("No result");
//   };

//   return (
//     <div className="scanner-container">
//       {view && (
//         <>
//           <QrReader onResult={handleResult} style={{ width: "100%" }} />
//           <div className="scan-line"></div>
//         </>
//       )}

//       <button onClick={handleRetry}>Retry</button>
//       <p>{data}</p>
//     </div>
//   );
// };

// export default ScannerComponent;
