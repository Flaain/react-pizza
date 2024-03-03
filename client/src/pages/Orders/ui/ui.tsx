import { useToast } from "@/shared/hooks/useToast";
import Container from "@/shared/ui/Container";
import Toaster from "@/shared/ui/Toaster/ui/ui";

const Orders = () => {
    const {
        toast,
        heights,
        toasts,
        actions: { setHeights, removeToast },
    } = useToast();

    return (
        <Container>
            <button
                onClick={() =>
                    toast.error("error toast", { closeButton: true, onClose: (toast) => console.log(toast) })
                }
            >
                error toast
            </button>
            <Toaster toasts={toasts} setHeights={setHeights} removeToast={removeToast} heights={heights} />
        </Container>
    );
};

export default Orders;