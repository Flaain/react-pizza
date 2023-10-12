import React from "react";
import Container from "../../../shared/ui/Container";
import cn from "../../../shared/lib/classNames";
import { Props } from "../interfaces";
import { Link } from "react-router-dom";
import Title from "../../../shared/ui/Title/ui";

const NotFound: React.FC<Props> = ({
    title,
    description,
    backLink,
    backLinkText,
    reloadButton,
    reloadButtonText,
    screen,
    code,
}) => {
    const [showError, setShowError] = React.useState(false);

    return (
        <section>
            <Container
                classNames={cn(
                    "max-w-[1320px] w-full my-0 mx-auto px-[15px] box-border flex flex-col items-center justify-center gap-5",
                    screen ? "min-h-screen" : "min-h-[calc(100vh-132px)]"
                )}
            >
                <Title title={title} />
                {description && <p className='text-gray-400 text-xl font-medium text-center'>{description}</p>}
                {backLink && !reloadButton && (
                    <Link
                        to='/'
                        className='bg-primary-black text-white py-2 px-6 rounded-full flex items-center justify-center'
                    >
                        {backLinkText}
                    </Link>
                )}
                {!!code && (
                    <div className='flex flex-col gap-2'>
                        <button onClick={() => setShowError((prevState) => !prevState)}>
                            {showError ? "скрыть код ошибки" : "раскрыть код ошибки"}
                        </button>
                        {showError && <code>{JSON.stringify(code)}</code>}
                    </div>
                )}
                {reloadButton && !backLink && (
                    <button
                        className='bg-primary-black text-white py-2 px-6 rounded-full flex items-center justify-center'
                        onClick={() => window.location.reload()}
                    >
                        {reloadButtonText}
                    </button>
                )}
            </Container>
        </section>
    );
};

export default NotFound;