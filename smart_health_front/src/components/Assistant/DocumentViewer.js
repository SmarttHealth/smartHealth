import React, {useState} from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker as PdfjsWorker } from 'pdfjs-dist/build/pdf.worker.entry';
import Modal from 'react-modal';

const DocumentViewer = ({ content, onClose }) => {
  const base64Content = content.data.content;
  const layoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="document-viewer">
      {base64Content && (
        <div>
          <h3>Visualiseur de documents</h3>
          <Modal
            isOpen={true} // Ensure that the modal is always open
            onRequestClose={onClose}
            contentLabel="Visualiseur de documents"
          >
            <Worker worker={PdfjsWorker}>
              <Viewer
                fileUrl={`data:application/pdf;base64,${base64Content}`}
                plugins={[layoutPluginInstance]}
              />
            </Worker>
            <button onClick={onClose} className='bg-blue-500 px-4 py-1 mt-3 focus:outline-none mr-2 rounded border-4 border-blue-500'>
              Fermer le visualiseur
            </button>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;