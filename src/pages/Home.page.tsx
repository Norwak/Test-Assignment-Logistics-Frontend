import { Container } from "@gravity-ui/uikit";
import OffersFrontTable from "../components/tables/OffersFrontTable";

export default function HomePage() {
  return (
    <main className="mt30">


      <section className="gravity-table" id="gravity-table">
        <Container maxWidth='l'>
          <div className="gravity-table__inner">
            <OffersFrontTable />
          </div>
        </Container>
      </section>


    </main>
  );
}