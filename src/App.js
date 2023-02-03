import './App.css'
import { useState } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { Button, Input } from 'antd';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const DocType = {
  PDF: 1,
  WORD: 2,
  NONE: 0,
}

function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [docsURL, setDocsURL] = useState('');
  const [document, setDocument] = useState('');
  const [docType, setDocType] = useState(DocType.NONE);

  const onClickButton = () => {
    setDocument(docsURL);
    const type = docsURL.substring(docsURL.lastIndexOf('.') + 1);

    switch (type) {
      case 'pdf':
        setDocType(DocType.PDF);
        break;

      case 'doc':
      case 'docx':
        setDocType(DocType.WORD);
        break;

      default:
        setDocType(DocType.NONE);
        break;
    }
  }

  return (
    <div className='container'>
      <form action="">
        <label htmlFor="">
          <h5 style={{ textAlign: 'center' }}>UPLOAD FILE</h5>
          <br />
          <Input.Group compact>
            <Input style={{ width: 'calc(100% - 110px)' }} addonBefore="Current file URL" onChange={(e) => setDocsURL(e.target.value)} />
            <Button type='primary' onClick={() => onClickButton()}>Update URL</Button>
          </Input.Group>
        </label>
      </form>
      <h5 style={{ textAlign: 'center' }}>VIEW FILE</h5>
      <div className='doc-viewer'>
        {document && docType === DocType.PDF && (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js'>
            <Viewer
              fileUrl={document}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.PageWidth}
            />
          </Worker>
        )}
        {document && docType === DocType.WORD && (
          <DocViewer
            documents={[{ uri: document }]}
            pluginRenderers={DocViewerRenderers}
          />
        )}
      </div>
    </div>
  );
}

export default App;
