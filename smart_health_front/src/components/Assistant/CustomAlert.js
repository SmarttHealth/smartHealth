export const CustomAlert = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="modal-overlay bg-black opacity-25 fixed inset-0"></div>
        <div className="modal z-30 bg-white rounded p-4 shadow-md">
          <p className="text-sm">{message}</p>
          <div className="modal-buttons mt-2 flex justify-end">
            <button
              onClick={onConfirm}
              className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="ml-2 px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700"
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };
  