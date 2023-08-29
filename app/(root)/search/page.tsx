import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {

    const user = await currentUser();
    if (!user) {
        return null;
    }

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) {
        redirect("/onboarding");
    }

    // Fetch users
    const res = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    })

    return (
        <section>
            <h1 className="text-heading2-bold text-light-1 mb-10">
                Search
            </h1>
            {/* SearchBar */}

            <div className="mt-14 flex flex-col gap-9">
                {res.users.length === 0 ? (
                    <p className="no-result">
                        No users found
                    </p>
                ) : (
                    <>
                        {res.users.map((person) => (
                            <UserCard 
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType='User'
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}
 
export default Page;