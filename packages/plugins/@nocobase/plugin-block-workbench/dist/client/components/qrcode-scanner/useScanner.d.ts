/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Html5Qrcode } from 'html5-qrcode';
export declare function useScanner({ onScannerSizeChanged, elementId }: {
    onScannerSizeChanged: any;
    elementId: any;
}): {
    startScanCamera: (scanner: Html5Qrcode) => Promise<null>;
    startScanFile: (file: File) => Promise<void>;
};
