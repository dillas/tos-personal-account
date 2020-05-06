import React from 'react'
import Grid from '@material-ui/core/Grid'
import MaterialTable from 'material-table'
import Api from './api'

export default function MTable() {
  const columns = [
    { title: 'Логин', field: 'username' },
    { title: 'Имя', field: 'firstName' },
    { title: 'Фамилия', field: 'lastName' },
    { title: 'E-mail', field: 'email' },
    { title: 'Телефон', field: 'phone' },
    { title: 'Сайт', field: 'website' }
  ]

  const [data, setData] = React.useState([])

  async function fetchData() {
    const response = await Api.getContacts()
    setData(response.data)
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid item xs={12}>
      <MaterialTable
        title="Список контактов"
        columns={columns}
        data={data}
        localization={{
          header: { actions: '' },
          toolbar: { searchPlaceholder: 'Поиск' },
          body: { emptyDataSourceMessage: 'Нет записей', editRow: { deleteText: 'Вы хотите удалить запись?' } }
        }}
        options={{ paging: false, searchFieldAlignment: 'left' }}
        editable={{
          onRowDelete: (oldData) => Api.removeContacts(oldData.id).then(fetchData),
          onRowAdd: (newData) => Api.createContacts(newData).then(fetchData),
          onRowUpdate: (newData) => Api.editeContacts(newData).then(fetchData)
        }}
      />
    </Grid>
  )
}
