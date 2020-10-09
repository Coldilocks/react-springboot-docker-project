package com.codeplay.project.service.impl;

import com.codeplay.project.model.Student;
import com.codeplay.project.repository.StudentRepository;
import com.codeplay.project.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student addNewStudent(Student student) {
        return studentRepository.save(new Student(student.getStudentId(), student.getName(), student.getDepartment(), student.getMajor()));
    }

    @Override
    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        studentRepository.findAll().forEach(students::add);

        return students;
    }

    @Override
    public Student updateStudent(Student student) {
        Optional<Student> studentData = this.getStudentById(student.getStudentId());
        if(studentData.isPresent()){
            Student _student = studentData.get();
            _student.setName(student.getName());
            _student.setDepartment(student.getDepartment());
            _student.setMajor(student.getMajor());
            return studentRepository.save(_student);
        }
        return null;
    }

    @Override
    public void deleteStudentById(String studentId) {
        studentRepository.deleteById(studentId);
    }

    @Override
    public Optional<Student> getStudentById(String studentId) {
        return studentRepository.findById(studentId);
    }

    @Override
    public Student updateStudentById(String studentId, Student student) {
        Optional<Student> studentData = this.getStudentById(studentId);
        if(studentData.isPresent()){
            Student _student = studentData.get();
            _student.setName(student.getName());
            _student.setDepartment(student.getDepartment());
            _student.setMajor(student.getMajor());
            return studentRepository.save(_student);
        }
        return null;
    }
}
