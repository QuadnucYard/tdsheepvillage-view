const dialogImportState = reactive<{
  visible: boolean;
  data: string;
  resolve?: (value: any) => void;
  reject?: (reason?: any) => void;
}>({
  visible: false,
  data: "",
  resolve: undefined,
  reject: undefined,
});

const dialogImportActions = {
  open: () => {
    dialogImportState.data = "";
    dialogImportState.visible = true;
    return new Promise<any>((resolve, reject) => {
      dialogImportState.resolve = resolve;
      dialogImportState.reject = reject;
    });
  },
  close: () => {
    dialogImportState.visible = false;
  },
};

export const useDialogImport = () => {
  return {
    state: dialogImportState,
    open: dialogImportActions.open,
    close: dialogImportActions.close,
  };
};

const dialogExportState = reactive<{
  visible: boolean;
  data: any;
  resolve?: (value: any) => void;
  reject?: (reason?: any) => void;
}>({
  visible: false,
  data: null,
});

const dialogExportActions = {
  open: (data: any) => {
    dialogExportState.data = data;
    dialogExportState.visible = true;
    return new Promise<any>((resolve, reject) => {
      dialogExportState.resolve = resolve;
      dialogExportState.reject = reject;
    });
  },
  close: () => {
    dialogExportState.visible = false;
  },
};

export const useDialogExport = () => {
  return {
    state: dialogExportState,
    open: dialogExportActions.open,
    close: dialogExportActions.close,
  };
};
