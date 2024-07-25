import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

// type Props =
//   | { loading?: undefined, onChange: (value: string) => void, value: string, placeholder: string, autoFocus: boolean, type SectionType }
//   | { loading?: boolean, onChange: (value: string) => void, value: string, placeholder: string, autoFocus: boolean, type SectionType }

interface Props {
  type: SectionType
  placeholder: string
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles = { height: '200px', border: 0 }
const getPlaceHolder = (
  { type, loading }: { type: SectionType, loading?: boolean }
) => {
  if (type === SectionType.From) return 'Introduce text'
  if (loading === true) return 'Cargando...'
  return 'Traduction'
}

export const TextArea = ({
  type,
  loading,
  onChange,
  value
}: Props) => {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as='textarea'
      placeholder={getPlaceHolder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
      disabled={type === SectionType.To}
    />
  )
}
