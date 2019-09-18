package br.com.project.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "age")
    private Integer age;

    @NotNull
    @Column(name = "register", nullable = false, unique = true)
    private String register;

    @OneToMany(mappedBy = "student")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Grade> grades = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "student_school_class",
               joinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "school_class_id", referencedColumnName = "id"))
    private Set<SchoolClass> schoolClasses = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "student_history",
               joinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "history_id", referencedColumnName = "id"))
    private Set<History> histories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Student name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public Student age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getRegister() {
        return register;
    }

    public Student register(String register) {
        this.register = register;
        return this;
    }

    public void setRegister(String register) {
        this.register = register;
    }

    public Set<Grade> getGrades() {
        return grades;
    }

    public Student grades(Set<Grade> grades) {
        this.grades = grades;
        return this;
    }

    public Student addGrade(Grade grade) {
        this.grades.add(grade);
        grade.setStudent(this);
        return this;
    }

    public Student removeGrade(Grade grade) {
        this.grades.remove(grade);
        grade.setStudent(null);
        return this;
    }

    public void setGrades(Set<Grade> grades) {
        this.grades = grades;
    }

    public Set<SchoolClass> getSchoolClasses() {
        return schoolClasses;
    }

    public Student schoolClasses(Set<SchoolClass> schoolClasses) {
        this.schoolClasses = schoolClasses;
        return this;
    }

    public Student addSchoolClass(SchoolClass schoolClass) {
        this.schoolClasses.add(schoolClass);
        schoolClass.getStudents().add(this);
        return this;
    }

    public Student removeSchoolClass(SchoolClass schoolClass) {
        this.schoolClasses.remove(schoolClass);
        schoolClass.getStudents().remove(this);
        return this;
    }

    public void setSchoolClasses(Set<SchoolClass> schoolClasses) {
        this.schoolClasses = schoolClasses;
    }

    public Set<History> getHistories() {
        return histories;
    }

    public Student histories(Set<History> histories) {
        this.histories = histories;
        return this;
    }

    public Student addHistory(History history) {
        this.histories.add(history);
        history.getStudents().add(this);
        return this;
    }

    public Student removeHistory(History history) {
        this.histories.remove(history);
        history.getStudents().remove(this);
        return this;
    }

    public void setHistories(Set<History> histories) {
        this.histories = histories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Student)) {
            return false;
        }
        return id != null && id.equals(((Student) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", age=" + getAge() +
            ", register='" + getRegister() + "'" +
            "}";
    }
}
