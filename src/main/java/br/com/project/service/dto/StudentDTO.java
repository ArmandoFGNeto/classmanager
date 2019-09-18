package br.com.project.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.project.domain.Student} entity.
 */
public class StudentDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String name;

    private Integer age;

    @NotNull
    private String register;


    private Set<SchoolClassDTO> schoolClasses = new HashSet<>();

    private Set<HistoryDTO> histories = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getRegister() {
        return register;
    }

    public void setRegister(String register) {
        this.register = register;
    }

    public Set<SchoolClassDTO> getSchoolClasses() {
        return schoolClasses;
    }

    public void setSchoolClasses(Set<SchoolClassDTO> schoolClasses) {
        this.schoolClasses = schoolClasses;
    }

    public Set<HistoryDTO> getHistories() {
        return histories;
    }

    public void setHistories(Set<HistoryDTO> histories) {
        this.histories = histories;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentDTO studentDTO = (StudentDTO) o;
        if (studentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", age=" + getAge() +
            ", register='" + getRegister() + "'" +
            "}";
    }
}
