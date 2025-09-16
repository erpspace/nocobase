/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const fieldTypeMap: {
    postgres: {
        'character varying': string[];
        varchar: string[];
        char: string[];
        character: string;
        text: string;
        oid: string;
        name: string;
        smallint: string[];
        integer: string[];
        bigint: string[];
        decimal: string;
        numeric: string;
        real: string;
        'double precision': string;
        'timestamp without time zone': string;
        'timestamp with time zone': string;
        'time without time zone': string;
        date: string;
        boolean: string;
        json: string[];
        jsonb: string[];
        point: string;
        path: string;
        polygon: string;
        circle: string;
        uuid: string;
        set: string;
        array: string;
    };
    mysql: {
        smallint: string[];
        tinyint: string[];
        mediumint: string[];
        'smallint unsigned': string[];
        'tinyint unsigned': string[];
        'mediumint unsigned': string[];
        char: string[];
        varchar: string[];
        date: string;
        time: string;
        tinytext: string;
        text: string;
        mediumtext: string;
        longtext: string;
        int: string[];
        'int unsigned': string[];
        integer: string[];
        bigint: string[];
        'bigint unsigned': string[];
        float: string;
        double: string;
        boolean: string;
        decimal: string;
        year: string[];
        datetime: string[];
        timestamp: string;
        json: string[];
        enum: string;
    };
    sqlite: {
        text: string;
        varchar: string[];
        integer: string;
        real: string;
        datetime: string;
        date: string;
        time: string;
        boolean: string;
        numeric: string;
        json: string[];
    };
    mariadb: {
        smallint: string[];
        tinyint: string[];
        mediumint: string[];
        'smallint unsigned': string[];
        'tinyint unsigned': string[];
        'mediumint unsigned': string[];
        char: string[];
        varchar: string[];
        date: string;
        time: string;
        tinytext: string;
        text: string;
        mediumtext: string;
        longtext: string;
        int: string[];
        'int unsigned': string[];
        integer: string[];
        bigint: string[];
        'bigint unsigned': string[];
        float: string;
        double: string;
        boolean: string;
        decimal: string;
        year: string[];
        datetime: string[];
        timestamp: string;
        json: string[];
        enum: string;
    };
};
export default fieldTypeMap;
