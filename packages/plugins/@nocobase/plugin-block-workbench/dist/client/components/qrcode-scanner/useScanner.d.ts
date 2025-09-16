import { Html5Qrcode } from 'html5-qrcode';
export declare function useScanner({ onScannerSizeChanged, elementId, onScanSuccess }: {
    onScannerSizeChanged: any;
    elementId: any;
    onScanSuccess: any;
}): {
    startScanCamera: (scanner: Html5Qrcode) => Promise<null>;
    startScanFile: (file: File) => Promise<void>;
};
