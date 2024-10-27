import classes from "./Loader.module.scss";

interface LoaderProps {
  className?: string;
  size?: "s" | "m";
}
export const Loader = (props: LoaderProps) => {
  const { className, size = "s" } = props;

  const currentClasses = [
    classes.Loader,
    classes[`size_${size}`],
    className,
  ].join(" ");

  return <span className={currentClasses}></span>;
};
