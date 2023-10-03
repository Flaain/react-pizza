import React from "react";
import Container from "../../../shared/ui/Container";
import PizzaList from "../../../widgets/PizzaList/ui";
import Tools from "../../../widgets/Tools/ui";
import Title from "../../../shared/ui/Title/ui";
import getCategorieParamIndex from "../../../shared/lib/helpers/getCategorieParamIndex";
import getSortParamIndex from "../../../shared/lib/helpers/getSortParamIndex";
import { AppContext, HomeContext } from "../../../app/context";
import { INITIAL_VIEW, initialCategories, initialSortNames } from "../../../shared/initialValues";

const Home = () => {
    const { pizzas, searchParams, searchValue, setSearchParams } = React.useContext(AppContext);

    const [view, setView] = React.useState(INITIAL_VIEW);

    const selectedCategorieIndex = getCategorieParamIndex(initialCategories, searchParams, "categorie");
    const selectedSortIndex = getSortParamIndex(initialSortNames, searchParams, "sort");

    const title = `${selectedCategorieIndex !== null ? initialCategories[selectedCategorieIndex]?.name : "Все"} пиццы`;

    const handleScroll = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 && view < pizzas.length) {
            setView((prevState) => prevState + 3);
        }
    };

    React.useEffect(() => {
        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll);
    }, [view, pizzas]);

    React.useEffect(() => {
        if (selectedCategorieIndex !== null && typeof initialCategories[selectedCategorieIndex]?.categorie === "undefined") {
            setSearchParams((prevState) => {
                prevState.delete("categorie");
                return prevState;
            });
        }
    }, [selectedCategorieIndex]);

    React.useEffect(() => {
        if (typeof initialSortNames[selectedSortIndex]?.sort === "undefined") {
            setSearchParams((prevState) => {
                prevState.set("sort", String(0));
                return prevState;
            });
        }
    }, [selectedSortIndex]);

    return (
        <HomeContext.Provider value={{ view, selectedSortIndex, selectedCategorieIndex }}>
            <section>
                <Container>
                    <div className='flex flex-col gap-5'>
                        <Tools categories={initialCategories} sortNames={initialSortNames} />
                        <Title title={title} />
                    </div>
                    <PizzaList data={pizzas} searchValue={searchValue} />
                </Container>
            </section>
        </HomeContext.Provider>
    );
};

export default Home;