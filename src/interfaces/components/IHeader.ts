
export interface IHeaderItem {
    text: string;
    /**
     * Can be used to tell Header to apply active styles to a header item.
     */
    isActive: boolean;
    /**
     * @param index The index of the items array item that was clicked.
    */
    onClick: () => void;
}

export interface IHeaderProps {
    items: Array<IHeaderItem>;
}
