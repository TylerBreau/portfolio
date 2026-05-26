
import {WorkExampleIndex} from '@Interfaces/components/IWorkExampleTile';

export interface IWorkExamplesProps {
    className?: string;
    onClick: (index: WorkExampleIndex) => void;
}
