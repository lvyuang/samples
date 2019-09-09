import { createAPI, useAPI, useDatabase } from '@shimo/sos-utils'
import { first } from 'lodash'

const starFileAPI = createAPI((params) => ({
  method: params.star ? 'PUT' : 'DELETE',
  path: `/files/${params.fileID}/star`,

  // 乐观更新，如果提供了会直接认为 HTTP 返回了该对象
  optimisticResponse: {
    starred: params.star
  },

  // 将返回结果存入到数据库（浏览器中为 IndexedDB）
  // data 为 HTTP 的返回结果（或者为 optimisticResponse 的值，如果提供的话）
  async saveToDatabase(db, { data }) {
    await db('files').where({id: params.fileID}).modify({star: data.starred})
  }
}))

const getFileAPI = createAPI((params) => ({
  method: 'GET',
  path: `/files/${params.fileID}`,

  async saveToDatabase(db, { data }) {
    const file = first(await db('files').where({id: params.fileID}))
    if (file) {
      file.modify(data)
    } else {
      await db('files').insert(file)
    }
  }
}))


export function File({ id }) {
  // useDatabase 和 useAPI 都是 React hooks。
  const { loading } = useAPI(getFileAPI, { fileID: id })

  // useDatabase(数据库名，where 查询条件)，返回查询的结果（数组）
  const file = first(useDatabase('files', { id }))

  if (loading) {
    return <p>载入中...</p>
  }

  if (!file) {
    return <p>没有找到文件</p>
  }

  return <>
    <p>文件名：{file.name}</p>
    <StarFileButton id={id} starred={file.starred}></StarFileButton>
  </>
}

function StarFileButton({ id, starred }) {
  // useLazyAPI 和 useAPI 的区别是后者会直接执行，前者需要手动调用。
  const [starFile, { loading }] = useLazyAPI(starFileAPI, {
    fileID: id,
    star: !starred
  })

  return <button onClick={starFile} disabled={loading}>
    {starred ? '取消标星' : '标星'}
  </button>
}