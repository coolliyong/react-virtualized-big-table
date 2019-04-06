import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { defaultTableRowRenderer, Table } from 'react-virtualized'

const SortableTable = SortableContainer(Table)
const SortableTableRowRenderer = SortableElement(defaultTableRowRenderer)

function rowRenderer (props) {
  return <SortableTableRowRenderer {...props} />
}

function CustomizedTable (props) {
  return (
    <SortableTable
      rowRenderer={rowRenderer}
      {...props}
    />
  )
}

export default CustomizedTable;