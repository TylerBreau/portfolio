
import {IHeaderItem} from "@Interfaces/components/IHeader";
import {TechnicalArticleIndex} from "@Interfaces/components/ITechnicalArticleTile";

export class HomeScreenLogic {
    public static getSubscreenHeaderItem(index: TechnicalArticleIndex | null): IHeaderItem | null {
        switch (index) {
            case TechnicalArticleIndex.FLUX_ARCHITECURE:
                return {
                    text: 'Flux Architecture',
                    isActive: true,
                    onClick: () => {}
                };
            case TechnicalArticleIndex.TOTALPAVE_OFFLINE_SUPPORT:
                return {
                    text: 'TotalPave Offline Support',
                    isActive: true,
                    onClick: () => {}
                };
            default: return null;
        }
    }
}
