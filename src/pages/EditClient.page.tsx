import { Container } from "@gravity-ui/uikit";
import { Params, json, useLoaderData } from "react-router-dom";
import { Client } from "../types/Client.type";
import ClientForm from "../components/forms/ClientForm";


export default function EditClientPage() {
  const client = useLoaderData() as Client;

  return (
    <section className="gravity-form" id="gravity-form">
      <Container maxWidth='l'>
        <div className="gravity-form__inner">
          <ClientForm client={client} intent="EDIT" />
        </div>
      </Container>
    </section>
  );
}


export async function editClientLoader({params}: {params: Params}) {
  if (!params.id || isNaN(parseInt(params.id)) || parseInt(params.id) < 1) {
    throw json({message: 'Невалидный URL'}, {status: 500});
  }

  let response: Response;
  try {
    response = await fetch('http://localhost:3000/clients/'+params.id);
  } catch (error) {
    throw json({message: 'Не получилось скачать данные клиента'}, {status: 500});
  }

  if (!response.ok) {
    throw json({}, {status: 404});
  }

  return await response.json();
}