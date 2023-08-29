'use client';

import { sidebarLinks } from "@/constants"
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { userId } = useAuth();

    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex flex-1 flex-col w-full gap-6 px-6">
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

                    if(link.route === '/profile') link.route = `${link.route}/${userId}`;
                    
                return (
                    <Link
                        key={link.label}
                        href={link.route}
                        className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                            isActive && "bg-primary-500"
                        }`}
                    >
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={30}
                            height={30}
                        />
                        <p className="text-light-1 max-lg:hidden">
                            {link.label}
                        </p>
                    </Link>
                )})}
            </div>

            <div className="mt-10 px-6">
            <SignedIn>
                <SignOutButton signOutCallback={() => router.push('/sign-in')}>
                    <div className="flex cursor-pointer gap-4 p-4">
                        <Image 
                            src="/assets/logout.svg"
                            alt="logout"
                            width={24}
                            height={24}
                        />
                        <p className="text-light-2 max-lg:hidden">Logout</p>
                    </div>
                </SignOutButton>
            </SignedIn>
            </div>

        </section>
    )
}
 
export default LeftSidebar;