import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";



const image_hosting_key = import.meta.env.VITE_img_hosting_api;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPackages = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Generate preview
        }
    };

    // Submit handler
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        if (!imageFile) {
            Swal.fire("Error!", "Please select an image!", "error");
            return;
        }

        console.log("Form Data:", data);
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res.data.data);
        if (res.data.status == 200) {
            const packagesData = {
                destination_id: data.destination_id,
                title: data.title,
                description: data.description,
                price: data.price,
                duration: data.duration,
                image: res.data.data.display_url
            }
            axiosPublic.post('/packages', packagesData)
                .then(res => {
                    if (res.data.success) {
                        Swal.fire("Success!", "Package added successfully!", "success");
                        reset();
                        setImagePreview(null)
                    }
                    else {
                        Swal.fire("Error!", "Package not added!", "error")
                    }
                })
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-100 p-10 shadow-2xl rounded-xl mt-10">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-blue-700 mb-8">
                Add New Package
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Destination ID */}
                <div className="flex flex-col">
                    <label className="text-xl font-medium text-gray-700">Destination ID</label>
                    <input
                        type="number"
                        placeholder="Enter Destination ID"
                        {...register("destination_id", { required: "Destination ID is required" })}
                        className="mt-2 p-4 rounded-lg bg-gray-50 shadow-sm border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.destination_id && (
                        <p className="text-red-500 text-sm mt-1">{errors.destination_id.message}</p>
                    )}
                </div>

                {/* Title */}
                <div className="flex flex-col">
                    <label className="text-xl font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        placeholder="Enter Package Title"
                        {...register("title", { required: "Title is required" })}
                        className="mt-2 p-4 rounded-lg bg-gray-50 shadow-sm border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label className="text-xl font-medium text-gray-700">Description</label>
                    <textarea
                        placeholder="Enter Package Description"
                        rows="5"
                        {...register("description", { required: "Description is required" })}
                        className="mt-2 p-4 rounded-lg bg-gray-50 shadow-sm border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label className="text-xl font-medium text-gray-700">Price (USD)</label>
                    <input
                        type="number"
                        placeholder="Enter Package Price"
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                            min: { value: 1, message: "Price must be at least 1 USD" },
                        })}
                        className="mt-2 p-4 rounded-lg bg-gray-50 shadow-sm border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                    )}
                </div>

                {/* Duration */}
                <div className="flex flex-col">
                    <label className="text-xl font-medium text-gray-700">Duration (Days)</label>
                    <input
                        type="number"
                        placeholder="Enter Package Duration"
                        {...register("duration", {
                            required: "Duration is required",
                            valueAsNumber: true,
                            min: { value: 1, message: "Duration must be at least 1 day" },
                        })}
                        className="mt-2 p-4 rounded-lg bg-gray-50 shadow-sm border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.duration && (
                        <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                    <label className="text-xl font-medium text-gray-700">Image</label>
                    <div className="relative flex items-center justify-center p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", { required: "Please select an image" })}
                            className="absolute inset-0 h-full opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                        />
                        <span className="text-gray-500">Click to upload image</span>
                    </div>
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                    )}

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mt-4">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-60 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white text-xl font-semibold py-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                    Add Package
                </button>
            </form>
        </div>
    );
};

export default AddPackages;
