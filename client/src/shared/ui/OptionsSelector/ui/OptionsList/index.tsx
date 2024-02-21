import SliderTab from "@/shared/ui/SliderTab/ui";
import OptionsItem from "../OptionsItem";
import useTabSlider from "@/shared/hooks/useTabSlider";
import { OptionsListProps } from "../../model/interfaces";
import { segmentSelectors } from "../../model/segmentSelectors";
import { getPayloadBySegment } from "../../lib/getPayloadBySegment";
import { ProductSelectorState } from "@/shared/model/interfaces";

const OptionsList = ({
    classNames = "grid grid-cols-2 gap-2 p-1",
    segmentType,
    initial,
    data,
    state,
    stateProperty,
    dispatch,
}: OptionsListProps) => {
    const { tabLeft, tabWidth, tabRef, setActiveTabIndex } = useTabSlider<HTMLLabelElement>(
        state[stateProperty as keyof ProductSelectorState]
    );

    const handleChange = (index: number, availableValueIndex: number) => {
        dispatch({
            type: segmentType,
            payload: getPayloadBySegment(segmentType, state, index, availableValueIndex, data),
        });
        setActiveTabIndex(index);
    };

    return (
        <div className='relative z-10 overflow-hidden w-full'>
            <SliderTab tabLeft={tabLeft} tabWidth={tabWidth} />
            <ul className={classNames}>
                {initial.map((item, index) => {
                    const availableValueIndex = data.findIndex((value) =>
                        segmentSelectors[segmentType].availableValueIndex(item, value, index)
                    );
                    const title = segmentSelectors[segmentType]?.title?.(item) ?? String(item);

                    return (
                        <OptionsItem
                            {...{
                                key: item,
                                availableValueIndex,
                                title,
                                tabRef,
                                index,
                                handleChange,
                                checked: state[stateProperty as keyof ProductSelectorState] === item,
                            }}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default OptionsList;