import {useEffect, useState} from "react";

export type Direction = "ltr" | "rtl";

const DIRECTION_STORAGE_KEY = "rixl-ui-playground-direction";

function getInitialDirection(): Direction {
  if (typeof localStorage === "undefined") return "ltr";
  return localStorage.getItem(DIRECTION_STORAGE_KEY) === "rtl" ? "rtl" : "ltr";
}

/** The page's reading direction. Setting `dir` on `<html>` also covers portalled popups and the mobile sidebar sheet. */
export function useDirection(): [Direction, (next: Direction) => void] {
  const [direction, setDirectionState] = useState<Direction>(getInitialDirection);

  const setDirection = (next: Direction) => {
    localStorage.setItem(DIRECTION_STORAGE_KEY, next);
    setDirectionState(next);
  };

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return [direction, setDirection];
}
