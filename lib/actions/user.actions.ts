'use server';

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";
import Thread from "../models/thread.model";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path
    }: Params): Promise<void> {
    connectToDatabase();

    try {
        await User.findOneAndUpdate(
            { id: userId },
            { 
                username: username.toLowerCase(),
                bio,
                image,
                name,
                onboarded: true,
            },
            { upsert: true }
        );
    
        if (path === '/profile/edit') {
            revalidatePath(path)
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToDatabase();

        return await User
            .findOne({ id:userId })
            //.populate({
            //    path: 'communities',
            //    model: Community
            //})
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}

export async function fetchUserThreads(userId: string) {
    try {
        connectToDatabase();

        // Find all threads authored by user with given userId
        // TODO: populate community
        const threads = await User.findOne({
            id: userId
        }).populate({
            path: 'threads',
            model: Thread,
            populate: {
                path: 'children',
                model: Thread,
                populate: {
                    path: 'author',
                    model: User,
                    select: 'name image id'
                }
            }
        })

        return threads;
    } catch (error: any) {
        throw new Error(`Failed to fetch user Threads: ${error.message}`)
    }
}