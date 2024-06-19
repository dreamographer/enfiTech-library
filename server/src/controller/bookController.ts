import { Request, Response } from "express";
import Book from "../database/models/bookModel";
// book controller
export const bookController = {
  // function for adding books
  addBook: async (req: Request, res: Response) => {
    const { name, description, publishDate, price } = req.body; //data from the client

    if (!name || !description || !publishDate || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const book = new Book({ name, description, publishDate, price });
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ message: error.message });
      else console.error("Unknown error:", error);
    }
  },

  // function for listing the books
  listBook: async (req: Request, res: Response) => {
    const { page = 1, limit = 4, search = "" } = req.query;//query for number of op
    let pages=page
    
    
    const searchQuery = new RegExp(search as string, "i"); //regex for search query
    
    try {
      const count = await Book.countDocuments({
      $or: [{ name: searchQuery }, { description: searchQuery }],
    }); //get the count of documents with the search 
    // reseting the pages if less number of op
    if (count <4) {
      pages = 1;
    }
  

    // getting the valid books
      const books = await Book.find({
        $or: [{ name: searchQuery }, { description: searchQuery }],
      })
        .limit(Number(limit))
        .skip((Number(pages) - 1) * Number(limit))    
        

      res.status(200).json({
        books,
        totalPages: Math.ceil(count / Number(limit)),
        currentPage: Number(pages),
      });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ message: error.message });
      else console.error("Unknown error:", error);
    }
  },
};
