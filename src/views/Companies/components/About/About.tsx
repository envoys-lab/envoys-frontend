import React from 'react'
import ReactMarkdown from 'react-markdown'

const About = ({ markdown }) => {
  return <ReactMarkdown children={markdown} />
}

export default About
