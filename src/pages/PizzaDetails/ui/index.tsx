import React from "react";
import Container from "../../../shared/ui/Container";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import cn from "../../../shared/lib/classNames";
import CollapseInfo from "../../../features/CollapseInfo/ui";
import RelatedItems from "../../../widgets/RelatedItems/ui";
import NotFound from "../../NotFound/ui";
import Spinner from "../../../shared/ui/Spinner/ui";
import PriceBlock from "../../../widgets/PriceBlock/ui";
import DetailsHeader from "./DetailsHeader";
import { AppContext } from "../../../app/context";
import { useParams } from "react-router-dom";
import { DetailsParamKey } from "../interfaces";

const PizzaDetails = () => {
    const { pizzas, loading, searchParams, setSearchParams } = React.useContext(AppContext);
    const { name } = useParams();

    const activeItem = React.useMemo(() => pizzas.find(({ title }) => title.toLowerCase() === name?.toLowerCase()), [loading, name])!;
    const relatedItems = React.useMemo(() => pizzas.filter(({ id }) => id !== activeItem?.id), [activeItem]);

    const [imageLoaded, setImageLoaded] = React.useState(false);

    React.useEffect(() => {
        if (searchParams.size) {
            setSearchParams(
                (prevState) => {
                    prevState.forEach((value, key) => {
                        if (
                            !activeItem[`${key as DetailsParamKey}s`] ||
                            (prevState.get(key) !== null &&
                                typeof activeItem[`${key as DetailsParamKey}s`][Number(value)] === "undefined")
                        ) {
                            prevState.delete(key);
                        }
                    });
                    return prevState;
                },
                { replace: true }
            );
        }
        return () => {
            window.history.scrollRestoration = "manual";
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    }, [activeItem]);

    if (!loading && (!name || !activeItem)) {
        return <NotFound title='Что-то пошло не так, пицца не найдена' backLink backLinkText='Вернуться назад' />;
    }

    return (
        <section>
            <Container
                classNames={cn(
                    "max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col gap-5 relative",
                    loading && "items-center justify-center h-[calc(100vh-130px)]"
                )}
            >
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <DetailsHeader rating={activeItem.rating} title={activeItem.title} />
                        <div className='flex items-start justify-between'>
                            <img
                                loading='lazy'
                                src={imageLoaded ? activeItem?.imageUrl : getImageUrl("thumbnail-xl.svg")}
                                onLoad={() => setImageLoaded(true)}
                                alt={activeItem?.title}
                                className='max-w-[450px] max-h-full'
                            />
                            <PriceBlock {...{ activeItem, searchParams, setSearchParams }} />
                        </div>
                        {activeItem?.description && (
                            <div className='flex flex-col gap-5 pb-5'>
                                <h2 className='text-2xl font-bold text-primary-black'>О Пицце </h2>
                                <div className='flex items-start gap-8'>
                                    <CollapseInfo description={activeItem.description} title='Описание' />
                                    <CollapseInfo MAX_LENGTH={150} description={activeItem.ingredients} title='Ингредиенты' />
                                </div>
                            </div>
                        )}
                        <RelatedItems title='Смотрите также' items={relatedItems} />
                    </>
                )}
            </Container>
        </section>
    );
};

export default PizzaDetails