
type Props = {data: JSON}

function UsersDetailsData({data}: Props) {
  return (
    <div>
        {JSON.stringify(data)}      
    </div>
  )
}

export default UsersDetailsData