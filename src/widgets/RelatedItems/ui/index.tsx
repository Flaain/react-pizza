import React from "react";
import Carousel from "../../../features/Carousel/ui";
import { Props } from "../interfaces";

const RelatedItems: React.FC<Props> = ({ title, items }) => <Carousel {...{ title, items }} />;

export default RelatedItems;