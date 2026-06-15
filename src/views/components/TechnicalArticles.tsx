
import "@Styles/components/TechnicalArticles.less";

import {ITechnicalArticlesProps} from "@Interfaces/components/ITechnicalArticles";
import {TechnicalArticleIndex} from "@Interfaces/components/ITechnicalArticleTile";

import {ComponentLogic} from '@Logic/ComponentLogic';

import {TechnicalArticleTile} from "./TechnicalArticleTile";

export function TechnicalArticles(props: ITechnicalArticlesProps) {
    return <div className={ComponentLogic.getClassName(['TechnicalArticles'], props.className)}>
        <TechnicalArticleTile
            title='Flux Architecture'
            onClick={() => props.onClick(TechnicalArticleIndex.FLUX_ARCHITECURE)}
        >
            <span>Lesson on Flux Architecture</span>
            <ul>
                <li>What is it?</li>
                <li>How to implement it?</li>
                <li>How should it be used?</li>
            </ul>
            <img src='FluxArchitectureImage.png' />
        </TechnicalArticleTile>
    </div>;
}