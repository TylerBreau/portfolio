
import React from 'react';

export interface ITechnicalArticleTileProps {
    title: string;
    children: React.ReactNode;
    onClick: () => void;
}

export enum TechnicalArticleIndex {
    FLUX_ARCHITECURE = 0
}
