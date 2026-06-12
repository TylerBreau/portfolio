
export enum DividerType {
    // The character · has spacing differences between environments and can not be reliably vertically positioned with ease. 
    DOT = 0,
    // DOT = '·',
    LINE = '|'
}

export interface IDividerProps {
    type: DividerType;
}
