type Props = {data: JSON}

function UsersEditForm({data}: Props) {
  return (
    <div>
        Editing
        {JSON.stringify(data)}
    </div>
  )
}

export default UsersEditForm