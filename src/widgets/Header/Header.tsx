import { Col } from "antd"
import { NavLink } from "react-router-dom"
import styles from './Header.module.less'


const Header = ()=> {
  return (
    <Col span={24} className={styles.header}>
      <NavLink to={'/'}>People</NavLink>
      <NavLink to={'/applications'}>Apply</NavLink>
    </Col>

  )
}

export default Header