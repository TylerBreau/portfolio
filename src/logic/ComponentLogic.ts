
export class ComponentLogic {
    public static getClassName(classNames: string[] = [], classNameProp: string | null = null): string {
        if (classNameProp) {
            return [...classNames, classNameProp].join(' ');
        }

        return classNames.join(' ');
    }
}