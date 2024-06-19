import { Router, Request, Response } from "express";
import Book from "../database/models/bookModel";
import { bookController } from "../controller/bookController";
import { validateRequest } from "../middleware/validateRequest";
import { bookSchema } from "../middleware/validator/bookValidator";
const router: Router = Router();

// Add a new book
router.post("/",validateRequest(bookSchema), bookController.addBook);

// List books with search and pagination
router.get("/",bookController.listBook );

export default router;
