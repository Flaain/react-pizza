import React from "react";

export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
    skeleton?: React.ReactElement;
}

export interface ImageSkeletonProps {
    width: number;
    height: number;
}