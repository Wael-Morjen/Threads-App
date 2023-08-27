import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface ThreadsTabProps {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

const ThreadsTab: React.FC<ThreadsTabProps> = async ({
    currentUserId,
    accountId,
    accountType
}) => {
    let result = await fetchUserThreads(accountId);

    if(!result) redirect('/');

    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread: any) => (
                <ThreadCard 
                    key={thread.id}
                    id={thread.id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === 'User'
                            ? {
                                name: result.name, 
                                image: result.image,
                                id: result.id
                            }
                            : {
                                name: thread.author.name,
                                image: thread.author.image,
                                id: thread.author.id
                            }
                    }
                    community={thread.community} // TODO
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            ))}
        </section>
    );
}
 
export default ThreadsTab;