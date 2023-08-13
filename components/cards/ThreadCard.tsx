
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
}) => {
    return (
        <article>
            <h2 className="text-small-regular text-light-2">
                {content}
            </h2>
        </article>
    );
}
 
export default ThreadCard;