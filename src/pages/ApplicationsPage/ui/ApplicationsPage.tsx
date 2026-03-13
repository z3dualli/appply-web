import { Button, Col, Form, Input, Modal, notification, Row, Select } from "antd"
import styles from './ApplicationsPage.module.less'
import { deleteApp, getApp, getApplist, patchApp, postApp } from "../service/service"
import { AppType,  initialApp,  PatchPayloadApp,  PostDataApp, SpecilityEnum, SpecilityOptions } from "../types/types"
import { useEffect, useState } from "react"


const ApplicationsPage = ()=> {
  const [form] = Form.useForm<PostDataApp>()
  const [Applist, setApplist] = useState<AppType[]>([])

  const [formPatch] = Form.useForm<PatchPayloadApp>()
  const [OpenApp, setOpenApp] = useState<AppType>(initialApp)

  const [open, setOpen] = useState(false)

  const [IsEdit, setIsEdit] = useState(false)

  useEffect(()=>{
    getData()
  },[])

  const getData = ()=> {
    getApplist().then((res)=>setApplist(res.data))
  }

  const handleSend = async ()=> {
    const data = await form.validateFields()
    await postApp({
      name: data.name, 
      phone:data.phone, 
      specility:data.specility})
      notification.success({message: "Успешно отправлено"})
      await getData()
  }

  const handleApp = (id: number)=> {
    setOpen(true)
    getApp(id).then((res)=> setOpenApp(res.data))
  }

  const handlePatch = async ()=> {
    const data = await formPatch.validateFields()
    await patchApp(OpenApp.id, {
      phone: data.phone, 
      specility: data.specility,
    }).then(()=> {
      setOpen(false)
      getData()
    })
  }

  const handleDelete = async()=> {
    await deleteApp(OpenApp.id)
    await getData()
    setOpen(false)
  }

  const modalContent =(
  <Col span={24}>
    {IsEdit ? ( 
    <Form form={formPatch}>
      <Row> 
        <Col span={24}>
        <Form.Item name={"phone"} rules={[{ required: true, message: "Введите номер телефона!" },{pattern: /^(\+7|8)\d{10}$/,
              message: "Введите корректный номер (например: +79991234567)"}]} >
          <Input placeholder={'phone'}/>
        </Form.Item>
        </Col>
        <Col span={24}>
        <Form.Item name={"specility"} rules={[{required: true, message: "Поле обязательно!"}]}>
          <Select options={SpecilityOptions} defaultValue={OpenApp.specility}/>
        </Form.Item>
        </Col>
        <Col span={24}>
          <Button onClick={()=> setIsEdit(false)}>Back</Button>
          <Button onClick={handlePatch}>Save</Button>
        </Col>
        </Row>
      </Form>
        ) : ( <Row>
      <Col>
        <p>{`Номер телефона:  ${OpenApp.phone}`}</p>
        <p>{`Специальность:  ${SpecilityOptions.find((s)=> s.value === OpenApp.specility)?.label}`}</p>
      </Col>
      <Col span={24}>
        <Button onClick={()=> setIsEdit(true)}>Change</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </Col>
      </Row>
  )}
  </Col>
  )
  

  return(
    <Col span={24} className={styles.apply}>
      <h1>Apply Form</h1>
      <Row align={"middle"} justify={"center"}>
        <Col span={8}>
          <Form form={form}>
            <Row gutter={[40, 20]}>
            <Col span={24}>
              <Form.Item name={'name'} rules={[{required: true, message: "Поле обязательно!"}]} style={{margin: 0}}>
                <Input placeholder="Name..."/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name={'phone'} rules={[{ required: true, message: "Введите номер телефона!" },{pattern: /^(\+7|8)\d{10}$/,
              message: "Введите корректный номер (например: +79991234567)"}]} 
              style={{margin: 0}}>
                <Input placeholder="Phone Number..."/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name={'specility'} rules={[{required: true, message: "Поле обязательно!"}]} style={{margin: 0}}>
                <Select options={SpecilityOptions} defaultValue={SpecilityEnum.back}/>
              </Form.Item>
            </Col>
            <Col>
              <Button onClick={handleSend}>Send</Button>
            </Col>      
          </Row>
          </Form>
        </Col>
        <Col span={20}>
          <Row gutter={[50, 10]} className={styles.app}>
            {
              Applist.map((app)=> 
              <Col span={6}>
                <Row gutter={[10, 10]}>
                  <Col span={24} className={styles.list} onClick={()=>handleApp(app.id)}>
                    <h3>{app.name}</h3>
                    <p>{SpecilityOptions.find((s)=> s.value === app.specility)?.label}</p>

                  </Col>

                </Row>
              </Col>)
            }
          </Row>
        </Col>
      </Row>
      <Modal
      title={<h2>{OpenApp.name}</h2>}
      open={open} 
      onCancel={()=> {
        setOpen(false)
        setIsEdit(false)
      }}

      footer={false}
      children={modalContent}/>

    </Col>
  )
}

export default ApplicationsPage