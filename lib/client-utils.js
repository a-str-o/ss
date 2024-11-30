"use client";

import { useRouter, usePathname } from "next/navigation";

export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  return { router, pathname };
}

export const isLocationMatch = (targetLocation, locationName) => {
  return (
    locationName === targetLocation ||
    locationName.startsWith(`${targetLocation}/`)
  );
};

export const getDynamicPath = (pathname) => {
  if (!pathname) return "";
  const paths = pathname.split("/");
  return paths[paths.length - 1];
};
