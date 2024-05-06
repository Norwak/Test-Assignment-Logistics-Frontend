import { Form, Params, json, redirect, useActionData, useNavigation } from "react-router-dom";
import { Offer } from "../../types/Offer.type";
import {DateField} from '@gravity-ui/date-components';
import {FormRow} from '@gravity-ui/components';
import { dateTimeParse } from "@gravity-ui/date-utils";
import { Button, Select, TextArea, colorText } from "@gravity-ui/uikit";
import { useState } from "react";
import { Client } from "../../types/Client.type";
import { Carrier } from "../../types/Carrier.type";

type DataOfferForm = {
  data: {
    offer?: Offer,
    clients: Client[],
    carriers: Carrier[]
  },
  intent: 'NEW'|'EDIT'
};

const OfferForm: React.FC<DataOfferForm> = ({data, intent = 'NEW'}) => {
  const navigation = useNavigation();
  const responseData = useActionData() as {message: string[]} | undefined;
  const isSubmitting = navigation.state === 'submitting';

  const clients = data.clients;
  const carriers = data.carriers;
  
  let statusDefault = ['0'];
  let clientIdDefault = ['-'];
  let carrierIdDefault = ['-'];
  let date = dateTimeParse();

  if (data.offer && intent === 'EDIT') {
    const offer = data.offer;

    statusDefault = [offer.status.toString()];
    clientIdDefault = [offer.client.id.toString()];
    carrierIdDefault = [offer.carrier.id.toString()];
  
    date = dateTimeParse(offer.date);
  }

  const [status, setStatus] = useState<string[]>(statusDefault);
  const [clientId, setClientId] = useState<string[]>(clientIdDefault);
  const [carrierId, setCarrierId] = useState<string[]>(carrierIdDefault);


  return (
    <>
      {!data.offer && <h1>Новая заявка</h1>}
      {data.offer && <h1>Редактирование заявки №{data.offer.id}</h1>}

      {responseData && responseData.message && (
        <ul className="error-list mt10">
          {Object.values(responseData.message).map(err => <li key={err}>{err}</li>)}
        </ul>
      )}

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
          <Select value={carrierId} onUpdate={(nextValue) => setCarrierId(nextValue)}>
            {carriers.map(carrier => <Select.Option key={carrier.id} value={carrier.id.toString()}>{carrier.name}</Select.Option>)}
          </Select>
        </FormRow>

        <FormRow label="Комментарии:">
          <TextArea name="notes" defaultValue={data.offer && data.offer.notes || ''}></TextArea>
        </FormRow>

        <Button type="submit" loading={isSubmitting}>Сохранить</Button>
      </Form>
    </>
  );
}

export default OfferForm;


export async function offerFormAction({request, params}: {request: Request, params: Params}) {
  const formData = await request.formData();
  const formObj = Object.fromEntries(formData.entries());

  if (formObj.intent === 'NEW') {
    let response: Response;
    try {
      response = await fetch('http://localhost:3000/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObj)
      });
    } catch (error) {
      throw json({message: 'При сохранении возникла ошибка'}, {status: 500});
    }

    if (!response.ok) {
      return response;
    }
  }
  
  if (formObj.intent === 'EDIT') {
    if (!params.id || isNaN(parseInt(params.id)) || parseInt(params.id) < 1) {
      throw json({message: 'Невалидный URL'}, {status: 500});
    }

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