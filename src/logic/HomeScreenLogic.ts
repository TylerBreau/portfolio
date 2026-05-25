
import {IHeaderItem} from "@Interfaces/components/IHeader";
import {WorkExampleIndex} from "@Interfaces/components/IWorkExampleTile";

export class HomeScreenLogic {
    public static getSubscreenHeaderItem(index: WorkExampleIndex | null): IHeaderItem | null {
        switch (index) {
            case WorkExampleIndex.FLUX_ARCHITECURE:
                return {
                    text: 'Flux Architecture',
                    isActive: true,
                    onClick: () => {}
                };
            default: return null;
        }
    }
}
