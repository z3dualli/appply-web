import { Col, Pagination, Row } from "antd"
import styles from './MainPage.module.less'
import { useEffect, useState } from "react"
import { getPeoplelist } from "../service/service"
import { initialPeopleData, PeopleDataType } from "../types/type"
import { DEFAULT_PAGE } from "../../../shared/const/const"

const MainPage = ()=> {


const [people, setPeople] = useState<PeopleDataType>(initialPeopleData)
const [page, setPage] = useState(DEFAULT_PAGE)



useEffect(()=> {
  getPeoplelist(page).then((res)=> setPeople(res.data ))

}, [page])


  return(
    <Col span={24}>
      <Row align={"middle"} justify={"center"} gutter={[10, 10]}>
        <Col className={styles.title} span={24}> 
        <h1 className={styles.center}>People List</h1>
        </Col>
        <Col span={20}>
          <Row justify={"space-between"} gutter={[10, 10]}>     
            {
              people.results.map((p)=> (
                <Col span={5} className={styles.item}>
                  <h3 className={styles.names}>{p.name}</h3>
                
                </Col>
              ))
            }

          </Row>
        </Col>
        <Col span={24}>
          <Pagination
           align="center"
           total={people.count}
           onChange={(page: number)=> {
            setPage(page)}}
            showSizeChanger={false}/>
            
        </Col>
      </Row>
    </Col>
  )
}

export default MainPage