import { Form, Params, json, redirect, useNavigation } from "react-router-dom";
import { Offer } from "../../types/Offer.type";
import {DateField} from '@gravity-ui/date-components';
import {FormRow} from '@gravity-ui/components';
import { dateTimeParse } from "@gravity-ui/date-utils";
import { Button, Select, TextArea } from "@gravity-ui/uikit";
import { useState } from "react";
import { Client } from "../../types/Client.type";
import { Carrier } from "../../types/Carrier.type";

type DataOfferForm = {
  data: {
    offer: Offer,
    clients: Client[],
    carriers: Carrier[]
  },
  intent: 'NEW'|'EDIT'
};

const OfferForm: React.FC<DataOfferForm> = ({data, intent = 'NEW'}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const offer = data.offer;
  const clients = data.clients;
  const carriers = data.carriers;

  const [status, setStatus] = useState<string[]>([offer.status.toString()]);
  const [clientId, setClientId] = useState<string[]>([offer.client.id.toString()]);
  const [carrierId, setCarrier] = useState<string[]>([offer.carrier.id.toString()]);

  const date = dateTimeParse(offer.date);

  return (
    <>
      <h1>Редактирование заявки №{offer.id}</h1>

      <Form className="mt30" method="POST">
        <input type="hidden" name="intent" defaultValue={intent} />
        <input type="hidden" name="status" defaultValue={status[0]} />
        <input type="hidden" name="clientId" defaultValue={clientId[0]} />
        <input type="hidden" name="carrierId" defaultValue={carrierId[0]} />

        <FormRow label="Дата:">
          <DateField defaultValue={date} name="date" format={'DD.MM.YYYY HH:mm'} />
        </FormRow>

        <FormRow label="Статус:">
          <Select value={status} onUpdate={(nextValue) => setStatus(nextValue)}>
            <Select.Option value='0'>Новый</Select.Option>
            <Select.Option value='1'>В работе</Select.Option>
            <Select.Option value='2'>Завершено</Select.Option>
          </Select>
        </FormRow>

        <FormRow label="Клиент:">
          <Select value={clientId} onUpdate={(nextValue) => setClientId(nextValue)}>
            {clients.map(client => <Select.Option key={client.id} value={client.id.toString()}>{client.name}</Select.Option>)}
          </Select>
        </FormRow>

        <FormRow label="Перевозчик:">
          <Select value={carrierId} onUpdate={(nextValue) => setCarrier(nextValue)}>
            {carriers.map(carrier => <Select.Option key={carrier.id} value={carrier.id.toString()}>{carrier.name}</Select.Option>)}
          </Select>
        </FormRow>

        <FormRow label="Комментарии:">
          <TextArea name="notes" defaultValue={offer.notes || ''}></TextArea>
        </FormRow>

        <Button type="submit" loading={isSubmitting}>Сохранить</Button>
      </Form>
    </>
  );
}

export default OfferForm;


export async function OfferFormAction({request, params}: {request: Request, params: Params}) {
  if (!params.id || isNaN(parseInt(params.id)) || parseInt(params.id) < 1) {
    throw json({message: 'Невалидный URL'}, {status: 500});
  }

  const formData = await request.formData();
  const formObj = Object.fromEntries(formData.entries());
  
  if (formObj.intent = 'EDIT') {
    try {
      await fetch('http://localhost:3000/offers/'+params.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObj)
      });
    } catch (error) {
      throw json({message: 'При сохранении возникла ошибка'}, {status: 500});
    }
  }

  return redirect('/admin/');
}