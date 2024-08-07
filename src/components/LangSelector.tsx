import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, VALID_LANGUAGES } from '../consts'
import { type FC } from 'react'
import { FromLanguage, Language, SectionType } from '../types.d'

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LangSelector: FC<Props> = ({ onChange, type, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select
      aria-label="Default select example"
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Auto</option>}

      {Object.entries(VALID_LANGUAGES).map(([key, value]) => {
        return (
          <option value={key} key={key}>{value}</option>
        )
      })}
    </Form.Select>
  )
}
