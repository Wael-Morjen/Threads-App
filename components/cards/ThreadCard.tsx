import Image from "next/image";
import Link from "next/link";

interface ThreadCardProps {
    id: string;
    currentUserId: string
    parentId: string | null
    content: string;
    author: {
        id: string;
        name: string;
        image: string;
    }
    community: {
        id: string;
        name: string;
        image: string;
    } | null
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[]
    isComment?: boolean;
}

const ThreadCard: React.FC<ThreadCardProps> = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment
}) => {
    return (
        <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
            <div className="flex items-start justify-between">
                <div className="flex flex-1 w-full flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link 
                            href={`/profile/${author.id}`} 
                            className="relative h-11 w-11"
                        >
                            <Image 
                                src={author.image}
                                alt={author.name}
                                fill
                                className="cursor-pointer rounded-full"
                            />
                        </Link>
                        <div className="relative mt-2 w-0.5 grow rounded-full bg-primary-500"/>
                    </div>

                    <div className="flex flex-col w-full">
                        <Link
                            href={`/profile/${author.id}`}
                            className="w-fit"
                        >
                            <h4 className="cursor-pointer text-base-semibold text-light-1">
                                {author.name}
                            </h4>
                        </Link>
                        <p className="mt-2 text-small-regular text-light-2">
                            {content}
                        </p>
                        <div className="mt-4 gap-3 flex-col flex">
                            <div className="flex gap-4">
                                <Image
                                    src="/assets/heart-gray.svg"
                                    alt="heart"
                                    width={25}
                                    height={25}
                                    className="cursor-pointer object-contain"
                                />
                                <Link href={`/thread/${id}`}>
                                    <Image
                                        src="/assets/reply.svg"
                                        alt="reply"
                                        width={25}
                                        height={25}
                                        className="cursor-pointer object-contain"
                                    />
                                </Link>
                                <Image
                                    src="/assets/repost.svg"
                                    alt="repost"
                                    width={25}
                                    height={25}
                                    className="cursor-pointer object-contain"
                                />
                                <Image
                                    src="/assets/share.svg"
                                    alt="share"
                                    width={25}
                                    height={25}
                                    className="cursor-pointer object-contain"
                                />
                            </div>
                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">
                                        {comments.length} replies
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
 
export default ThreadCard;