/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Locator, Page } from '@nocobase/test/e2e';
export declare class CreateWorkFlow {
    readonly page: Page;
    name: Locator;
    triggerType: Locator;
    synchronouslyRadio: Locator;
    asynchronouslyRadio: Locator;
    description: Locator;
    autoDeleteHistory: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    constructor(page: Page);
}
export declare class EditWorkFlow {
    readonly page: Page;
    name: Locator;
    statusIsOn: Locator;
    statusIisOff: Locator;
    description: Locator;
    autoDeleteHistory: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    constructor(page: Page, workFlowName: string);
}
export declare class WorkflowManagement {
    readonly page: Page;
    addNewButton: Locator;
    deleteButton: Locator;
    filterButton: Locator;
    constructor(page: Page);
}
export declare class WorkflowListRecords {
    readonly page: Page;
    executionCountPopup: Locator;
    configureAction: Locator;
    editAction: Locator;
    duplicateAction: Locator;
    deleteAction: Locator;
    constructor(page: Page, workFlowName: string);
}
export declare class ApprovalTriggerNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    collectionDropDown: Locator;
    dataBlocksInitiationRadio: Locator;
    dataBlocksAndGlobalApprovalBlocksInitiationRadio: Locator;
    allowedToBeWithdrawnCheckbox: Locator;
    goToconfigureButton: Locator;
    addBlockButton: Locator;
    addApplyFormMenu: Locator;
    configureFieldsButton: Locator;
    configureActionsButton: Locator;
    saveDraftSwitch: Locator;
    withdrawSwitch: Locator;
    preloadAssociationsDropDown: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, triggerName: string, collectionName: string);
}
export declare class ApprovalPassthroughModeNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    addAssigneesButton: Locator;
    addSelectAssigneesMenu: Locator;
    addQueryAssigneesMenu: Locator;
    assigneesDropDown: Locator;
    OrRadio: Locator;
    AndRadio: Locator;
    votingRadio: Locator;
    votingThresholdEditBox: Locator;
    parallellyRadio: Locator;
    sequentiallyRadio: Locator;
    goToconfigureButton: Locator;
    addBlockButton: Locator;
    addDetailsMenu: Locator;
    detailsConfigureFieldsButton: Locator;
    addActionsMenu: Locator;
    actionsConfigureFieldsButton: Locator;
    actionsConfigureActionsButton: Locator;
    addApproveButton: Locator;
    addRejectButton: Locator;
    addReturnButton: Locator;
    addNodeResult: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string, collectionName: string);
}
export declare class ApprovalBranchModeNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    addAssigneesButton: Locator;
    addSelectAssigneesMenu: Locator;
    addQueryAssigneesMenu: Locator;
    assigneesDropDown: Locator;
    OrRadio: Locator;
    AndRadio: Locator;
    votingRadio: Locator;
    votingThresholdEditBox: Locator;
    parallellyRadio: Locator;
    sequentiallyRadio: Locator;
    goToconfigureButton: Locator;
    addBlockButton: Locator;
    addDetailsMenu: Locator;
    detailsConfigureFieldsButton: Locator;
    addActionsMenu: Locator;
    actionsConfigureFieldsButton: Locator;
    actionsConfigureActionsButton: Locator;
    addApproveButton: Locator;
    addRejectButton: Locator;
    addReturnButton: Locator;
    addNodeResult: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    addReturnBranchNodeButton: Locator;
    addRejectBranchNodeButton: Locator;
    addApproveBranchNodeButton: Locator;
    endOnRejectCheckbox: Locator;
    constructor(page: Page, nodeName: string, collectionName: string);
}
export declare class ScheduleTriggerNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    customTimeTriggerOptions: Locator;
    startTimeEntryBox: Locator;
    RrpeatModeDropdown: Locator;
    dataTableTimeFieldOptions: Locator;
    collectionDropDown: Locator;
    startTimeDropdown: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, triggerName: string, collectionName: string);
}
export declare class CollectionTriggerNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    collectionDropDown: Locator;
    triggerOnDropdown: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, triggerName: string, collectionName: string);
}
export declare class FormEventTriggerNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    collectionDropDown: Locator;
    relationalDataDropdown: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, triggerName: string, collectionName: string);
}
export declare class CustomActionEventTriggerNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    collectionDropDown: Locator;
    relationalDataDropdown: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, triggerName: string, collectionName: string);
}
export declare class CalculationNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    mathCalculationEngine: Locator;
    formulaCalculationEngine: Locator;
    calculationExpression: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
