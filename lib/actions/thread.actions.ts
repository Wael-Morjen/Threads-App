'use server';

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
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
    try {
        connectToDatabase();

        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });
    
        // Update user model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })
    
        revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`)
    }
};

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
    connectToDatabase();

    // calculate the number of threads to skip
    const skips = pageSize * (pageNumber - 1);

    // fetch the Threads that have no parents (top-level Threads...)
    const postsQuery = Thread.find({
        parentId: {
            $in: [
                null,
                undefined
            ]
        }
    }).sort({
        createdAt: 'desc'
    }).skip(skips)
    .limit(pageSize)
    .populate({ path: 'author', model: User })
    .populate({
        path: 'children',
        populate: {
            path: 'author',
            model: User,
            select: "_id name parentId image"
        }
    })

    const totalThreads = await Thread.countDocuments({
        parentId: {
            $in: [
                null,
                undefined
            ]
        }
    });

    const threads = await postsQuery.exec();

    const Next = totalThreads > skips + threads.length;

    return {
        threads,
        Next
    }
}

export async function fetchThreadById(id: string) {
    connectToDatabase();

    try {
        // TODO: populate community
        const thread = await Thread.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: "_id id name image"
        })
        .populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: "_id id parentId image"
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    }
                }
            ]
        }).exec()

        return thread;
    } catch (error: any) {
        throw new Error(`Failed to fetch thread: ${error.message}`)
    }
}