import type { ObjectId } from "mongoose";
import User from "../models/User.ts";

export class TagService {
  async getTags(userId: ObjectId) {
    try {
      const user = await User.findById(userId).select("tags");

      if (!user) {
        throw new Error("User not found");
      }

      return user.tags;
    } catch (error) {
      throw error;
    }
  }

  async addTag(userId: ObjectId, tag: string) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const normalizedTag = tag.toLowerCase().trim();

      if (user.tags.includes(normalizedTag)) {
        throw new Error("Tag already exists");
      }

      user.tags.push(normalizedTag);
      await user.save();

      return user.tags;
    } catch (error) {
      throw error;
    }
  }

  async removeTag(userId: ObjectId, tag: string) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const normalizedTag = tag.toLowerCase().trim();
      const initialLength = user.tags.length;

      user.tags = user.tags.filter((t) => t !== normalizedTag);

      if (user.tags.length === initialLength) {
        throw new Error("Tag not found");
      }

      await user.save();

      return user.tags;
    } catch (error) {
      throw error;
    }
  }
}

export const tagService = new TagService();
