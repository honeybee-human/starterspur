import React, { useState } from 'react';

interface ScheduleModalProps {
  closeModal: () => void;
  addCountry: (formData: FormData) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ closeModal, addCountry }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const daysOfWeek = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ];

  const handleDayClick = (day: string) => {
    setSelectedDays(prevSelectedDays => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter(d => d !== day); // Remove day if already selected
      } else {
        return [...prevSelectedDays, day]; // Add day to selected days
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('date', date);
    formData.append('days', JSON.stringify(selectedDays)); // Store the selected days as a JSON string

    addCountry(formData);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-lg font-semibold text-center mb-4">Add New Country</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Country Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Select Days of the Week</label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={`py-2 px-4 rounded-md text-white ${
                    selectedDays.includes(day)
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Country
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
