import React, { useEffect, useState } from "react";
import { Trash2Icon, MailIcon } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import { createParticipantAsync, deleteParticipantAsync, getAllEntriesAsync, getAllParticipantsAsync, selectEntries, selectParticipants, sendPersonalQrAsync , bulkQrSendAsync} from "../counter/counterSlice";

export default function ParticipationTable() {
  const dispatch = useDispatch();
  const alert = useAlert()
  const Participants = useSelector(selectParticipants);

  const [participantData, setParticipantData] = useState({
    name: "",
    email: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllParticipantsAsync());
  }, []);

  const handleDelete = (id) => {
    alert.show("Participant Deleted")
    dispatch(deleteParticipantAsync(id));
  };

  const handleMail = (id) => {
    dispatch(sendPersonalQrAsync(id))
    alert.show("Mail sent")
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleUpload = () => {
    setIsUploadModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setParticipantData({
      name: "",
      email: "",
    });
  };

  const handleUploadModalClose = () => {
    setIsUploadModalOpen(false);
  };

  const handleFormSubmit = () => {
    console.log("Form data:", participantData);
    // Dispatch the action to create a participant with participantData
    dispatch(createParticipantAsync(participantData));
    // Close the modal
    handleModalClose();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('excelFile', file);

    // Dispatch the action to handle file upload
    dispatch(bulkQrSendAsync(formData));
    // Close the modal
    handleUploadModalClose();
  };

  return (
    <div>
      <div className="relative overflow-x-auto px-24 my-24">
        <button onClick={handleAdd} className="bg-gray-300 p-3 text-2xl px-auto">
          Add Participant
        </button>
        <button onClick={handleUpload} className="bg-gray-300 p-3 text-2xl px-auto ml-4">
          Upload File
        </button>

        {/* Modal for adding participants */}
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-4 rounded-md w-96">
              <h2 className="text-xl font-bold mb-4">Add Participant</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFormSubmit();
                }}
              >
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={participantData.name}
                    onChange={(e) => setParticipantData({ ...participantData, name: e.target.value })}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={participantData.email}
                    onChange={(e) => setParticipantData({ ...participantData, email: e.target.value })}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for uploading file */}
        {isUploadModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-4 rounded-md w-96">
              <h2 className="text-xl font-bold mb-4">Upload File</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileUpload}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    accept=".xlsx"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleUploadModalClose}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {Participants && Participants.map((Participant) => (
              <tr key={Participant.id} className="border-b bg-gray-800 border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                  {Participant.name}
                </th>
                <td className="px-6 py-4">{Participant.email}</td>
                <td className="px-6 py-4 flex gap-2">
                  <Trash2Icon height={20} className="cursor-pointer" onClick={() => handleDelete(Participant.id)} />
                  <MailIcon height={20} className="cursor-pointer" onClick={() => handleMail(Participant.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
