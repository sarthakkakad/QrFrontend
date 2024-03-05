import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEntriesAsync, selectEntries } from '../counter/counterSlice'
import { MailIcon, Trash2Icon } from 'lucide-react'

export default function EntryTable() {
    const dispatch = useDispatch()
    const Entries = useSelector(selectEntries)

    function formatDateTime(inputString) {
        const inputDate = new Date(inputString);
        
        // Define options for formatting
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short',
        };
      
        // Format the date and time
        const formattedDateTime = inputDate.toLocaleString('en-US', options);
      
        return formattedDateTime;
      }

    useEffect(()=>{
        dispatch(getAllEntriesAsync())
    },[])
  return (
    <div className='px-32'>
      <table className="w-full text-sm text-left rtl:text-right text-gray-400 my-12 ">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Participant
              </th>
              <th scope="col" className="px-6 py-3">
                Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Timing
              </th>
            </tr>
          </thead>
          <tbody>
            {Entries && Entries.map((Participant) => (
              <tr key={Participant.id} className="border-b bg-gray-800 border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                >
                  {Participant.participant?.name}
                </th>
                <td className="px-6 py-4">{Participant.admin.name}</td>
                <td className="px-6 py-4 flex gap-2">{formatDateTime(Participant.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}
