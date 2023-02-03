import { useState } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { Button, Input } from 'antd';

function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [docsURL, setDocsURL] = useState('');
  const [document, setDocument] = useState('');

  return (
    <div>
      <form action="">
        <label htmlFor="">
          <h5 style={{ textAlign: 'center' }}>UPLOAD PDF FILE</h5>
          <br />
          <Input.Group compact>
            <Input style={{ width: 'calc(100% - 110px)' }} addonBefore="Current file URL" onChange={(e) => setDocsURL(e.target.value)} />
            <Button type='primary' onClick={() => setDocument(docsURL)}>Update URL</Button>
          </Input.Group>
        </label>
      </form>
      <h5 style={{ textAlign: 'center' }}>VIEW PDF</h5>
      <div>
        {document && (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js'>
            <Viewer
              fileUrl={document}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.PageWidth}
            />
          </Worker>
        )}
      </div>
    </div>
  );
}

export default App;
