import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const RGBToHex = (r, g, b) => {
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const hexToRGB = (hex, alpha) => {
  try {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
  } catch (error) {
    return hex;
  }
};

export const formatTime = (time) => {
  if (!time) return "";
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};

export const isObjectNotEmpty = (obj) => {
  return obj && Object.keys(obj).length > 0;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getWords = (inputString) => {
  return inputString
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter((word) => word.length > 0);
};

export const translate = (title, trans) => {
  if (!trans || !title) return title;
  const translation = trans[title];
  return translation || title;
};
