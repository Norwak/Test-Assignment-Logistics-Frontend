import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import { Container } from "@gravity-ui/uikit";

export default function ErrorPage() {
  const error = useRouteError() as {status: number, data: {message: string},  error: {message: string}};

  let title = 'Произошла ошибка!';
  if (error.status === 404) {
    title = '404 Страница не найдена';
  }
  if (error.status === 500) {
    title = '500 Ошибка сервера';
  }

  console.log(error);

  return (
    <>
      <Header />
      <main className="mt30">
        <Container maxWidth='l'>
          <h1 className="mt">{title}</h1>
          <p>{error.data && error.data.message || error.error && error.error.message || ''}</p>
        </Container>
      </main>
      <style>
        {'.loading {display: none;}'}
      </style>
    </>
  );
}