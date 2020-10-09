package com.codeplay.project.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Student {
    @Id
    private String studentId;

    private String name;

    private String department;

    private String major;

    public Student(){
    }

    public Student(String name, String department, String major){
        this.name = name;
        this.department = department;
        this.major = major;
    }

    public Student(String studentId, String name, String department, String major){
        this.studentId = studentId;
        this.name = name;
        this.department = department;
        this.major = major;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String id) {
        this.studentId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }
}
