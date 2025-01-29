import { useState } from "react";
import useAxiosPublic from '../../../Hooks/useAxiosPublic'
import Swal from "sweetalert2";

const AddItinerary = () => {
    const [days, setDays] = useState([]);
    const [numDays, setNumDays] = useState(1);
    const axiosPublic = useAxiosPublic()

    const handleAddDay = () => {
        setDays([...days, { day_number: days.length + 1, activity: "", details: "" }]);
    };

    const handleRemoveDay = (index) => {
        setDays(days.filter((_, i) => i !== index));
    };

    const handleChangeDay = (index, field, value) => {
        const updatedDays = days.map((day, i) =>
            i === index ? { ...day, [field]: value } : day
        );
        setDays(updatedDays);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const package_id = form.package_id.value;


        const itineraryData = days.map((day, index) => ({
            package_id,
            day_number: index + 1,
            activity: day.activity,
            details: day.details,
        }));

        axiosPublic.post('/itinerary',itineraryData)
        .then(()=>{
           Swal.fire("Success",'Data added successfully','success');
           form.reset();
           setDays([])
           setNumDays(1)
        })
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-6">Add Itinerary</h2>
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
            >
                <div className="mb-4">
                    <label htmlFor="package_id" className="block font-medium mb-1">Package ID</label>
                    <input
                        type="text"
                        id="package_id"
                        name="package_id"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="num_days" className="block font-medium mb-1">Number of Days</label>
                    <input
                        type="number"
                        id="num_days"
                        name="num_days"
                        value={numDays}
                        onChange={(e) => setNumDays(parseInt(e.target.value) || 1)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                    />
                    <button
                        type="button"
                        onClick={handleAddDay}
                        className="mt-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 focus:outline-none"
                    >
                        Add Day
                    </button>
                </div>

                {days.map((day, index) => (
                    <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
                        <h3 className="font-medium mb-2">Day {index + 1}</h3>
                        <div className="mb-2">
                            <label htmlFor={`activity_${index}`} className="block font-medium mb-1">Activity</label>
                            <input
                                type="text"
                                id={`activity_${index}`}
                                name={`activity_${index}`}
                                value={day.activity}
                                onChange={(e) => handleChangeDay(index, "activity", e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor={`details_${index}`} className="block font-medium mb-1">Details</label>
                            <textarea
                                id={`details_${index}`}
                                name={`details_${index}`}
                                rows="3"
                                value={day.details}
                                onChange={(e) => handleChangeDay(index, "details", e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveDay(index)}
                            className="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 focus:outline-none"
                        >
                            Remove Day
                        </button>
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Add Itinerary
                </button>
            </form>
        </div>
    );
};

export default AddItinerary;
