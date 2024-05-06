import { Container } from "@gravity-ui/uikit";
import ClientForm from "../components/forms/ClientForm";


export default function NewClientPage() {
  return (
    <section className="gravity-form" id="gravity-form">
      <Container maxWidth='l'>
        <div className="gravity-form__inner">
          <ClientForm client={undefined} intent="NEW" />
        </div>
      </Container>
    </section>
  );
}