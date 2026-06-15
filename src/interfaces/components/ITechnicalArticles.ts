
import {TechnicalArticleIndex} from '@Interfaces/components/ITechnicalArticleTile';

export interface ITechnicalArticlesProps {
    className?: string;
    onClick: (index: TechnicalArticleIndex) => void;
}
