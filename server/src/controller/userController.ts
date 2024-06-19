import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../database/models/userModel";
export const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      console.log("existing user",existingUser);
      
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("error at register",error);
        
      res.status(500).json({ message: "Server error" });
    }
  },
};
