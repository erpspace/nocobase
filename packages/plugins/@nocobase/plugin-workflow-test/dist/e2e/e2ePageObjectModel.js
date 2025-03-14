/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var e2ePageObjectModel_exports = {};
__export(e2ePageObjectModel_exports, {
  AggregateNode: () => AggregateNode,
  ApprovalBranchModeNode: () => ApprovalBranchModeNode,
  ApprovalPassthroughModeNode: () => ApprovalPassthroughModeNode,
  ApprovalTriggerNode: () => ApprovalTriggerNode,
  CalculationNode: () => CalculationNode,
  CollectionTriggerNode: () => CollectionTriggerNode,
  ConditionBranchNode: () => ConditionBranchNode,
  ConditionYesNode: () => ConditionYesNode,
  CreateRecordNode: () => CreateRecordNode,
  CreateWorkFlow: () => CreateWorkFlow,
  CustomActionEventTriggerNode: () => CustomActionEventTriggerNode,
  DeleteRecordNode: () => DeleteRecordNode,
  EditWorkFlow: () => EditWorkFlow,
  FormEventTriggerNode: () => FormEventTriggerNode,
  ManualNode: () => ManualNode,
  ParallelBranchNode: () => ParallelBranchNode,
  QueryRecordNode: () => QueryRecordNode,
  SQLNode: () => SQLNode,
  ScheduleTriggerNode: () => ScheduleTriggerNode,
  UpdateRecordNode: () => UpdateRecordNode,
  WorkflowListRecords: () => WorkflowListRecords,
  WorkflowManagement: () => WorkflowManagement,
  default: () => e2ePageObjectModel_default
});
module.exports = __toCommonJS(e2ePageObjectModel_exports);
class CreateWorkFlow {
  page;
  name;
  triggerType;
  synchronouslyRadio;
  asynchronouslyRadio;
  description;
  autoDeleteHistory;
  submitButton;
  cancelButton;
  constructor(page) {
    this.page = page;
    this.name = page.getByLabel("block-item-CollectionField-workflows-Name").getByRole("textbox");
    this.triggerType = page.getByTestId("select-single");
    this.synchronouslyRadio = page.getByLabel("Synchronously", { exact: true });
    this.asynchronouslyRadio = page.getByLabel("Asynchronously", { exact: true });
    this.description = page.getByTestId("description-item").getByRole("textbox");
    this.autoDeleteHistory = page.getByTestId("select-multiple");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
  }
}
class EditWorkFlow {
  page;
  name;
  statusIsOn;
  statusIisOff;
  description;
  autoDeleteHistory;
  submitButton;
  cancelButton;
  constructor(page, workFlowName) {
    this.page = page;
    this.name = page.getByLabel("block-item-CollectionField-workflows-Name").getByRole("textbox");
    this.statusIsOn = page.getByLabel("On", { exact: true });
    this.statusIisOff = page.getByLabel("Off");
    this.description = page.getByTestId("description-item").getByRole("textbox");
    this.autoDeleteHistory = page.getByTestId("deleteExecutionOnStatus-item").getByTestId("antd-select").locator("div").nth(1);
    this.submitButton = page.getByLabel(`action-Action-Submit-workflows-${workFlowName}`);
    this.cancelButton = page.getByLabel(`action-Action-Cancel-workflows-${workFlowName}`);
  }
}
class WorkflowManagement {
  page;
  addNewButton;
  deleteButton;
  filterButton;
  constructor(page) {
    this.page = page;
    this.addNewButton = page.getByLabel("action-Action-Add new-workflows");
    this.deleteButton = page.getByLabel("action-Action-Delete-workflows");
    this.filterButton = page.getByLabel("action-Filter.Action-Filter-filter-workflows");
  }
}
class WorkflowListRecords {
  page;
  executionCountPopup;
  configureAction;
  editAction;
  duplicateAction;
  deleteAction;
  constructor(page, workFlowName) {
    this.page = page;
    this.executionCountPopup = page.getByLabel(`executed-${workFlowName}`);
    this.configureAction = page.getByLabel(`action-WorkflowLink-Configure-workflows-${workFlowName}`);
    this.editAction = page.getByLabel(`action-Action.Link-Edit-workflows-${workFlowName}`);
    this.duplicateAction = page.getByLabel(`action-Action.Link-Duplicate-workflows-${workFlowName}`);
    this.deleteAction = page.getByLabel(`action-Action.Link-Delete-workflows-${workFlowName}`);
  }
}
class ApprovalTriggerNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  collectionDropDown;
  dataBlocksInitiationRadio;
  dataBlocksAndGlobalApprovalBlocksInitiationRadio;
  allowedToBeWithdrawnCheckbox;
  goToconfigureButton;
  addBlockButton;
  addApplyFormMenu;
  configureFieldsButton;
  configureActionsButton;
  saveDraftSwitch;
  withdrawSwitch;
  preloadAssociationsDropDown;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, triggerName, collectionName) {
    this.page = page;
    this.node = page.getByLabel(`Trigger-${triggerName}`);
    this.nodeTitle = page.getByLabel(`Trigger-${triggerName}`).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.collectionDropDown = page.getByLabel("block-item-DataSourceCollectionCascader-workflows-Collection").locator(".ant-select-selection-search-input");
    this.dataBlocksInitiationRadio = page.getByLabel("Initiate and approve in data blocks only");
    this.dataBlocksAndGlobalApprovalBlocksInitiationRadio = page.getByLabel(
      "Initiate and approve in both data blocks and global approval blocks"
    );
    this.allowedToBeWithdrawnCheckbox = page.getByLabel("Allowed to be withdrawn");
    this.goToconfigureButton = page.getByRole("button", { name: "Go to configure" });
    this.addBlockButton = page.getByLabel(`schema-initializer-Grid-ApprovalApplyAddBlockButton-${collectionName}`);
    this.addApplyFormMenu = page.getByRole("menuitem", { name: "Apply form" });
    this.configureFieldsButton = page.getByLabel(`schema-initializer-Grid-form:configureFields-${collectionName}`);
    this.configureActionsButton = page.getByLabel(
      `schema-initializer-ActionBar-ApprovalApplyAddActionButton-${collectionName}`
    );
    this.saveDraftSwitch = page.getByRole("menuitem", { name: "Save draft" }).getByRole("switch");
    this.withdrawSwitch = page.getByRole("menuitem", { name: "Withdraw" }).getByRole("switch");
    this.preloadAssociationsDropDown = page.getByTestId("select-field-Preload associations");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = this.addNodeButton = page.getByLabel("add-button", { exact: true });
  }
}
class ApprovalPassthroughModeNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  addAssigneesButton;
  addSelectAssigneesMenu;
  addQueryAssigneesMenu;
  assigneesDropDown;
  OrRadio;
  AndRadio;
  votingRadio;
  votingThresholdEditBox;
  parallellyRadio;
  sequentiallyRadio;
  goToconfigureButton;
  addBlockButton;
  addDetailsMenu;
  detailsConfigureFieldsButton;
  addActionsMenu;
  actionsConfigureFieldsButton;
  actionsConfigureActionsButton;
  addApproveButton;
  addRejectButton;
  addReturnButton;
  addNodeResult;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName, collectionName) {
    this.page = page;
    this.node = page.getByLabel(`Approval-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Approval-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.addAssigneesButton = page.getByLabel("block-item-ArrayItems-workflows-Assignees").getByRole("button", { name: "plus Add" });
    this.addSelectAssigneesMenu = page.getByRole("button", { name: "Select assignees" });
    this.addQueryAssigneesMenu = page.getByRole("button", { name: "Query assignees" });
    this.assigneesDropDown = page.getByTestId("select-single");
    this.OrRadio = page.getByLabel("Or", { exact: true });
    this.AndRadio = page.getByLabel("And", { exact: true });
    this.votingRadio = page.getByLabel("Voting", { exact: true });
    this.votingThresholdEditBox = page.getByLabel("block-item-Negotiation-workflows-Negotiation mode").getByRole("spinbutton");
    this.parallellyRadio = page.getByLabel("Parallelly", { exact: true });
    this.sequentiallyRadio = page.getByLabel("Sequentially", { exact: true });
    this.goToconfigureButton = page.getByRole("button", { name: "Go to configure" });
    this.addBlockButton = page.getByLabel("schema-initializer-Grid-ApprovalProcessAddBlockButton-workflows");
    this.addDetailsMenu = page.getByRole("menuitem", { name: "Original application content" });
    this.detailsConfigureFieldsButton = page.getByLabel(
      `schema-initializer-Grid-details:configureFields-${collectionName}`
    );
    this.addActionsMenu = page.getByRole("menuitem", { name: "Process form" }).getByRole("switch");
    this.actionsConfigureFieldsButton = page.getByLabel("schema-initializer-Grid-FormItemInitializers-approvalRecords");
    this.actionsConfigureActionsButton = page.getByLabel(
      "schema-initializer-ActionBar-ApprovalProcessAddActionButton-"
    );
    this.addApproveButton = page.getByRole("menuitem", { name: "Approve" }).getByRole("switch");
    this.addRejectButton = page.getByRole("menuitem", { name: "Reject" }).getByRole("switch");
    this.addReturnButton = page.getByRole("menuitem", { name: "Return" }).getByRole("switch");
    this.addNodeResult = page.getByRole("menuitem", { name: "Node result right" });
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-calculation-${nodeName}`, { exact: true });
  }
}
class ApprovalBranchModeNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  addAssigneesButton;
  addSelectAssigneesMenu;
  addQueryAssigneesMenu;
  assigneesDropDown;
  OrRadio;
  AndRadio;
  votingRadio;
  votingThresholdEditBox;
  parallellyRadio;
  sequentiallyRadio;
  goToconfigureButton;
  addBlockButton;
  addDetailsMenu;
  detailsConfigureFieldsButton;
  addActionsMenu;
  actionsConfigureFieldsButton;
  actionsConfigureActionsButton;
  addApproveButton;
  addRejectButton;
  addReturnButton;
  addNodeResult;
  submitButton;
  cancelButton;
  addNodeButton;
  addReturnBranchNodeButton;
  addRejectBranchNodeButton;
  addApproveBranchNodeButton;
  endOnRejectCheckbox;
  constructor(page, nodeName, collectionName) {
    this.page = page;
    this.node = page.getByLabel(`Approval-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Approval-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.addAssigneesButton = page.getByLabel("block-item-ArrayItems-workflows-Assignees").getByRole("button", { name: "plus Add" });
    this.addSelectAssigneesMenu = page.getByRole("button", { name: "Select assignees" });
    this.addQueryAssigneesMenu = page.getByRole("button", { name: "Query assignees" });
    this.assigneesDropDown = page.getByTestId("select-single");
    this.OrRadio = page.getByLabel("Or", { exact: true });
    this.AndRadio = page.getByLabel("And", { exact: true });
    this.votingRadio = page.getByLabel("Voting", { exact: true });
    this.votingThresholdEditBox = page.getByLabel("block-item-Negotiation-workflows-Negotiation mode").getByRole("spinbutton");
    this.parallellyRadio = page.getByLabel("Parallelly", { exact: true });
    this.sequentiallyRadio = page.getByLabel("Sequentially", { exact: true });
    this.goToconfigureButton = page.getByRole("button", { name: "Go to configure" });
    this.addBlockButton = page.getByLabel("schema-initializer-Grid-ApprovalProcessAddBlockButton-workflows");
    this.addDetailsMenu = page.getByRole("menuitem", { name: "Original application content" });
    this.detailsConfigureFieldsButton = page.getByLabel(
      `schema-initializer-Grid-details:configureFields-${collectionName}`
    );
    this.addActionsMenu = page.getByRole("menuitem", { name: "Process form" }).getByRole("switch");
    this.actionsConfigureFieldsButton = page.getByLabel("schema-initializer-Grid-FormItemInitializers-approvalRecords");
    this.actionsConfigureActionsButton = page.getByLabel("schema-initializer-ActionBar-");
    this.addApproveButton = page.getByRole("menuitem", { name: "Approve" }).getByRole("switch");
    this.addRejectButton = page.getByRole("menuitem", { name: "Reject" }).getByRole("switch");
    this.addReturnButton = page.getByRole("menuitem", { name: "Return" }).getByRole("switch");
    this.addNodeResult = page.getByRole("menuitem", { name: "Node result right" });
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-calculation-${nodeName}`, { exact: true });
    this.addReturnBranchNodeButton = page.getByLabel(`add-button-approval-${nodeName}-1`);
    this.addApproveBranchNodeButton = page.getByLabel(`add-button-approval-${nodeName}-2`);
    this.addRejectBranchNodeButton = page.getByLabel(`add-button-approval-${nodeName}--1`);
    this.endOnRejectCheckbox = page.getByLabel("End the workflow after");
  }
}
class ScheduleTriggerNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  customTimeTriggerOptions;
  startTimeEntryBox;
  RrpeatModeDropdown;
  dataTableTimeFieldOptions;
  collectionDropDown;
  startTimeDropdown;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, triggerName, collectionName) {
    this.page = page;
    this.node = page.getByLabel(`Trigger-${triggerName}`);
    this.nodeTitle = page.locator("textarea").filter({ hasText: triggerName });
    this.nodeConfigure = this.node.locator(">div").first();
    this.customTimeTriggerOptions = page.getByLabel("Based on certain date");
    this.startTimeEntryBox = page.getByPlaceholder("Select date");
    this.RrpeatModeDropdown = page.getByLabel("block-item-RepeatField-workflows-Repeat mode");
    this.dataTableTimeFieldOptions = page.getByLabel("Based on date field of collection");
    this.collectionDropDown = page.getByLabel("block-item-DataSourceCollectionCascader-workflows-Collection").locator(".ant-select-selection-search-input");
    this.startTimeDropdown = page.getByLabel("block-item-OnField-workflows-Starts on");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel("add-button", { exact: true });
  }
}
class CollectionTriggerNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  collectionDropDown;
  triggerOnDropdown;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, triggerName, collectionName) {
    this.page = page;
    this.node = page.getByLabel(`Trigger-${triggerName}`);
    this.nodeTitle = page.getByLabel(`Trigger-${triggerName}`).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.collectionDropDown = page.getByLabel("block-item-DataSourceCollectionCascader-workflows-Collection").locator(".ant-select-selection-search-input");
    this.triggerOnDropdown = page.getByLabel("block-item-Select-workflows-Trigger on").getByRole("button", { name: "Trigger on" });
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel("add-button", { exact: true });
  }
}
class FormEventTriggerNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  collectionDropDown;
  relationalDataDropdown;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, triggerName, collectionName) {
    this.page = page;
    this.node = page.getByLabel(`Trigger-${triggerName}`);
    this.nodeTitle = page.getByLabel(`Trigger-${triggerName}`).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.collectionDropDown = page.getByLabel("block-item-DataSourceCollectionCascader-workflows-Collection").locator(".ant-select-selection-search-input");
    this.relationalDataDropdown = page.getByTestId("select-field-Preload associations");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel("add-button", { exact: true });
  }
}
class CustomActionEventTriggerNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  collectionDropDown;
  relationalDataDropdown;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, triggerName, collectionName) {
    this.page = page;
    this.node = page.getByLabel(`Trigger-${triggerName}`);
    this.nodeTitle = page.getByLabel(`Trigger-${triggerName}`).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.collectionDropDown = page.getByLabel("block-item-DataSourceCollectionCascader-workflows-Collection").locator(".ant-select-selection-search-input");
    this.relationalDataDropdown = page.getByTestId("select-field-Preload associations");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel("add-button", { exact: true });
  }
}
class CalculationNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  mathCalculationEngine;
  formulaCalculationEngine;
  calculationExpression;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`Calculation-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Calculation-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.mathCalculationEngine = page.getByLabel("Math.js");
    this.formulaCalculationEngine = page.getByLabel("Formula.js");
    this.calculationExpression = page.getByLabel("textbox");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-calculation-${nodeName}`, { exact: true });
  }
}
class QueryRecordNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  collectionDropDown;
  // allowMultipleDataBoxesForResults: Locator;
  addSortFieldsButton;
  pageNumberEditBox;
  pageNumberVariableButton;
  pageSizeEditBox;
  exitProcessOptionsBoxWithEmptyResult;
  singleRecordRadioButton;
  multipleRecordsRadioButton;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`Query record-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Query record-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.collectionDropDown = page.getByLabel("block-item-DataSourceCollectionCascader-workflows-Collection").locator(".ant-select-selection-search-input");
    this.singleRecordRadioButton = page.getByLabel("block-item-RadioWithTooltip-").getByLabel("Single record");
    this.multipleRecordsRadioButton = page.getByLabel("block-item-RadioWithTooltip-").getByLabel("Multiple records");
    this.addSortFieldsButton = page.getByRole("button", { name: "plus Add sort field" });
    this.pageNumberEditBox = page.getByLabel("variable-constant");
    this.pageNumberVariableButton = page.getByLabel("variable-button");
    this.pageSizeEditBox = page.getByLabel("block-item-InputNumber-workflows-Page size").getByRole("spinbutton");
    this.exitProcessOptionsBoxWithEmptyResult = page.getByLabel("Exit when query result is null");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-query-${nodeName}`, { exact: true });
  }
}
class CreateRecordNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  collectionDropDown;
  addFieldsButton;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`Create record-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Create record-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.collectionDropDown = page.getByLabel("block-item-DataSourceCollectionCascader-workflows-Collection").locator(".ant-select-selection-search-input");
    this.addFieldsButton = page.getByLabel("schema-initializer-Grid-assignFieldValuesForm:configureFields");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-create-${nodeName}`, { exact: true });
  }
}
class UpdateRecordNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  collectionDropDown;
  batchUpdateModeRadio;
  articleByArticleUpdateModeRadio;
  addFieldsButton;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`Update record-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Update record-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.collectionDropDown = page.getByLabel("block-item-DataSourceCollectionCascader-workflows-Collection").locator(".ant-select-selection-search-input");
    this.batchUpdateModeRadio = page.getByLabel("block-item-RadioWithTooltip-workflows-Update mode").getByLabel("Update in a batch");
    this.articleByArticleUpdateModeRadio = page.getByLabel("block-item-RadioWithTooltip-workflows-Update mode").getByLabel("Update one by one");
    this.addFieldsButton = page.getByLabel("schema-initializer-Grid-assignFieldValuesForm:configureFields");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-update-${nodeName}`, { exact: true });
  }
}
class DeleteRecordNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  collectionDropDown;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`Delete record-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Delete record-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.collectionDropDown = page.getByLabel("block-item-DataSourceCollectionCascader-workflows-Collection").locator(".ant-select-selection-search-input");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-delete-${nodeName}`, { exact: true });
  }
}
class AggregateNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  countRadio;
  sumRadio;
  avgRadio;
  maxRadio;
  minRadio;
  dataTableDataRadio;
  linkedDataTableDataRadio;
  collectionDropDown;
  aggregatedFieldDropDown;
  distinctCheckBox;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`Aggregate-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Aggregate-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.countRadio = page.getByLabel("COUNT");
    this.sumRadio = page.getByLabel("SUM", { exact: true });
    this.avgRadio = page.getByLabel("AVG", { exact: true });
    this.maxRadio = page.getByLabel("MAX", { exact: true });
    this.minRadio = page.getByLabel("MIN", { exact: true });
    this.dataTableDataRadio = page.getByLabel("Data of collection");
    this.linkedDataTableDataRadio = page.getByLabel("Data of associated collection");
    this.collectionDropDown = page.getByLabel("block-item-DataSourceCollectionCascader-workflows-Data of collection").locator(".ant-select-selection-search-input");
    this.aggregatedFieldDropDown = page.getByLabel("block-item-FieldsSelect-workflows-Field to aggregate").locator(".ant-select-selection-search-input");
    this.distinctCheckBox = page.getByLabel("block-item-Checkbox-workflows").locator('input.ant-checkbox-input[type="checkbox"]');
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-aggregate-${nodeName}`, { exact: true });
  }
}
class ManualNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  assigneesDropDown;
  configureUserInterfaceButton;
  addBlockButton;
  triggerDataMenu;
  nodeDataMenu;
  customFormMenu;
  createRecordFormMenu;
  updateRecordFormMenu;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`Manual-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Manual-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.assigneesDropDown = page.getByTestId("select-single");
    this.configureUserInterfaceButton = page.getByRole("button", { name: "Configure user interface" });
    this.addBlockButton = page.getByLabel(
      "schema-initializer-Grid-workflowManual:popup:configureUserInterface:addBlock-workflows"
    );
    this.triggerDataMenu = page.getByRole("menuitem", { name: "Trigger data" });
    this.nodeDataMenu = page.getByRole("menuitem", { name: "Node result right" });
    this.customFormMenu = page.getByRole("menuitem", { name: "Custom form" });
    this.createRecordFormMenu = page.getByRole("menuitem", { name: "Create record form right" });
    this.updateRecordFormMenu = page.getByRole("menuitem", { name: "Update record form right" });
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-manual-${nodeName}`, { exact: true });
  }
}
class ConditionYesNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  basicRadio;
  mathRadio;
  formulaRadio;
  conditionExpressionEditBox;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`Condition-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Condition-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.conditionExpressionEditBox = page.getByLabel("textbox");
    this.basicRadio = page.getByLabel("Basic");
    this.mathRadio = page.getByLabel("Math.js");
    this.formulaRadio = page.getByLabel("Formula.js");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-condition-${nodeName}`, { exact: true });
  }
}
class ConditionBranchNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  basicRadio;
  mathRadio;
  formulaRadio;
  conditionExpressionEditBox;
  submitButton;
  cancelButton;
  addNoBranchNode;
  addYesBranchNode;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`Condition-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`Condition-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.conditionExpressionEditBox = page.getByLabel("textbox");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-condition-${nodeName}`, { exact: true });
    this.basicRadio = page.getByLabel("Basic");
    this.mathRadio = page.getByLabel("Math.js");
    this.formulaRadio = page.getByLabel("Formula.js");
    this.addNoBranchNode = page.getByLabel(`add-button-condition-${nodeName}-0`);
    this.addYesBranchNode = page.getByLabel(`add-button-condition-${nodeName}-1`);
  }
}
class SQLNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  sqlEditBox;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`SQL action-${nodeName}`, { exact: true });
    this.nodeTitle = page.getByLabel(`SQL action-${nodeName}`, { exact: true }).getByRole("textbox");
    this.nodeConfigure = this.node.locator(">div").first();
    this.sqlEditBox = page.getByLabel("block-item-WorkflowVariableRawTextArea-workflows-SQL").getByRole("textbox");
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-sql-${nodeName}`, { exact: true });
  }
}
class ParallelBranchNode {
  page;
  node;
  nodeTitle;
  nodeConfigure;
  addBranchButton;
  allSucceededRadio;
  anySucceededRadio;
  anySucceededOrFailedRadio;
  submitButton;
  cancelButton;
  addNodeButton;
  constructor(page, nodeName) {
    this.page = page;
    this.node = page.getByLabel(`Parallel branch-${nodeName}`, { exact: true });
    this.nodeTitle = page.locator("textarea").filter({ hasText: nodeName });
    this.nodeConfigure = this.node.locator(">div").first();
    this.addBranchButton = page.getByLabel(`add-button-parallel-${nodeName}-add-branch`, { exact: true });
    this.allSucceededRadio = page.getByLabel("All succeeded", { exact: true });
    this.anySucceededRadio = page.getByLabel("Any succeeded", { exact: true });
    this.anySucceededOrFailedRadio = page.getByLabel("Any succeeded or failed", { exact: true });
    this.submitButton = page.getByLabel("action-Action-Submit-workflows");
    this.cancelButton = page.getByLabel("action-Action-Cancel-workflows");
    this.addNodeButton = page.getByLabel(`add-button-parallel-${nodeName}`, { exact: true });
  }
}
var e2ePageObjectModel_default = module.exports = {
  CreateWorkFlow,
  EditWorkFlow,
  WorkflowManagement,
  WorkflowListRecords,
  ApprovalTriggerNode,
  ApprovalPassthroughModeNode,
  ScheduleTriggerNode,
  CollectionTriggerNode,
  FormEventTriggerNode,
  CalculationNode,
  QueryRecordNode,
  CreateRecordNode,
  UpdateRecordNode,
  DeleteRecordNode,
  AggregateNode,
  ManualNode,
  ConditionYesNode,
  ConditionBranchNode,
  SQLNode,
  ParallelBranchNode,
  ApprovalBranchModeNode,
  CustomActionEventTriggerNode
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AggregateNode,
  ApprovalBranchModeNode,
  ApprovalPassthroughModeNode,
  ApprovalTriggerNode,
  CalculationNode,
  CollectionTriggerNode,
  ConditionBranchNode,
  ConditionYesNode,
  CreateRecordNode,
  CreateWorkFlow,
  CustomActionEventTriggerNode,
  DeleteRecordNode,
  EditWorkFlow,
  FormEventTriggerNode,
  ManualNode,
  ParallelBranchNode,
  QueryRecordNode,
  SQLNode,
  ScheduleTriggerNode,
  UpdateRecordNode,
  WorkflowListRecords,
  WorkflowManagement
});
