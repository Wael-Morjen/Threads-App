'use client';

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface UserCardProps {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
}

const UserCard: React.FC<UserCardProps> = ({
    id,
    name,
    username,
    imgUrl,
    personType
}) => {
    const router = useRouter()

    const isCommunity = personType === "Community";

    return (
        <article className="flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center">
            <div className="flex flex-1 items-start justify-start gap-3 xs:items-center">
                <Image 
                    src={imgUrl}
                    alt="Logo"
                    width={48}
                    height={48}
                    className="rounded-full"
                />

                <div className="flex-1 text-ellipsis">
                    <h4 className="text-base-semibold text-light-1">
                        {name}
                    </h4>
                    <p className="text-small-medium text-gray-1">
                        @{username}
                    </p>
                </div>
            </div>

            <Button 
                className="h-auto min-w-[74px] rounded-lg bg-primary-500 text-[12px] text-light-1 !important"
                onClick={() => {
                    if (isCommunity) {
                        router.push(`/communities/${id}`);
                    } else {
                        router.push(`/profile/${id}`);
                    }
                }}
            >
                View
            </Button>
        </article>
    );
}
 
export default UserCard;