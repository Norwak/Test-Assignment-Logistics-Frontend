import { Form, Params, json, redirect, useActionData, useNavigation } from "react-router-dom";
import {FormRow} from '@gravity-ui/components';
import { Button, TextArea } from "@gravity-ui/uikit";
import { Carrier } from "../../types/Carrier.type";

type DataCarrierForm = {
  carrier?: Carrier,
  intent: 'NEW'|'EDIT'
};

const CarrierForm: React.FC<DataCarrierForm> = ({carrier, intent = 'NEW'}) => {
  const navigation = useNavigation();
  const responseData = useActionData() as {message: string[]} | undefined;
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      {!carrier && <h1>Новый перевозчик</h1>}
      {carrier && <h1>Редактирование перевозчика №{carrier.id}</h1>}

      {responseData && responseData.message && (
        <ul className="error-list mt10">
          {Object.values(responseData.message).map(err => <li key={err}>{err}</li>)}
        </ul>
      )}

      <Form className="mt30" method="POST">
        <input type="hidden" name="intent" defaultValue={intent} />

        <FormRow label="Название перевозчика:">
          <TextArea name="name" defaultValue={carrier && carrier.name || ''}></TextArea>
        </FormRow>

        <FormRow label="Телефон:">
          <TextArea name="phone" defaultValue={carrier && carrier.phone || ''}></TextArea>
        </FormRow>

        <FormRow label="ATI ID:">
          <TextArea name="atiId" defaultValue={carrier && carrier.atiId?.toString() || ''}></TextArea>
        </FormRow>

        <Button type="submit" loading={isSubmitting}>Сохранить</Button>
      </Form>
    </>
  );
}

export default CarrierForm;


export async function carrierFormAction({request, params}: {request: Request, params: Params}) {
  const formData = await request.formData();
  const formObj = Object.fromEntries(formData.entries());


  if (formObj.intent === 'NEW') {
    let response: Response;
    try {
      response = await fetch('http://localhost:3000/carriers', {
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
      await fetch('http://localhost:3000/carriers/'+params.id, {
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


  return redirect('/admin/carriers/');
}