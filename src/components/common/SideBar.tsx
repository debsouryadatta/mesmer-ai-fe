"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBookmark,
  IconBrandGoogleFilled,
  IconBrandTabler,
  IconLayoutGrid,
  IconLogin2,
  IconSearch,
  IconSettings,
  IconSquareRoundedPlus,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
// import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";
import { useUserStore } from "@/store/global";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export function SideBar({children}: Readonly<{children: React.ReactNode;}>) {
  // const session = useSession();
  const { user, setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await axios.get("https://mesmer-ai-be.souryax.tech/api/user/me", {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        console.log(response);
        if(response?.data?.success) {
          setUser({email: response?.data?.email, name: response?.data?.name});
        }
      } catch (error) {
        console.log(error);
        // toast.error("Error fetching user");
      }
    }

    fetchUser();
  }, [])

  const signedInLinks = [
    {
      label: "Gallery",
      href: "/gallery",
      icon: (
        <IconLayoutGrid className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Search",
      href: "/search",
      icon: (
        <IconSearch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create",
      href: "/create",
      icon: (
        <IconSquareRoundedPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Bookmarks",
    //   href: "/bookmarks",
    //   icon: (
    //     <IconBookmark className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    // {
    //   label: "Profile",
    //   // href: `/profile/${session?.data?.user?.id!}`,
    //   icon: (
    //     <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    // {
    //   label: "Settings",
    //   href: "/settings",
    //   icon: (
    //     <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: "SignOut",
      href: "/signOut",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const signedOutLinks = [
    {
      label: "Gallery",
      href: "/gallery",
      icon: (
        <IconLayoutGrid className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Search",
      href: "/search",
      icon: (
        <IconSearch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create",
      href: "/create",
      icon: (
        <IconSquareRoundedPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "SignIn/SignUp",
      href: "/credentials",
      icon: (
        <IconLogin2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  let links = [];
  // links = signedOutLinks;
  if(user){
    links = signedInLinks;
  } else {
    links = signedOutLinks;
  }

  

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} setOpen={setOpen} setUser={setUser} router={router} className="hover:bg-gray-300 dark:hover:bg-neutral-900 rounded-lg px-1" />
              ))}
            </div>
          </div>
          <div>
          <div className="ml-[-7px] mb-4 flex items-center">
            <ThemeToggle />
            {open && (
              <motion.div 
                className="ml-1 text-[15px] text-neutral-700 dark:text-neutral-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }} // Adjust the duration as needed
              >
                Themes
              </motion.div>
            )}
          </div>
            {/* {session?.data?.user && (
              <SidebarLink
                link={{
                  label: `${session?.data?.user?.name}`,
                  href: "#",
                  icon: (
                    <Image
                      src={session?.data?.user?.image!}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            )} */}
            {user && (
              <SidebarLink
                link={{
                  label: `${user?.name}`,
                  href: "#",
                  icon: (
                    <span className="h-7 w-7 flex-shrink-0 rounded-full bg-slate-900 text-zinc-100 text-center dark:bg-zinc-100 dark:text-black font-bold">{user?.name.slice(0,1).toUpperCase()}</span>
                  ),
                }}
              />
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      {/* <Dashboard /> */}
      <div className="w-full bg-gradient-to-r from-stone-400 to-stone-100 dark:from-stone-800 dark:to-stone-950">
        {children}
      </div>
    </div>
  );
}
export const Logo = () => {
  const { theme } = useTheme();
  return (
    <Link
      href="/gallery"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Mesmer Ai
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  const { theme } = useTheme();
  return (
    <Link
      href="/gallery"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
