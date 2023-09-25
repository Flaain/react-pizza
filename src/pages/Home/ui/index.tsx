import React from "react";
import Container from "../../../shared/ui/Container";
import PizzaList from "../../../widgets/PizzaList/ui";
import Tools from "../../../widgets/Tools/ui";
import Spinner from "../../../shared/ui/Spinner/ui";
import Title from "../../../shared/ui/Title/ui";
import { AppContext } from "../../../app/context";
import { initialCategories, initialSortNames } from "../../../shared/initialValues";

const Home = () => {
    const { filteredPizzas, loading } = React.useContext(AppContext);

    const [view, setView] = React.useState(6);

    const handleScroll = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 && view < filteredPizzas.length) {
            setView((prevState) => prevState + 5);
        }
    };

    React.useEffect(() => {
        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll);
    }, [view, loading, filteredPizzas]);

    return loading ? (
        <Spinner />
    ) : (
        <section>
            <Container>
                <div className='flex flex-col gap-5'>
                    <Tools categories={initialCategories} sortNames={initialSortNames} />
                    <Title title='Все пиццы' />
                </div>
                <PizzaList data={filteredPizzas.slice(0, view)} loading={loading} />
            </Container>
        </section>
    );
};

export default Home;