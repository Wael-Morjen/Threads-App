'use client';

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Bottombar = () => {
    const pathname = usePathname();

    return (
        <section 
            className="
                fixed 
                bottom-0 
                z-10 
                w-full 
                rounded-t-3xl 
                bg-glassmorphism 
                p-4 
                backdrop-blur-lg 
                xs:px-7 
                md:hidden
            "
        >
            <div className="flex items-center justify-between gap-3 xs:gap-5">
            {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
                return (
                    <Link
                        key={link.label}
                        href={link.route}
                        className={`relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${
                            isActive && "bg-primary-500"
                        }`}
                    >
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={30}
                            height={30}
                        />
                        <p className="text-subtle-medium text-light-1 max-sm:hidden">
                            {link.label.split(/\s+./)[0]}
                        </p>
                    </Link>
                )})}
            </div>
        </section>
    );
}
 
export default Bottombar;