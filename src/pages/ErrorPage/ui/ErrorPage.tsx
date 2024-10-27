import classes from "./ErrorPage.module.scss";

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage = (props: ErrorPageProps) => {
  const { className } = props;

  const errorClassName = [classes.Error, className].join(" ");

  return (
    <div className={errorClassName}>
      <h1>Разработчик где-то облажался, но прогуглил отлов ошибок</h1>
      <h2>Попробуйте перезагрузить страницу</h2>
    </div>
  );
};
