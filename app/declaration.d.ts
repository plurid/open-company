declare module '*.scss' {
    const content: {[className: string]: string};
    export default content;
}

declare module "*.png" {
    const value: any;
    export default value;
}

declare module "*.json" {
    const value: any;
    export default value;
}