export declare class QueryRecordNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    collectionDropDown: Locator;
    addSortFieldsButton: Locator;
    pageNumberEditBox: Locator;
    pageNumberVariableButton: Locator;
    pageSizeEditBox: Locator;
    exitProcessOptionsBoxWithEmptyResult: Locator;
    singleRecordRadioButton: Locator;
    multipleRecordsRadioButton: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
export declare class CreateRecordNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    collectionDropDown: Locator;
    addFieldsButton: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
export declare class UpdateRecordNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    collectionDropDown: Locator;
    batchUpdateModeRadio: Locator;
    articleByArticleUpdateModeRadio: Locator;
    addFieldsButton: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
export declare class DeleteRecordNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    collectionDropDown: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
export declare class AggregateNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    countRadio: Locator;
    sumRadio: Locator;
    avgRadio: Locator;
    maxRadio: Locator;
    minRadio: Locator;
    dataTableDataRadio: Locator;
    linkedDataTableDataRadio: Locator;
    collectionDropDown: Locator;
    aggregatedFieldDropDown: Locator;
    distinctCheckBox: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
export declare class ManualNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    assigneesDropDown: Locator;
    configureUserInterfaceButton: Locator;
    addBlockButton: Locator;
    triggerDataMenu: Locator;
    nodeDataMenu: Locator;
    customFormMenu: Locator;
    createRecordFormMenu: Locator;
    updateRecordFormMenu: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
export declare class ConditionYesNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    basicRadio: Locator;
    mathRadio: Locator;
    formulaRadio: Locator;
    conditionExpressionEditBox: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
export declare class ConditionBranchNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    basicRadio: Locator;
    mathRadio: Locator;
    formulaRadio: Locator;
    conditionExpressionEditBox: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNoBranchNode: Locator;
    addYesBranchNode: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
export declare class SQLNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    sqlEditBox: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
export declare class ParallelBranchNode {
    readonly page: Page;
    node: Locator;
    nodeTitle: Locator;
    nodeConfigure: Locator;
    addBranchButton: Locator;
    allSucceededRadio: Locator;
    anySucceededRadio: Locator;
    anySucceededOrFailedRadio: Locator;
    submitButton: Locator;
    cancelButton: Locator;
    addNodeButton: Locator;
    constructor(page: Page, nodeName: string);
}
declare const _default: {
    CreateWorkFlow: typeof CreateWorkFlow;
    EditWorkFlow: typeof EditWorkFlow;
    WorkflowManagement: typeof WorkflowManagement;
    WorkflowListRecords: typeof WorkflowListRecords;
    ApprovalTriggerNode: typeof ApprovalTriggerNode;
    ApprovalPassthroughModeNode: typeof ApprovalPassthroughModeNode;
    ScheduleTriggerNode: typeof ScheduleTriggerNode;
    CollectionTriggerNode: typeof CollectionTriggerNode;
    FormEventTriggerNode: typeof FormEventTriggerNode;
    CalculationNode: typeof CalculationNode;
    QueryRecordNode: typeof QueryRecordNode;
    CreateRecordNode: typeof CreateRecordNode;
    UpdateRecordNode: typeof UpdateRecordNode;
    DeleteRecordNode: typeof DeleteRecordNode;
    AggregateNode: typeof AggregateNode;
    ManualNode: typeof ManualNode;
    ConditionYesNode: typeof ConditionYesNode;
    ConditionBranchNode: typeof ConditionBranchNode;
    SQLNode: typeof SQLNode;
    ParallelBranchNode: typeof ParallelBranchNode;
    ApprovalBranchModeNode: typeof ApprovalBranchModeNode;
    CustomActionEventTriggerNode: typeof CustomActionEventTriggerNode;
};
export default _default;
