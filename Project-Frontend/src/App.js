import React, { Component } from 'react'
import {Container, Row, Col, ModalHeader, ModalBody, Modal, FormGroup, Label, Input, Form} from 'reactstrap'
import { Table, Button } from 'reactstrap';
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentId:'',
      name:'',
      department:'',
      major:'',
      students: [],
      updateModal: false,
      addModal: false
    }
  }

  updateToggle = () => {
    this.setState(prevState => ({
      studentId:'',
      name:'',
      department:'',
      major:'',
      updateModal: !prevState.updateModal
    }))
  }

  addToggle = () => {
    this.setState(prevState => ({
      studentId:'',
      name:'',
      department:'',
      major:'',
      addModal: !prevState.addModal
    }))
  }

  componentDidMount(){
    this.getStudentsWithAxios()
  }

  render() {

    const updateFormCloseBtn = <button className="close" onClick={this.updateToggle}>&times;</button>
    const addFormCloseBtn = <button className="close" onClick={this.addToggle}>&times;</button>

    return (
        <Container className="App">
          <Row>
            <Col>
              <h1 style={{margin: "20px 0"}}>学生信息</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table responsive hover>
                <thead>
                <tr>
                  <th>学号 Student ID</th>
                  <th>姓名 Name</th>
                  <th>院系 Department</th>
                  <th>专业 Major</th>
                  <th>操作 Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.state.students.map(student => {
                    return (
                        <tr key={student.studentId}>
                          <th scope="row">{student.studentId}</th>
                          <td>{student.name}</td>
                          <td>{student.department}</td>
                          <td>{student.major}</td>
                          <td>
                            <div style={{width:"110px"}}>
                              <Button color="primary" onClick={(prevState)=>{this.setState({studentId:student.studentId,name:student.name, department:student.department, major:student.major, updateModal:!prevState.updateModal}); }} style={{float: "left", marginRight:"10px"}}>
                                修改
                              </Button>
                              <Modal isOpen={this.state.updateModal} toggle={this.updateToggle} className={this.props.className}>
                                <ModalHeader toggle={this.updateToggle} close={updateFormCloseBtn}>修改学生信息</ModalHeader>
                                <ModalBody>
                                  <Form onSubmit={this.updateStudentWithAxios}>
                                    <FormGroup>
                                      <Label for="studentId">学号 Student ID</Label>
                                      <Input type="text" id="studentId" value={this.state.studentId} onChange={(e)=>{this.setState({studentId:e.target.value})}} readOnly/>
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="name">姓名 Name</Label>
                                      <Input type="text" name="name" id="name" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} />
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="department">学院 Department</Label>
                                      <Input type="text" name="department" id="department" value={this.state.department} onChange={(e)=>{this.setState({department:e.target.value})}} />
                                    </FormGroup>
                                    <FormGroup>
                                      <Label for="major">专业 Major</Label>
                                      <Input type="text" name="major" id="major" value={this.state.major} onChange={(e)=>{this.setState({major:e.target.value})}}  />
                                    </FormGroup>
                                    <Button color="primary">提交</Button>
                                  </Form>
                                </ModalBody>
                              </Modal>
                              {' '}
                              <Button color="danger" onClick={() => this.deleteStudent(student)}>删除</Button>
                            </div>
                          </td>
                        </tr>
                    )
                  })
                }
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button color="success" onClick={this.addToggle} style={{float: "left", marginRight:"10px"}}>
                添加
              </Button>
              <Modal isOpen={this.state.addModal} toggle={this.addToggle} className={this.props.className}>
                <ModalHeader toggle={this.addToggle} close={addFormCloseBtn}>添加学生信息</ModalHeader>
                <ModalBody>
                  <Form onSubmit={this.addStudentWithAxios}>
                    <FormGroup>
                      <Label for="studentId">学号 Student ID</Label>
                      <Input type="text" id="studentId" value={this.state.studentId} onChange={(e)=>{this.setState({studentId:e.target.value})}}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="name">姓名 Name</Label>
                      <Input type="text" name="name" id="name" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="department">学院 Department</Label>
                      <Input type="text" name="department" id="department" value={this.state.department} onChange={(e)=>{this.setState({department:e.target.value})}} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="major">专业 Major</Label>
                      <Input type="text" name="major" id="major" value={this.state.major} onChange={(e)=>{this.setState({major:e.target.value})}}  />
                    </FormGroup>
                    <Button color="success">提交</Button>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
    )
  }

  /**
   * 添加学生信息
   * @param e
   */
  addStudentWithAxios = (e) => {
    e.preventDefault();
    if(this.state.studentId !== ''){
      axios.post(
          '/api/v1/student',
          {
            studentId:!this.state.studentId ? '': this.state.studentId,
            name:this.state.name,
            department:this.state.department,
            major:this.state.major
          })
          .then((res)=>{
            this.setState({
              studentId:'',
              name:'',
              department:'',
              major:''
            });
            if(res.status === 201) {
              alert('添加成功!')
            }
            this.addToggle(); //隐藏表单
            this.getStudentsWithAxios();

          })
    }
  }

  /**
   * 获取所有学生信息
   */
  // getStudentsWithAxios = () => {
  //   axios.get('/api/v1/student').then(({data})=>{
  //     this.setState({students : data});
  //     console.log(data)
  //   })
  // }
  getStudentsWithAxios = () => {
    axios.get('/api/v1/student').then((res)=>{
      if(res.status === 200){
          this.setState({students : res.data});
      }
      console.log(res)
    })
  }


  /**
   * 更新学生信息
   * @param e
   */
  updateStudentWithAxios = (e) => {
    e.preventDefault();
    if(this.state.studentId !== ''){
      axios.put(
          '/api/v1/student',
          {
            studentId:!this.state.studentId ? '': this.state.studentId,
            name:this.state.name,
            department:this.state.department,
            major:this.state.major
          })
          .then((res)=>{
            this.setState({
              studentId:'',
              name:'',
              department:'',
              major:''
            });
            if(res.status === 200){
              alert('更新成功!')
            } else if (res.status === 404){
              alert('未找到此学号')
            }
            this.updateToggle();  //隐藏表单
            this.getStudentsWithAxios();

          })
    }
  }

  /**
   * 删除学生信息
   * @param student
   */
  deleteStudent = (student) => {
    let confirmDelete = window.confirm('确认删除吗?')
    if(confirmDelete){
      fetch(`/api/v1/student`, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          studentId:student.studentId,
        })
      }).then((res)=>{
        // console.log(res.data);
        if(res.status === 200){
          alert('删除成功!')
        }
        this.getStudentsWithAxios();
      })
    }
  }

  // deleteStudentWithAxios = (student) => {
  //   let confirmDelete = window.confirm('确认删除吗?')
  //   if(confirmDelete){
  //     axios.delete(`/api/v1/student/${student.studentId}`).then((res)=>{
  //       console.log(res.data);
  //       if(res.status === 200){
  //         alert('删除成功!')
  //       }
  //       this.getStudentsWithAxios();
  //     })
  //   }
  // }

}

export default App