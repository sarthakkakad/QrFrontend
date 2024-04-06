import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  VerifyQrAsync,
  selectQrMessage,
  selectUser,
  selectVerifiedUser,
} from "../counter/counterSlice";

export default function HtmlScanner() {
  const user = useSelector(selectUser);
  const alert = useAlert();
  const dispatch = useDispatch();
  const verifiedUser = useSelector(selectVerifiedUser);
  const QrMessage = useSelector(selectQrMessage);
  const token = localStorage.getItem('token1')
  const [view, setView] = useState(false);

  useEffect(() => {
    if (QrMessage) {
      alert.show(QrMessage);
    }
  }, [QrMessage]);

  const handleRescan = () => {
    var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 5,
      qrbox: 250,
    });

    html5QrcodeScanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText, decodedResult) {
      // Handle on success condition with the decoded text or result.
      console.log(`Scan result: ${decodedText}`, decodedResult);
      dispatch(VerifyQrAsync({ code: decodedText, admin: user?.id || token }));
      html5QrcodeScanner.clear();
    }

    function onScanError(errorMessage) {
      // handle on error condition, with error message
      console.log(errorMessage);
    }
    setView(true);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {<div className="w-[100%] md:w-[300px]" id="reader"></div>}
      {
        <button
          onClick={handleRescan}
          className="text-3xl bg-slate-500 p-3 rounded-lg my-4"
        >
          {"Scan QR"}
        </button>
      }
      {QrMessage && <p className="text-3xl p-3">{QrMessage}</p>}
      {verifiedUser && (
        <div className="text-3xl"> 
          <p>Name : {verifiedUser?.name}</p>
          <p>Email : {verifiedUser?.email}</p>
        </div>
      )}
    </div>
  );
}
