import { NextPage } from "next"
import axios from "axios"
import useSWR from "swr"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)
const YoutubeList: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: categories, error } = useSWR(`/api/youtube/${id}`, fetcher)

  const [text, setText] = useState("")
  const categoriesListToShow = useMemo(
    () =>
      categories?.items.filter((category: any) => {
        return category.snippet.title.toLowerCase().includes(text.toLowerCase())
      }),
    [categories, text],
  )
  useEffect(() => {
    if (error) {
      console.error(error)
    } else if (categories) {
      console.log(categories)
    }

    return () => {}
  }, [categories])

  return (
    <div className="w-screen h-screen p-4 bg-black text-white ">
      <div>
        <input
          value={text}
          onChange={({ target }) => setText(target.value)}
          type="text"
          placeholder="Search category"
          className="p-2 text-black"
        />
      </div>
      <div className="w-full overflow-y-auto p-3 max-h-[calc(100vh-56px)]">
        <div className="w-full flex flex-col space-y-2">
          {categoriesListToShow?.map((category: any) => (
            <div key={category.id} className=" border border-white rounded p-3 w-3/5">
              {category.snippet.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default YoutubeList
