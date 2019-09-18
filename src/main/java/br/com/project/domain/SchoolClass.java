package br.com.project.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A SchoolClass.
 */
@Entity
@Table(name = "school_class")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SchoolClass implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description")
    private String description;

    @OneToOne(mappedBy = "schoolClass")
    @JsonIgnore
    private History history;

    @ManyToOne
    @JsonIgnoreProperties("schoolClasses")
    private Teacher teacher;

    @OneToMany(mappedBy = "schoolClass")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Subject> subjects = new HashSet<>();

    @ManyToMany(mappedBy = "schoolClasses")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Student> students = new HashSet<>();

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

    public SchoolClass name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public SchoolClass description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public History getHistory() {
        return history;
    }

    public SchoolClass history(History history) {
        this.history = history;
        return this;
    }

    public void setHistory(History history) {
        this.history = history;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public SchoolClass teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public SchoolClass subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public SchoolClass addSubject(Subject subject) {
        this.subjects.add(subject);
        subject.setSchoolClass(this);
        return this;
    }

    public SchoolClass removeSubject(Subject subject) {
        this.subjects.remove(subject);
        subject.setSchoolClass(null);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public SchoolClass students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public SchoolClass addStudent(Student student) {
        this.students.add(student);
        student.getSchoolClasses().add(this);
        return this;
    }

    public SchoolClass removeStudent(Student student) {
        this.students.remove(student);
        student.getSchoolClasses().remove(this);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SchoolClass)) {
            return false;
        }
        return id != null && id.equals(((SchoolClass) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SchoolClass{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
