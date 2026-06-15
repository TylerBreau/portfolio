

// import '@Styles/components/TechnicalAchievements.less';

import {ITechnicalAchievementsProps} from '@Interfaces/components/ITechnicalAchievements';
import {TechnicalArticleIndex} from '@Interfaces/components/ITechnicalArticleTile';

import {ComponentLogic} from '@Logic/ComponentLogic';

import {TechnicalArticleTile} from "@Views/components/TechnicalArticleTile";

export function TechnicalAchievements(props: ITechnicalAchievementsProps) {
    return <div className={ComponentLogic.getClassName(['TechnicalAchievements'], props.className)}>
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
