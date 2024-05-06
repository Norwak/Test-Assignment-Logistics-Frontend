import { Container } from "@gravity-ui/uikit";
import { Params, json, useLoaderData } from "react-router-dom";
import { Carrier } from "../types/Carrier.type";
import CarrierForm from "../components/forms/CarrierForm";


export default function EditCarrierPage() {
  const carrier = useLoaderData() as Carrier;

  return (
    <section className="gravity-form" id="gravity-form">
      <Container maxWidth='l'>
        <div className="gravity-form__inner">
          <CarrierForm carrier={carrier} intent="EDIT" />
        </div>
      </Container>
    </section>
  );
}


export async function editCarrierLoader({params}: {params: Params}) {
  if (!params.id || isNaN(parseInt(params.id)) || parseInt(params.id) < 1) {
    throw json({message: 'Невалидный URL'}, {status: 500});
  }

  let response: Response;
  try {
    response = await fetch('http://localhost:3000/carriers/'+params.id);
  } catch (error) {
    throw json({message: 'Не получилось скачать данные перевозчика'}, {status: 500});
  }

  if (!response.ok) {
    throw json({}, {status: 404});
  }

  return await response.json();
}