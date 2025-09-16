type FieldIsDependedOnByOtherErrorOptions = {
    fieldName: string;
    fieldCollectionName: string;
    dependedFieldName: string;
    dependedFieldCollectionName: string;
    dependedFieldAs: string;
};
export declare class FieldIsDependedOnByOtherError extends Error {
    options: FieldIsDependedOnByOtherErrorOptions;
    constructor(options: FieldIsDependedOnByOtherErrorOptions);
}
export {};
