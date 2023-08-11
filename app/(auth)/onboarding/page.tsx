import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
    const user = await currentUser();

    const userInfo = {};

    const userData = {
        id: user?.id,
        objecetId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl,
    }

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start py-20 px-10">
            <h1 className="text-heading2-bold text-light-1">
                Onboarding
            </h1>
            <p className="mt-3 text-base-regular text-light-2">
                Complete your profile to use Threads
            </p>
            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile 
                    user={userData} 
                    btnTitle="Continue"
                />
            </section>
        </main>
    );
}
 
export default Page;