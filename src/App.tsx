import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './consts'
import { ArrowsIcon } from './components/Icons'
import { LangSelector } from './components/LangSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { tranlate } from './services/translate'

function App() {
  const {
    fromLang,
    toLang,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    fromText,
    result,
    setFromText,
    setResult,
    loading
  } = useStore()

  // useEffect(() => {
  //   tranlate({ fromLang, toLang, text: fromText })
  //     .then(response => {
  //       if (response == null) return
  //       setResult(response)
  //     })
  //     .catch(error => {
  //       setResult(error)
  //     })
  // }, [fromText, fromLang, toLang])

  return (
    <Container>
      <h2>Google Translator clone</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <h2>From</h2>
            <p>{fromLang}</p>
            <LangSelector
              type={SectionType.From}
              value={fromLang}
              onChange={setFromLanguage}
            />
            <TextArea
              placeholder={'Insert text...'}
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col>
          <Button variant='link' disabled={fromLang === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon></ArrowsIcon>
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <h2>To</h2>
            <p>{toLang}</p>
            <LangSelector
              type={SectionType.To}
              value={toLang}
              onChange={setToLanguage}
            />
            <TextArea
              placeholder={'Traduction'}
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
