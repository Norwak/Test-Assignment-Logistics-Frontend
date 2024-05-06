import { Container } from "@gravity-ui/uikit";
import CarrierForm from "../components/forms/CarrierForm";


export default function NewCarrierPage() {
  return (
    <section className="gravity-form" id="gravity-form">
      <Container maxWidth='l'>
        <div className="gravity-form__inner">
          <CarrierForm carrier={undefined} intent="NEW" />
        </div>
      </Container>
    </section>
  );
}