import Thread from "../models/thread.model";
import { connectToDatabase } from "../mongoose";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({
    text,
    author,
    communityId,
    path
}: Params) {
    connectToDatabase();

    const createdThread = await Thread.create({
        text,
        author,
        community: null,
    });

    // Update user model
    await
};