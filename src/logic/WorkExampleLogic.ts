
export class WorkExampleLogic {
    /**
     * @param classNames 
     * @returns Class Name string with shared screen class names. Use parameter for custom class name.
     */
    public static getClassName(classNames: string[] = []): string {
        return ['WorkExample', ...classNames].join(' ');
    }
}
