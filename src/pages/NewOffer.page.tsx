import { Container } from "@gravity-ui/uikit";
import OfferForm from "../components/forms/OfferForm";
import { json, useLoaderData } from "react-router-dom";
import { Client } from "../types/Client.type";
import { Carrier } from "../types/Carrier.type";


export default function NewOfferPage() {
  const data = useLoaderData() as {clients: Client[], carriers: Carrier[]};

  return (
    <section className="gravity-form" id="gravity-form">
      <Container maxWidth='l'>
        <div className="gravity-form__inner">
          <OfferForm data={data} intent="NEW" />
        </div>
      </Container>
    </section>
  );
}


export async function newOfferLoader() {
  let responseClients: Response;
  let responseCarriers: Response;
  try {
    responseClients = await fetch('http://localhost:3000/clients');
    responseCarriers = await fetch('http://localhost:3000/carriers');
  } catch (error) {
    throw json({message: 'Не получилось скачать данные заявки'}, {status: 500});
  }

  if (!responseClients.ok || !responseCarriers.ok) {
    throw json({}, {status: 404});
  }

  const clients = await responseClients.json();
  const carriers = await responseCarriers.json();

  return {clients, carriers};
}