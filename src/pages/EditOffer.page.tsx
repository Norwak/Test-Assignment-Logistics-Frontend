import { Container } from "@gravity-ui/uikit";
import OfferForm from "../components/forms/OfferForm";
import { Params, json, useLoaderData } from "react-router-dom";
import { Offer } from "../types/Offer.type";
import { Client } from "../types/Client.type";
import { Carrier } from "../types/Carrier.type";


export default function EditOfferPage() {
  const data = useLoaderData() as {offer: Offer, clients: Client[], carriers: Carrier[]};

  return (
    <section className="gravity-form" id="gravity-form">
      <Container maxWidth='l'>
        <div className="gravity-form__inner">
          <OfferForm data={data} intent="EDIT" />
        </div>
      </Container>
    </section>
  );
}


export async function editOfferLoader({params}: {params: Params}) {
  if (!params.id || isNaN(parseInt(params.id)) || parseInt(params.id) < 1) {
    throw json({message: 'Невалидный URL'}, {status: 500});
  }

  let responseOffers: Response;
  let responseClients: Response;
  let responseCarriers: Response;
  try {
    responseOffers = await fetch('http://localhost:3000/offers/'+params.id);
    responseClients = await fetch('http://localhost:3000/clients');
    responseCarriers = await fetch('http://localhost:3000/carriers');
  } catch (error) {
    throw json({message: 'Не получилось скачать данные заявки'}, {status: 500});
  }

  if (!responseOffers.ok || !responseClients.ok || !responseCarriers.ok) {
    throw json({}, {status: 404});
  }

  const offer = await responseOffers.json();
  const clients = await responseClients.json();
  const carriers = await responseCarriers.json();

  return {offer, clients, carriers};
}