
import React from 'react';

export interface IWorkExampleTileProps {
    title: string;
    children: React.ReactNode;
    onClick: () => void;
}

export enum WorkExampleIndex {
    FLUX_ARCHITECURE = 0
}
