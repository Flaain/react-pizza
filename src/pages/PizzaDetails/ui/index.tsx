import React from "react";
import Container from "../../../shared/ui/Container";
import getImageUrl from "../../../shared/lib/helpers/getImageUrl";
import cn from "../../../shared/lib/classNames";
import CollapseInfo from "../../../features/CollapseInfo/ui";
import RelatedItems from "../../../widgets/RelatedItems/ui";
import NotFound from "../../NotFound/ui";
import Spinner from "../../../shared/ui/Spinner/ui";
import Title from "../../../shared/ui/Title/ui";
import PriceBlock from "../../../widgets/PriceBlock/ui";
import { AppContext } from "../../../app/context";
import { useParams } from "react-router-dom";

const PizzaDetails = () => {
    const { filteredPizzas, loading } = React.useContext(AppContext);
    const { name } = useParams();

    const activeItem = React.useMemo(() => filteredPizzas.find(({ title }) => title.toLowerCase() === name?.toLowerCase()), [loading, name]);
    const relatedItems = React.useMemo(() => filteredPizzas.filter(({ id }) => id !== activeItem?.id), [activeItem]);

    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [closeView, setCloseView] = React.useState(false);

    React.useEffect(() => {
        setCloseView(false);
        
        return () => {
            window.history.scrollRestoration = "manual";
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    }, [activeItem]);

    if (!loading && (!name || !activeItem)) {
        return <NotFound title='Что-то пошло не так, пицца не найдена' backLink backLinkText="Вернуться назад" />;
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
                        {closeView && <div onClick={() => setCloseView(false)}>close view</div>}
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center justify-start gap-5'>
                                <button
                                    className='flex items-center justify-center p-2 min-w-[30px] min-h-[30px] rounded-full bg-primary-gray mt-1'
                                    onClick={() => window.history.back()}
                                    title='Вернуться назад'
                                >
                                    <img src={getImageUrl("arrow.svg")} alt='back arrow' className='mr-[2px]' />
                                </button>
                                <Title title={activeItem!.title} />
                            </div>
                            <div className='flex items-center gap-5'>
                                <span className='flex items-center gap-2 font-semibold'>
                                    <img src={getImageUrl("rating.svg")} alt='start rating' width={14} height={14} />
                                    {activeItem!.rating}
                                </span>
                                <a
                                    href='#'
                                    className='text-gray-400 border-b border-dashed hover:text-primary-black hover:border-primary-black'
                                >
                                    391 оценка
                                </a>
                            </div>
                        </div>
                        <div className='flex items-start justify-between'>
                            <img
                                loading='lazy'
                                src={imageLoaded ? activeItem?.imageUrl : getImageUrl("thumbnail-xl.svg")}
                                onClick={() => imageLoaded && setCloseView(true)}
                                onLoad={() => setImageLoaded(true)}
                                alt={activeItem?.title}
                                className='max-w-[450px] max-h-full'
                            />
                            <PriceBlock activeItem={activeItem!} />
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

export default PizzaDetails;