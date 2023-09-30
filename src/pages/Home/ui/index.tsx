import React from "react";
import Container from "../../../shared/ui/Container";
import PizzaList from "../../../widgets/PizzaList/ui";
import Tools from "../../../widgets/Tools/ui";
import Title from "../../../shared/ui/Title/ui";
import { AppContext } from "../../../app/context";
import { INITIAL_VIEW, initialCategories, initialSortNames } from "../../../shared/initialValues";

const Home = () => {
    const { pizzas, searchParams, searchValue } = React.useContext(AppContext);

    const [view, setView] = React.useState(INITIAL_VIEW);
    
    const title = `${searchParams.get("categorie") !== null ? initialCategories[Number(searchParams.get("categorie")) + 1].name : "Все"} пиццы`
    
    const handleScroll = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 && view < pizzas.length) {
            setView((prevState) => prevState + 3);
        }
    };

    React.useEffect(() => {
        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll);
    }, [view, pizzas]);

    return (
        <section>
            <Container>
                <div className='flex flex-col gap-5'>
                    <Tools categories={initialCategories} sortNames={initialSortNames} />
                    <Title title={title} />
                </div>
                <PizzaList {...{ data: pizzas, view, searchParams, searchValue }}/>
            </Container>
        </section>
    );
};

export default Home;