package com.codeplay.project.controller;

import com.codeplay.project.model.Student;
import com.codeplay.project.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1")
public class StudentController {

    @Autowired
    private StudentService studentService;

    /**
     * 添加学生信息
     * @param student
     * @return
     */
    @RequestMapping(path="/student", method = RequestMethod.POST)
    public ResponseEntity<String> addNewStudent(@RequestBody Student student){
        try{
            Student _student = studentService.addNewStudent(student);
            return ResponseEntity.status(HttpStatus.CREATED).body("学生信息添加成功!");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("学生信息添加失败");
        }
    }

    /**
     * 查看所有学生信息
     * @return
     */
    @RequestMapping(path = "/student", method = RequestMethod.GET)
    public ResponseEntity<List<Student>> getAllStudents(){
        try{
            List<Student> students = studentService.getAllStudents();
            if(students.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            else
                return  new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception  e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * 修改学生信息
     * @param student
     * @return
     */
    @RequestMapping(path = "/student", method = RequestMethod.PUT)
    public ResponseEntity<String> updateStudent(@RequestBody Student student){
        try{
            Student _student = studentService.updateStudent(student);
            if(_student != null){
                return ResponseEntity.status(HttpStatus.OK).body("学生信息修改成功!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("未找到此学号对应的学生信息");
            }
        } catch (Exception  e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("学生信息修改失败");
        }
    }

    /**
     * 删除学生
     * @param student
     * @return
     */
    @RequestMapping(path = "/student", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteStudent(@RequestBody Student student){
        try{
            studentService.deleteStudentById(student.getStudentId());
            return ResponseEntity.status(HttpStatus.OK).body("学生信息删除成功!");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("学生信息删除失败");
        }
    }

    /**
     * 根据studentId更新学生信息
     * @param id
     * @param student
     * @return
     */
    @RequestMapping(path = "/student/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateStudentById(@PathVariable("id") String id, @RequestBody Student student){
        try{
            Student _student = studentService.updateStudentById(id, student);
            if(_student != null){
                return ResponseEntity.status(HttpStatus.OK).body("学生信息修改成功!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("未找到此学号对应的学生信息");
            }
        } catch (Exception  e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("修改失败");
        }
    }

    /**
     * 根据学生id删除学生信息
     * @param id
     * @return
     */
    @RequestMapping(path = "/student/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteStudentById(@PathVariable("id") String id){
        try{
            studentService.deleteStudentById(id);
            return ResponseEntity.status(HttpStatus.OK).body("学生信息删除成功!");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("学生信息删除失败");
        }
    }
}
