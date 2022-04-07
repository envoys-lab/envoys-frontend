import React from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'

import DocIcon from '../../assets/DocIcon'

import styles from './Documents.module.scss'

const Documents = ({ documents }) => {
  const handleDownload = ({ url, name }) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, name)
      })
  }

  const renderDocument = ({ url, name }) => {
    return (
      <div className={styles['document']} onClick={() => handleDownload({ url, name })}>
        <DocIcon />
        <div className={styles['document__name']}>{name}</div>
      </div>
    )
  }

  return <div className={styles['documents']}>{documents.map(renderDocument)}</div>
}

export default Documents
