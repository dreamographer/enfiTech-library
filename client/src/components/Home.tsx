import { useEffect, useState } from "react";
import axios from "axios";
import BookForm from "./BookForm";
import useDebounce from "../hooks/useDebounce";
interface IBook {
  _id?: string;
  name: string;
  description: string;
  publishDate: string; // Keeping it as string because it will be in ISO format when received from backend
  price: number;
}
const Home = () => {
  // states for books and paginagtion
  const [books, setBooks] = useState<IBook[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formOpen, serFormOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 500);//custom debounce hook for serach
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // function for fetching data from server
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/books`, {
        params: { page, search },
      });
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  // for inital loding of data
  useEffect(()=>{
    fetchBooks();
  },[page])


// debounced search
  useEffect(() => {

    if (debouncedSearchTerm) {
      fetchBooks();
    }
  }, [debouncedSearchTerm,search]);


  // fn for opeing book form
  const openAddBook = () => {
    serFormOpen(true);
  };
  return (
    <div className="container mx-auto px-4 py-8 text-slate-100 ">
      <h1 className="text-center text-5xl p-5 font-bold ">EnfiTech Library</h1>
      {formOpen && <BookForm onClose={() => serFormOpen(false)} />}
      <div className="flex flex-col mb-4">
        <input
          type="text"
          placeholder="Search your favourite books by name or description"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-24 text-center rounded-md border border-gray-300 px-3 text-gray-800 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <ul className="list-disc space-y-4">
        {books &&
          books.map(book => (
            <li key={book._id} className="shadow rounded-md p-4">
              <h3>{book.name}</h3>
              <p className="text-gray-500">{book.description}</p>
              <p className="text-gray-500">{book.publishDate}</p>
              <p className="font-bold">₹ {book.price}</p>
            </li>
          ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="rounded-md bg-gray-200 text-gray-500 px-4 py-2 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(prev => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
          className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
      <div className="text-center mt-8">
        <button
          onClick={openAddBook}
          className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
        >
          Add Books
        </button>
      </div>
    </div>
  );
};

export default Home;
