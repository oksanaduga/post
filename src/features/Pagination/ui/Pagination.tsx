//TODO
import classes from "./Pagination.module.scss";

interface PaginationProps {
  contentLength: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  contentLength,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const page = contentLength === 0 ? 0 : currentPage;

  return (
    <div className={classes.wrapper}>
      <button
        disabled={page < 2}
        className={classes.button}
        onClick={() => onPageChange(page - 1)}
      >
        prev
      </button>
      {page}
      <button onClick={() => onPageChange(page + 1)} className={classes.button}>
        next
      </button>
    </div>
  );
};
