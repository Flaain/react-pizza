import Container from "@/shared/ui/Container";
import PizzaList from "@/widgets/PizzaList/ui";
import Tools from "@/widgets/Tools/ui";
import Title from "@/shared/ui/Title/ui";
import getSortInfo from "@/pages/Home/lib/helpers/getSortInfo";
import { initialCategories, initialSortNames } from "@/shared/config/constants";
import { Link, useSearchParams } from "react-router-dom";
import { getValidatedParams } from "../lib/helpers/getValidatedParams";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { categorie, sort } = getValidatedParams(searchParams, [
        { key: "categorie", defaultValue: null, initial: initialCategories },
        { key: "sort", defaultValue: 0, initial: initialSortNames },
    ]);
    const { sortDirection, property } = getSortInfo(sort as number);

    const title = `${categorie !== null ? initialCategories[categorie as number]?.name : "Все"} пиццы`;

    return (
        <section>
            <Container>
                <Link to="/cart">CART</Link>
                {/* <div className='flex flex-col gap-5'>
                    <Tools categories={initialCategories} sortNames={initialSortNames} />
                    <Title title={title} />
                </div>
                <PizzaList
                    categorie={categorie as number | null}
                    property={property}
                    sortDirection={sortDirection}
                    searchQuery={searchParams.get("query") ?? ""}
                /> */}
            </Container>
        </section>
    );
};

export default Home;