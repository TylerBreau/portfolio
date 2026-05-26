
import "@Styles/components/WorkExamples.less";

import {IWorkExamplesProps} from "@Interfaces/components/IWorkExamples";
import {WorkExampleIndex} from "@Interfaces/components/IWorkExampleTile";

import {ComponentLogic} from '@Logic/ComponentLogic';

import {WorkExampleTile} from "./WorkExampleTile";

export function WorkExamples(props: IWorkExamplesProps) {
    return <div className={ComponentLogic.getClassName(['WorkExamples'], props.className)}>
        <WorkExampleTile
            title='Flux Architecture'
            onClick={() => props.onClick(WorkExampleIndex.FLUX_ARCHITECURE)}
        >
            <span>Lesson on Flux Architecture</span>
            <ul>
                <li>What is it?</li>
                <li>How to implement it?</li>
                <li>How should it be used?</li>
            </ul>
            <img src='FluxArchitectureImage.png' />
        </WorkExampleTile>
    </div>;
}