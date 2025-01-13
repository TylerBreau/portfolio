
export class WorkExampleLogic {
    /**
     * 
     * @param classNames 
     * @param classNameProp 
     * @returns Class Name string with shared work example class names. Use parameter for custom class name.
     */
    public static getClassName(classNames: string[] = [], classNameProp: string | null = null): string {
        if (classNameProp) {
            return ['WorkExample', ...classNames, classNameProp].join(' ');
        }

        return ['WorkExample', ...classNames].join(' ');
    }
}
