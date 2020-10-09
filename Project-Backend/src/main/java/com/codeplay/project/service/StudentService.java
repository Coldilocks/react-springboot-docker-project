package com.codeplay.project.service;

import com.codeplay.project.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    /**
     * 添加学生
     * @param student 学生信息
     * @return student
     */
    Student addNewStudent(Student student);

    /**
     * 获取所有学生信息
     * @return Student List
     */
    List<Student> getAllStudents();

    /**
     * 更新学生信息
     * @param student 学生信息
     * @return student
     */
    Student updateStudent(Student student);

    /**
     * 删除学生信息
     * @param studentId 学生id
     */
    void deleteStudentById(String studentId);

    /**
     * 根据学生id获取学生信息
     * @param studentId 学生id
     * @return student
     */
    Optional<Student> getStudentById(String studentId);

    /**
     * 根据学生id更新学生信息
     * @param studentId 学生id
     * @param student 学生信息
     * @return student
     */
    Student updateStudentById(String studentId, Student student);

}
