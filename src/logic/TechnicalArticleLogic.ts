
export class TechnicalArticleLogic {
    /**
     * 
     * @param classNames 
     * @param classNameProp 
     * @returns Class Name string with shared work example class names. Use parameter for custom class name.
     */
    public static getClassName(classNames: string[] = [], classNameProp: string | null = null): string {
        if (classNameProp) {
            return ['TechnicalArticle', ...classNames, classNameProp].join(' ');
        }

        return ['TechnicalArticle', ...classNames].join(' ');
    }
}
