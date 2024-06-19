import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
const BASE_URL = import.meta.env.VITE_BASE_URL;
type Props = {
  onClose:()=>void
};
const BookForm = ({ onClose }: Props) => {
  // state for form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [price, setPrice] = useState(0);
  // error states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // fn for form validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
     if (!description.trim()) {
       newErrors.description = "Description is required";
     } else if (description.trim().length < 10) {
       newErrors.description = "Description must be at least 5 characters long";
     }
    if (!publishDate) {
      newErrors.publishDate = "Publish date is required";
    }
    if (price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newBook = {
      name,
      description,
      publishDate,
      price,
    };

    try {
      // Sending the data to teh backend
      const response = await axios.post(`${BASE_URL}/books`, newBook);
      console.log(response.data);
      toast.success("Book Added Successfully")

      // reseting the form
      setName("");
      setDescription("");
      setPublishDate("");
      setPrice(0);
      setErrors({});
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);
        error.response.data.error.forEach((err:any)=>{
          toast.error(err.message); 
        })
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div
      className={`fixed text-black inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out ${
        !false
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4 py-2">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md px-5 py-4">
          <h5 className="text-xl font-medium mb-2">Add Book</h5>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>
            <div className="mt-4">
              <label>Description:</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              {errors.description && (
                <span className="text-red-500">{errors.description}</span>
              )}
            </div>
            <div className="mt-4">
              <label>Publish Date:</label>
              <input
                type="date"
                value={publishDate}
                onChange={e => setPublishDate(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              {errors.publishDate && (
                <span className="text-red-500">{errors.publishDate}</span>
              )}
            </div>
            <div className="mt-4">
              <label>Price:</label>
              <input
                type="number"
                defaultValue={price}
                onChange={e => setPrice(Number(e.target.value))}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              {errors.price && (
                <span className="text-red-500">{errors.price}</span>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
