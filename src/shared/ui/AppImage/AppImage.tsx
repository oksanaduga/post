import { useLayoutEffect, useState } from "react";

import { Loader } from "../Loader/Loader";
import classes from "./AppImage.module.scss";

interface AppImageProps {
  className?: string;
  size?: "s";
  src: string;
  alt?: string;
}

export const AppImage = (props: AppImageProps) => {
  const { className, size = "s", src, alt = "image" } = props;

  const imgClasses = [
    classes.AppImage,
    classes[`size_${size}`],
    className,
  ].join(" ");

  const loaderClasses = [classes.loader, classes[`size_${size}`]].join(" ");

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useLayoutEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      setIsLoading(false);
    };

    image.onerror = () => {
      setIsLoading(false);
      setIsError(true);
    };
  }, []);

  if (isLoading) {
    return (
      <div className={loaderClasses}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <img
      className={imgClasses}
      //TODO
      //srcset="small.jpg 320w, medium.jpg 640w, large.jpg 1024w"
      alt={alt}
      src={src}
    />
  );
};
