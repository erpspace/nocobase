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
var templatesOfCollection_exports = {};
__export(templatesOfCollection_exports, {
  general: () => general,
  generalWithAdvanced: () => generalWithAdvanced,
  generalWithAssociation: () => generalWithAssociation,
  generalWithBasic: () => generalWithBasic,
  generalWithChoices: () => generalWithChoices,
  generalWithDatetime: () => generalWithDatetime,
  generalWithM2oSingleSelect: () => generalWithM2oSingleSelect,
  generalWithMedia: () => generalWithMedia,
  generalWithMultiLevelM2mFields: () => generalWithMultiLevelM2mFields,
  generalWithMultiLevelM2oFields: () => generalWithMultiLevelM2oFields,
  generalWithSingleLineText: () => generalWithSingleLineText,
  generalWithSystemInfo: () => generalWithSystemInfo,
  tree: () => tree
});
module.exports = __toCommonJS(templatesOfCollection_exports);
const general = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "singleLineText",
        interface: "input"
      },
      {
        name: "longText",
        interface: "textarea"
      },
      {
        name: "phone",
        interface: "phone"
      },
      {
        name: "email",
        interface: "email"
      },
      {
        name: "url",
        interface: "url"
      },
      {
        name: "integer",
        interface: "integer"
      },
      {
        name: "number",
        interface: "number"
      },
      {
        name: "percent",
        interface: "percent"
      },
      {
        name: "password",
        interface: "password"
      },
      {
        name: "color",
        interface: "color"
      },
      {
        name: "icon",
        interface: "icon"
      },
      {
        name: "checkbox",
        interface: "checkbox"
      },
      {
        name: "singleSelect",
        interface: "select",
        uiSchema: {
          enum: [
            {
              value: "option1",
              label: "option1",
              color: "red"
            },
            {
              value: "option2",
              label: "option2",
              color: "magenta"
            },
            {
              value: "option3",
              label: "option3",
              color: "volcano"
            }
          ],
          type: "string",
          "x-component": "Select",
          title: "Single select"
        }
      },
      {
        name: "multipleSelect",
        interface: "multipleSelect",
        uiSchema: {
          enum: [
            {
              value: "optoin1",
              label: "optoin1",
              color: "red"
            },
            {
              value: "optoin2",
              label: "option2",
              color: "magenta"
            },
            {
              value: "opton3",
              label: "option3",
              color: "volcano"
            }
          ],
          type: "array",
          "x-component": "Select",
          "x-component-props": {
            mode: "multiple"
          },
          title: "Multiple select"
        },
        defaultValue: []
      },
      {
        name: "radioGroup",
        interface: "radioGroup",
        uiSchema: {
          enum: [
            {
              value: "option1",
              label: "option1",
              color: "red"
            },
            {
              value: "option2",
              label: "option2",
              color: "magenta"
            },
            {
              value: "option3",
              label: "option3",
              color: "volcano"
            }
          ],
          type: "string",
          "x-component": "Radio.Group",
          title: "Radio group"
        }
      },
      {
        name: "checkboxGroup",
        interface: "checkboxGroup",
        uiSchema: {
          enum: [
            {
              value: "option1",
              label: "option1",
              color: "red"
            },
            {
              value: "option2",
              label: "option2",
              color: "magenta"
            },
            {
              value: "option3",
              label: "option3",
              color: "volcano"
            }
          ],
          type: "string",
          "x-component": "Checkbox.Group",
          title: "Checkbox group"
        },
        defaultValue: []
      },
      {
        name: "chinaRegion",
        interface: "chinaRegion"
      },
      {
        name: "markdown",
        interface: "markdown"
      },
      {
        name: "richText",
        interface: "richText"
      },
      {
        name: "attachment",
        interface: "attachment"
      },
      {
        name: "datetime",
        interface: "datetime"
      },
      {
        name: "time",
        interface: "time"
      },
      {
        name: "oneToOneBelongsTo",
        interface: "obo",
        target: "users"
      },
      {
        name: "oneToOneHasOne",
        interface: "oho",
        target: "users"
      },
      {
        name: "oneToMany",
        interface: "o2m",
        target: "users"
      },
      {
        name: "manyToOne",
        interface: "m2o",
        target: "users"
      },
      {
        name: "manyToMany",
        interface: "m2m",
        target: "users"
      },
      {
        name: "formula",
        interface: "formula"
      },
      {
        name: "sequence",
        interface: "sequence"
      },
      {
        name: "JSON",
        interface: "json"
      },
      {
        name: "collection",
        interface: "collection"
      }
    ]
  }
];
const generalWithBasic = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "singleLineText",
        interface: "input"
      },
      {
        name: "longText",
        interface: "textarea"
      },
      {
        name: "phone",
        interface: "phone"
      },
      {
        name: "email",
        interface: "email"
      },
      {
        name: "url",
        interface: "url"
      },
      {
        name: "integer",
        interface: "integer"
      },
      {
        name: "number",
        interface: "number"
      },
      {
        name: "percent",
        interface: "percent"
      },
      {
        name: "password",
        interface: "password"
      },
      {
        name: "color",
        interface: "color"
      },
      {
        name: "icon",
        interface: "icon"
      },
      {
        name: "sort",
        interface: "sort"
      }
    ]
  }
];
const generalWithChoices = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "checkbox",
        interface: "checkbox"
      },
      {
        name: "checkboxGroup",
        interface: "checkboxGroup"
      },
      {
        name: "chinaRegion",
        interface: "chinaRegion"
      },
      {
        name: "multipleSelect",
        interface: "multipleSelect"
      },
      {
        name: "radioGroup",
        interface: "radioGroup"
      },
      {
        name: "singleSelect",
        interface: "select"
      }
    ]
  }
];
const generalWithMedia = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "markdown",
        interface: "markdown"
      },
      {
        name: "richText",
        interface: "richText"
      },
      {
        name: "attachment",
        interface: "attachment"
      }
    ]
  }
];
const generalWithDatetime = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "datetime",
        interface: "datetime"
      },
      {
        name: "time",
        interface: "time"
      }
    ]
  }
];
const generalWithAssociation = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "oneToOneBelongsTo",
        interface: "obo",
        target: "users"
      },
      {
        name: "oneToOneHasOne",
        interface: "oho",
        target: "users"
      },
      {
        name: "oneToMany",
        interface: "o2m",
        target: "users"
      },
      {
        name: "manyToOne",
        interface: "m2o",
        target: "users"
      },
      {
        name: "manyToMany",
        interface: "m2m",
        target: "users"
      },
      {
        name: "id",
        interface: "id"
      }
    ]
  }
];
const generalWithAdvanced = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "formula",
        interface: "formula"
      },
      {
        name: "sequence",
        interface: "sequence"
      },
      {
        name: "JSON",
        interface: "json"
      },
      {
        name: "collection",
        interface: "collection"
      }
    ]
  }
];
const generalWithSystemInfo = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "createdAt",
        interface: "createdAt"
      },
      {
        name: "updatedAt",
        interface: "updatedAt"
      },
      {
        name: "createdBy",
        interface: "createdBy"
      },
      {
        name: "updatedBy",
        interface: "updatedBy"
      },
      {
        name: "id",
        interface: "id"
      },
      {
        name: "tableoid",
        interface: "tableoid"
      }
    ]
  }
];
const generalWithSingleLineText = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "singleLineText",
        interface: "input"
      }
    ]
  }
];
const generalWithM2oSingleSelect = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "f_sx575h93rzc",
        interface: "integer",
        isForeignKey: true,
        uiSchema: {
          type: "number",
          title: "f_sx575h93rzc",
          "x-component": "InputNumber",
          "x-read-pretty": true
        }
      },
      {
        name: "f_t22o7loai3j",
        interface: "integer",
        isForeignKey: true,
        uiSchema: {
          type: "number",
          title: "f_t22o7loai3j",
          "x-component": "InputNumber",
          "x-read-pretty": true
        }
      },
      {
        name: "f_y9xcjaa06sc",
        interface: "integer",
        isForeignKey: true,
        uiSchema: {
          type: "number",
          title: "f_y9xcjaa06sc",
          "x-component": "InputNumber",
          "x-read-pretty": true
        }
      },
      {
        name: "manyToOne",
        interface: "m2o",
        foreignKey: "f_t22o7loai3j",
        uiSchema: {
          "x-component": "AssociationField",
          "x-component-props": {
            multiple: false,
            fieldNames: {
              label: "id",
              value: "id"
            }
          },
          title: "Many to one"
        },
        target: "users",
        targetKey: "id"
      },
      {
        name: "oneToMany",
        interface: "o2m",
        foreignKey: "f_d3ilpempiob",
        uiSchema: {
          "x-component": "AssociationField",
          "x-component-props": {
            multiple: true,
            fieldNames: {
              label: "id",
              value: "id"
            }
          },
          title: "One to many"
        },
        target: "users",
        targetKey: "id",
        sourceKey: "id"
      },
      {
        name: "singleSelect",
        interface: "select",
        uiSchema: {
          enum: [
            {
              value: "option1",
              label: "option2",
              color: "red"
            },
            {
              value: "option2",
              label: "option2",
              color: "magenta"
            },
            {
              value: "option3",
              label: "option3",
              color: "volcano"
            }
          ],
          type: "string",
          "x-component": "Select",
          title: "Single select"
        }
      }
    ]
  },
  {
    name: "targetToGeneral",
    title: "Target to general",
    fields: [
      {
        name: "toGeneral",
        interface: "m2o",
        target: "general"
      }
    ]
  }
];
const tree = [
  {
    name: "treeCollection",
    title: "Tree collection",
    template: "tree"
  }
];
const generalWithMultiLevelM2oFields = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "m2oField0",
        interface: "m2o",
        target: "m2oField1"
      },
      {
        name: "singleLineText",
        interface: "input"
      }
    ]
  },
  {
    name: "m2oField1",
    title: "M2o field 1",
    fields: [
      {
        name: "m2oField1",
        interface: "m2o",
        target: "m2oField2"
      }
    ]
  },
  {
    name: "m2oField2",
    title: "M2o field 2",
    fields: [
      {
        name: "m2oField2",
        interface: "m2o",
        target: "m2oField3"
      }
    ]
  },
  {
    name: "m2oField3",
    title: "M2o field 3",
    fields: [
      {
        name: "m2oField3",
        interface: "m2o",
        target: "users"
      }
    ]
  }
];
const generalWithMultiLevelM2mFields = [
  {
    name: "general",
    title: "General",
    fields: [
      {
        name: "m2mField0",
        interface: "m2m",
        target: "m2mField1"
      },
      {
        name: "singleLineText",
        interface: "input"
      }
    ]
  },
  {
    name: "m2mField1",
    title: "M2o field 1",
    fields: [
      {
        name: "m2mField1",
        interface: "m2m",
        target: "m2mField2"
      }
    ]
  },
  {
    name: "m2mField2",
    title: "M2o field 2",
    fields: [
      {
        name: "m2mField2",
        interface: "m2m",
        target: "users"
      }
    ]
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  general,
  generalWithAdvanced,
  generalWithAssociation,
  generalWithBasic,
  generalWithChoices,
  generalWithDatetime,
  generalWithM2oSingleSelect,
  generalWithMedia,
  generalWithMultiLevelM2mFields,
  generalWithMultiLevelM2oFields,
  generalWithSingleLineText,
  generalWithSystemInfo,
  tree
});
