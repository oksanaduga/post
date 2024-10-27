import { useState } from "react";

import { useWindowEvent } from "@/shared/hooks/useWindowEvent/useWindowEvent";

export const UseEventExample = () => {
  const [{ x, y, diffX, diffY }, setMousePosition] = useState({
    x: 0,
    y: 0,
    diffX: 0,
    diffY: 0,
  });
  console.log("render");

  useWindowEvent("mousemove", (e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
      diffX: e.clientX - x,
      diffY: e.clientY - y,
    });
  });

  return (
    <div>
      <h2>mouse position</h2>
      <div>x: {x}</div>
      <div>y: {y}</div>
      <h3>mouse diff</h3>
      <div>diff X: {diffX}</div>
      <div>diff Y: {diffY}</div>
    </div>
  );
};
