import BorrowRequestPage from './BorrowRequestPage.jsx'
import useBookSelection from '../hooks/useBookSelection.js'

export default function BorrowRequestContainer() {
  const { selectedId, selectedItem, clearSelection } = useBookSelection()

  return (
    <BorrowRequestPage
      key={selectedId ?? 'empty'}
      item={selectedItem}
      onClearSelection={clearSelection}
    />
  )
}