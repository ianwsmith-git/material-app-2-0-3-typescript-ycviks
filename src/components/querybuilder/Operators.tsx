import { escapeRegExp } from "lodash";
import React from "react";
import { BinaryOperator } from "react-awesome-query-builder/lib";

//----------------------------  conjunctions
//----------------------------  operators

// helpers for mongo format
const mongoFormatOp1 = (mop: string, mc: (arg0: any) => any, not: any, field: string, _op: any, value: any, useExpr: any) => {
    const $field = typeof field == "string" && !field.startsWith("$") ? "$" + field : field;
    const mv = mc(value);
    if (mv === undefined)
        return undefined;
    if (not) {
        return !useExpr
            ? { [field]: { "$not": { [mop]: mv } } }
            : { "$not": { [mop]: [$field, mv] } };
    } else {
        if (!useExpr && mop == "$eq")
            return { [field]: mv }; // short form
        return !useExpr
            ? { [field]: { [mop]: mv } }
            : { [mop]: [$field, mv] };
    }
};

const mongoFormatOp2 = (mops: any[], not: any, field: string, _op: any, values: any[], useExpr: any) => {
    const $field = typeof field == "string" && !field.startsWith("$") ? "$" + field : field;
    if (not) {
        return !useExpr
            ? { [field]: { "$not": { [mops[0]]: values[0], [mops[1]]: values[1] } } }
            : {
                "$not":
                {
                    "$and": [
                        { [mops[0]]: [$field, values[0]] },
                        { [mops[1]]: [$field, values[1]] },
                    ]
                }
            };
    } else {
        return !useExpr
            ? { [field]: { [mops[0]]: values[0], [mops[1]]: values[1] } }
            : {
                "$and": [
                    { [mops[0]]: [$field, values[0]] },
                    { [mops[1]]: [$field, values[1]] },
                ]
            };
    }
};


const Operators = {
    equal: {
        label: "==",
        labelForFormat: "=="
    } as BinaryOperator,
    not_equal: {
        label: "not equal",
        labelForFormat: "not_equal",
        sqlOp: "<>",
        reversedOp: "equal"
    },
    less: {
        label: "<",
        labelForFormat: "<",
        sqlOp: "<",
        reversedOp: "greater_or_equal"
    },
    less_or_equal: {
        label: "<=",
        labelForFormat: "<=",
        sqlOp: "<=",
        reversedOp: "greater"
    },
    greater: {
        label: ">",
        labelForFormat: ">",
        sqlOp: ">",
        reversedOp: "less_or_equal"
    },
    greater_or_equal: {
        label: ">=",
        labelForFormat: ">=",
        sqlOp: ">=",
        reversedOp: "less"
    },
    like: {
        label: "Like",
        labelForFormat: "Like",
        reversedOp: "not_like",
        sqlOp: "LIKE",
        not_like: {
            label: "Not like",
            reversedOp: "like",
            labelForFormat: "Not Like",
            sqlOp: "NOT LIKE"
        },
        starts_with: {
            label: "Starts with",
            labelForFormat: "Starts with",
            sqlOp: "LIKE"
        },
        ends_with: {
            label: "Ends with",
            labelForFormat: "Ends with",
            sqlOp: "LIKE"
        },
        between: {
            label: "Between",
            labelForFormat: "BETWEEN",
            sqlOp: "BETWEEN",
            cardinality: 2
        },
        not_between: {
            label: "Not between",
            labelForFormat: "NOT BETWEEN",
            sqlOp: "NOT BETWEEN",
        },
        is_empty: {
            label: "Is empty",
            labelForFormat: "IS EMPTY",
            sqlOp: "IS EMPTY",
            cardinality: 0,
            reversedOp: "is_not_empty"
        },
        is_not_empty: {
            label: "Is not empty",
            labelForFormat: "IS NOT EMPTY",
            sqlOp: "IS NOT EMPTY",
            cardinality: 0,
            reversedOp: "is_empty"
        },
        select_equals: {
            label: "==",
            labelForFormat: "==",
            sqlOp: "=",
        },
        select_not_equals: {
            label: "!=",
            labelForFormat: "!=",
            sqlOp: "<>"
        },
        select_any_in: {
            label: "Any in",
            labelForFormat: "IN",
            sqlOp: "IN"
        },
        select_not_any_in: {
            label: "Not in",
            labelForFormat: "NOT IN",
            sqlOp: "NOT IN"
        },
        multiselect_equals: {
            label: "Equals",
            labelForFormat: "==",
            sqlOp: "="
        },
        multiselect_not_equals: {
            label: "Not equals",
            labelForFormat: "!=",
            sqlOp: "<>"
        },

    }
};


export default Operators;