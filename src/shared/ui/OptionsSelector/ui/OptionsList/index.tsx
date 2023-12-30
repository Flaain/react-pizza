import SliderTab from "@/shared/ui/SliderTab/ui";
import OptionsItem from "../OptionsItem";
import useTabSlider from "@/shared/hooks/useTabSlider";
import { OptionsListProps } from "../../model/interfaces";
import { segmentSelectors } from "../../model/segmentSelectors";
import { ProductSelectorState } from "@/entities/Product/model/interfaces";
import { getPayloadBySegment } from "../../lib/getPayloadBySegment";

const OptionsList: React.FC<OptionsListProps> = ({ classNames = 'grid grid-cols-2 gap-2 p-1', segmentType, initial, data, state, stateProperty, dispatch }) => {
    const { tabLeft, tabWidth, tabRef, setActiveTabIndex } = useTabSlider<HTMLLabelElement>(state[stateProperty as keyof ProductSelectorState]);

    const handleChange = (index: number, availableValueIndex: number) => {
        dispatch({ type: segmentType, payload: getPayloadBySegment(segmentType, state, index, availableValueIndex, data) }, availableValueIndex);
        setActiveTabIndex(index);
    };

    return (
        <div className='relative z-10 overflow-hidden w-full'>
            <SliderTab tabLeft={tabLeft} tabWidth={tabWidth} />
            <ul className={classNames}>
                {initial.map((item, index) => {
                    const availableValueIndex = data.findIndex((value) => segmentSelectors[segmentType].availableValueIndex(item, value, index));
                    const title = segmentSelectors[segmentType]?.title ? segmentSelectors[segmentType].title(item) : item;
                    
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