import { Form, Params, json, redirect, useActionData, useNavigation } from "react-router-dom";
import {DateField} from '@gravity-ui/date-components';
import {FormRow} from '@gravity-ui/components';
import { dateTimeParse } from "@gravity-ui/date-utils";
import { Button, Select, TextArea } from "@gravity-ui/uikit";
import { useState } from "react";
import { Client } from "../../types/Client.type";

type DataClientForm = {
  client?: Client,
  intent: 'NEW'|'EDIT'
};

const ClientForm: React.FC<DataClientForm> = ({client, intent = 'NEW'}) => {
  const navigation = useNavigation();
  const responseData = useActionData() as {message: string[]} | undefined;
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      {!client && <h1>Новый клиент</h1>}
      {client && <h1>Редактирование клиента №{client.id}</h1>}

      {responseData && responseData.message && (
        <ul className="error-list mt10">
          {Object.values(responseData.message).map(err => <li key={err}>{err}</li>)}
        </ul>
      )}

      <Form className="mt30" method="POST">
        <input type="hidden" name="intent" defaultValue={intent} />

        <FormRow label="Название клиента:">
          <TextArea name="name" defaultValue={client && client.name || ''}></TextArea>
        </FormRow>

        <Button type="submit" loading={isSubmitting}>Сохранить</Button>
      </Form>
    </>
  );
}

export default ClientForm;


export async function clientFormAction({request, params}: {request: Request, params: Params}) {
  const formData = await request.formData();
  const formObj = Object.fromEntries(formData.entries());


  if (formObj.intent === 'NEW') {
    let response: Response;
    try {
      response = await fetch('http://localhost:3000/clients', {
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
      await fetch('http://localhost:3000/clients/'+params.id, {
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


  return redirect('/admin/clients/');
}