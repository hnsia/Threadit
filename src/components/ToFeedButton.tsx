"use client";

import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/Button";
import { ChevronLeft } from "lucide-react";

const ToFeedButton = () => {
  const pathname = usePathname();

  const subthreaditPath = getSubthreaditPath(pathname);

  return (
    <a href={subthreaditPath} className={buttonVariants({ variant: "ghost" })}>
      <ChevronLeft className="h-4 w-4 mr-1" />
      {subthreaditPath === "/" ? "Back to home" : "Back to community"}
    </a>
  );
};

const getSubthreaditPath = (pathname: string) => {
  const splitPath = pathname.split("/");

  // if path is /t/mycommunity, go back to /
  if (splitPath.length === 3) return "/";
  // if path is /t/mycommunity/post/csfsd231532ei, go back to /t/mycommunity
  else if (splitPath.length > 3) return `/${splitPath[1]}/${splitPath[2]}`;
  // default path, in case pathname does not match expected format
  else return "/";
};

export default ToFeedButton;
